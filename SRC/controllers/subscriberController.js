import { validationResult } from 'express-validator';
import Subscriber from '../models/subscriber.js';
import {sendWelcomeEmail} from '../utils/sendEmail.js';

export const subscribe = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email } = req.body;
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
      }
  
      const existingSubscriber = await Subscriber.findOne({ email });
      if (existingSubscriber) {
        if (existingSubscriber.active) {
          return res.status(400).json({ message: 'This email is already registered for our Beta Test' });
        } 
      }
  
      const subscriber = new Subscriber({ email });
      await subscriber.save();
      
      await sendWelcomeEmail({
        to: subscriber.email,
        subject: 'Welcome to RideSync - Beta Test Registration Successful!',
        html: `<p>Hello,</p>
               <p>Thank you for registering for our Beta Test! We're glad to have you on board.</p>
               <p>We'll send you the latest news and updates.</p>
               <p>If you have any questions, feel free to contact our support team.</p>
               <p>Best regards,<br>The RideSync Team</p>
        `});
      return res.status(201).json({ 
        message: 'Successfully Registered for our Beta Test! Check your email for a welcome email.' 
      });
    } catch (error) {
      console.error('Subscribe error:', error);
      return res.status(500).json({ 
        message: 'Failed to subscribe. Please try again later.',
        error: process.env.NODE_ENV === 'production' ? undefined : error.message 
      });
    }
  };