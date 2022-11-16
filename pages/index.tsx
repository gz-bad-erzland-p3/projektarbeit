import Head from "next/head"
import Container from "../components/container"
import CallToAction from "../components/callToAction"
import Features from "../components/features"
import HeroSection from "../components/hero"
import LogoCloud from "../components/logo-cloud"
import Pricing from "../components/pricing"
import Stats from "../components/stats"


export default function Index() {
  const meta = {
    title: 'Projekt',
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
          <Features />
        </div>
        <div className="my-32">
          <CallToAction />
        </div>
        <div className="my-32">
          <Stats />
        </div>
        <div className="my-32">
          <Pricing />
        </div>
      </Container>
    </div>
  )
}
