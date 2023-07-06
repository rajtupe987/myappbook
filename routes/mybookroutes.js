const express=require("express");

const {bookModal}=require("../models/books.model")
const bookRoute=express.Router();



bookRoute.get("/",async(req,res)=>{
    try {
        const data=await bookModal.find();
        res.status(200).json({"books":data})
    } catch (error) {
        res.status(400).json({"msg":error.message})
    }
})

bookRoute.post("/add",async(req,res)=>{
    try {

        const {Title,Author,Genre,Description,Price}=req.body;
        const newbooks=new bookModal({Title,Author,Genre,Description,Price});
        await newbooks.save();
        res.send({"msg":"added the book",books:newbooks})

    } catch (error) {
        res.send({"msg":error.message});
        console.log(error)
    }
})



bookRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        await bookModal.findByIdAndDelete(id);
        const data=await bookModal.find();
        res.send({"msg":"book deleted..",data})
    } catch (error) {
        res.send(({"msg":"Error while deleting"}));
        console.log(error)
    }
})


bookRoute.get("/filter",async(req,res)=>{
      const {Genre,sort}=req.query;
      
      let pipeline={}
      let sortOption={};
       if(Genre){
        pipeline.Genre=Genre
       }
       
       if(sort==="asc"){
            sortOption.Price=1
       }else if(sort === "desc"){
        sortOption.Price=-1
       };

         try {
            const data=await bookModal.find(pipeline).sort(sortOption);
            res.status(200).json(data)
         } catch (error) {
            res.status(500).send("error while filter and sort")
         }
    
})



module.exports={
    bookRoute
}