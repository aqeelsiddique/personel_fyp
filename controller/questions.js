const subjectvs = require("../model/user");
const Question = require("../model/question");
const { body, validationResult } = require("express-validator");
var mongoose = require("mongoose");
const subject = require("../model/subject");
const async = require("async");
const question = require("../model/question");
const fs = require('fs');
const csv = require('csv-parser');
const CheckedQuestion = require("../model/checkedquesionn");


///////////////////////////questions Portion COntroller Code /////////////////////Addmin site
// Handle Question create on POST.
// Display process create form on GET.

// Display process create form on GET.
const process_create_get1 = function (req, res, next) {
  // Get all machines and categories, which we can use for adding to our process.

  Promise.all([subject.find().lean().exec()]).then(([select_subject]) => {
    res.render("question", {
      select_subject: select_subject,
    });
  });
};


// Handle process create on POST.
// const process_create_post1 = [
//   // Validate fields.
//   body("select_subject", "Machine must not be empty.")
//     .isLength({ min: 1 })
//     .trim(),
//   body("ques", "Question must not be empty.").isLength({ min: 1 }).trim(),
//   body("option1", "Option 1 must not be empty.").isLength({ min: 1 }).trim(),
//   body("option2", "Option 2 must not be empty.").isLength({ min: 1 }).trim(),
//   body("option3", "Option 3 must not be empty.").isLength({ min: 1 }).trim(),
//   body("option4", "Option 4 must not be empty.").isLength({ min: 1 }).trim(),
//   body("ans", "Answer must not be empty.").isLength({ min: 1 }).trim(),
//   body("*").escape(),
//   // Process request after validation and sanitization.
//   (req, res, next) => {
//     let results = {}; // Define an empty results object

//     // Extract the validation errors from a request.
//     const errors = validationResult(req);
//     // Create a Process object with escaped and trimmed data.
//     const process = new Question({
//       select_subject: req.body.select_subject,
//       ques: req.body.ques,
//       option1: req.body.option1,
//       option2: req.body.option2,
//       option3: req.body.option3,
//       option4: req.body.option4,
//       ans: req.body.ans,
//     });

//     if (!errors.isEmpty()) {
//       // There are errors. Render form again with sanitized values/error messages.
//       async.parallel(
//         {
//           select_subject: function (callback) {
//             subject.find(callback);
//           },
//         },
//         function (err, results) {
//           if (err) {
//             return next(err);
//           }
//           results.select_subject = results.select_subject || []; // Make sure the results object has a select_subject property

//           res.render("question", {
//             title: "Create Process",
//             select_subject: results.select_subject,
//             process: process,
//             errors: errors.array(),
//           });
//         }
//       );
//       return;
//     } else {
//       // Check if the question already exists in  database.
//       // Check if the question already exists in the database.
//       Question.findOne({
//         ques: process.ques,
//         select_subject: process.select_subject,
//       }).exec(function (err, found_question) {
//         if (err) {
//           return next(err);
//         }
//         if (found_question) {
//           // The question already exists in the database.
//           async.parallel(
//             {
//               select_subject: function (callback) {
//                 subject.find(callback);
//               },
//             },
//             function (err, results) {
//               if (err) {
//                 return next(err);
//               }
//               results.select_subject = results.select_subject || []; // Make sure the results object has a select_subject property

//               res.render("question", {
//                 title: "Create Process",
//                 select_subject: results.select_subject,
//                 process: process,
//                 error: "The question already exists in the database.",
//               });
//             }
//           );
//         } else {
//           // The question does not exist in the database. Save process.
//           process.save(function (err) {
//             if (err) {
//               return next(err);
//             }
//             //successful - redirect to new process record.
//             res.redirect("/add_Question");
//           });
//         }
//       });
//     }
//   },
// ];


const process_create_post1 = [
  // Validate fields.
  body("select_subject", "Subject must not be empty.")
   .isLength({ min: 1 }),
  body("ques", "Question must not be empty.").isLength({ min: 1 }).trim(),
  body("option1", "Option 1 must not be empty.").isLength({ min: 1 }).trim(),
  body("option2", "Option 2 must not be empty.").isLength({ min: 1 }).trim(),
  body("option3", "Option 3 must not be empty.").isLength({ min: 1 }).trim(),
  body("option4", "Option 4 must not be empty.").isLength({ min: 1 }).trim(),
  body("ans", "Answer must not be empty.").isLength({ min: 1 }).trim(),
  body("*").escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        const subjects = await subject.find();
        res.render("question", {
          title: "Create Process",
          subjects: subjects,
          process: req.body,
          errors: errors.array(),
        });
        return;
      }

      const { select_subject, ques, option1, option2, option3, option4, ans } = req.body;

      // Check if the question already exists in the database.
      const existingQuestion = await Question.findOne({
        select_subject: select_subject,
        ques: ques,
      });

      if (existingQuestion) {
        // The question already exists in the database.
        const subjects = await subject.find();
        res.render("question", {
          title: "Create Process",
          subjects: subjects,
          process: req.body,
          error: "The question already exists in the database.",
        });
      } else {
        // The question does not exist in the database. Save the question.
        const process = new Question({
          select_subject: select_subject,
          ques: ques,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          ans: ans,
        });
        await process.save();
        console.log(select_subject)
        console.log("test",process)

        // Successful - redirect to the new question record.
        res.redirect("/add_Question");
      }
    } catch (error) {
      next(error);
    }
  },
];



////////////////test end
// list of all Question.
const question_list = function (req, res, next) {
  Question.find()
    .lean()
    .exec(function (err, list_question) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render("questionlist", {
        title: "question List",
        list_question: list_question,
      });
      // console.log(list_question);
    });
};
const filterquestion = async (req, res) => {
  const subjectId = req.params.id;
    const questions = await question.find({ select_subject: subjectId });
    // render the subjectwiseque.hbs template and pass the questions data as a variable
    res.render("subjectwiseque.hbs", { questions });

}

///////////////Update A data
const updatequestion = (req, res) => {
  const readquery = req.params.id;
  Question.updateOne(
    { ques: readquery },
    {
      $set: {
        select_subject: req.body.select_subject,
        ques: req.body.ques,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        ans: req.body.ans,
      },
    }
  )
    .then((x) => {
      res.redirect("/add_Question");
    })
    .catch((y) => {
      console.log(y);
    });
};

// Delete a user with specified user id in the request
const deletequestion = (req, res) => {
  Question.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/questionlists");
    } else {
      console.log("Error while deleting", err);
    }
  });
};

///////////upload csv mcq upload code

const csvmcqfile = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Read the uploaded CSV file and extract the data
  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      // Clean up the uploaded file
      fs.unlinkSync(file.path);

      // Process the data and save it to MongoDB
      async.eachSeries(
        results,
        (item, callback) => {
          // Extract the required fields from the CSV data
          const {
            ques,
            option1,
            option2,
            option3,
            option4,
            ans,
            additionalField1,
            additionalField2,
            select_subject,
          } = item;

          // Find the subject in the subject database collection
          subject
            .findOne({ subjectName: select_subject })
            .then((foundSubject) => {
              if (!foundSubject) {
                throw new Error("Selected subject not found in the database");
              }

              // Create a new document based on the CSV data and the found subject
              const newQuestion = new question({
                select_subject: req.body.select_subject,
                ques,
                option1,
                option2,                
                option3,
                option4,
                ans,
                additionalField1,
                additionalField2,
              });

              return newQuestion.save();
            })
            .then(() => {
              callback(); // Move to the next iteration
            })
            .catch((error) => {
              callback(error); // Pass the error to the callback to handle it
            });
        },
        (error) => {
          if (error) {
            return res
              .status(500)
              .json({
                message: "Error saving questions",
                error: error.message,
              });
          }

          res.redirect('/uploadcsv')
           
        }
      );
    });
};

// list of all Question.
const checkedquestion_list = function (req, res, next) {
  CheckedQuestion.find()
    .lean()
    .exec(function (err, list_question) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render("checkquestion_lists.hbs", {
        title: "question List",
        list_question: list_question,
      });
      // console.log(list_question);
    });
};
// Delete a user with specified user id in the request
const deletcheckequestion = (req, res) => {
  CheckedQuestion.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/checkquestionlists");
    } else {
      console.log("Error while deleting", err);
    }
  });
};

module.exports = {
  question_list,
  updatequestion,
  deletequestion,
  process_create_post1,
  process_create_get1,
  csvmcqfile,
  checkedquestion_list,
  deletcheckequestion,
  filterquestion
};
