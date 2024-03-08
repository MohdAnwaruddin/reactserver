import {Contact}   from "../models/contact.js";
import mongoose from "mongoose";

const contact = async function (req, res)

//async function POST(req,res) 
{
  const { fullname, email, message } =  req.body;

  try {
    //await connectDB();
    await Contact.create({ fullname, email, message });

    return res.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return res.json({ msg: errorList });
    } else {
      return res.json({ msg: ["Unable to send message."] });
    }
  }
}

export default {
  contact
}