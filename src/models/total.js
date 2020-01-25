const mongoose = require("mongoose");

const TotalSchema = mongoose.Schema({
  id: String,
  totalMoney: Number,
  log: Array
});
module.exports = mongoose.model("total", TotalSchema);
