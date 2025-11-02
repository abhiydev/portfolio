'use client'
import { SiNextdotjs, SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiTailwindcss, SiGit, SiCloudinary } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'

const skills = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React.js', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'TailwindCSS', icon: SiTailwindcss },
  { name: 'Git & GitHub', icon: SiGit },
  { name: 'Cloudinary', icon: SiCloudinary },
  { name: 'REST APIs', icon: FaDatabase },
]

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-100 px-6 py-20"
    >
      <div className="max-w-5xl w-full text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
          Skills & Technologies
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          I specialize in full-stack web development using modern frameworks and tools that help me build scalable, fast, and user-friendly web applications.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
          {skills.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-2"
            >
              <Icon size={40} className="text-blue-400 mb-3" />
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
