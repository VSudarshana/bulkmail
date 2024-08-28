const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//Install NODEMAILER
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iamsudarshana.v@gmail.com",
    pass: "zjsu klxs dnnk bfmw",
  },
});

app.post("/sendemail", function (req, res) {
  var msg = req.body.msg;
  var emailList = req.body.emailList;

  new Promise(async function (resolve, reject) {
    try {
      for (var i = 0; i < emailList.length; i++) {
        await transporter.sendMail({
          from: "iamsudarshana.v@gmail.com",
          to: emailList[i],
          subject: "You get Text Message from Your App!",
          text: msg,
        });
      }
      resolve("Success");
    } catch (error) {
      reject("Failed to send email");
    }
  })
    .then(function () {
      res.send(true);
    })
    .catch(function () {
      res.send(false);
    });
});

app.listen(5000, function () {
  console.log("Server Started.....");
});
