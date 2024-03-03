const USERS=require('../models/courtModel')
const COURT_SCHEDULES =require('../models/courtSchedules')
const createNewCourt=(req,res)=>{
    const { name ,
        location ,
        type ,
        address3 ,
        address2 ,
        address1 ,
        landMark ,
        pin,
        contactNumber ,
        description}=req.body
console.log(req.files)
const pics=req.files.map((file)=>{return {name:file.filename,type:file.mimetype}})
USERS({
    name ,
  location ,
  type ,
  address3 ,
  address2 ,
  address1 ,
  landMark ,
  pin,
  contactNumber, 
  description,
  courtPics:pics
}).save().then((resp)=>{
    console.log(resp)
    res.status(200).json({message:"new court has been created"})
}).catch((err)=>{
    console.log(err);
})
}

const addTimeSlotData =(req,res)=>{
    const {startDate, endDate, cost, selectedTimings, courtId}=req.body
    let currentDate= new Date(new Date(startDate).setUTCHours(0,0,0,0))
    const lastDate= new Date(new Date(endDate).setUTCHours(0,0,0,0))
    const slotObjects=[]
    console.log(startDate, endDate, cost, selectedTimings, courtId);
    
    while(currentDate<=lastDate){
        for(let data of selectedTimings){
            console.log(currentDate);
            slotObjects.push({
                date: JSON.parse(JSON.stringify(currentDate)),
                slot:{
                    name:data.name,
                id:data.id,
                },
                cost,
                courtId
            })
        }
        currentDate.setDate(currentDate.getDate()+1)
    }
    console.log(slotObjects,'slots')
    COURT_SCHEDULES.insertMany(slotObjects).then((resp)=>{
        res.status(200).json({message:"court time slots created successfully"})
    })
 
    }
    const getlatestcreatedDate =(req,res)=>{
        COURT_SCHEDULES.find({courtId:req.query.courtId}).sort({date:-1}).limit(1).then((resp)=>{
            console.log(resp);
            res.status(200).json(resp[0].date)
        })
    }
module.exports={createNewCourt,addTimeSlotData,getlatestcreatedDate}