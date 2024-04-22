const express= require('express');
const router= express.Router();



router.get('/orders',(req,res)=>{
    let email = req.query.email;
    let query={}
    if(email){
       query={email:email} 
       console.log(query)
    }
    db.collection("orders").find(query).toArray((err,data)=>{
        if (err) {
            console.error('Error querying MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    })
})

module.exports=router