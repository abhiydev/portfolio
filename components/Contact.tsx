'use client'
import { useState } from 'react'
import { Mail, Linkedin, Github, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success('Message sent successfully! 🎉')
        setForm({ name: '', email: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error connecting to server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-100 px-6 py-20"
    >
      <div className="max-w-4xl w-full text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500">Get In Touch</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          I’m always open to new opportunities, collaborations, or just a friendly chat about tech and ideas.
          Feel free to reach out!
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:border-blue-500 outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:border-blue-500 outline-none"
            />
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:border-blue-500 outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-8">
          <Link href="mailto:abhishekchedwal@outlook.com" className="flex items-center gap-2 hover:text-blue-400 transition">
            <Mail size={24} /> Email
          </Link>
          <Link href="https://linkedin.com/in/abhishek-chedwal-579b5128b" target="_blank" className="flex items-center gap-2 hover:text-blue-400 transition">
            <Linkedin size={24} /> LinkedIn
          </Link>
          <Link href="https://github.com/abhiydev" target="_blank" className="flex items-center gap-2 hover:text-blue-400 transition">
            <Github size={24} /> GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
