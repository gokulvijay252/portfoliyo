import { ContactForm } from '../types';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const sanitize = (str: string): string =>
  str.replace(/[<>]/g, '').trim();

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

let lastSubmitTime = 0;
const RATE_LIMIT_MS = 10000;

export const submitContact = async (form: ContactForm): Promise<void> => {
  if (!WEB3FORMS_KEY) {
    throw new Error('Contact form is not configured');
  }

  const now = Date.now();
  if (now - lastSubmitTime < RATE_LIMIT_MS) {
    throw new Error('Please wait before sending another message');
  }

  const name = sanitize(form.name);
  const email = sanitize(form.email);
  const message = sanitize(form.message);

  if (!name || name.length < 2 || name.length > 100) {
    throw new Error('Please enter a valid name (2-100 characters)');
  }
  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address');
  }
  if (!message || message.length < 10 || message.length > 2000) {
    throw new Error('Message must be between 10 and 2000 characters');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      name,
      email,
      message,
      from_name: name,
      subject: `New message from ${name} (${email})`,
      botcheck: false,
      template: 'blank',
    }),
  });

  if (!response.ok) {
    throw new Error('Network error. Please try again.');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to send message');
  }

  lastSubmitTime = Date.now();
};
