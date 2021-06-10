const router = require('express').Router();
const { getAllThoughts, getThoughtbyId, createThought, updateThought, deleteThought} = require('../../controllers/thought-controller')

router
//api/thoughts
.route('/')
.get(getAllThoughts)

router
//api/thoughts/userId
.route('/:userId')
.post(createThought)

router
//api/thoughts/thoughtId
.route('/:thoughtId')
.get(getThoughtbyId)
.put(updateThought)

router
//api/thoughts/userId/thoughtId
.route('/:userId/:thoughtId')
.delete(deleteThought)


module.exports = router;