import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Grid, Heart, Activity, Star, Gift, Flag, Sparkles, Scale, BookOpen, Sunrise, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoriesPage = () => {
  const { t } = useLanguage();

  const categories = [
    { id: 'all', name: t('all'), icon: Grid },
    { id: 'motivation', name: t('motivation'), icon: Heart },
    { id: 'goodmorning', name: 'Good Morning', icon: Sunrise },
    { id: 'goodnight', name: 'Good Night', icon: Moon },
    { id: 'health', name: t('health'), icon: Activity },
    { id: 'god', name: t('god'), icon: Star },
    { id: 'day_special', name: t('day_special'), icon: Flag },
    { id: 'birthday', name: t('birthday'), icon: Gift },
    { id: 'new', name: t('new'), icon: Sparkles },
    { id: 'anniversary', name: t('anniversary'), icon: BookOpen },
    { id: 'politics', name: t('politics'), icon: Scale },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>InspireMe - {t('categories')}</title>
        <meta name="description" content="Browse inspirational quotes by category" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {t('categories')}
          </h1>
          <p className="text-lg text-purple-200">
            Find the perfect inspiration for any moment
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            const categoryLink = category.id === 'all' ? '/' : `/category/${category.id}`;
            return (
              <Link to={categoryLink} key={category.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect p-6 rounded-2xl text-center cursor-pointer flex flex-col items-center justify-center aspect-square"
                >
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-semibold text-white text-lg">{category.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesPage;