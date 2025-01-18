import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/index.js';
import cors from 'cors'
import cookieParsar from 'cookie-parser'


dotenv.config({});

const app = express();
const PORT = process.env.PORT || 7000


app.use(cors())

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