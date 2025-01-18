import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


const SendMoney = () => {
  const [Amount, setAmount] = useState('');
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firsname = searchParams.get("firstName");
  const lastname = searchParams.get("lastName");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle send money logic here
    console.log({ Amount });
    try {
      const response = await axios.post("/api/v1/accounts/transfer-money",{
        to: id,
        amount: Amount
      },{withCredentials: true})

      navigate("/dashboard");

      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Send Money</CardTitle>
          <CardDescription className="text-center">
            Enter your friend's name to initiate the transfer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-green-500 text-white text-xl">
                  {firsname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{firsname + " "+ lastname}</h3>
            </div>
            <div>
              <label htmlFor="friendName" className="block text-sm font-medium mb-2">
              Amount (in Rs)
              </label>
              <Input
                id="Amount"
                type="number"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter your friend's name"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              Initiate Transfer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;