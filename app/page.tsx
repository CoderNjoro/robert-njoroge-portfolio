import { getProfile, getProjects, getSkills } from "@/lib/store";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export const revalidate = 0;

export default async function Home() {
  const profile = getProfile() || {
    title: 'Machine Learning Engineer',
    subtitle: 'Specializing in Quantitative Finance & Algorithmic Trading',
    bio: 'Focused on building intelligent systems for financial markets, developing machine learning models for algorithmic trading, and analyzing complex financial data patterns.',
    email: 'contact@example.com',
    github: 'https://github.com/CoderNjoro',
    linkedin: 'https://linkedin.com'
  };

  const projects = getProjects();
  const skills = getSkills();

  return (
    <div className="flex flex-col gap-12 md:gap-24 pb-20">
      <Hero profile={profile} />
      <ProjectsGrid projects={projects} />
      <Skills skills={skills} />
      <Contact profile={profile} />
    </div>
  );
}
