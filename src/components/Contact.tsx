import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Celebration sequence helper
    const celebrateSuccess = () => {
      setIsSubmitting(false);
      setIsSuccess(true);

      confetti({
        particleCount: 150,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#bd00ff', '#ffffff']
      });

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    };

    // If EmailJS keys are not provided, run fallback mock simulation for local preview
    if (!serviceID || !templateID || !publicKey) {
      console.warn('EmailJS environment keys are not configured. Running mock contact submission.');
      setTimeout(() => {
        celebrateSuccess();
      }, 1500);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Ephraim Jay Solasco',
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(
        () => {
          celebrateSuccess();
        },
        (error) => {
          setIsSubmitting(false);
          alert('Failed to send the message, please try again.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="glow-bg bottom-[5%] left-[10%] bg-purple-500/10" />
      <div className="glow-bg top-[10%] right-[10%] bg-cyan-500/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="text-sm font-semibold tracking-widest text-[#00f0ff] uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white">
            Let's Collaborate
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] rounded" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white font-display">
                Have a project in mind?
              </h3>
              <p className="text-slate-400 leading-relaxed font-normal">
                Whether you want to discuss a new design, interactive experiences, or just want to say hi, feel free to drop a message! I'm always open to discussing new ideas and visual solutions.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#00f0ff]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email Me</p>
                  <a href="mailto:ejaysolasco09@gmail.com" className="text-sm font-medium text-slate-200 hover:text-[#00f0ff] transition-colors">
                    ejaysolasco09@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#bd00ff]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Call Me</p>
                  <a href="tel:0927750728" className="text-sm font-medium text-slate-200 hover:text-[#bd00ff] transition-colors">
                    0927750728
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Location</p>
                  <span className="text-sm font-medium text-slate-200">
                    Cebu City, Philippines
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle disclaimer */}
            <p className="text-xs text-slate-600 font-normal pt-4 hidden lg:block">
              © {new Date().getFullYear()} Ephraim Jay A. Solasco. All rights reserved.
            </p>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 text-left h-full flex flex-col justify-center">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 max-w-sm mx-auto font-normal">
                    Thank you for reaching out! I've received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#bd00ff] focus:ring-1 focus:ring-[#bd00ff] transition-all text-sm"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Ephraim, let's work on a new project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
