import Footer from '../footer/footer';
import Navbar from '../header/navbar';

export default function MainContainer(props: { [x: string]: any; children: any; }) {
  const { children } = props;

  return (
    <body>
      <main id="skip" className="flex flex-col">
        <div className='sticky top-0 w-full z-50'>
          <Navbar />
        </div>
        <div>
          {children}
        </div>
      </main>
      <Footer />
    </body>
  );
}