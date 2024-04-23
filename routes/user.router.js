const express= require('express');
const router= express.Router();


// to find the order history of user
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


// to place order

router.post('/placeorder',(req,res)=>{
    let Useritem="The Juicy Chicken Burger"
    let{name,email,address}=req.body
    let phone= Number(req.body)
    let query={}
    let menuarray=[]
    let cost=0
    if(Useritem){
        query={menu_name:Useritem}
        db.collection("menu").find(query).toArray((err,data)=>{
            if (err) {
                console.error('Error querying MongoDB:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(data);
        }) 
       
        
    }
    let item= data[0]
    cost=cost+item.cost
    menuarray.push(item.menu_id)
    if(req.body&&menuarray&&cost){
        query=req.body
        db.collection("orders").insert(query).toArray((err,data)=>{
            if (err) {
                console.error('Error querying MongoDB:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(data);
        })
      
    }
    orders.menuItem.push(menuarray)
    orders.cost.push(cost)

   
   

})

module.exports=router