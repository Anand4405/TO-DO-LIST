const express = require('express');
const port = 8000;

const app = express();
const Task = require("./modals/task")
const db = require("./config/mongoose");

app.set('view engine','ejs');

app.set('views','./views');
// app.use('/',require('./routes'));
app.use(express.static('assets'));
app.use(express.urlencoded());
app.get('/',function(req,res){
    Task.find({},function(err,tasks){
        if(err){
            console.log(err);
            return;
        }
      return  res.render('home',{
          task_list:tasks
      })
    })

    
})
app.post('/add-task',function(req,res){
    
    Task.create({
        task:req.body.task,
        date:req.body.date,
        category:req.body.category
        
    },function(err,newTask){
        if(err){
            console.log("Error in creating new Contact ",err);
            return;
        } 
        console.log("***",newTask);
        return res.redirect('back');
    })
    // console.log(req.body);
    // return res.redirect('back');
})

app.get('/delete-task',function(req,res){
       
    let id = req.query.id;
    // let contactIndex = ContactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex != -1){
    //     ContactList.splice(contactIndex,1);
    // }
    Task.findByIdAndDelete(id,function(err){
        if(err){
        console.log("Error in deleting ",err);
        return;}
       return  res.redirect('back');
    })
});

app.listen(port,function(err){
    if(err){
        console.log("Error in the server running : ",err);
    }

    console.log(`Our server is running on port ${port}`);
})