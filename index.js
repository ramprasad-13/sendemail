const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()
const hostname= '0.0.0.0'
const port = process.env.PORT || 3000;


const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.get("/",(req,res)=>{
    res.status(200).json({"Success":"App deployed Successfully!!!!!"})
})

app.post("/sendemail",(req,res)=>{
    try {
        console.log(req.body)
    const {name,email,mobilenumber,address,message}= req.body;
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shree Vijay hosiery</title>
    </head>
    <body style="width: 100%; margin: 0; padding: 0; box-sizing: border-box; background-color: #ffffff;">
        <main style="max-width:600px; margin: 0 auto;">
            <h1 style=" background-color:white; color: black; text-align: center; margin: 0; padding: 20px 0;">Shree Vijay Hosiery</h1>
            <h2 style="margin: 10px 0; text-align: center;">Details of ${name}</h2>
            <div style="line-height: 20px; margin-left: 30px; padding-bottom: 20px;">
            <p>Name: ${name}</p>
            <p>Mobile Number: ${mobilenumber}</p>
            <p>Email: ${email}</p>
            <p>Address: ${address}</p>
            <p>Message: ${message}</p>
            </div>
        </main>
    </body>
    </html>`

    const transpoter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:process.env.APP_USER,
          pass:process.env.APP_PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.APP_USER,
        to:'198a1a05c1ram@gmail.com',
        subject:`Mail from ${name}`,
        html:htmlContent
    }

    transpoter.sendMail(mailOptions)
            .then(()=>{
                return res.status(201).json(req.body);
            })
            .catch((error) => {
                console.error(error);
                return res.status(500).json({ message: "Sending Mail Failed" });
            });

    } catch (error) {
        console.error("Error",error)
        res.status(500).json({"Error":error})
    }

})

app.listen(port,hostname,()=>{
    console.log(`App started listening on port:${port}`)
})

module.exports = app;
