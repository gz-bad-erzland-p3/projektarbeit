import Head from "next/head"
import Container from "../components/container/container"
import CallToAction from "../components/index/callToAction"
import Features from "../components/index/features"
import HeroSection from "../components/index/hero"
import LogoCloud from "../components/index/logo-cloud"
import Pricing from "../components/index/pricing"
import Stats from "../components/index/stats"


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
          <LogoCloud />
        </div>
        <div className="my-32">
          <Stats />
        </div>
        <div className="my-32">
          <CallToAction />
        </div>
        <div className="my-32">
          <Features />
        </div>
        <div className="my-32">
          <Pricing />
        </div>
      </Container>
    </div>
  )
}
