const { User } = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v'
        // })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    getUserById(){

    },
    createUser({ body }, res){
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err))
    },
    updateUser(){

    },
    deleteUser(){

    }
};

module.exports = userController;