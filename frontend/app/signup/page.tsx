'use client';

import { useState, ChangeEvent } from 'react';
import { BottomWarning } from '@/components/BottomWarning';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { InputBox } from '@/components/InputBox';
import { SubHeading } from '@/components/SubHeading';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface SignupResponse {
  token: string;
}

export default function Signup (){
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axios.post<SignupResponse>('http://localhost:3000/api/v1/user/signup', {
        username,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          
          <InputBox
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            placeholder="John"
            label="First Name"
          />
          <InputBox
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            placeholder="Doe"
            label="Last Name"
          />
          <InputBox
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder="harkirat@gmail.com"
            label="Email"
          />
          <InputBox
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="123456"
            label="Password"
          />

          <div className="pt-4">
            <Button onClick={handleSignup} label="Sign up" />
          </div>

          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};
