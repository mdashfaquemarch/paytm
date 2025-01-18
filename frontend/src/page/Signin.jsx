import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { currentUserState, isUserLoggedIn } from '@/recoil/user.recoil';
import axios from 'axios';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
          const currentUser =  useSetRecoilState(currentUserState);
          const isAuth = useSetRecoilState(isUserLoggedIn);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const response = await axios.post("/api/v1/users/sign-in",{
        username,
        password
      },{withCredentials: true})
      console.log(response);
      if(response?.data?.user?.loggedInUser){
        currentUser(response?.data?.user?.loggedInUser);
        isAuth(true);
        console.log("loggedin user")
      }
      navigate("/dashboard");

     } catch (error) {
        console.log(error);
     }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;