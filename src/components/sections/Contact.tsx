import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../../services/contactService';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaUser, FaAt, FaCommentDots } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { darkMode, theme } = useTheme();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      await submitContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    }
  };

  const inputBg = darkMode ? 'rgba(255,255,255,0.9)' : '#ffffff';
  const inputBorder = darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid #e0e0e0';
  const btnBg = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(28,43,58,0.1)';
  const btnBorder = darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(28,43,58,0.2)';

  return (
    <section
      id="contact"
      className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 w-full"
      style={{ paddingTop: '5rem', paddingBottom: '5rem', background: theme.bg }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            style={{ color: theme.heading }}
          >
            Contact
          </h2>
        </motion.div>

        <motion.p
          className="text-center font-bold max-w-2xl mx-auto mb-14 sm:mb-20 leading-relaxed"
          style={{ color: theme.textSecondary, fontSize: '17px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Have a question or want to work together? Feel free to reach out.
        </motion.p>

        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {status === 'sent' ? (
            <motion.div
              className="text-center py-10 rounded-2xl"
              style={{
                background: theme.cardBg,
                border: theme.cardBorder,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(34,197,94,0.2)' }}
              >
                <FaCheckCircle className="text-3xl" style={{ color: '#22c55e' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>Message Sent!</h3>
              <p className="mb-6 text-sm font-bold" style={{ color: theme.textSecondary }}>Thank you for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all"
                style={{ background: btnBg, color: theme.text, border: btnBorder }}
              >
                <FaEnvelope size={12} /> Send Another
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-5 sm:p-7"
              style={{
                background: theme.cardBg,
                border: theme.cardBorder,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Honeypot - hidden from users, catches bots */}
              <input
                type="text"
                name="botfield"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: theme.text }}>
                  <FaUser size={12} style={{ color: theme.text }} /> Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  minLength={2}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{ background: inputBg, border: inputBorder, color: '#1c2b3a' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#61a4ad';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(97,164,173,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.3)' : '#e0e0e0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: theme.text }}>
                  <FaAt size={12} style={{ color: theme.text }} /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  maxLength={254}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{ background: inputBg, border: inputBorder, color: '#1c2b3a' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#61a4ad';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(97,164,173,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.3)' : '#e0e0e0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: theme.text }}>
                  <FaCommentDots size={12} style={{ color: theme.text }} /> Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-y min-h-[120px]"
                  style={{ background: inputBg, border: inputBorder, color: '#1c2b3a' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#61a4ad';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(97,164,173,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.3)' : '#e0e0e0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-50"
                style={{ background: btnBg, color: theme.text, border: btnBorder }}
              >
                <FaPaperPlane size={12} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
