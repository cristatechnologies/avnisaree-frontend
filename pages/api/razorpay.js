const Razorpay = require("razorpay");

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Parse body from request
   const data = req.body;

    // Initialize razorpay object
    try {
      const razorpay = new Razorpay({
        key_id: data.key,
        key_secret: data.secret_key,
      });

      // Create an order -> generate the OrderID -> Send it to the Front-end

      const options = {
        amount: parseInt(data.amount*100), // Convert amount to paise
        currency: data.currency, // Default to INR if not provided
        receipt: data.order_id, // Use the order_id as receipt
        notes: data.notes, // Any notes passed from frontend
      };
      console.log("option are ", options)

      try {
        const response = await razorpay.orders.create(options);
        console.log("response of rzrpay",response)
        res.status(200).json({
          id: response.id,
          currency: response.currency,
          amount: response.amount,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    } catch (error) {
      console.error(error);
      res.status(500)
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
