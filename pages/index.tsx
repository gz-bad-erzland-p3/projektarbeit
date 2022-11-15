import Container from "../components/container"
import Features from "../components/features"
import HeroSection from "../components/hero"
import Pricing from "../components/pricing"


export default function Index() {
  return (
    <div>
      <Container>
        <HeroSection />
        <Features />
        <Pricing />
      </Container>
    </div>
  )
}
