import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

serve(async (req) => {
  try {
    // 1️⃣ Handle preflight OPTIONS request for CORS
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://apna-poster.vercel.app", // your frontend URL
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const { action, userId, orderId, razorpay_payment_id, razorpay_signature } = await req.json();

    // 2️⃣ Create Razorpay order
    if (action === "create-order") {
      const body = JSON.stringify({
        amount: 99 * 100, // ₹99 in paise
        currency: "INR",
        receipt: `receipt_${userId}_${Date.now()}`,
      });

      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
        },
        body
      });

      const data = await res.json();

      return new Response(JSON.stringify({ ...data, keyId: RAZORPAY_KEY_ID }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://apna-poster.vercel.app",
        },
      });
    }

    // 3️⃣ Verify payment (HMAC verification can be implemented)
    if (action === "verify-payment") {
      // TODO: Implement HMAC-SHA256 verification using Deno crypto.subtle
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://apna-poster.vercel.app",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://apna-poster.vercel.app",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://apna-poster.vercel.app",
      },
    });
  }
});
