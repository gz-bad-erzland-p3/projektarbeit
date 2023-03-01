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
          buttonText="Alles klar!"
          declineButtonText="Ablehnen"
          cookieName="Cookie"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "white", backgroundColor: "green", fontSize: "13px" }}
          expires={150}
        >
          Wir verwenden ausschließlich funktionale Cookies, sodass Ihre Anmeldedaten gespeichert werden können und beim Neuladen der Seite keine erneute Anmeldung benötigt wird.{" "}
        </CookieConsent>
        <div className="my-48">
          <HeroSection />
        </div>
      </Container>
    </div>
  )
}
