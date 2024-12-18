/** @type {import('next').NextConfig} */
const nextConfig = {
   images : {
    remotePatterns : [
        {
            hostname : 'solana.com',
            protocol : 'https',
            
        }
    ]
   }    
};

export default nextConfig;
