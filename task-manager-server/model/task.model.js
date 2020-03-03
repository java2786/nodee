var mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

const task = mongoose.Schema({
    parent_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: false},
    task: {type: String, required: true, unique: true, dropDups: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    priority: {type: Number, required: true},
    finished: {type: Boolean, required: true}
})


module.exports = mongoose.model("Task", task);