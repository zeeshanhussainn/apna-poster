import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { signUp, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // handle input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle sign in / sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Sign in
        const { error } = await signIn({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;

        toast({
          title: 'Welcome back!',
          description: "You've successfully logged in.",
        });
        navigate(from, { replace: true });
      } else {
        // Sign up
        if (!acceptedTerms) {
          toast({
            title: 'Terms not accepted',
            description: 'You must accept Terms and Privacy Policy to create an account.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name, // match with Supabase profile column
              brand_name: `${formData.name}'s Space`,
              avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`,
            },
          },
        });

        if (error) throw error;

        toast({
          title: 'Account Created!',
          description: 'Please check your email to verify your account.',
        });

        // Switch back to login after signup
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        title: 'Authentication Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // handle google sign in
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;

      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Google Sign-In Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <Helmet>
        <title>Apna Poster - {isLogin ? 'Sign In' : 'Sign Up'}</title>
        <meta
          name="description"
          content={`${isLogin ? 'Sign In' : 'Sign Up'} to Apna Poster`}
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass-effect p-8 rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </motion.h1>
            <p className="text-slate-300">
              {isLogin
                ? 'Welcome back to Apna Poster'
                : 'Join the Apna Poster community'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white
                               placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white
                             placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-200">
                  Password
                </label>
                {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white
                             placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms checkbox (signup only) */}
            {!isLogin && (
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the{' '}
                  <Link
                    to="/terms-of-service"
                    className="text-custom-blue underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-custom-blue underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-custom-blue hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Loading...
                </>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Google sign-in */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">or</span>
              </div>
            </div>
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              disabled={loading || googleLoading}
              className="w-full mt-4 border-slate-700 text-white hover:bg-slate-800/50 flex items-center justify-center"
            >
              {googleLoading ? (
                <RefreshCw className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <svg
                  className="w-5 h-5 mr-3"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C34.173 32.328 29.477 36
                       24 36c-6.627 0-12-5.373-12-12s5.373-12 
                       12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 
                       6.53 29.268 4 24 4 12.954 4 4 12.954 4 
                       24s8.954 20 20 20 20-8.954 
                       20-20c0-1.341-.138-2.651-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 
                       16.108 18.961 14 24 14c3.059 0 5.842 
                       1.154 7.961 3.039l5.657-5.657C34.046 
                       6.53 29.268 4 24 4c-7.689 0-14.275 
                       4.337-17.694 10.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.363 0 10.18-2.065 
                       13.826-5.414l-6.385-5.439C29.357 
                       34.664 26.833 36 24 
                       36c-5.455 0-10.138-3.658-11.793-8.717l-6.522 
                       5.025C9.083 39.556 15.922 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303C34.173 
                       32.328 29.477 36 24 36c-5.455 
                       0-10.138-3.658-11.793-8.717l-6.522 
                       5.025C9.083 39.556 15.922 44 24 
                       44c8.078 0 14.917-4.444 18.295-11.156 
                       C43.201 29.919 44 27.045 44 24c0-1.341-.138-2.651-.389-3.917z"
                  />
                </svg>
              )}
              Continue with Google
            </Button>
          </div>

          {/* Switch login/signup */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-2 text-custom-blue hover:text-blue-400 font-medium transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
