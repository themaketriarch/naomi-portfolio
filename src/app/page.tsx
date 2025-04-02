import Image from "next/image";
import Link from "next/link";

import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center bg-black min-h-screen">
      <div className="flex justify-center content-center gap-8 pt-12 mb-16 relative">
        <div className="absolute bottom-5 left-0 right-0 h-3 bg-red-500/50 z-0 rounded-xl"></div>
        {projects.map((project, idx) => (
          <Link
            href={`/projects/${encodeURIComponent(project.folder)}`}
            key={idx}
            className="flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center text-center relative pb-8 group"
          >
            <div className="rounded-xl overflow-hidden w-full aspect-[2/3.3] bg-gray-800 relative group-hover:scale-105 transition-transform duration-300">
              <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={450}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h2 className="mt-4 font-semibold text-sm leading-tight">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-xs pb-12 ">{project.subtitle}</p>
            )}
            <div className="absolute bottom-4 w-5 h-5 bg-black border-2 border-white rounded-full z-10 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:bg-red-500"></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
