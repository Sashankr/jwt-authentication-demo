const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

// app.get('/',(req,res)=>{
//     res.send()
// })

app.listen(5000, () => {
  console.log("Server running");
});
