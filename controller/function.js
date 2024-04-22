function controller(collectionname,query){
    db.collection(collectionname).find(query).toArray((err,data)=>{
        if (err) {
            console.error('Error querying MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    })
}


module.exports=controller;