import UserCard from "@/components/UserCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://paytm-backend-m8l4.onrender.com/api/v1/users/search-user?filter=" + filter, {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response?.data?.users);
      });
  }, [filter]);

  return (
    <div className="space-y-4">
      <div className="w-full max-w-7xl px-5 mx-auto my-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search users to send money....."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 "
            onChange= {(e) => setFilter(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        <h2 className="text-bold text-4xl font-mono">Users</h2>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
