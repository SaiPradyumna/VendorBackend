const vendor=require("../models/Vendor")
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')


const dotEnv=require("dotenv")

dotEnv.config()

const secretKey=process.env.WhatIsYourName

const vendorregister= async(req,res)=>{


    const{username,email,password}=req.body
    try{

        const outletemail=await vendor.findOne({email})
        if(outletemail){

            return res.status(400).json("Email already taken")
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newoutlet=new vendor({
            

            username,
            email,
            password:hashedPassword
        })

        await newoutlet.save()

        res.status(201).json("Successful creation outlet registered")
        console.log("success")
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"internal server error"})
    }

}


const vendorLogin = async (req, res) =>{
    const {email, password} = req.body;
    try {
    const Vendor = await vendor.findOne({ email });
    console.log("Found vendor:", Vendor); 
    if ( ! Vendor || !(await bcrypt.compare(password, Vendor.password))) {
    return res.status(401).json({ error: "Invalid username or password" })
    }
    const token = jwt.sign({ vendorid: Vendor._id }, secretKey, { expiresIn: "1h" });

    const vendorId=Vendor._id
    console.log(vendorId)
    res.status(200).json({ success: "Login successful", token: token,vendorId:vendorId});
    console.log(vendorId)


    console.log(email,"this is token",token);
}catch (error) {

    console.log(error)
    res.status(500).json({error:"internal error"})
    
    }}


    
const getAllVendors = async(req, res) => {
    try {
        const vendors = await vendor.find().populate('firm');
        res.json({ vendors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getVendorById = async(req, res) => {
    const vendorId = req.params.id;

    try {
        const Vendor = await vendor.findById(vendorId).populate("firm")
        if (!Vendor) {
            return res.status(404).json({ error: "Vendor not found" })
        }
        console.log(Vendor)
        
        console.log("Vendor object:", Vendor);
        const vendorFirmId = Vendor.firm[0]._id;
        res.status(200).json({ vendorId, vendorFirmId,Vendor})
        console.log(vendorFirmId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports={vendorregister,vendorLogin,getAllVendors,getVendorById}