import Footer from '../footer/footer';
import Navbar from '../header/navbar';

export default function MainContainer(props: { [x: string]: any; children: any; }) {
  const { children } = props;

  return (
    <div>
      <main id="skip" className="flex flex-col justify-center">
        <div className='relative'>
          <Navbar />
        </div>
        <div className='py-20'>
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}