import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";
import path from "path";

dotenv.config();
const app = express();
// app.use(cors());
// app.use(cors({ 
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST"],
//   credentials: true,
// }));
app.use(cors({
  origin: '*', // or your frontend URL
  // origin: "http://localhost:5173",
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
// Add this middleware to specify the Cross-Origin Resource Policy
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(express.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order API
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 99 * 100, // ₹99 -> paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// ✅ Verify Payment API
app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified successfully
      res.json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
});


// Add **after all your API routes** and before `app.listen`
const __dirname = path.resolve();
const buildPath = path.join(__dirname, "dist"); // Vite output
app.use(express.static(buildPath));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.use((req, res, next) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// app.listen(5000, () => console.log("Server running on port 5000"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//hello buddy 
