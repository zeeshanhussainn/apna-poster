// CreateQuotePage.jsx
import React, { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Type, RefreshCw, Upload } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

import bg1 from '../assets/bgimg/bg1.jpg';
import bg2 from '../assets/bgimg/bg2.jpg';
import bg3 from '../assets/bgimg/bg3.jpg';
import bg4 from '../assets/bgimg/bg4.jpg';
import bg5 from '../assets/bgimg/bg5.jpg';
import bg6 from '../assets/bgimg/bg6.jpg';

const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6];

const CreateQuotePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quoteText, setQuoteText] = useState('Your inspirational quote here...');
  const [selectedBg, setSelectedBg] = useState(backgroundImages[0]);
  const [customBg, setCustomBg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const quoteImageRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSaveQuote = useCallback(async () => {
    if (!quoteImageRef.current) {
      toast({
        title: 'Error',
        description: 'Could not find the poster to save.',
        variant: 'destructive',
      });
      return;
    }
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to save a poster.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    const brandingElement = quoteImageRef.current.querySelector('.user-branding');
    if (brandingElement) brandingElement.style.display = 'none';

    try {
      const imageBlob = await htmlToImage.toBlob(quoteImageRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
      });

      if (!imageBlob) throw new Error('Could not generate image blob.');

      // ✅ Save inside posters bucket → quotes subfolder
      const filePath = `quotes/${user.id}/${Date.now()}.png`;

const { error: uploadError } = await supabase.storage
  .from('posters')
  .upload(filePath, imageBlob, { upsert: true });


      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('posters')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('user_created_quotes')
        .insert({ user_id: user.id, image_url: data.publicUrl });

      if (dbError) throw dbError;

      toast({
        title: 'Poster Saved!',
        description: 'Your new poster has been added to your profile.',
      });
      navigate('/profile');
    } catch (error) {
      console.error('Save poster error:', error);
      toast({
        title: 'Failed to save poster',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      if (brandingElement) brandingElement.style.display = 'flex';
      setIsSaving(false);
    }
  }, [user, navigate]);

  const handleCustomBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setCustomBg(dataUrl);
        setSelectedBg(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentBg = customBg || selectedBg;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Helmet>
        <title>Apna Poster - Create a Poster</title>
        <meta
          name="description"
          content="Create your own beautiful and inspirational poster images."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Create Your Poster
          </h1>
          <p className="text-lg text-purple-200">Bring your words to life.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect p-6 rounded-2xl"
          >
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-xl font-semibold text-white mb-3">
                  <Type className="w-6 h-6 mr-2 text-purple-400" /> Your Text
                </label>
                <Textarea
                  // value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="Type your quote..."
                  className="bg-white/10 border-white/20 text-white min-h-[120px] text-base"
                />
              </div>

              <div>
                <label className="flex items-center text-xl font-semibold text-white mb-3">
                  <ImageIcon className="w-6 h-6 mr-2 text-purple-400" /> Background
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {backgroundImages.map((bg) => (
                    <div
                      key={bg}
                      onClick={() => {
                        setSelectedBg(bg);
                        setCustomBg(null);
                      }}
                      className={`aspect-square rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${
                        currentBg === bg
                          ? 'border-purple-400 scale-105'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={bg}
                        alt="Background option"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCustomBgUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current.click()}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Your Own
                </Button>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleSaveQuote}
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6"
              >
                {isSaving ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                Save Poster
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-white mb-4 font-semibold">Live Preview</p>
            <div
              ref={quoteImageRef}
              className="w-[320px] h-[480px] rounded-2xl shadow-2xl relative flex items-center justify-center p-6 overflow-hidden bg-gray-800"
            >
              <img
                src={currentBg}
                crossOrigin="anonymous"
                alt="Poster background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
              <p
                className="relative z-10 text-white text-2xl font-semibold text-center leading-relaxed"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
              >
                {/* {quoteText} */}
              </p>
              <div className="user-branding absolute bottom-4 right-4 z-10 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-lg">
                {user?.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name || 'User avatar'}
                    className="w-6 h-6 rounded-full"
                    crossOrigin="anonymous"
                  />
                )}
                <span className="text-white text-xs font-bold">
                  {user?.name}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuotePage;
