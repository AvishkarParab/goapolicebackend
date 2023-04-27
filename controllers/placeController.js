
const Category = require("../models/category");
const Place = require("../models/place")

const createPlace = async (req,res) =>{
    try {
        const {name,area,category,pincode,city,ltd,lgn} = req.body;
    
    //if empty data recieved
    if(!name || !area || !category ||!pincode || !city ||!ltd ||!lgn){
        return res.status(400).json({
            "message":"Incomplete  Data",
        });
    }

    //validating area
    let validArea = area.toLocaleLowerCase().trim();

    //validating area
    let validCity = city.toLocaleLowerCase().trim();
    
    //checking category

    let findCategory = await Category.findById(category)
    if(!findCategory.id){
        return res.status(400).json({
            "message":"Category Not Found",
        });
    }

    //inserting place database
    let created = await Place.create({
        name,
        area:validArea,
        category,
        pincode,
        city:validCity,
        ltd,
        lgn
    });
    
    if(created){
        return res.status(200).json({
            "message":"Place Regsistered Successfully",
            "data":created
        });
    }
    
    } catch (error) {

        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }

}

const getPlace = async(req,res)=>{
    try {
        const {pincode,area} = req.query;
        
        let places = await Place.find({pincode,area:area.toLocaleLowerCase()})
        
        if(places.length){
            return res.status(200).json({
                "message":"Place fetched Successfully",
                "data":places
            });
        }else{
            return res.status(200).json({
                "message":"No Places Found",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}
const updatePlace = async (req,res)=>{
    try {
        const {name,area,category,pincode,city,ltd,lgn} = req.body;
        const id = req.params.id;
    
    //if empty data recieved
    if(!name || !area || !category ||!pincode || !city ||!ltd ||!lgn){
        return res.status(400).json({
            "message":"Incomplete Data",
        });
    }

    //validating area
    let validArea = area.toLocaleLowerCase().trim();

    //validating area
    let validCity = city.toLocaleLowerCase().trim();

    //checking category

    let findCategory = await Category.findById(category)

    if(!findCategory.id){
        return res.status(400).json({
            "message":"Category Not Found",
        });
    }


    let updatedPlace = await Place.findByIdAndUpdate(id,{
        name,
        area:validArea,
        category,
        pincode,
        city:validCity,
        ltd,
        lgn
    },
    {new: true});
    
        return res.status(200).json({
            "message":"Place Updated Successfully",
            "data":updatedPlace
        });

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "message":"Something went wrong",
        });
    }
}

const deletePlace = async (req,res)=>{
    try {
        const id = req.params.id;
    
    //if empty data recieved
    if(!id){
        return res.status(400).json({
            "message":"Inavlid ID",
        });
    }


    let deletedPlace = await Place.findByIdAndDelete(id);

    if(deletedPlace){
        return res.json({
            "message":"Place Deleted Successfully",
        }).status(200);
    }else{
        return res.status(503).json({
            "message":"Place ID Invalid",
        });

    }
    
        
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            "message":"Something went wrong",
        });
    }
}

// const getAllUsers = async (req,res) =>{

//     try {

//         let users = await User.find({});


//         return res.status(200).json({
//             "message":"All Users data",
//             "data":users
//         });

//     } catch (error) {
//         console.log(error);
//     }
    
// }



module.exports = {
    createPlace,
    getPlace,
    updatePlace,
    deletePlace
}