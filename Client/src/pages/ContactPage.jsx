// import React from 'react';
// import { Helmet } from 'react-helmet';
// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/components/ui/use-toast';

// const ContactPage = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast({
//       title: "🚧 Feature In Progress",
//       description: "The contact form is not yet connected, but we're working on it!",
//     });
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)]">
//       <Helmet>
//         <title>Apna Poster - Contact Us</title>
//         <meta name="description" content="Get in touch with the Apna Poster team." />
//       </Helmet>
//       <div className="container mx-auto px-4 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
//           <p className="text-lg text-purple-200">We'd love to hear from you!</p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <Input type="text" placeholder="Your Name" required />
//               <Input type="email" placeholder="Your Email" required />
//               <Textarea placeholder="Your Message" required className="min-h-[150px]" />
//               <Button type="submit" className="w-full bg-custom-blue hover:bg-blue-600 text-white font-semibold py-3">
//                 Send Message
//               </Button>
//             </form>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//             className="space-y-6"
//           >
//             <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
//             <div className="flex items-start space-x-4 p-4 glass-effect rounded-lg">
//               <Mail className="w-6 h-6 text-custom-blue mt-1" />
//               <div>
//                 <h3 className="font-semibold text-white">Email</h3>
//                 <p className="text-slate-300">contact@apnaposter.com</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 glass-effect rounded-lg">
//               <Phone className="w-6 h-6 text-custom-blue mt-1" />
//               <div>
//                 <h3 className="font-semibold text-white">Phone</h3>
//                 <p className="text-slate-300">+1 (234) 567-890</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 glass-effect rounded-lg">
//               <MapPin className="w-6 h-6 text-custom-blue mt-1" />
//               <div>
//                 <h3 className="font-semibold text-white">Address</h3>
//                 <p className="text-slate-300">123 Poster Lane, Inspiration City, World</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;











import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient'; // ✅ supabase client
 
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);
 
    if (error) {
      toast({
        title: '❌ Failed to send',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: '✅ Message Sent!',
        description: "We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' }); // reset form
    }
 
    setLoading(false);
  };
 
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Helmet>
        <title>Apna Poster - Contact Us</title>
        <meta
          name="description"
          content="Get in touch with the Apna Poster team."
        />
      </Helmet>
 
      <div className="container mx-auto px-4 py-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Contact Us
          </h1>
          <p className="text-lg text-purple-200">We'd love to hear from you!</p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                required
                className="min-h-[150px]"
                value={formData.message}
                onChange={handleChange}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-custom-blue hover:bg-blue-600 text-white font-semibold py-3"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
 
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h2>
 
            {/* Email */}
            <div className="flex items-start space-x-4 p-4 glass-effect rounded-lg">
              <Mail className="w-6 h-6 text-custom-blue mt-1" />
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <a
                  href="mailto:contact@apnaposter.com"
                  className="text-slate-300 hover:underline"
                >
                  zen4techsolution@gmail.com
                </a>
              </div>
            </div>
 
            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 glass-effect rounded-lg">
              <Phone className="w-6 h-6 text-custom-blue mt-1" />
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <a
                  href="tel:+1234567890"
                  className="text-slate-300 hover:underline"
                >
                  +91-8431737094
                </a>
              </div>
            </div>
 
            {/* Address */}
            <div className="flex items-start space-x-4 p-4 glass-effect rounded-lg">
              <MapPin className="w-6 h-6 text-custom-blue mt-1" />
              <div>
                <h3 className="font-semibold text-white">Address</h3>
                <p className="text-slate-300">
                  Unit 101, Oxford Towers, 139, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
 
export default ContactPage;