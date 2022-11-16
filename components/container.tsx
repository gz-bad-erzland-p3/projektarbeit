import Head from 'next/head';
import { useState, useEffect } from 'react';
import Footer from './footer';
import Navbar from './navbar';

export default function Container(props: { [x: string]: any; children: any; }) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;

  return (
    <div>
      <main id="skip" className="flex flex-col justify-center">
        <div className='relative'>
          <Navbar />
        </div>
        <div>
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}