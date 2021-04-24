const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/items');

const app = express();
mongoose.connect('mongodb+srv://dipenti:w0kvRLFFHc00iWdj@cluster0.7pwlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to backend Database on cloud");
  })
  .catch(()=>{
    console.log('Error connection to database');
  })

app.use(express.json());


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/items",itemRoutes);

module.exports = app;


//#older code

/*const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//w0kvRLFFHc00iWdj

app.post("/api/posts", (req,res,next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({msg:"post added successfully"});
});

app.get('/api/posts',(req,res,next)=>{
  const posts =[
      {id:'1', title:'first title', content:'first content'},
      {id:'2', title:'second title', content:'second content'}
      ];
  res.status(200).json({
    msg:'successfull',
    posts:posts
  });
});
module.exports = app;
*/
