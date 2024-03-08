

const mongoose =require('mongoose')
const orderSchema=mongoose.Schema({
    courtId :{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'courts'
    },
    slotIds :{
        type:Array,
        required:true
    },
    totalCost:{ type:Number,
        required:true,
    },
    status:{
        type:Number,
        required:true,
        default:1
    },
    createdOn:{
        type:Date,
        default:new Date()
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    date:{
        type:Date,
    },
})

//status 
// 1 started
// 2 successfull 
// 3 failed
// 4 refund 
const orders= mongoose.model('orders',orderSchema)
module.exports=orders