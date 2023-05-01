const Area = require("../models/area")


const createArea = async (req,res) =>{
    try {
        const {name,pincode,city} = req.body;
    
    //if empty data recieved
    if(!name ||!pincode || !city ){
        return res.status(400).json({
            "message":"Incomplete  Data",
        });
    }

    //validating area
    let validName = name.toLocaleLowerCase().trim();

    //validating area
    let validCity = city.toLocaleLowerCase().trim();
    

    //checking category
    let findSameAreaName = await Area.find({"name":validName,"city":validCity});

    if(findSameAreaName.length){
        return res.status(400).json({
            "message":"Area name cannot be same under same city",
        });
    }

    //inserting place database
    let created = await Area.create({
        name:validName,
        pincode,
        city:validCity,
    });
    
    if(created){
        return res.status(200).json({
            "message":"Area Regsistered Successfully",
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

const getAreaOnName = async(req,res)=>{
    try {
        const {name} = req.query;
        
        let areas = await Area.find({"name":name.toLocaleLowerCase()})
        
        if(areas.length){
            return res.status(200).json({
                "message":"Areas fetched Successfully",
                "data":areas
            });
        }else{
            return res.status(200).json({
                "message":"No Areas Found",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}

const getAreaOnCity = async(req,res)=>{
    try {
        const {city} = req.query;
        
        let areas = await Area.find({"city":city.toLocaleLowerCase()})
        
        if(areas.length){
            return res.status(200).json({
                "message":"Areas fetched Successfully",
                "data":areas
            });
        }else{
            return res.status(200).json({
                "message":"No Areas Found",
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

const getAllArea = async (req,res) =>{

    try {

        let areas = await Area.find({});

        if(areas.length){
            return res.status(200).json({
                "message":"All Areas data",
                "data":areas
            });
        }else{
            return res.status(200).json({
                "message":"No Data found",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(503).json({
            "message":"Something went wrong",
        });
    }
    
}



module.exports = {
    createArea,
    getAreaOnName,
    // getPlace,
    // updatePlace,
    // deletePlace,
    getAllArea,
    getAreaOnCity
}