import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

serve(async (req) => {
  try {
    const { action, userId, orderId, razorpay_payment_id, razorpay_signature } = await req.json();

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
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verification logic can be added here (using Web Crypto HMAC)
    if (action === "verify-payment") {
      // Implement HMAC-SHA256 verification with Deno crypto.subtle
      return new Response(JSON.stringify({ success: true }));
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
