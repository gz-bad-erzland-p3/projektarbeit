import Head from "next/head";
import Link from "next/link";
import MainContainer from "../components/container/container";

export default function Help() {
    return (
        <MainContainer>
            <Head>
                <title>Hilfe</title>
            </Head>
            <div className="h-screen w-screen flex flex-col items-center text-center">
                <div className="max-w-7xl">
                    <h1 className="text-4xl">Hilfe Seite</h1>
                    <p className="text-base">Um genaue Hilfe zu erhalten rufen sie bitte <Link className="link-main" href="https://gz-bad-erzland-p3.github.io/docs/">diese Seite</Link> auf</p>
                </div>
            </div>
        </MainContainer>
    )
}