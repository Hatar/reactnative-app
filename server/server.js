const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");
const paypal = require('@paypal/checkout-server-sdk');
const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

app.use('/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
