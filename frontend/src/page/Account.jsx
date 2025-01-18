import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Input component from shadcn
import { Label } from "@/components/ui/label"; // Label component from shadcn
import { Button } from "@/components/ui/button"; // Button component from shadcn
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Card components from shadcn
import { useRecoilValue } from "recoil";
import { currentUserState } from "@/recoil/user.recoil";

const Account = () => {
  const user = useRecoilValue(currentUserState);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.username);
  },[])

  // Handle form submission (Update User)
  const handleUpdateUser = async (e) => {
    e.preventDefault();
 
  };

  return (
    <div className="min-h-full  flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-2xl mx-4 sm:mx-0">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Profile</CardTitle>
          <CardDescription className="text-center">
            View and update your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateUser} className="space-y-4 sm:space-y-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                readonly
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>

            {/* Update Button */}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Update User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;