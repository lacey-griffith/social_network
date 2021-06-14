const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtData => {
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    getThoughtbyId({ params }, res) {
        Thought.findById( { _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
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
        Thought.create(body)
            .then(({  _id }) => {
            return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: _id } }, 
                    { new: true }
                )
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

    addReaction({ params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
            )
            .then(thoughtData => {
              if(!thoughtData){
                res.status(404).json({message: 'No thought found!'})
                return;
              }
              res.json(thoughtData)
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
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found!' })
            }
            return User.findOneAndUpdate(
                { username: thoughtData.username },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'No user found!' });
            }
            res.json(userData);
        })
        .catch(err => res.json(err))
    },
    removeReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
            )
            .then(reactionData => res.json(reactionData))
            .catch(err => res.json(err))
    }
};


module.exports = thoughtController;