import Footer from '../footer/footer';
import Navbar from '../header/navbar';

export default function MainContainer(props: { [x: string]: any; children: any; }) {
  const { children } = props;

  return (
    <body className='relative min-h-screen'>
      <main id="skip" className="flex flex-col">
        <div className='relative'>
          <Navbar />
        </div>
        <div className='py-20'>
          {children}
        </div>
      </main>
      <Footer />
    </body>
  );
}