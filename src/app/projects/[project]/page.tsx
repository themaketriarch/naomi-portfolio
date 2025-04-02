import { promises as fs } from "fs";
import { Suspense } from "react";
import Carousel from "./Carousel";
import { projects } from "@/lib/projects";
import path from "path";

interface ProjectPageProps {
  params: {
    project: string;
  };
}

async function ProjectImages({ project }: { project: string }) {
  try {
    const projectDir = path.join(process.cwd(), "public", "projects", project);
    const files = await fs.readdir(projectDir);
    const projectData = projects.find((p) => p.folder === project);

    const imageFiles = files.filter((file) =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length === 0) {
      return <p className="text-gray-400">No images found for this project</p>;
    }

    return (
      <Carousel
        images={imageFiles}
        project={project}
        subtitle={projectData?.subtitle}
      />
    );
  } catch (error) {
    console.error("Error loading project images:", error);
    return <p className="text-red-500">Error loading project images</p>;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project } = await params;

  return (
    <div className="min-h-screen h-screen w-full relative bg-black text-white">
      <Suspense fallback={<p className="text-gray-400">Loading images...</p>}>
        <ProjectImages project={project} />
      </Suspense>
    </div>
  );
}
