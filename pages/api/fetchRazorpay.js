import Razorpay from "razorpay";
import isAuth from "../../Middleware/isAuth";
import auth from "../../utils/auth";
// Handle POST request in fetchRazorpay
 export default async function handler(req, res) {
  if (req.method === "POST") {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature,auth_token,key,secret_key } =
      req.body;
console.log("auth token is ",auth_token)

      console.log(req)
    // Log the received payment data
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Order ID:", razorpay_order_id);
    console.log("Signature:", razorpay_signature);

    try {
        const razorpay = new Razorpay({
          key_id: key,
          key_secret: secret_key,
        });

      // Here you can validate the payment by calling Razorpay's API
      // Example: Use Razorpay's "payments.fetch" or "payments.verify" API
      // const razorpay = new Razorpay({ key_id, key_secret });
       const fetchData = await razorpay.payments.fetch(razorpay_payment_id);
        console.log("fetch user data ", fetchData)

      // Perform payment validation if necessary
      // Example: Verify payment signature or ensure that the payment was successful

      // Respond to the frontend with success
      if(fetchData.status === "captured"){
        console.log("this is the data from the Fetch ",fetchData);
        const orderData = await razorpay.orders.fetch(razorpay_order_id);
        if(orderData)
        {

              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/user/checkout/razorpay/pay/verify?token=${auth_token}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id: razorpay_order_id,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    order_data: orderData,
                  }),
                }
              );  console.log("auth token is ", auth().access_token);
                console.log("response of the prnv api", response);
               if (!response.ok) {
              
              
                 throw new Error(`HTTP error! Status: ${response.status}`);
               }

               const responseData = await response.json();
               console.log("Order data:", orderData);
               console.log("API response:", responseData);
            console.log("order data ",orderData);
        }
        res.status(200).json({
          message: "Payment processed successfully",
          payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,

        });
      }
      
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method not allowed" });
  }
}
