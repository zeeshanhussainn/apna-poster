import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Crown, Globe, Edit, Grid, Heart, Activity, Star, Gift, Flag, Sparkles, Scale, BookOpen, Settings, Phone, Sunrise, Moon, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuotes } from '@/contexts/QuoteContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { politicalParties } from '@/lib/politicalParties';

const SubCategoryBar = ({ parties, onSelect }) => {
  return (
    <div className="py-1 border-t border-slate-700/50">
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-1.5 px-4">
        <Button
          onClick={() => onSelect('all')}
          variant="default"
          size="sm"
          className="rounded-full transition-all duration-200 bg-custom-blue border-custom-blue text-white"
        >
          All Parties
        </Button>
        {parties.map((party) => (
          <Button
            key={party.id}
            onClick={() => onSelect(party.id)}
            variant="outline"
            size="sm"
            className="rounded-full transition-all duration-200 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/100"
          >
            {party.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

// const CategoryBar = ({ onUploadClick }) => {
//   const { selectedCategory, setSelectedCategory, setSelectedSubCategory } = useQuotes();
//   const { currentLanguage, t } = useLanguage();

//   const categories = useMemo(() => [
//     { id: 'all', name: t('all'), icon: Grid },
//     { id: 'motivation', name: t('motivation'), icon: Heart },
//     { id: 'goodmorning', name: t('goodmorning'), icon: Sunrise },
//     { id: 'goodnight', name: t('goodnight'), icon: Moon },
//     { id: 'health', name: t('health'), icon: Activity },
//     { id: 'god', name: t('god'), icon: Star },
//     { id: 'day_special', name: t('day_special'), icon: Flag },
//     { id: 'birthday', name: t('birthday'), icon: Gift },
//     { id: 'new', name: t('new'), icon: Sparkles },
//     { id: 'anniversary', name: t('anniversary'), icon: BookOpen },
//     { id: 'politics', name: t('politics'), icon: Scale },
//   ], [t]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedSubCategory('all');
//   };

//   const currentPoliticalParties = politicalParties[currentLanguage] || [];

//   return (
//     <>
//       <div className="py-1 border-t border-slate-700/50 flex flex-col items-center">
//         <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-1.5 px-4">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               onClick={() => handleCategoryClick(category.id)}
//               variant={selectedCategory === category.id ? 'default' : 'outline'}
//               size="sm"
//               className={`rounded-full transition-all duration-200 ${
//                 selectedCategory === category.id
//                   ? 'bg-custom-blue border-custom-blue text-white'
//                   : 'bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50'
//               }`}
//             >
//               <category.icon className="w-4 h-4 mr-1" />
//               {category.name}
//             </Button>
//           ))}
//         </div>

//         {selectedCategory === 'politics' && currentPoliticalParties.length > 0 && (
//           <SubCategoryBar parties={currentPoliticalParties} onSelect={setSelectedSubCategory} />
//         )}
//       </div>
//     </>
//   );
// };




const CategoryBar = ({ onUploadClick }) => {
  const { selectedCategory, setSelectedCategory, setSelectedSubCategory } = useQuotes();
  const { currentLanguage, t } = useLanguage();

  const categories = useMemo(() => [
    { id: 'all', name: t('all'), icon: Grid },
    { id: 'motivation', name: t('motivation'), icon: Heart },
    { id: 'goodmorning', name: t('goodmorning'), icon: Sunrise },
    { id: 'goodnight', name: t('goodnight'), icon: Moon },
    { id: 'health', name: t('health'), icon: Activity },
    { id: 'god', name: t('god'), icon: Star },
    { id: 'day_special', name: t('day_special'), icon: Flag },
    { id: 'birthday', name: t('birthday'), icon: Gift },
    { id: 'new', name: t('new'), icon: Sparkles },
    { id: 'anniversary', name: t('anniversary'), icon: BookOpen },
    { id: 'politics', name: t('politics'), icon: Scale },
  ], [t]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('all');
  };

  const currentPoliticalParties = politicalParties[currentLanguage] || [];

  return (
    <>
      {/* <div className="py-1 border-t border-slate-700/50 flex flex-col items-center">
        <div className="max-w-3xl mx-auto flex justify-center gap-1.5 px-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryClick(e.target.value)}
            className="rounded-md bg-slate-700/50 border-slate-600 text-slate-200 px-4 py-2 text-sm
                       hover:bg-slate-600/50 transition-all duration-200 focus:outline-none"
          > */}

        <div className="py-2 border-t border-slate-700/50 flex flex-col items-center">
        <div className="max-w-3xl mx-auto flex justify-start gap-1.5 px-4 w-full">
          {/* Wider & left-aligned dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryClick(e.target.value)}
            className="w-40 rounded-full bg-slate-700/50 border-slate-600 text-slate-200
                       px-4 py-2 text-sm hover:bg-slate-600/50
                       transition-all duration-200 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory === 'politics' && currentPoliticalParties.length > 0 && (
          <SubCategoryBar parties={currentPoliticalParties} onSelect={setSelectedSubCategory} />
        )}
      </div>
    </>
  );
};









const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { currentLanguage, changeLanguage, languages, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      toast({ title: 'Logout failed', description: error.message, variant: 'destructive' });
    }
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLanguageOpen(false);
    toast({
      title: "Language changed",
      description: `Quote language switched to ${languages.find(l => l.code === langCode)?.name}`,
    });
  };

  const handleUploadClick = () => {
    navigate('/upload'); // go to upload page
  };

  const navItems = useMemo(() => [
    { path: '/', label: t('home') },
    { path: '/contact', label: t('contact'), icon: Phone },
    ...(user ? [
      { path: '/profile', label: t('profile'), icon: User },
      { path: '/premium', label: t('premium'), icon: Crown },
      { path: '/settings', label: t('settings'), icon: Settings }
    ] : [])
  ], [user, t]);

  const NavLink = ({ to, children, isMobile = false }) => (
    <Link
      to={to}
      onClick={() => isMobile && setIsMenuOpen(false)}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        location.pathname === to
          ? 'text-white bg-custom-blue/20'
          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect flex flex-col border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Apna Poster
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <Link to="/create" className="hidden md:inline-flex">
                <Button className="bg-custom-blue hover:bg-blue-600 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </Link>
            )}

            {/* Upload Poster Button always visible */}
            {/* <Button onClick={handleUploadClick} className="bg-green-600 hover:bg-green-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Poster
            </Button> */}

            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="text-slate-300 hover:text-white"
              >
                <Globe className="w-4 h-4 mr-2" />
                {languages.find(l => l.code === currentLanguage)?.flag}
              </Button>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-lg py-2"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700/50 transition-colors ${
                        currentLanguage === lang.code ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/profile">
                  <img
                    src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
                    alt={user.name || 'User avatar'}
                    className="w-8 h-8 rounded-full border-2 border-custom-blue object-cover"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:block">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="text-white border-slate-600 hover:bg-custom-blue hover:border-custom-blue">
                    Login
                  </Button>
                </Link>
              </div>
            )}

            <div className="md:hidden flex items-center gap-1">
              {user && (
                <Link to="/create">
                  <Button variant="ghost" size="icon" className="text-white">
                    <Edit className="w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-700/50"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} isMobile={true}>
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.label}
                </NavLink>
              ))}

              <div className="px-3 py-2">
                <div className="text-white text-sm font-medium mb-2">Language</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { handleLanguageChange(lang.code); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        currentLanguage === lang.code
                          ? 'text-white bg-custom-blue/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {user ? (
                <div className="px-3 py-2 border-t border-slate-700/50 mt-2 pt-4">
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-white border-slate-600 hover:bg-red-500/20 hover:border-red-500/50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 border-t border-slate-700/50 mt-2 pt-4">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-white border-slate-600 hover:bg-custom-blue hover:border-custom-blue">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {location.pathname === '/' && <CategoryBar />}
    </nav>
  );
};

export default Navbar;
