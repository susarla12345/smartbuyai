import { useState, useCallback } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>

      <p className="text-lg text-gray-600 mb-10">
        Have a question, suggestion, or partnership inquiry? We'd love to hear
        from you. Fill out the form below or reach out directly.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="flex gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="w-10 h-10 shrink-0 bg-primary-100 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <a
              href="mailto:susarlamallikarjun@gmail.com"
              className="text-sm text-primary-600 hover:underline"
            >
              susarlamallikarjun@gmail.com
            </a>
          </div>
        </div>

        <div className="flex gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="w-10 h-10 shrink-0 bg-primary-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
            <p className="text-sm text-gray-600">Within 24–48 hours</p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-green-900 mb-2">
            Message Sent!
          </h2>
          <p className="text-green-700">
            Thanks for reaching out. We'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Tell us more..."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
