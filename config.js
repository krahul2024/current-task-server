import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config() // configuring dotenv 

// console.log(process.env)
export const values = {
  mongo_username: "rahul-2024",
  mongo_password: "9gRkmdn0L3weRTWl",
  PORT: 5555,
  jwt_string: '1c2ebc88f303b62a6e47121cb7b5acd9f9114ad03fd737c83e18dcfb9684dc327aa098143b10ff198baf2fc3c10294bf7e9e5e9641c6a7e37ed1b6bf2ef78a32',
  time_out: 7 * 24 * 3600 * 1000,
  webhooks_url: `https://sagportal.webhook.office.com/webhookb2/fea331ef-e4e7-46b2-b6c1-0593f0ebe5ac@d9662eb9-ad98-4e74-a8a2-04ed5d544db6/IncomingWebhook/8c8453bc7b8b4517a6c9ba6cd8233d1b/535d63a1-ac25-4ea9-92a7-c9fc5afe3ee7`,
}

const uri = `mongodb+srv://rahul-2024:${values.mongo_password}@cluster0.nwdwvky.mongodb.net/?retryWrites=true&w=majority`;
export const connect_database = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database successfully!');
  } catch (error) {
    // Throw an error or return a promise rejection to handle the error in calling code
    throw new Error(`Error connecting to the database: ${error}`);
  }
};
