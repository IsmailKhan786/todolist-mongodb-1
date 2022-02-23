//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");

const app = express();


//crequire1 
const mongoose = require("mongoose");

//2create database 
mongoose.connect("mongodb+srv://admin-ismail:ismail0786@cluster0.7rlyr.mongodb.net/todolist", {
  useNewUrlParser: true
});



//3create schema 
const itemSchema = {
  name: String
}
//4.create model 
const Item = mongoose.model("Item", itemSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];



//doc1 
const item1 = new Item({
  name: "Welcome to to do list"
})
const item2 = new Item({
  name: "Hit the + button to add new items"
})
const item3 = new Item({
  name: "Hit to delete item"
})

//5  create variable and add all 
const defaultItems = [item1, item2, item3];



app.get("/", function (req, res) {

  // const day = date.getDate();
  //6 reading


  Item.find({}, function (err, foundItems) {
    // console.log(foundItems)

    //7
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log("error")
        } else {
          console.log("Added")
        }
      });
      //8 
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });
});
app.post("/", function (req, res) {
 

  //9
  const itemName = req.body.newItem;
   
  const item = new Item({
    name:itemName
  })
  item.save();
  res.redirect("/");
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

//9 deleting 
app.post("/delete",function(req,res) {
 const checkedItem = req.body.checkbox;
 Item.findByIdAndRemove(checkedItem,function(err) {
   if(err)  {
     console.log("Error")
   }
   else {
     console.log("Success")
     res.redirect("/")
   }
 })
})
app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});