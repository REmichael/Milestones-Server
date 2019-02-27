var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var MileModel = sequelize.import('../models/milestone')

//GET ALL ITEMS FOR INDIVIDUAL USER//
router.get('/milestone', (req, res) => {
    var userid = req.user.id;

    MileModel
    .findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

//POST AN ITEM FOR AN INDIVIDUAL USER//
router.post('/milestone', (req, res) => {
    var owner = req.user.id;
    var mileData = {
        childName: req.body.childName,
        milestone: req.body.milestone,
        date: req.body.date,
        description: req.body.description,
        photo: req.body.photo,
        owner: owner
    }
    MileModel
    .create(mileData)
    .then(
        function createSuccess(mileData) {
            res.json({
                mileData: mileData
            });
        },
        function createError(err) {
            res.status(500).send(err.message);
        }
    );
});

//GET SINGLE ITEM FOR AN INDIVIDUAL USER//
router.get('/milestone/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    MileModel
    .findOne({
        where: { id: data, owner: userid }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});

//DELETE AN ITEM FOR AN INDIVIDUAL USER//
router.delete('/milestone/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    MileModel
    .destroy({
        where: {id: data, owner: userid}
    }).then(
        function deleteMilestoneSuccess(data){
            res.send("you deleted a milestone");
        },
        function deleteMilestoneError(err){
            res.send(500, err.message);
        }
    );
});

//UPDATE AN ITEM FOR AN INDIVIDUAL USER//
router.put('/milestone/:id', (req, res) => { 

MileModel.update(req.body.mileData, {where: {id: req.params.id}})
.then(mileUpdated => {res.status(200).json(mileUpdated)})
.catch(err => {res.status(500).json(err)})
})

// //THIS ONE OPERATES
// router.put('/milestone/:id', (req, res) => {
//     if (!req.errors) {
//         MileModel.update(req.body, { where: { id: req.params.id }})
//         .then(logdata => res.status(200).json(logdata))
//         .catch(err => res.json(req.errors))
//     } else {
//       res.status(500).json(req.errors)
//     }
//   })

//COULD NOT GET THIS ONE TO OPERATE//
  // router.put('/milestone/:id', (req, res) => {
//     var data = req.params.id;
//     var mileData = req.body.mileData

//     MileModel
//     .update({
//         mileData: mileData
//     },
//     {where: {id: data, miledata: mileData }}
//     ).then(
//         function updateSuccess(updateMilestone) {
//             res.json({
//                 mileData: mileData
//             });
//         },
//         function updateError(err){
//             res.send(500, err.message);
//         }
//     )
// });

module.exports = router;