// import React from 'react';
// import { Helmet } from 'react-helmet';
// import { motion } from 'framer-motion';
// import { Bell, Palette, ShieldCheck, Trash2 } from 'lucide-react';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { toast } from '@/components/ui/use-toast';

// const SettingsPage = () => {
//   const handleAction = (feature) => {
//     toast({
//       title: `🚧 ${feature} Coming Soon!`,
//       description: "We're working hard to bring this feature to you.",
//     });
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)]">
//       <Helmet>
//         <title>Apna Poster - Settings</title>
//         <meta name="description" content="Manage your account settings and preferences." />
//       </Helmet>
//       <div className="container mx-auto px-4 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Settings</h1>
//           <p className="text-lg text-purple-200">Customize your Apna Poster experience.</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="max-w-2xl mx-auto glass-effect p-8 rounded-2xl space-y-8"
//         >
//           <div className="flex items-center justify-between">
//             <Label htmlFor="notifications" className="flex items-center text-lg">
//               <Bell className="w-5 h-5 mr-3 text-custom-blue" />
//               Push Notifications
//             </Label>
//             <Switch id="notifications" onCheckedChange={() => handleAction('Notifications')} />
//           </div>

//           <div className="flex items-center justify-between">
//             <Label htmlFor="theme" className="flex items-center text-lg">
//               <Palette className="w-5 h-5 mr-3 text-custom-blue" />
//               Dark Mode
//             </Label>
//             <Switch id="theme" checked={true} onCheckedChange={() => handleAction('Theme Switching')} />
//           </div>
          
//           <div className="border-t border-white/10 pt-8">
//             <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
//               <ShieldCheck className="w-6 h-6 mr-3 text-custom-blue" />
//               Account
//             </h3>
//             <div className="space-y-4">
//               <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('Privacy Policy')}>
//                 Privacy Policy
//               </Button>
//               <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('Terms of Service')}>
//                 Terms of Service
//               </Button>
//               <Button variant="destructive" className="w-full justify-start bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-red-300" onClick={() => handleAction('Delete Account')}>
//                 <Trash2 className="w-4 h-4 mr-2" />
//                 Delete Account
//               </Button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;










import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Bell, Palette, ShieldCheck, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
 
const SettingsPage = () => {
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
 
  // Load user preferences
  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('notifications_enabled, theme')
        .eq('id', user.id)
        .single();
 
      if (!error && data) {
        setNotifications(data.notifications_enabled || false);
        setDarkMode(data.theme === 'dark');
      }
    };
 
    fetchSettings();
  }, [user]);
 
  // Toggle Notifications
  const handleNotifications = async (checked) => {
    setNotifications(checked);
    if (!user) return;
    await supabase
      .from('profiles')
      .update({ notifications_enabled: checked })
      .eq('id', user.id);
 
    toast({
      title: "Settings Updated",
      description: `Notifications ${checked ? "enabled" : "disabled"}`,
    });
  };
 
  // Toggle Theme
  const handleTheme = async (checked) => {
    setDarkMode(checked);
    if (!user) return;
    await supabase
      .from('profiles')
      .update({ theme: checked ? 'dark' : 'light' })
      .eq('id', user.id);
 
    document.documentElement.classList.toggle('dark', checked);
 
    toast({
      title: "Theme Updated",
      description: checked ? "Dark Mode enabled" : "Light Mode enabled",
    });
  };
 
  // Delete Account
  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;
 
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      toast({
        title: "❌ Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "✅ Account Deleted",
        description: "Your account has been permanently removed.",
      });
      await signOut();
      navigate("/");
    }
  };
 
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Helmet>
        <title>Apna Poster - Settings</title>
        <meta
          name="description"
          content="Manage your account settings and preferences."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Settings
          </h1>
          <p className="text-lg text-purple-200">
            Customize your Apna Poster experience.
          </p>
        </motion.div>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto glass-effect p-8 rounded-2xl space-y-8"
        >
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex items-center text-lg">
              <Bell className="w-5 h-5 mr-3 text-custom-blue" />
              Push Notifications
            </Label>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={handleNotifications}
            />
          </div>
 
          {/* Theme */}
          <div className="flex items-center justify-between">
            <Label htmlFor="theme" className="flex items-center text-lg">
              <Palette className="w-5 h-5 mr-3 text-custom-blue" />
              Dark Mode
            </Label>
            <Switch
              id="theme"
              checked={darkMode}
              onCheckedChange={handleTheme}
            />
          </div>
 
          {/* Account Section */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-custom-blue" />
              Account
            </h3>
            <div className="space-y-4">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/terms-of-service">Terms of Service</Link>
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-red-300"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
 
export default SettingsPage;