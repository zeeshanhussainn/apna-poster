// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-order' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/





// import { serve } from "https://deno.land/std/http/server.ts"

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type" } })
//   }

//   try {
//     const body = await req.json()
//     const { amount, currency } = body

//     // Razorpay credentials (from Dashboard)
//     const key_id = Deno.env.get("rzp_test_RNKibqblZYnLx4")
//     const key_secret = Deno.env.get("WUyhGhP9Cnh23usklG743k66")

//     const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Basic " + btoa(`${key_id}:${key_secret}`)
//       },
//       body: JSON.stringify({
//         amount: amount * 100,   // Amount in paise (₹100 = 10000)
//         currency: currency || "INR",
//         receipt: "receipt#1"
//       })
//     })

//     const orderData = await orderRes.json()

//     return new Response(JSON.stringify(orderData), {
//       headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
//     })
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 })
//   }
// })




// import { serve } from "https://deno.land/std/http/server.ts";
// // import * as crypto from "https://deno.land/std@0.224.0/node/crypto.ts";

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "content-type",
//       },
//     });
//   }

//   try {
//     const body = await req.json();
//     const action = body.action;

//     const key_id = Deno.env.get("rzp_test_RNKibqblZYnLx4")!;
//     const key_secret = Deno.env.get("WUyhGhP9Cnh23usklG743k66")!;

//     // ---- Create Order ----
//     if (action === "create-order") {
//       const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Basic " + btoa(`${key_id}:${key_secret}`),
//         },
//         body: JSON.stringify({
//           amount: 99 * 100, // ₹99 (in paise)
//           currency: "INR",
//           receipt: `receipt_${body.userId}_${Date.now()}`,
//         }),
//       });

//       const order = await orderRes.json();
//       return new Response(JSON.stringify({ ...order, keyId: key_id }), {
//         headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
//       });
//     }

//     // ---- Verify Payment ----
//     // if (action === "verify-payment") {
//     //   const { orderId, razorpay_payment_id, razorpay_signature } = body;

//     //   const generated_signature = crypto
//     //     .createHmac("sha256", key_secret)
//     //     .update(orderId + "|" + razorpay_payment_id)
//     //     .digest("hex");

//     //   const isValid = generated_signature === razorpay_signature;

//     //   return new Response(JSON.stringify({ success: isValid }), {
//     //     headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
//     //   });
//     // }


//     if (action === "verify-payment") {
//   const { orderId, razorpay_payment_id, razorpay_signature } = body;

//   const encoder = new TextEncoder();
//   const keyData = encoder.encode(key_secret); // your secret
//   const msgData = encoder.encode(`${orderId}|${razorpay_payment_id}`);

//   const cryptoKey = await crypto.subtle.importKey(
//     "raw",
//     keyData,
//     { name: "HMAC", hash: "SHA-256" },
//     false,
//     ["sign"]
//   );

//   const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);

//   const generated_signature = Array.from(new Uint8Array(signatureBuffer))
//     .map(b => b.toString(16).padStart(2, "0"))
//     .join("");

//   const isValid = generated_signature === razorpay_signature;

//   return new Response(JSON.stringify({ success: isValid }), {
//     headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
//   });
// }

//     return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// });









// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   const { amount, currency } = await req.json();

//   const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
//   });

//   const options = {
//     amount: amount * 100, // in paise
//     currency: currency || "INR",
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     return new Response(JSON.stringify(order), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }











// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { amount, currency } = await req.json();

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const options = {
//       amount: amount * 100, // convert to paise
//       currency: currency || "INR",
//     };

//     const order = await razorpay.orders.create(options);

//     return new Response(JSON.stringify(order), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       headers: { "Content-Type": "application/json" },
//       status: 500,
//     });
//   }
// }










// // index.ts
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { action, userId } = await req.json();

//     if (action === "create-order") {
//       const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID!,
//         key_secret: process.env.RAZORPAY_KEY_SECRET!,
//       });

//       const order = await razorpay.orders.create({
//         amount: 9900, // ₹99 in paise
//         currency: "INR",
//       });

//       return new Response(JSON.stringify(order), {
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // You can also handle 'verify-payment' action here later
//     return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }











// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { action, userId } = await req.json();

//     if (action === "create-order") {
//       const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID!,
//         key_secret: process.env.RAZORPAY_KEY_SECRET!,
//       });

//       const order = await razorpay.orders.create({
//         amount: 9900, // ₹99 in paise
//         currency: "INR",
//       });

//       return new Response(JSON.stringify(order), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*", // allow requests from any origin
//           "Access-Control-Allow-Methods": "POST, OPTIONS",
//           "Access-Control-Allow-Headers": "Content-Type",
//         },
//       });
//     }

//     return new Response(JSON.stringify({ error: "Invalid action" }), {
//       status: 400,
//       headers: { "Access-Control-Allow-Origin": "*" },
//     });
//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//       headers: { "Access-Control-Allow-Origin": "*" },
//     });
//   }
// }

// // Handle OPTIONS preflight requests
// export async function OPTIONS() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }







// import Razorpay from "razorpay";

// // Handle CORS preflight
// export async function OPTIONS() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }

// export async function POST(req: Request) {
//   try {
//     const { action, userId } = await req.json();

//     const headers = {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     };

//     if (action === "create-order") {
//       const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID!,
//         key_secret: process.env.RAZORPAY_KEY_SECRET!,
//       });

//       const order = await razorpay.orders.create({
//         amount: 9900,
//         currency: "INR",
//       });

//       return new Response(JSON.stringify(order), { status: 200, headers });
//     }

//     return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers });
//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
//   }
// }














// import Razorpay from "razorpay";

// // Handle CORS preflight
// export async function OPTIONS() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }

// export async function POST(req: Request) {
//   try {
//     const { action, userId } = await req.json();

//     const headers = {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     };

//     if (action === "create-order") {
//       const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID!,
//         key_secret: process.env.RAZORPAY_KEY_SECRET!,
//       });

//       const order = await razorpay.orders.create({
//         amount: 9900,
//         currency: "INR",
//       });

//       return new Response(JSON.stringify(order), { status: 200, headers });
//     }

//     return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers });
//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
//   }
// }













import Razorpay from "razorpay";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle CORS preflight
export async function OPTIONS() {
  return new Response("ok", { // add a small body
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  try {
    const { action, userId } = await req.json();

    if (action === "create-order") {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const order = await razorpay.orders.create({
        amount: 9900, // ₹99 in paise
        currency: "INR",
      });

      return new Response(JSON.stringify(order), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
