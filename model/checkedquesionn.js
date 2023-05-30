const mongoose = require('mongoose');

// Define the schema for the checked question collection
const checkedQuestionSchema = new mongoose.Schema({
  select_subject: {
    type: String,
    required: true
  },
  ques: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option2: {
    type: String,
    required: true
  },
  option3: {
    type: String,
    required: true
  },
  option4: {
    type: String,
    required: true
  },
  ans: {
    type: String,
    required: true
  }
});

// Create the CheckedQuestion model
const CheckedQuestion = mongoose.model('CheckedQuestion', checkedQuestionSchema);

// Export the CheckedQuestion model
module.exports = CheckedQuestion;
