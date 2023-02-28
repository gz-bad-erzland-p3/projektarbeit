import Head from "next/head"
import Container from "../components/container/container"
import HeroSection from "../components/index/hero"
import CookieConsent from "react-cookie-consent";

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
        <CookieConsent
          location="bottom"
          buttonText="Akzeptieren"
          declineButtonText="Ablehnen"
          cookieName="Cookie"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "white", backgroundColor: "green", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
        <div className="my-48">
          <HeroSection />
        </div>
      </Container>
    </div>
  )
}
