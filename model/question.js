const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = require('mongodb').ObjectId;
// const id = new ObjectId();
const QuestionSchema = new mongoose.Schema({
  //     select_subject: { type: Schema.Types.ObjectId, ref: 'testsubj', required: true ,
  // },
  select_subject: { type: String, ref: 'testsubj', required: true },
  image: {
    type: String,
    required: true
  },
  ques: {
    type: String,
  },
  option1: {
    type: String,
    image: String, // Image path or URL
  },
  option2: {
    type: String,
    image: String, // Image path or UR
  },
  option3: {
    type: String,
    image: String, // Image path or URL
  },
  option4: {
    type: String,
    image: String, // Image path or URL

  },
  ans: {
    type: String,
    image: String, // Image path or URL
  },
  subjectId: {
    type: mongoose.Types.ObjectId,
    ref: 'testsubj',
  },
  correctOption: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Question', QuestionSchema);
