import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import emailjs from "@emailjs/browser";
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactView({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    toast.error("All fields required.");
    return;
  }

  setSending(true);

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      PUBLIC_KEY
    );

    setSending(false);
    setSent(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });

    toast.success("Message sent! I'll reply within 24hrs.");
  } catch (error) {
    console.error(error);
    setSending(false);
    toast.error("Failed to send message.");
  }
};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-terminal-border rounded p-4 my-2 bg-terminal-surface"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-terminal-muted text-xs">./contact.sh</span>
        <button onClick={onClose} className="text-terminal-muted text-xs hover:text-terminal-red transition-colors">
          [x] close
        </button>
      </div>

      {sent ? (
        <div className="space-y-1 text-sm">
          <p className="text-terminal-green">✓ Message transmitted successfully.</p>
          <p className="text-terminal-muted">Expected response time: &lt; 24hrs</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: 'name', key: 'name', type: 'text' },
            { label: 'email', key: 'email', type: 'email' },
          ].map(field => (
            <div key={field.key} className="flex items-center gap-3">
              <label htmlFor={field.key} className="text-terminal-green text-sm w-16 select-none cursor-pointer">{field.label}:</label>
              <input
                id={field.key}
                type={field.type}
                value={form[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                className="flex-1 bg-transparent border-b border-terminal-border text-terminal-text text-sm outline-none focus:border-terminal-green transition-colors pb-0.5 font-mono"
                placeholder={`enter ${field.label}...`}
                autoComplete="off"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="text-terminal-green text-sm select-none cursor-pointer block mb-1">message:</label>
            <textarea
              id="message"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              rows={4}
              className="w-full bg-terminal-bg border border-terminal-border rounded text-terminal-text text-sm outline-none focus:border-terminal-green transition-colors p-2 font-mono resize-none"
              placeholder="what do you want to build together?"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="text-sm text-terminal-bg bg-terminal-green px-4 py-1.5 rounded font-mono hover:bg-terminal-green-dim transition-colors disabled:opacity-50"
          >
            {sending ? 'sending...' : '$ send message'}
          </button>
        </form>
      )}
    </motion.section>
  )
}