const express= require("express");
const router= express.Router();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { ObjectId } = require('mongodb');

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
// selectinng all restrunat with meal type and cusine type 
router.get('/:mealtype/:cuisinetype',(req,res)=>{
    let query={};
    let mealtype= req.params.mealtype
    let cuisinetype=req.params.cuisinetype
   
    if(mealtype&&cuisinetype){
       
        query = {
            "mealTypes.mealtype_name": mealtype,
            "cuisines.cuisine_name": cuisinetype,
           
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

//filtering resturant based on cost

router.get('/cost/:gt/:lt',(req,res)=>{
    let gt= req.params.gt
    let lt= req.params.lt
    console.log(gt)
    console.log(lt)
    let sort={cost:1}
    
    if(!isNaN(gt)&&!isNaN(lt)&&gt<lt){
        query={$and:[{cost:{$gt:parseInt(gt)}},{cost:{$lt:parseInt(lt)}}]}
        console.log(query)
        db.collection("resturantData").find(query).toArray((err,data)=>{
            if(err){
                console.log(err);
                res.status("404").send("failed to fetch data")
            }else{
                res.send(data);
            }
        })
    }
    if(req.query.sort){
        sort={cost:req.query.sort}
        db.collection("resturantData").sort().toArray((err,data)=>{
            if(err){
                console.log(err);
                res.status("404").send("failed to fetch data")
            }else{
                res.send(data);
            }
        })
        
    }
   
    
    
})
//details of selected restuant

router.get('/:id', async(req,res)=>{
    let _id=ObjectId(req.params.id);
    let query={}
    if(_id){
        query={_id:_id}
    }
    db.collection("resturantData").find(query).toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
            console.log(data)
        }
    })
    
})

//menu for that particular resturant

router.get('/:resturant_id/menu', async(req,res)=>{
    let id=req.params.resturant_id
    let query={}
    if(id){
        query={ 
            restaurant_id:id}
            
    }
    db.collection("menu").find(query).toArray((err,data)=>{
        if(err){
            console.log(err);
            res.status("404").send("failed to fetch data")
        }else{
            res.send(data);
            console.log(data)
        }
    })
    
})

module.exports=router;