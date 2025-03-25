
import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";

interface HeaderProps {
  sidebarWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const today = format(new Date(), 'EEEE, MMMM do, yyyy');
  const { toast } = useToast();
  const [notificationCount, setNotificationCount] = useState(3);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  
  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Appointment", description: "Sarah Johnson booked for 3:00 PM", read: false },
    { id: 2, title: "Inventory Alert", description: "Shampoo stock is running low", read: false },
    { id: 3, title: "Staff Message", description: "Team meeting at 9:00 AM tomorrow", read: false },
  ]);

  // Get the page title based on the current path
  const getPageTitle = () => {
    if (pathName === '/') return 'Dashboard';
    return pathName.substring(1).charAt(0).toUpperCase() + pathName.slice(2);
  };

  const handleNotificationClick = () => {
    // Mark all notifications as read
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    
    // Update notification count
    setNotificationCount(0);
    
    // Show notification toast
    toast({
      title: "Notifications",
      description: `You have ${notificationCount} unread notifications.`,
    });
  };

  const toggleNotifications = (enabled: boolean) => {
    setNotificationEnabled(enabled);
    toast({
      title: enabled ? "Notifications Enabled" : "Notifications Disabled",
      description: enabled ? "You will now receive notifications" : "You will no longer receive notifications",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared",
    });
  };

  return (
    <motion.header 
      className="h-16 bg-white shadow-subtle z-20 fixed top-0 right-0 left-0 ml-[250px] transition-all duration-300 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      style={{ marginLeft: `${sidebarWidth}px` }}
    >
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-medium text-salon-800">{getPageTitle()}</h1>
          <span className="text-sm text-salon-500">{today}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-salon-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className={cn(
                  "relative p-2 text-salon-600 hover:text-salon-800 rounded-md hover:bg-salon-100 transition-colors"
                )}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearAllNotifications}
                    className="text-xs text-gray-500 hover:text-accent-500"
                  >
                    Clear all
                  </button>
                </div>
              </div>
              
              <div className="max-h-[300px] overflow-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer",
                        !notification.read && "bg-accent-50"
                      )}
                      onClick={() => {
                        // Mark this notification as read
                        setNotifications(
                          notifications.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          )
                        );
                        // Update count
                        if (!notification.read) {
                          setNotificationCount(prev => Math.max(0, prev - 1));
                        }
                        // Show toast with notification details
                        toast({
                          title: notification.title,
                          description: notification.description,
                        });
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && (
                          <Badge variant="outline" className="bg-accent-100 text-accent-800 border-accent-200 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No notifications
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification-toggle" className="text-xs">
                    Enable notifications
                  </Label>
                  <Switch 
                    id="notification-toggle" 
                    checked={notificationEnabled}
                    onCheckedChange={toggleNotifications}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center space-x-2 pl-2 border-l border-salon-200">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
                <Avatar className="h-8 w-8 bg-accent-100 text-accent-600 hover:bg-accent-200 transition-colors cursor-pointer">
                  <AvatarFallback className="flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-salon-800">Admin User</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast({ title: "Profile", description: "View your profile" })}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Manage your account settings" })}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Preferences", description: "Update your preferences" })}>
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast({ title: "Help", description: "Get help and support" })}>
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Sign out", description: "You have been signed out" })} className="text-red-500 focus:text-red-500">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
