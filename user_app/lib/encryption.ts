import { createCipheriv, createDecipheriv, createHmac } from "crypto";

const algorithm = 'aes-256-cbc'

// Safely get buffer from environment variable with fallback
function getBufferFromEnv(envVar: string | undefined, length: number, name: string): Buffer {
  if (!envVar) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  const buffer = Buffer.from(envVar, 'hex');
  if (buffer.length !== length) {
    throw new Error(`Invalid ${name} length: expected ${length} bytes`);
  }
  return buffer;
}

// Get encryption keys with proper error handling
const encryptionKey = getBufferFromEnv(process.env.ENCRYPTION_KEY, 32, 'ENCRYPTION_KEY'); // 32 bytes
const hmacKey = getBufferFromEnv(process.env.HMAC_KEY, 32, 'HMAC_KEY'); // 32 bytes
const iv = getBufferFromEnv(process.env.IV_KEY, 16, 'IV_KEY'); // 16 bytes

export function encryptPhoneNumber(phoneNumber :string) {
  const cipher = createCipheriv(algorithm, encryptionKey, iv);
  let encrypted = cipher.update(phoneNumber, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt phone number
export function decryptPhoneNumber(encryptedPhoneNumber :string) {
  const decipher = createDecipheriv(algorithm, encryptionKey, iv);
  let decrypted = decipher.update(encryptedPhoneNumber, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Compute HMAC for blind index
export function computeHmac(phoneNumber :string) {
  return createHmac('sha256', hmacKey)
    .update(phoneNumber)
    .digest('hex');
}