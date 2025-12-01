import { db } from "@/lib/db";
import { getProjects } from "@/lib/store";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export const revalidate = 0; // Disable static caching for demo purposes

export default async function Home() {
  const profile = await db.getProfile();
  const projects = getProjects();
  const skills = await db.getSkills();

  return (
    <div className="flex flex-col gap-12 md:gap-24 pb-20">
      <Hero profile={profile} />
      <ProjectsGrid projects={projects} />
      <Skills skills={skills} />
      <Contact profile={profile} />
    </div>
  );
}
