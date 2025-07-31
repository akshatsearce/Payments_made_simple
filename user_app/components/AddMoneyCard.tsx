"use client"; // This directive is correctly placed

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"; // Import specific Card components for better structure
// import { Center } from "./ui/center"; // This component might not be necessary with proper flex/grid
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"; // Import specific Select components for shadcn/ui
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label"; // Import Label for better accessibility and styling

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  // Add more banks as needed
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl || ""
  );
  const [amount, setAmount] = useState(""); // State to hold the input amount

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic validation: allow only numbers and a single decimal point
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const handleAddMoney = () => {
    // You'd typically want to send the amount and selected bank
    // to your backend for processing before redirecting.
    // For now, we'll just redirect as per your original code.
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      console.warn("No redirect URL selected for the bank.");
      // Optionally show a user-friendly error message
    }
  };

  return (
    // <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100"> {/* Added a wrapper for centering and background */}
      <Card className="w-full max-w-sm"> {/* Set a max-width for the card */}
        <CardHeader>
          <CardTitle>Add Money</CardTitle>
          <CardDescription>
            Choose your bank and enter the amount to add funds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4"> {/* Use grid for better spacing */}
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label> {/* Use Label for input */}
              <Input
                id="amount"
                type="text" // Change to text for better controlled input (allowing decimal)
                placeholder="e.g., 100.00"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bank-select">Bank</Label> {/* Label for select */}
              <Select
                onValueChange={(value) => {
                  setRedirectUrl(
                    SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                      ""
                  );
                }}
                defaultValue={SUPPORTED_BANKS[0]?.name} // Set a default selected value
              >
                <SelectTrigger id="bank-select">
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_BANKS.map((bank) => (
                    <SelectItem key={bank.name} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleAddMoney} className="w-full mt-2"> {/* Full width button with margin-top */}
              Add Money
            </Button>
          </div>
        </CardContent>
      </Card>
    // </div>
  );
};