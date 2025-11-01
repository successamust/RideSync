import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

const app = express()
dotenv.config();

app.use(cors({origin: "*"}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
