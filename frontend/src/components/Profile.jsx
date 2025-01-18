import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, // For displaying the user's name and email
  DropdownMenuSeparator, // To separate the header from the menu items
} from "@/components/ui/dropdown-menu";
import { User, LayoutDashboard, LogOut } from "lucide-react"; // Icons for dropdown items
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, isUserLoggedIn } from "@/recoil/user.recoil";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  // Mock user data (replace with actual user data from your app)
  
  const [user, setUser] = useRecoilState(currentUserState);
  const setIsAuth = useSetRecoilState(isUserLoggedIn);

  const handleLogout = async () => {
    try {
         await axios.post("https://paytm-backend-m8l4.onrender.com/api/v1/users/log-out",{},{withCredentials: true})
         setIsAuth([])
         setIsAuth(false);
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <DropdownMenu>
      {/* Trigger: Clickable Image */}
      <DropdownMenuTrigger asChild>
      <div className="cursor-pointer">
          <Avatar className="border-2 border-white h-12 w-12">
            <AvatarImage src={user.image} alt="Profile" />
            <AvatarFallback>
              {user.firstName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-56  shadow-lg rounded-lg bordr">
        {/* Header: User's Name */}
        <DropdownMenuLabel className="p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{"Hi. "+ user.firstName}</p>
          </div>
        </DropdownMenuLabel>

        {/* Separator */}
        <DropdownMenuSeparator className="border-t border-gray-200" />

        {/* Dashboard Option */}
        <Link to={"/dashboard"}>
        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
          
          <LayoutDashboard className="w-4 h-4 " />
          <span className="">Dashboard</span>
          
        </DropdownMenuItem>
        </Link>

        {/* Profile Option */}
        <Link to={"/account"}>
        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
          
          <User className="w-4 h-4 " />
          <span className="">Account</span>
          
        </DropdownMenuItem>
        </Link>

        {/* Separator */}
        <DropdownMenuSeparator className="border-t border-gray-200" />

        {/* Logout Option */}
        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={handleLogout}>
          <LogOut className="w-4 h-4 " />
          <span className="text-red-700">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;