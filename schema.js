const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


//    ---   |||   ---   |||   ---   \\
const bananna = new mongoose.Schema({
    title: { type: String, required: true },
    language: { type: String, required: true },
    body: { type: String, required: true },
    description: { type: String },
    tags: [ {type: String} ],
});

const Snipple = mongoose.model('Snippit', bananna);



const watermelon = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const Bipple = mongoose.model('SnipAuthor', watermelon);



module.exports = {
  Snip: Snipple,
  Bip: Bipple,
};


//  --- Note: lots of odd and different variable names for learning purposes



//    ---   |||   ---   |||   ---   \\
