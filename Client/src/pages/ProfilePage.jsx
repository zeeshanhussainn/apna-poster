import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogOut, Crown, Edit, User as UserIcon, Briefcase, RefreshCw, Upload, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import QuoteActionsModal from '@/components/modals/QuoteActionsModal';

const UserQuoteCard = ({ quote, onClick }) => (
  <motion.div
    onClick={onClick}
    className="relative aspect-[4/5] rounded-xl overflow-hidden group shadow-lg cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
    layoutId={`quote-card-${quote.id}`}
  >
    <img src={quote.image_url} alt="User created quote" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <p className="text-white font-bold text-lg">View</p>
    </div>
  </motion.div>
);

const ProfilePage = () => {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [createdQuotes, setCreatedQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [brandName, setBrandName] = useState(user?.brand_name || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setBrandName(user.brand_name || '');
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setLoadingQuotes(true);
    supabase
      .from('user_created_quotes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching user quotes", error);
          toast({ title: "Error", description: "Could not load your created quotes.", variant: "destructive" });
        } else {
          setCreatedQuotes(data);
        }
        setLoadingQuotes(false);
      });
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({ title: 'Logout failed', description: error.message, variant: 'destructive' });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!brandName && !avatarFile) {
        toast({ title: "No changes", description: "Please provide a brand name or a new profile picture." });
        return;
    }
    setIsSaving(true);
    try {
        let newAvatarUrl = user.avatar_url;
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile);
            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            newAvatarUrl = data.publicUrl;
        }

        const updates = {};
        if (brandName !== (user.brand_name || '')) updates.brand_name = brandName;
        if (newAvatarUrl !== user.avatar_url) updates.avatar_url = newAvatarUrl;

        if (Object.keys(updates).length > 0) {


            // await updateProfile(updates);


             await supabase
            .from('profiles')        // <-- make sure this matches your table name
            .update(updates)
            .eq('id', user.id);


            toast({ title: "Profile Updated!", description: "Your new details have been saved." });
        }
        setIsEditing(false);
        setAvatarFile(null);
    } catch (error) {
        toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDeleteQuote = async (quoteToDelete) => {
    if (!quoteToDelete) return;
    try {
      const imageUrl = new URL(quoteToDelete.image_url);
      const filePath = imageUrl.pathname.substring(imageUrl.pathname.indexOf('/user_created_images/') + '/user_created_images/'.length);
      if (filePath) {
        await supabase.storage.from('user_created_images').remove([filePath]);
      }
      await supabase.from('user_created_quotes').delete().eq('id', quoteToDelete.id);
      setCreatedQuotes(prev => prev.filter(q => q.id !== quoteToDelete.id));
      toast({ title: "Deleted!", description: "Your creation has been removed." });
      setIsActionsModalOpen(false);
    } catch (error) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsActionsModalOpen(true);
  };
  
  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Apna Poster - My Profile</title>
      </Helmet>
      
      {selectedQuote && <QuoteActionsModal open={isActionsModalOpen} onOpenChange={setIsActionsModalOpen} quote={selectedQuote} onDelete={handleDeleteQuote} />}

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-6 md:p-8 shadow-2xl mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <img 
                src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`} 
                alt="User avatar"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-purple-400 shadow-lg object-cover"
              />
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 text-white hover:bg-purple-500 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-lg font-bold text-white">{user.name || user.email}</h1>
              {/* <p className="text-purple-200">{user.email}</p> */}
              <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-yellow-400 font-semibold">
                <Crown className="w-5 h-5" />
                <span>{user.is_premium ? 'Premium Member' : 'Free Member'}</span>
              </div>
            </div>

            <div className="md:ml-auto flex flex-col sm:flex-row items-center gap-3">
              <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-red-500/20 hover:text-red-300">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
               {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
            </div>
          </div>
          
          {isEditing && (
             <motion.form 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="flex items-center text-lg font-semibold text-white mb-2">
                    <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
                    Brand Name
                  </label>
                  <Input 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Your Brand Name"
                  />
                </div>
                <Input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => setAvatarFile(e.target.files[0])} 
                  accept="image/*" 
                  className="hidden" 
                />
                 <div className="flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); setAvatarFile(null); setBrandName(user.brand_name || ''); }}>Cancel</Button>
                    <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      {isSaving ? <><RefreshCw className="animate-spin h-4 w-4 mr-2" /> Saving...</> : 'Save Changes'}
                    </Button>
                 </div>
             </motion.form>
          )}

        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">My Creations</h2>
          {loadingQuotes ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-slate-800 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : createdQuotes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {createdQuotes.map(quote => (
                <UserQuoteCard key={quote.id} quote={quote} onClick={() => handleQuoteClick(quote)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-effect rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-2">Nothing here yet!</h3>
              <p className="text-purple-200 mb-4">You haven't created any posters.</p>
              <Button onClick={() => navigate('/create')} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                Create Your First Poster
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;