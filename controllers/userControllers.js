const COURTS =require('../models/courtModel')

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

module.exports={getCourtData,getSingleCourtData}