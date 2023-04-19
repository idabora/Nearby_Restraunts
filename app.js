const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const Restraunt=require('./models/schema');
const connectDB=require('./connection/connection')


const hostname='127.0.0.1';
const PORT= process.env.PORT||2000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/',async(req,res)=>{
    try{

        // const name=req.body.restrauntName;
        // const desc=req.body.description;
        // req.body.location.coordinates=req.body.location;
        // const rating=req.body.rating;
        // console.log(typeof(coord))
        // console.log(coord)
        console.log(req.body);
    const newRest=await Restraunt.create(req.body);
    // Restraunt.index({restrauntName:"restro1"},()=>{
        // console.log("yes sir")
    // })
    newRest.save();
    // Restraunt.index({location : { type: 'Point', coordinates: [ 79.3975885, 28.3881653 ] }})
    res.json({
        status:"SUCESS",
        message:"Restraunt Registered Successfully"
    })
}
catch(err){
    console.log(err)
    res.json({
        status:"FAILED",
        message:"Sorry ,Something Wrong Happened"
    })
}
})


app.post('/get',async (req,res)=>{
    const rest=await Restraunt.find();
// console.log("HELOOOO")
    // const rest2=await Restraunt.find({
    //     location: {
    //       $near: {
    //         $geometry: {
    //            type: "Point" ,
    //            coordinates: [ req.body.lattitude,req.body.longitude  ]
    //         },
    //         $maxDistance: 500,
    //         $minDistance:10
    //       }
    //     }
    //  })
    // // console.log(rest);

   const rest2=  Restraunt.find([
        {
            $geoNear:{
                near:{type:'Point',coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.lattitude)]},
                key:'location',
                maxDistance:500,
                spherical:true
            }
        }
    ])

var sum;
var count=0;
    rest2.forEach(element => {
        sum=sum+element.rating;
        count=count+1;
    });
    var avg=sum/count;
        res.json({Name:rest2.restrauntName,
        Description:rest2.description,
        Location:[rest2.location.coordinates[0] , rest2.location.coordinates[1]],
        avgRating:avg,
        Ratings:count
    });

    // res.send("DONE");
})

app.listen(PORT, async ()=>{
    await connectDB(process.env.MONGODB_URL)
    console.log(`server istening on port http://${hostname}:${PORT}`)
})
