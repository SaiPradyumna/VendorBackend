const mongoose=require("mongoose")

const outletSchema=new mongoose.Schema({


    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Firm"
        }
    ]
})

const vendor=mongoose.model("vendor",outletSchema)

module.exports=vendor