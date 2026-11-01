import type { NextConfig } from 'next';
const config: NextConfig = { poweredByHeader:false, agentRules:false, experimental:{cpus:2}, async headers(){return [{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'},{key:'X-Content-Type-Options',value:'nosniff'}]}]}};
export default config;
