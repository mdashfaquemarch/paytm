import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/index.js';
import cors from 'cors'
import cookieParsar from 'cookie-parser'


dotenv.config({});

const app = express();
const PORT = process.env.PORT || 7000

// CORS configuration
app.use(
   cors({
     origin: "https://paytm-frontend-gvlz.onrender.com", // Replace with your frontend URL
     credentials: true,
   })
 );
 
 /*
For requests that require credentials, the browser sends a preflight request (an OPTIONS request) to check if the server allows the actual request. Ensure your backend handles preflight requests correct
 */
 // Handle preflight requests
 app.options("*", cors()); // Handle preflight requests for all routes

app.use(express.json());


app.use(cookieParsar())


connectDB().then(() => {
  console.log("mongodb connected......")
}).catch((error) => {
   console.log(error.message);
})



import rootRouter from './routes/index.js'


app.use("/api/v1", rootRouter);







app.listen(PORT, () => {
   console.log(`server is running at PORT: ${PORT}`);
})