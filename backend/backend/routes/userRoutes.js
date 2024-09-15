const express = require('express');
const { searchUsers, addFriend } = require('../controllers/friendController');
const router = express.Router();

router.post('/search', searchUsers);
router.post('/add-friend', addFriend);

module.exports = router;