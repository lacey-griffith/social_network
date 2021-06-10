const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(thoughtData => {
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    getThoughtbyId({ params }, res) {
        Thought.findById({ _id: params.thoughtId })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!' })
                    return
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    createThought({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then(({  _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId}, 
                    { $push: { thoughts: _id } }, 
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'User not found!' })
                    return
                }
                res.json(userData)
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body, 
            { new: true }
            )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found!' })
                    return
                }
                res.json(thoughtData)
            })
            .catch(err => res.json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: {thoughts: params.thoughtId } },
                { new: true }
                )
        }).then(userData => {
            if(!userData){
                res.status(404).json({ message: 'No user found!' })
                return
            }
        }).catch(err => res.json(err))
    }
};


module.exports = thoughtController;