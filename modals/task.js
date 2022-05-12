const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true // String,Number,Date,Boolean,Array,buffer .. this are data types we can take from user.
    },
    date:{
        type:Date,
        required:true
    },
   category: {
    type:String,
    required:true
    }
    
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;