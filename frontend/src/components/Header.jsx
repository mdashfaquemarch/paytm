import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Profile from './Profile.jsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState, isUserLoggedIn } from '@/recoil/user.recoil.js';
import axios from 'axios';
// import ThemeToggle from './ThemeToggle'; // Assuming ThemeToggle is a custom component

const Header = () => {
  const setIsAuth = useSetRecoilState(isUserLoggedIn);
  const setUser = useSetRecoilState(currentUserState);
  const isAuth = useRecoilValue(isUserLoggedIn);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("https://paytm-backend-m8l4.onrender.com/api/v1/users/current-user", { withCredentials: true });
        if (response?.data?.success) {
          setIsAuth(true);
          setUser(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setUser(null);
      }
    };
    getCurrentUser();
  }, [setIsAuth, setUser]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4 px-2 sm:px-5 md:px-16 flex justify-between items-center"
    >
      <div className='flex items-center justify-center'>
        <div className='hidden sm:block'>
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 100 100">
            <path d="M50 10C28.954 10 12 26.954 12 48s16.954 38 38 38 38-16.954 38-38S71.046 10 50 10zm0 4c18.778 0 34 15.222 34 34s-15.222 34-34 34S16 66.778 16 48 31.222 14 50 14zm-8.5 12v4H30v4h11.5v4H34v4h8.5v4H30v4h11.5v8h4V62H62v-4H46.5v-4H62v-4H46.5v-4h8.5v-4H46.5v-4h11.5v-4H46.5v-4h-5z" fill="#FFD700"/>
          </svg>
        </div>
        <Link to={"/"}>
          <div className="text-4xl font-bold text-[#FFD700]">Paytm</div>
        </Link>
      </div>

      {!isAuth ? (
        <div className="flex items-center sm:gap-4 gap-2">
          {/* <ThemeToggle /> */}
          <Link to={"/signin"}>
            <Button>Signin</Button>
          </Link>
          <Link to={"/signup"}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Signup</Button>
          </Link>
        </div>
      ) : (
        <Profile />
      )}
    </motion.header>
  );
};

export default Header;