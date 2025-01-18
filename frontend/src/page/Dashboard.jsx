import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserList from "@/components/UserList";
import axios from "axios";
import { Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [Balance, setBalance] = useState(0.0);

  // Define fetchBalance outside of useEffect so it can be reused
  const fetchBalance = async () => {
    try {
      const response = await axios.get("https://paytm-backend-m8l4.onrender.com/api/v1/accounts/check-balance", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response?.data?.balance) {  // Corrected typo here
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(0.0);  // Optionally, set balance to a default value
    }
  };

  useEffect(() => {
    // Fetch balance immediately
    fetchBalance();
  }, [fetchBalance]);  // Add fetchBalance as a dependency

  return (
    <div className="min-h-screen">
      {/* Balance Card */}
      <div className="w-full max-w-7xl mx-auto my-3 px-5 ">
        <Card className="bg-[#151516] backdrop-blur-sm  border border-white/20 rounded-xl shadow-lg ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Wallet className="w-6 h-6 text-blue-500" />
              Account Balance
            </CardTitle>
            <CardDescription className="text-gray-300">
              Check your current account balance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold ">₹ {Balance.toFixed(3)}</div>
            <div className="mt-4">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={fetchBalance} // Use the function directly
              >
                Refresh Balance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <UserList />
    </div>
  );
};

export default Dashboard;