import Head from "next/head"
import Container from "../components/container/container"
import Features from "../components/index/features"
import HeroSection from "../components/index/hero"


export default function Index() {
  const meta = {
    title: 'Gemeindezentrum Bad Erzland',
    description: `Test`,
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
      </Head>
      <Container>
        <div className="my-48">
          <HeroSection />
        </div>
        <div className="my-32">
          <Features />
        </div>
      </Container>
    </div>
  )
}
