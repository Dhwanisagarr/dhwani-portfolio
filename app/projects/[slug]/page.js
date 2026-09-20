import { redirect } from 'next/navigation';
import projectsData from '../../../data/projects.json';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Case Study Modal`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  redirect(`/?project=${slug}`);
}
