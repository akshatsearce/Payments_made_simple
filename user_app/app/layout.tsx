import { ThemeToggleButton } from "@/components/shared/themeToggle";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <ThemeToggleButton />
        </Providers>
      </body>
    </html>
  );
}
