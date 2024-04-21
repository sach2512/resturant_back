const express= require("express");
const router= express.Router();

//list of all resturants

router.get('/',(req,res)=>{
    db.collection("resturantData").find().toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
        }
    })
})



//resturant based on if only state_id 
router.get('/state',(req,res)=>{
    let state_id=Number(req.query.state_id)
    let mealtype_name= req.query.mealtype_name
    let query={}

    if(state_id){
        query={state_id:state_id}
    }else{
        query={}
    }
    db.collection("resturantData").find(query).toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
        }
    })
})



//resturnat based only meal name

router.get('/mealname',(req,res)=>{
    let mealtype_name= req.query.mealtype_name
    let query={}
    if(mealtype_name){
        query={"mealTypes.mealtype_name":mealtype_name}
    }else{
        query={}
    }
    db.collection("resturantData").find(query).toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
        }
    })
})

//resturants based on states and  meal type

router.get('/state/meal',(req,res)=>{
    let state_id= Number(req.query.state_id)
    let mealtype_name=  req.query.mealtype_name;
    console.log(mealtype_name);
    console.log(state_id);
    let query={};
    if(state_id&&mealtype_name){
        query={$and:[{state_id:state_id},{"mealTypes.mealtype_name":mealtype_name}]};
        console.log(query);
    }else if(mealtype_name){
        query={"mealTypes.mealtype_name":mealtype_name}
        console.log(`state id is ${query}`);

    }else if(state_id){
        query = { state_id: state_id };
        console.log(query);
    }else{
        query={}
    }
    db.collection("resturantData").find(query).toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
        }
    })
})

//filter  data
// selectinng all restrunat with meal type and cusine type and cost (ex: breakfas/chinese/300-600)
router.get('/:mealtype/:cuisinetype',(req,res)=>{
    let query={};
    let mealtype= req.params.mealtype
    let cuisinetype=req.params.cuisinetype
    let gt= Number(req.query.gt)
    let lt= Number(req.query.lt)
    if(mealtype&&cuisinetype&&gt<lt){
       
        query = {
            "mealTypes.mealtype_name": mealtype,
            "cuisines.cuisine_name": cuisinetype,
            $and:[{"cost":{$gt:gt}},{"cost":{$lt:lt}}]
        };
    }else{
        query={}
    }
    console.log(`Query: ${JSON.stringify(query)}`);

    db.collection("resturantData").find(query).toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
        }
    })
})

//


module.exports=router;