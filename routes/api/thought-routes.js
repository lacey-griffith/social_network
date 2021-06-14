const router = require('express').Router();
const { getAllThoughts, getThoughtbyId, createThought, updateThought, deleteThought} = require('../../controllers/thought-controller')

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

//reaction routes


module.exports = router;