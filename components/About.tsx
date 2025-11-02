'use client'
import Link from 'next/link'

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-gray-200 px-6 py-20"
    >
      <div className="max-w-4xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6">
          About Me
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          I’m <span className="text-blue-400 font-semibold">Abhishek Chedwal</span>,
          a passionate <span className="text-blue-400 font-semibold">Full Stack Developer</span> based in Indore, India.
          I love building scalable, modern web applications and crafting clean, responsive UIs using
          <span className="text-blue-400"> Next.js, TypeScript, and MongoDB</span>.
        </p>

        <p className="text-gray-400">
          Currently pursuing my <span className="text-gray-300 font-medium">Master of Computer Applications (MCA)</span> from
          <span className="text-gray-300 font-medium"> Manipal University Jaipur</span> (Expected 2025),
          I enjoy learning through real-world projects and solving business problems with technology.
        </p>

        <p className="text-gray-400">
          I’ve previously interned at <span className="text-gray-300 font-medium">Ernestwell Business Solutions</span>,
          where I developed a <span className="text-gray-300 font-medium">School Management System</span> and contributed
          to UI and API optimization.
        </p>

        {/* Resume Button */}
        <div className="mt-8">
          <Link
            href="/Abhishek_Chedwal_Resume.pdf" // You’ll upload your resume in /public
            target="_blank"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
