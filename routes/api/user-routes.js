const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

router
//api/users
.route('/')
.get(getAllUsers)
.post(createUser)

router
//api/users/:id
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router
//api/users/userId/friends/:friendId
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend)
module.exports = router;