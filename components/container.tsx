import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from './navbar';

export default function Container(props: { [x: string]: any; children: any; }) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const meta = {
    title: 'Projekt',
    description: `Test`,
    ...customMeta
  };

  return (
    <div className="">
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
      </Head>
      <main id="skip" className="flex flex-col justify-center px-8">
        <div className='relative'>
          <Navbar />
        </div>
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}