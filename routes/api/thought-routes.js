const router = require('express').Router();
const { getAllThoughts, getThoughtbyId, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thought-controller')

router
//api/thoughts
.route('/')
.get(getAllThoughts)
.post(createThought)

router
//api/thoughts/:thoughtId
.route('/:thoughtId')
.get(getThoughtbyId)
.put(updateThought)
.delete(deleteThought)

router
//api/thoughts/thoughtId/reactions
.route('/:thoughtId/reactions')
.put(addReaction)

router
//api/thoughts/thoughtId/reactionId
.route('/:thoughtId/:reactionId')
.delete(removeReaction)

module.exports = router;