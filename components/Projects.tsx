'use client'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    title: 'KamiyTech',
    description:
      'A company website and CRM system built with Next.js, TypeScript, and MongoDB. Includes blog management, Gmail API integration, and admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Clerk', 'TailwindCSS', 'Cloudinary'],
    github: 'https://github.com/abhiydev/kamiytech',
    live: 'https://kamiytech.com',
  }
]

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-gray-100 px-6 py-20"
    >
      <div className="max-w-6xl w-full text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
          Projects
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Here are some of the real-world projects I’ve built — combining functionality, performance, and clean design.
        </p>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-gray-800 rounded-full text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-500 transition"
                  >
                    <ExternalLink size={16} /> Live
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition"
                  >
                    <Github size={16} /> Code
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
