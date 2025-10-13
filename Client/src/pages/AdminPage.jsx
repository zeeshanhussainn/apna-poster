// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// import { Upload, PlusCircle, Image } from 'lucide-react';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { supabaseAdmin } from '@/lib/supabaseAdmin';
// import { Button } from '@/components/ui/button';
// import { toast } from '@/components/ui/use-toast';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { politicalParties } from '@/lib/politicalParties';

// const AdminPage = () => {
//   const navigate = useNavigate();
//   const { languages } = useLanguage();
//   const [language, setLanguage] = useState('');
//   const [category, setCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const [messages, setMessages] = useState([]);
//   const [loadingMessages, setLoadingMessages] = useState(true);


//   useEffect(() => {
//     const adminAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
//     if (!adminAuthenticated) {
//       navigate('/admin/login');
//     } else {
//       setIsAdmin(true);
//     }
//   }, [navigate]);



//   // Fetch messages from Supabase
//   const fetchMessages = async () => {
//     setLoadingMessages(true);
//     const { data, error } = await supabaseAdmin
//       .from('contact_messages')
//       .select('*')
//       .order('created_at', { ascending: false });
 
//     if (error) {
//       console.error('Error fetching messages:', error);
//       toast({ title: "Error", description: "Failed to fetch messages.", variant: "destructive" });
//     } else {
//       setMessages(data);
//     }
//     setLoadingMessages(false);
//   };



//   const categories = [
//     { id: 'motivation', name: 'Motivation' }, { id: 'business', name: 'Business' },
//     { id: 'health', name: 'Health' },                    // { id: 'relationships', name: 'Relationships' },
//     { id: 'goodmorning', name: 'Good Morning' }, { id: 'goodnight', name: 'Good Night' },
//     { id: 'god', name: 'God' }, { id: 'day_special', name: 'Day Special' },
//     { id: 'birthday', name: 'Birthday' }, { id: 'new', name: 'New' },
//     { id: 'anniversary', name: 'Anniversary' }, { id: 'politics', name: 'Politics' },
//     { id: 'all', name: 'All' },
//   ];

//   const currentPoliticalParties = politicalParties[language] || [];

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     setSubcategory('');
//   };

//   const handleCategoryChange = (cat) => {
//     setCategory(cat);
//     setSubcategory('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!language || !category || !file) {
//       toast({ title: "Missing Information", description: "Please select a language, category, and image file.", variant: "destructive" });
//       return;
//     }
//     if (category === 'politics' && !subcategory) {
//       toast({ title: "Missing Subcategory", description: "Please select a political party for the politics category.", variant: "destructive" });
//       return;
//     }
//     if (!isAdmin) {
//       toast({ title: "Not Authenticated", description: "You must be logged in as an admin to upload.", variant: "destructive" });
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const filePath = `public/${language}/${category}/${subcategory ? `${subcategory}/` : ''}${Date.now()}_${file.name}`;
//       const { error: uploadError } = await supabaseAdmin.storage
//         .from('quote_images')
//         .upload(filePath, file, { upsert: true });

//       if (uploadError) throw uploadError;

//       const { data: { publicUrl } } = supabaseAdmin.storage
//         .from('quote_images')
//         .getPublicUrl(filePath);

//       const quoteData = { language, category, image_url: publicUrl, uploader_id: null };
//       if(category === 'politics' && subcategory) {
//         quoteData.subcategory = subcategory;
//       }

//       const { error: dbError } = await supabaseAdmin
//         .from('quotes')
//         .insert(quoteData);

//       if (dbError) throw dbError;

//       toast({ title: "Image Uploaded!", description: "The new poster is now live for all users." });

//       setLanguage('');
//       setCategory('');
//       setSubcategory('');
//       setFile(null);
//       setPreview(null);
//       e.target.reset();

//     } catch (error) {
//       console.error("Admin upload error:", error);
//       toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   if (!isAdmin) {
//     return null; 
//   }

//   return (
//     <div className="min-h-screen py-8 px-4">
//       <Helmet>
//         <title>Apna Poster - Admin Panel</title>
//         <meta name="description" content="Manage and upload new poster images." />
//       </Helmet>

//       <div className="max-w-4xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Admin Panel</h1>
//           <p className="text-lg text-purple-200">Upload new poster images to the platform</p>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-effect p-8 rounded-2xl">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Language</label>
//                 <Select value={language} onValueChange={handleLanguageChange} disabled={isUploading}>
//                   <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
//                     <SelectValue placeholder="Select a language..." />
//                   </SelectTrigger>
//                   <SelectContent className="glass-effect">
//                     {languages.map(lang => (<SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Category</label>
//                 <Select value={category} onValueChange={handleCategoryChange} disabled={isUploading}>
//                   <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
//                     <SelectValue placeholder="Select a category..." />
//                   </SelectTrigger>
//                   <SelectContent className="glass-effect">
//                     {categories.map(cat => (<SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {category === 'politics' && currentPoliticalParties.length > 0 && (
//                 <div>
//                     <label className="block text-sm font-medium text-white mb-2">Political Party (Subcategory)</label>
//                     <Select value={subcategory} onValueChange={setSubcategory} disabled={isUploading}>
//                         <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
//                             <SelectValue placeholder="Select a party..." />
//                         </SelectTrigger>
//                         <SelectContent className="glass-effect">
//                             {currentPoliticalParties.map(party => (
//                                 <SelectItem key={party.id} value={party.id}>{party.name}</SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Poster Image</label>
//               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
//                 <div className="text-center">
//                   {preview ? (<img src={preview} alt="Image preview" className="mx-auto h-48 w-auto rounded-lg" />) : (<Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />)}
//                   <div className="mt-4 flex text-sm leading-6 text-gray-400">
//                     <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-purple-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-purple-300">
//                       <span>Upload a file</span>
//                       <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button type="submit" disabled={isUploading || (category === 'politics' && !subcategory)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
//                 {isUploading ? 'Uploading...' : <><PlusCircle className="w-5 h-5 mr-2" />Add Image</>}
//               </Button>
//             </div>
//           </form>

//         </motion.div>





// {/* Contact Messages Section */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 glass-effect p-8 rounded-2xl">
//           <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><Mail className="w-6 h-6 mr-2 text-purple-400" /> Contact Messages</h2>
 
//           {loadingMessages ? (
//             <p className="text-gray-400">Loading messages...</p>
//           ) : messages.length === 0 ? (
//             <p className="text-gray-400">No messages yet.</p>
//           ) : (
//             <ul className="space-y-4">
//               {messages.map((msg) => (
//                 <li key={msg.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
//                   <p className="text-white font-semibold">{msg.name} <span className="text-purple-300">({msg.email})</span></p>
//                   <p className="text-slate-300 mt-1">{msg.message}</p>
//                   <p className="text-xs text-slate-500 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
//                 </li>
//               ))}
//             </ul>
//           )}










//         </motion.div>
        
//       </div>
//     </div>
//   );
// };

// export default AdminPage;





































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Upload, PlusCircle, Image, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { politicalParties } from '@/lib/politicalParties';
 
const AdminPage = () => {
  const navigate = useNavigate();
  const { languages } = useLanguage();
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
 
  // Contact messages state
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
 
  useEffect(() => {
    const adminAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
    if (!adminAuthenticated) {
      navigate('/admin/login');
    } else {
      setIsAdmin(true);
      fetchMessages();
    }
  }, [navigate]);
 
  // Fetch messages from Supabase
  const fetchMessages = async () => {
    setLoadingMessages(true);
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
 
    if (error) {
      console.error('Error fetching messages:', error);
      toast({ title: "Error", description: "Failed to fetch messages.", variant: "destructive" });
    } else {
      setMessages(data);
    }
    setLoadingMessages(false);
  };
 
  const categories = [
    { id: 'motivation', name: 'Motivation' }, { id: 'business', name: 'Business' },
    { id: 'health', name: 'Health' },           // { id: 'relationships', name: 'Relationships' },
    { id: 'god', name: 'God' }, { id: 'day_special', name: 'Day Special' },
    { id: 'birthday', name: 'Birthday' }, { id: 'new', name: 'New' },
    { id: 'anniversary', name: 'Anniversary' }, { id: 'politics', name: 'Politics' },
    { id: 'all', name: 'All' },
  ];
 
  const currentPoliticalParties = politicalParties[language] || [];
 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
 
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setSubcategory('');
  };
 
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSubcategory('');
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!language || !category || !file) {
      toast({ title: "Missing Information", description: "Please select a language, category, and image file.", variant: "destructive" });
      return;
    }
    if (category === 'politics' && !subcategory) {
      toast({ title: "Missing Subcategory", description: "Please select a political party for the politics category.", variant: "destructive" });
      return;
    }
    if (!isAdmin) {
      toast({ title: "Not Authenticated", description: "You must be logged in as an admin to upload.", variant: "destructive" });
      return;
    }
 
    setIsUploading(true);
    try {
      const filePath = `public/${language}/${category}/${subcategory ? `${subcategory}/` : ''}${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('quote_images')
        .upload(filePath, file, { upsert: true });
 
      if (uploadError) throw uploadError;
 
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('quote_images')
        .getPublicUrl(filePath);
 
      const quoteData = { language, category, image_url: publicUrl, uploader_id: null };
      if(category === 'politics' && subcategory) {
        quoteData.subcategory = subcategory;
      }
 
      const { error: dbError } = await supabaseAdmin
        .from('quotes')
        .insert(quoteData);
 
      if (dbError) throw dbError;
 
      toast({ title: "Image Uploaded!", description: "The new poster is now live for all users." });
 
      setLanguage('');
      setCategory('');
      setSubcategory('');
      setFile(null);
      setPreview(null);
      e.target.reset();
 
    } catch (error) {
      console.error("Admin upload error:", error);
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };
 
  if (!isAdmin) {
    return null;
  }
 
  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Apna Poster - Admin Panel</title>
        <meta name="description" content="Manage and upload new poster images." />
      </Helmet>
 
      <div className="max-w-5xl mx-auto">
        {/* Upload Posters Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Admin Panel</h1>
          <p className="text-lg text-purple-200">Upload new poster images to the platform</p>
        </motion.div>
 
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-effect p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Language</label>
                <Select value={language} onValueChange={handleLanguageChange} disabled={isUploading}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a language..." />
                  </SelectTrigger>
                  <SelectContent className="glass-effect">
                    {languages.map(lang => (<SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
 
              <div>
                <label className="block text-sm font-medium text-white mb-2">Category</label>
                <Select value={category} onValueChange={handleCategoryChange} disabled={isUploading}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent className="glass-effect">
                    {categories.map(cat => (<SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
 
            {category === 'politics' && currentPoliticalParties.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">Political Party (Subcategory)</label>
                <Select value={subcategory} onValueChange={setSubcategory} disabled={isUploading}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a party..." />
                  </SelectTrigger>
                  <SelectContent className="glass-effect">
                    {currentPoliticalParties.map(party => (
                      <SelectItem key={party.id} value={party.id}>{party.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
 
            <div>
              <label className="block text-sm font-medium text-white mb-2">Poster Image</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  {preview ? (<img src={preview} alt="Image preview" className="mx-auto h-48 w-auto rounded-lg" />) : (<Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />)}
                  <div className="mt-4 flex text-sm leading-6 text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-purple-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-purple-300">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
 
            <div className="flex justify-end">
              <Button type="submit" disabled={isUploading || (category === 'politics' && !subcategory)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isUploading ? 'Uploading...' : <><PlusCircle className="w-5 h-5 mr-2" />Add Image</>}
              </Button>
            </div>
          </form>
        </motion.div>
 
        {/* Contact Messages Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 glass-effect p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><Mail className="w-6 h-6 mr-2 text-purple-400" /> Contact Messages</h2>
 
          {loadingMessages ? (
            <p className="text-gray-400">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            <ul className="space-y-4">
              {messages.map((msg) => (
                <li key={msg.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-white font-semibold">{msg.name} <span className="text-purple-300">({msg.email})</span></p>
                  <p className="text-slate-300 mt-1">{msg.message}</p>
                  <p className="text-xs text-slate-500 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
};
 
export default AdminPage;