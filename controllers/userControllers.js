const COURTS =require('../models/courtModel')
const COURT_SHEDULES  =require('../models/courtSchedules')
const ObjectId = require("mongoose").Types.ObjectId;
const ORDERS =require('../models/ordersModel.js') 
getCourtData=((req,res,next)=>{
    try {
        COURTS.find().then((resp)=>{
            res.status(200).json(resp)
        })
    } catch (error) {
       next()
    }
})
getSingleCourtData=((req,res,next)=>{
    try {
        COURTS.findOne({_id:req.query.courtId}).then((resp)=>{
            res.status(200).json(resp)
        })
    } catch (error) {
       next()
    }
})
const getslotsdata=((req,res,next)=>{
    try {
    let currentHour = new Date(req.query.date).getHours();
    let currentDate = new Date(new Date(req.query.date).setUTCHours(0, 0, 0, 0));
    COURT_SHEDULES.aggregate([
      {
        $match: {
          courtId: new ObjectId(req.query.courtId),
          date: currentDate,
          "slot.id": { $gt: currentHour + 1 },
        },
      }, 
      {
        $project: {
          _id: 1,
          date: 1,
          slot: 1,
          cost: 1,
          bookedBy: 1,
        },
      },
    ])
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (error) {
        console.log(error);
        // next()
    }
})

const ordersdata=((req,res)=>{
  console.log(req.userId);
  const currentDate=new Date(new Date().setUTCHours(0,0,0,0))
  ORDERS.aggregate([{
    $match:{
       bookedBy:new ObjectId(req.userId),
       date:{$gt:currentDate}
      }},
      {
      $lookup:{
        from:'courts',
        localField: 'courtId',
        foreignField: '_id',
        as: 'courtData'
      }},{
      
        $project:{
          courtData: {$arrayElemAt:['$courtData',0]} 

        }
      }

  ]).then((resp)=>{
    console.log(resp);
    res.status(200).json(resp)
    
  })
  .catch((err)=>{
    console.log(err);
  })
})

module.exports={getCourtData,getSingleCourtData,getslotsdata,ordersdata}