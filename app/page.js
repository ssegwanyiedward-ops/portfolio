"use client";
import { useState } from 'react';
import { projects, socials } from '../data';
import Link from 'next/link';
import Image from 'next/image'; // Next.js Image component
import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook } from 'react-icons/fa';

export default function Home() {
  const [filter, setFilter] = useState("All");

  const allTech = ["All", ...new Set(projects.flatMap((p) => p.tech))];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.tech.includes(filter));

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'github': return <FaGithub />;
      case 'linkedin': return <FaLinkedin />;
      case 'whatsapp': return <FaWhatsapp />;
      case 'facebook': return <FaFacebook />;
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 md:p-24 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER WITH PROFILE PICTURE */}
        <header className="mb-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Hi, I'm <span className="text-green-400">Ssegwanyi Edward</span> 👋
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              I build AI-powered tools, automation scripts, and web applications.
              Currently studying and building in Uganda.
            </p>
          </div>
          
          {/* Your Picture */}
          <div className="flex-shrink-0">
            <Image 
              src="/profile.jpg" 
              alt="CyberGhost Profile Picture"
              width={200}
              height={200}
              className="rounded-full object-cover border-4 border-green-400 w-40 h-40 md:w-56 md:h-56 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
              priority
            />
          </div>
        </header>

        <div className="mb-12 flex flex-wrap justify-center md:justify-start gap-3">
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
                filter === tech 
                  ? "bg-green-400 text-black font-bold" 
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-400 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="bg-gray-800 text-green-400 text-xs px-3 py-1 rounded-full font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-block bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-green-400 transition-colors w-full text-center"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 pt-12 border-t border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Whether you have a project in mind, need a developer, or just want to say hello, my inbox is always open.
          </p>
          
          <div className="flex justify-center gap-6">
            {socials.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="bg-gray-900 border border-gray-800 p-4 rounded-full text-gray-400 hover:text-green-400 hover:border-green-400 hover:-translate-y-1 transition-all duration-300 text-2xl"
              >
                {renderIcon(social.icon)}
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>Built with Next.js & Tailwind CSS. © {new Date().getFullYear()} CyberGhost.</p>
        </footer>
        
      </div>
    </main>
  );
}
