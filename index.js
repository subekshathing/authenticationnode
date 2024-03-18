import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.routes.js";
import productRoutes from "./product/product.route.js";
const app = express();

//to make app understand json
app.use(express.json());
//database connection
connectDB();
//register routes
app.use(userRoutes);
app.use(productRoutes);
//network port and server

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
