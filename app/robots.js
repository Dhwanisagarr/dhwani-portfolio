// TODO: [DEPLOYMENT] Replace 'https://dhwanisagar.com' with your purchased custom domain once live
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhwanisagar.com';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
