import type { Metadata } from 'next';
import './landing-page.css';

export const metadata: Metadata = {
  title: 'Everything AI - Digital Marketing & AI Solutions for Business Growth',
  description: 'Leading digital marketing agency specializing in AI solutions for business, website development, business services, and legal support. Transform your business with cutting-edge technology.',
  keywords: 'digital marketing, AI solutions, business services, website development, legal services, credit repair, business automation',
  openGraph: {
    title: 'Everything AI - Digital Marketing & AI Solutions for Business Growth',
    description: 'Leading digital marketing agency specializing in AI solutions for business, website development, business services, and legal support.',
    images: ['/assets/img/logo-top.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Everything AI - Digital Marketing & AI Solutions for Business Growth',
    description: 'Leading digital marketing agency specializing in AI solutions for business, website development, business services, and legal support.',
    images: ['/assets/img/logo-top.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUa1j9tnK6DQURHU8oE3yjQ+s2Nv30JyT3W4L6k7J8oPxCEQCYO3rOe0A7lW"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}