import './globals.css'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Abhishek Chedwal | Full Stack Developer',
  description:
    'Portfolio of Abhishek Chedwal — Full Stack Developer specializing in Next.js, TypeScript, and MongoDB. Building scalable web apps with modern UI/UX.',
  keywords: [
    'Abhishek Chedwal',
    'Full Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Web Developer India',
    'Web Developer Indore',
    'MERN',
    'MongoDB',
    'Node.js',
    'TailwindCSS'
  ],
  openGraph: {
    title: 'Abhishek Chedwal | Full Stack Developer',
    description:
      'Full Stack Developer skilled in React, Next.js, Node.js, and MongoDB. Explore my work and get in touch.',
    url: 'https://abhishek-chedwal.vercel.app',
    siteName: 'Abhishek Chedwal Portfolio',
    images: [
      {
        url: '/og-image.jpg', // optional: add a preview image in /public
        width: 1200,
        height: 630,
        alt: 'Abhishek Chedwal Portfolio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Chedwal | Full Stack Developer',
    description:
      'Modern web developer building full-stack apps using Next.js and TypeScript.',
    images: ['/og-image.jpg'],
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider  >
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Toaster position="top-right" richColors /> {/* ✅ Toast system */}
      </body>
    </html>
    </ClerkProvider>
  )
}
