import blogsData from '../data/blogs.json';
import projectsData from '../data/projects.json';

// TODO: [DEPLOYMENT] Replace 'https://dhwanisagar.com' with your purchased custom domain once live
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhwanisagar.com';

export default async function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/4rinlabs',
    '/certifications',
    '/guest-notes',
    '/blogs',
    '/books',
    '/epigraphs',
    '/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = (blogsData || []).map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: post.date || new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes = (projectsData || []).map((proj) => ({
    url: `${BASE_URL}/projects/${proj.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
