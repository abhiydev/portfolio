import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Abhishek Chedwal. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-6">
          <Link
            href="mailto:abhishekchedwal@outlook.com"
            className="hover:text-blue-400 transition"
          >
            <Mail size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/abhishek-chedwal-579b5128b"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="https://github.com/abhiydev"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
