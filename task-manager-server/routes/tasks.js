var express = require('express');
var router = express.Router();
var Task = require('./../model/task.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/tasks', function (req, res) {
  let task = new Task(req.body);
  task.finished = false;
  console.log(task);
  // some change

  task.save()
    .then(result => {
      console.log("task created");
      console.log(result);
      res.json({ success: true, messgae: "task saved" });
    })
    .catch(err => {
      console.log("error occurred during save task");
      console.log(err);
      res.status(500).json({ success: false, messgae: "Try again..." });
    })
})
router.get('/tasks', function (req, res) {
  Task.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      res.json({ success: false })
    } else {
      res.json({ success: true, data: docs });
    }
  });
})
router.get('/tasks/:id', function (req, res) {
  // Task.find({_id: req.params.id}, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //     res.json({ success: false })
  //   } else {
  //     res.json({ success: true, data: docs[0] });
  //   }
  // });

  Task.findOne({ _id: req.params.id })
    .exec()
    .then(function (task) {
      if (task) {
        res.json({ success: true, data: task });
      } else {
        res.status(404).json({ success: false, message: "Task not found" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        success: false, message: err.message
      });
    });
})
router.put('/tasks/:id', function (req, res) {
  let task = req.body;
  delete task._id;

  Task.updateOne({ _id: req.params.id }, task, function (err) {
    if (err) { 
      res.json({success: false, message: err.message})
     } else {
       res.status(201).json({success: true});
     }
  })
})
router.delete('/tasks/:id', function (req, res) {
  Task.deleteOne({ _id:req.params.id }, function(err){
    if(err){
      res.json({success: false, message: err.message})
    } else {
      res.json({success: true});
    }
  })
})



module.exports = router;
