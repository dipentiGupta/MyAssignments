const express = require('express');
const ItemModel = require('../models/item');



const router = express.Router();

router.get('',(req,res,next)=>{
  ItemModel.find().then((documents)=>{
    res.status(200).json({
      msg:'successfull',
      items: documents
    });
  });

});

router.get('/:id',(req,res,next)=>{
  ItemModel.findById(req.params.id).then((result)=>{
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({msg: "could not find the record"});
    }
  });
});

router.post("", (req,res,next)=>{
  const item = new ItemModel({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price
  })
  item.save().then(result => {
    res.status(201).json({
      msg: "item added successfully",
      item :{
        ...result,
        id : result._id,
      }

    });
  });
});

router.put('/:id',(req,res,next)=>{
  const item = new ItemModel({
    _id: req.params.id,
    name : req.body.name,
    description : req.body.description,
    price : req.body.price
  })
  ItemModel.updateOne({_id : req.params.id},item).then(result =>{
    console.log(result);
    res.status(200).json({
      msg : 'item updated successfully'
    });
  })
})

router.delete('/:id',(req,res,next)=>{
  ItemModel.deleteOne({_id : req.params.id})
  .then(results =>{
    console.log(results);
    res.status(201).json({
      msg : 'item deleted successfully'
    });
  });
});
module.exports = router;
