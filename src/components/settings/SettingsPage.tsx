
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  User, 
  Shield, 
  PaintBucket, 
  Wallet,
  Server,
  Receipt,
  Save,
  Building,
  RefreshCw,
  CreditCard,
  CheckCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Business Information State
  const [businessInfo, setBusinessInfo] = useState({
    name: 'BeautySalon',
    address: '123 Salon Street, City',
    phone: '+1 234 567 8900',
    email: 'contact@beautysalon.com',
    website: 'www.beautysalon.com',
    taxId: 'TAX12345678'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    customerBirthdays: true,
    lowStockAlerts: true,
    dailySummary: true,
    marketingEmails: false
  });

  // Theme Settings State
  const [theme, setTheme] = useState('light');

  // Handle saving settings
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
  };

  // Handle form changes for business info
  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle changes
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-10"
    >
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-salon-800 flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Settings
        </h1>
        <p className="text-salon-500">Manage your salon settings and preferences</p>
      </header>

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-5 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your salon's basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input 
                    id="businessName" 
                    name="name" 
                    value={businessInfo.name} 
                    onChange={handleBusinessInfoChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={businessInfo.address} 
                    onChange={handleBusinessInfoChange} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={businessInfo.phone} 
                      onChange={handleBusinessInfoChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={businessInfo.email} 
                      onChange={handleBusinessInfoChange} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      value={businessInfo.website} 
                      onChange={handleBusinessInfoChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Business Number</Label>
                    <Input 
                      id="taxId" 
                      name="taxId" 
                      value={businessInfo.taxId} 
                      onChange={handleBusinessInfoChange} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" /> Save Business Information
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure your application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackup">Automatic Backups</Label>
                    <p className="text-sm text-salon-500">Backup your data automatically</p>
                  </div>
                  <Switch id="autoBackup" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataSync">Data Synchronization</Label>
                    <p className="text-sm text-salon-500">Sync data between devices</p>
                  </div>
                  <Switch id="dataSync" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="anonymousData">Share Anonymous Usage Data</Label>
                    <p className="text-sm text-salon-500">Help us improve the application</p>
                  </div>
                  <Switch id="anonymousData" />
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" /> Restore Default Settings
                  </Button>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Server className="mr-2 h-4 w-4" /> Run System Diagnostics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Appointment Reminders</Label>
                  <p className="text-sm text-salon-500">Get notified about upcoming appointments</p>
                </div>
                <Switch 
                  checked={notifications.appointmentReminders} 
                  onCheckedChange={() => handleNotificationChange('appointmentReminders')} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Customer Birthdays</Label>
                  <p className="text-sm text-salon-500">Notifications for customer birthdays</p>
                </div>
                <Switch 
                  checked={notifications.customerBirthdays} 
                  onCheckedChange={() => handleNotificationChange('customerBirthdays')} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Low Stock Alerts</Label>
                  <p className="text-sm text-salon-500">Alerts when inventory is running low</p>
                </div>
                <Switch 
                  checked={notifications.lowStockAlerts} 
                  onCheckedChange={() => handleNotificationChange('lowStockAlerts')} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Daily Summary</Label>
                  <p className="text-sm text-salon-500">Get a daily summary of your business</p>
                </div>
                <Switch 
                  checked={notifications.dailySummary} 
                  onCheckedChange={() => handleNotificationChange('dailySummary')} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Marketing Emails</Label>
                  <p className="text-sm text-salon-500">Receive marketing tips and updates</p>
                </div>
                <Switch 
                  checked={notifications.marketingEmails} 
                  onCheckedChange={() => handleNotificationChange('marketingEmails')} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center ${theme === 'light' ? 'border-accent-500 bg-accent-50' : 'border-gray-200'}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="h-12 w-full rounded-md bg-white border border-gray-100 mb-2"></div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div 
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center ${theme === 'dark' ? 'border-accent-500 bg-accent-50' : 'border-gray-200'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="h-12 w-full rounded-md bg-gray-800 mb-2"></div>
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div 
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center ${theme === 'system' ? 'border-accent-500 bg-accent-50' : 'border-gray-200'}`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="h-12 w-full rounded-md bg-gradient-to-r from-white to-gray-800 mb-2"></div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-5 gap-4">
                  {['#9b87f5', '#38bdf8', '#4ade80', '#fb7185', '#f59e0b'].map((color) => (
                    <div 
                      key={color}
                      className="cursor-pointer rounded-full h-10 w-10 border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                      onClick={() => toast({
                        title: "Color Selected",
                        description: `You selected ${color}`,
                      })}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <div 
                      key={size}
                      className="cursor-pointer rounded-lg border-2 border-gray-200 p-4 text-center"
                      onClick={() => toast({
                        title: "Font Size",
                        description: `You selected ${size} font size`,
                      })}
                    >
                      <span className={`text-sm font-medium ${
                        size === 'Small' ? 'text-xs' : 
                        size === 'Medium' ? 'text-sm' : 
                        'text-base'
                      }`}>
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="pt-4">
                <Button className="w-full sm:w-auto">
                  Change Password
                </Button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-salon-500">Add an extra layer of security</p>
                  </div>
                  <Switch id="twoFactor" />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sessionTimeout">Automatic Session Timeout</Label>
                    <p className="text-sm text-salon-500">Automatically log out after period of inactivity</p>
                  </div>
                  <Switch id="sessionTimeout" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} className="mr-2">
                <Save className="mr-2 h-4 w-4" /> Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>
                Manage your billing information and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="rounded-lg border p-4 bg-accent-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-accent-700">Premium Plan</span>
                    <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs">Active</span>
                  </div>
                  <p className="text-sm text-salon-600 mb-2">Billed monthly - Renews on May 15, 2023</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-1">$49.99</span>
                    <span className="text-salon-500">/month</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-salon-600" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-salon-500">Expires 12/2025</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">
                  Update Payment Method
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="rounded-lg border">
                  <div className="p-4 border-b flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-salon-500">April 15, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.99</p>
                      <p className="text-xs text-salon-500">
                        <CheckCircle className="h-3 w-3 inline mr-1 text-green-500" />
                        Paid
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-b flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-salon-500">March 15, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.99</p>
                      <p className="text-xs text-salon-500">
                        <CheckCircle className="h-3 w-3 inline mr-1 text-green-500" />
                        Paid
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-salon-500">February 15, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.99</p>
                      <p className="text-xs text-salon-500">
                        <CheckCircle className="h-3 w-3 inline mr-1 text-green-500" />
                        Paid
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Receipt className="mr-2 h-4 w-4" /> View All Invoices
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel Subscription
              </Button>
              <Button className="w-full sm:w-auto">
                Upgrade Plan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SettingsPage;
