import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Crown, Infinity, Share2, Headphones, Sparkles, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const PremiumPage = () => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to upgrade.", variant: "destructive" });
      return;
    }
    if (user?.is_premium) {
      toast({ title: "Already Premium!", description: "You're already enjoying all premium features." });
      return;
    }

    setIsProcessing(true);

    try {
      // 1️⃣ Call Supabase Edge Function to create Razorpay order
      // const { data, error } = await supabase.functions.invoke("razorpay", {
      //   method: "POST",
      //   body: { action: "create-order", userId: user.id },
      // });


      const response = await fetch("https://mylppttomtgormkedulq.supabase.co/functions/v1/razorpay", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "create-order", userId: user.id }),
});


      if (error) throw new Error(error.message || "Failed to create order");
      const order = typeof data === "string" ? JSON.parse(data) : data;

      // 2️⃣ Configure Razorpay options
      const options = {
        key: order.keyId,
        amount: order.amount.toString(),
        currency: order.currency,
        name: "Apna Poster Premium",
        description: "Lifetime Premium Membership",
        order_id: order.id,
        prefill: {
          name: user.user_metadata?.name || "Apna Poster User",
          email: user.email,
        },
        theme: { color: "#1E88E5" },
        handler: async (response) => {
          try {
            // 3️⃣ Verify payment via Supabase Edge Function
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke("razorpay", {
              body: {
                action: "verify-payment",
                userId: user.id,
                orderId: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            const result = typeof verifyData === "string" ? JSON.parse(verifyData) : verifyData;

            if (verifyError || !result.success) {
              toast({ title: "Verification Failed", description: verifyError?.message || "Payment could not be verified.", variant: "destructive" });
            } else {
              toast({ title: "Success!", description: "You are now a Premium member! 🎉" });
            }
          } catch (err) {
            console.error(err);
            toast({ title: "Error", description: err.message || "Something went wrong.", variant: "destructive" });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast({ title: "Payment Cancelled", description: "Your payment process was cancelled." });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: err.message || "Something went wrong.", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  const features = [
    { icon: Infinity, title: "Unlimited Access", description: "Access unlimited inspirational quotes daily" },
    { icon: Share2, title: "Custom Branding", description: "Add your logo to shared quote images" },
    { icon: Headphones, title: "Priority Support", description: "Get priority customer support" },
    { icon: Sparkles, title: "AI Personalization", description: "Get personalized quote recommendations" },
    { icon: Crown, title: "Exclusive Content", description: "Access premium-only quotes" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Apna Poster - Go Premium</title>
        <meta name="description" content="Unlock exclusive features by upgrading to Apna Poster Premium." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">Go Premium</h1>
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">Unlock exclusive features and take your creativity to the next level.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-12">
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${user?.is_premium ? "premium-gradient text-purple-900" : "glass-effect text-white"}`}>
            {user?.is_premium ? (
              <>
                <Crown className="w-5 h-5" />
                <span className="font-semibold">You're a Premium Member!</span>
              </>
            ) : (
              <span className="font-semibold">Current Plan: Free</span>
            )}
          </div>
        </motion.div>

        <div className="mb-16">
          <Button
            onClick={handleUpgrade}
            disabled={user?.is_premium || isProcessing}
            className="w-full max-w-md mx-auto block premium-gradient text-purple-900 font-bold py-4 text-lg rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Processing...
              </>
            ) : user?.is_premium ? (
              <>
                <Crown className="w-5 h-5 mr-2" /> Already Premium
              </>
            ) : (
              <>
                <Crown className="w-5 h-5 mr-2" /> Upgrade Now for ₹99
              </>
            )}
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Premium?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1 }} className="glass-effect p-6 rounded-xl text-center">
                  <div className="premium-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-purple-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-purple-200">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumPage;
