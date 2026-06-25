import { useState } from "react";
import ArrowRight from "../components/ArrowRight";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend
    console.log(form);
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  const inputClass =
    "w-full border-b border-(--border) bg-transparent py-4 text-(--hero-text) outline-none placeholder:text-(--muted-text) transition-colors duration-200 focus:border-(--primary-cta)";

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24">
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="mb-4 text-sm font-medium font-outfit uppercase tracking-[0.3em] text-(--primary-cta)">
            Contact
          </p>

          <h1 className="font-outfit text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-(--hero-text)">
            Let's build
            <br />
            something great.
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-(--muted-text)">
            Have a project in mind, a collaboration opportunity, or just want to
            say hello? Fill out the form and I'll get back to you soon.
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="flex items-center">
            <div>
              <h2 className="font-outfit text-3xl font-bold text-(--hero-text)">
                Message received.
              </h2>
              <p className="mt-4 text-lg text-(--muted-text)">
                Thanks for reaching out — I'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm text-(--muted-text) hover:text-(--hero-text) transition-colors underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <button
              type="submit"
              className="group cursor-pointer inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium text-white transition-all duration-300"
            >
              Send Message
              <ArrowRight
                size={18}
                className="transition-all duration-300 group-hover:translate-x-2"
              />
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Contact;
