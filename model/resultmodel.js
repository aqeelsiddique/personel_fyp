const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  round: Number,
  teams: [
    {
      teamname: String,
      member1: String,
      member2: String,
      member3: String,
      universityname: String,
      score: Number,
    },
  ],
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
