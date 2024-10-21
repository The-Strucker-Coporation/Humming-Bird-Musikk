import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Humming Bird Musikk™",
  description: "Explore expert music education resources, publishing, and printing solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
