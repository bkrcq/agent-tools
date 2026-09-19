import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: { default: 'Agent Tools | AI Developer Calculators', template: '%s | Agent Tools' }, description: siteConfig.description, alternates: { canonical: '/' }, robots: { index: true, follow: true } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><header className="site-header"><div className="shell nav"><Link href="/" className="brand">Agent Tools</Link><nav><Link href="/context-window-calculator">Context</Link><Link href="/ai-token-cost-calculator">Token cost</Link><Link href="/mcp-token-calculator">MCP budget</Link><Link href="/agents-md-validator">AGENTS.md</Link></nav></div></header><main>{children}</main><footer><div className="shell footer-inner"><span>Built for developers working with AI coding agents.</span><span>Last reviewed: September 19, 2026</span></div></footer></body></html>; }
