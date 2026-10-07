const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dhwanisagar.in';

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
