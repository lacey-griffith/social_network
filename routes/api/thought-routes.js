const router = require('express').Router();
const { getAllThoughts, getThoughtbyId, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThoughts)
.post(createThought)

router
.route('/:thoughtId')
.get(getThoughtbyId)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.put(addReaction)

router
.route('/:thoughtId/:reactionId')
.delete(removeReaction)

module.exports = router;