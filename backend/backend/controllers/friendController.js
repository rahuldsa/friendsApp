const User = require('../models/User');

exports.searchUsers = async (req, res) => {
  const { searchTerm } = req.body;
  const users = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
  res.json(users);
};

exports.addFriend = async (req, res) => {
  const { friendId } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.friends.includes(friendId)) {
    user.friends.push(friendId);
    await user.save();
  }
  res.json(user);
};

exports.getFriendRecommendations = async (req, res) => {
    const user = await User.findById(req.user.id).populate('friends');
    const allUsers = await User.find({ _id: { $ne: req.user.id } });
  
    const recommendations = allUsers.filter(otherUser => {
      const mutualFriends = otherUser.friends.filter(friend => user.friends.includes(friend._id));
      return mutualFriends.length > 0;  // Customize recommendation logic here
    });
  
    res.json(recommendations);
  };  