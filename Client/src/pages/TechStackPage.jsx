import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Brush, Database, Wind, Component, Bot, Route, Image as ImageIcon, Palette } from 'lucide-react';

const techList = {
  frontend: [
    { name: 'React', version: '18.2.0', icon: <Component className="w-5 h-5 text-cyan-400" />, description: 'A JavaScript library for building user interfaces.' },
    { name: 'Vite', version: '4.4.5', icon: <Wind className="w-5 h-5 text-purple-400" />, description: 'Next-generation frontend tooling for lightning-fast development.' },
    { name: 'TailwindCSS', version: '3.3.3', icon: <Palette className="w-5 h-5 text-teal-400" />, description: 'A utility-first CSS framework for rapid UI development.' },
    { name: 'Framer Motion', version: '10.16.4', icon: <Brush className="w-5 h-5 text-pink-400" />, description: 'A production-ready motion library for React.' },
    { name: 'shadcn/ui', icon: <Bot className="w-5 h-5 text-slate-400" />, description: 'Beautifully designed components built with Radix UI and Tailwind CSS.' },
    { name: 'Lucide React', version: '0.292.0', icon: <ImageIcon className="w-5 h-5 text-yellow-400" />, description: 'A beautiful and consistent icon toolkit.' },
    { name: 'React Router', version: '6.16.0', icon: <Route className="w-5 h-5 text-green-400" />, description: 'Declarative routing for React applications.' },
  ],
  backend: [
    { name: 'Supabase', icon: <Server className="w-5 h-5 text-green-500" />, description: 'The open source Firebase alternative.' },
    { name: 'PostgreSQL', icon: <Database className="w-5 h-5 text-blue-500" />, description: 'The world\'s most advanced open source relational database, provided by Supabase.' },
    { name: 'Supabase Auth', icon: <Server className="w-5 h-5 text-green-400" />, description: 'Handles user authentication and authorization.' },
    { name: 'Supabase Storage', icon: <Server className="w-5 h-5 text-green-300" />, description: 'Manages storage for images and other assets.' },
  ],
};

const TechCard = ({ tech }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="glass-effect rounded-lg p-4 flex items-start space-x-4"
  >
    <div className="flex-shrink-0">{tech.icon}</div>
    <div className="flex-1">
      <div className="flex items-center space-x-2">
        <p className="font-semibold text-white">{tech.name}</p>
        {tech.version && <Badge variant="secondary">{tech.version}</Badge>}
      </div>
      <p className="text-sm text-slate-400 mt-1">{tech.description}</p>
    </div>
  </motion.div>
);

const TechStackPage = () => {
  return (
    <>
      <Helmet>
        <title>Technology Stack - Apna Poster</title>
        <meta name="description" content="An overview of the technologies used to build the Apna Poster application." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Technology Stack
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-300 mb-12 max-w-2xl mx-auto"
        >
          This application is built with a modern, robust, and scalable set of technologies to ensure a high-quality user experience and reliable performance.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-effect border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white flex items-center">
                <Brush className="w-6 h-6 mr-3 text-cyan-400" />
                Frontend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {techList.frontend.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </CardContent>
          </Card>

          <Card className="glass-effect border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white flex items-center">
                <Server className="w-6 h-6 mr-3 text-green-400" />
                Backend & Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {techList.backend.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TechStackPage;