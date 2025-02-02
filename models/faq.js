
import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'], // Validation for question
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'], // Validation for answer
    },
    question_hi: {
      type: String,
    },
    answer_hi: {
      type: String,
    },
  },
  { timestamps: true }
);

const Faq = mongoose.model('Faq', faqSchema);
export default Faq;