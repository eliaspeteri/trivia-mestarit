import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  whoCreated: {
    type: String,
    required: false,
    minlength: 3
  },
  whenCreated: {
    type: Date,
    required: true,
    minlength: 4
  },
  question: {
    type: String,
    required: true,
    minlength: 3
  },
  correctAnswer: {
    type: String,
    required: true,
    minlength: 3
  },
  theme: {
    type: String,
    required: false,
    minlength: 3
  },
  difficulty: {
    type: String,
    required: true,
    minlength: 3
  },
  answers: {
    type: [String],
    required: true,
    minlength: 1
  }
});

questionSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Question', questionSchema);
