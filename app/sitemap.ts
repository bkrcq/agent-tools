import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap { const paths = ['', '/context-window-calculator', '/ai-token-cost-calculator', '/mcp-token-calculator', '/agents-md-validator', '/ai-coding-agent-setup']; return paths.map(path => ({ url: `${siteConfig.url}${path}/`, lastModified: new Date('2026-09-19'), changeFrequency: 'monthly', priority: path === '' ? 1 : 0.8 })); }
