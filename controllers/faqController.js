import Faq from '../models/faq.js';
import { translateText } from '../service/translationService.js';
import redisClient from '../config/redis.js';

// **1. Create a new FAQ**
export const createFaq = async (req, res) => {
  const { question, answer } = req.body;

  console.log('Received request to create FAQ:', req.body);

  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and Answer are required.' });
  }

  try {
    // Generate translations automatically
    const [question_hi, question_bn,answer_hi,answer_bn] = await Promise.all([
      translateText(question, 'en'),
      translateText(question, 'bn'),
      translateText(answer, 'en'),
      translateText(answer, 'bn'),
    ]);

    // Create new FAQ with translations
    const faq = new Faq({
      question,
      answer,
      question_hi,
      question_bn,
      answer_hi,
      answer_bn,
    });

    // Save FAQ to database
    await faq.save();

    // Clear cached FAQs since new data is added
    await redisClient.del('faqs_en', 'faqs_hi', 'faqs_bn');

    // Return the created FAQ in response
    res.status(201).json(faq);
    console.log('running successfully');
  } catch (err) {
    console.error('Error creating FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// **2. Get all FAQs with optional language filtering**
export const getFaqs = async (req, res) => {
  const { lang = 'en' } = req.query;
  console.log(`Fetching FAQs in language: ${lang}`);

  try {
    // Check cache for FAQs in requested language
    const cacheKey = `faqs_${lang}`;
    const cachedFaqs = await redisClient.get(cacheKey);
    if (cachedFaqs) {
      console.log('Returning cached FAQs');
      return res.json(JSON.parse(cachedFaqs));
    }

    // If no cached FAQs, fetch from database
    const faqs = await Faq.find();
    const translatedFaqs = faqs.map(faq => ({
      ...faq.toObject(),
      question: faq[`question_${lang}`] || faq.question, // Select language-specific question
    }));

    // Cache FAQs for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(translatedFaqs), 'EX', 3600);
    res.json(translatedFaqs);
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// **3. Get a single FAQ by ID**
export const getFaqById = async (req, res) => {
  const { id } = req.params;
  const { lang = 'en' } = req.query;

  try {
    const faq = await Faq.findById(id);
    if (!faq) return res.status(404).json({ error: 'FAQ not found' });

    // Return the translated FAQ
    const translatedFaq = {
      ...faq.toObject(),
      question: faq[`question_${lang}`] || faq.question, // Select language-specific question
    };

    res.json(translatedFaq);
  } catch (err) {
    console.error('Error fetching FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// **4. Update FAQ**
export const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    let faq = await Faq.findById(id);
    if (!faq) return res.status(404).json({ error: 'FAQ not found' });

    // Update the question if provided
    if (question) {
      const [question_hi, question_bn] = await Promise.all([
        translateText(question, 'hi'),
        translateText(question, 'bn')
      ]);
      faq.question_hi = question_hi;
      faq.question_bn = question_bn;
      faq.question = question; // Update the original question
    }

    // Update the answer if provided
    faq.answer = answer || faq.answer;

    // Save the updated FAQ
    await faq.save();

    // Clear cached FAQs since data has been updated
    await redisClient.del('faqs_en', 'faqs_hi', 'faqs_bn');
    res.json(faq);
  } catch (err) {
    console.error('Error updating FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// **5. Delete FAQ**
export const deleteFaq = async (req, res) => {
  const { id } = req.params;

  try {
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) return res.status(404).json({ error: 'FAQ not found' });

    // Clear cached FAQs after deletion
    await redisClient.del('faqs_en', 'faqs_hi', 'faqs_bn');
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};