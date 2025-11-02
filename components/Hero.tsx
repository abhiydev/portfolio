'use client'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-b from-black via-gray-900 to-gray-950 text-white"
    >
      <div className="max-w-3xl space-y-6">
        {/* Intro */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I’m <span className="text-blue-500">Abhishek Chedwal</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          A passionate <span className="text-blue-400 font-medium">Full Stack Developer</span> specializing in building modern web applications using
          <span className="text-blue-400 font-medium"> Next.js, TypeScript, and MongoDB.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="#projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium flex items-center gap-2 transition"
          >
            View My Work <ArrowRight size={18} />
          </Link>

          <Link
            href="#contact"
            className="px-6 py-3 border border-blue-500 hover:bg-blue-600/20 rounded-full text-blue-400 font-medium transition"
          >
            Contact Me
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <Link
            href="https://github.com/abhiydev"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            <Github size={28} />
          </Link>
          <Link
            href="https://linkedin.com/in/abhishek-chedwal-579b5128b"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            <Linkedin size={28} />
          </Link>
          <Link
            href="mailto:abhishekchedwal@outlook.com"
            className="hover:text-blue-400 transition"
          >
            <Mail size={28} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
