import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/send?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`)
    }
    
    return (
        <Card className="shadow-md hover:bg-gray-900">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10 hidden sm:block">
                            <AvatarFallback className="">
                                {user.firstName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold">{user.firstName + " " + user.lastName}</h3>
                    </div>
                    
                    <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleClick}>
                        Send Money
                    </Button>
                    
                </div>
            </CardContent>
        </Card>
    );
};

export default UserCard;