import Link from "next/link";
import MainContainer from "../components/container/container";

export default function SupportMainPage() {
  return (
    <MainContainer>
        <div className="w-full h-full">
          <div className="flex justify-center mx-auto max-w-screen-xl mb-10">
            <div className={"bg-white px-5 rounded-2xl"}>
              <h1 className="text-3xl">Impressum</h1>
              <h2>Gesetzliche Anbieterkennung</h2><br />
              <p>
                <b>Herausgeber:</b><br />
                Gemeindezentrum Bad Erzland<br />
                Waldorfstraße 2<br />
                01023 Dresden<br />
                Vertreter: Herr Holger Hoburg<br />
                Telefon: 03708/123679<br />
                E‑Mail: support@gz-bad-erzland-P3.de<br />
                USt-IdNr.: DE 123456789
              </p><br /><p>
                Das Gemeindezentrum Bad Erzland ist eine Körperschaft des öffentlichen Rechts. Sie wird vertreten durch Herrn Holger Hoburg.
              </p><p>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für die Inhalte der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
              <br />
              <p><b>Inhaltlich verantwortlich:</b></p>
              <p>
              Gemeindezentrum Bad Erzland<br />
                Bürgerservice / Wirtschaft – Herr Holger Hoburg<br />
                Telefon: +49 157 70601204
              </p><br />
              <p><b>Technische Umsetzung & Betreuung:</b></p><p>
                SecNet IT GmbH<br />
                Dr.-Külz-Ring 19<br />
                01067 Dresden<br />
                Telefon: +49 157 70601204<br />
                E-Mail: support@gz-bad-erzland-P3.de<br /><br />
              </p><p>
                <b>Haftungsausschluss</b><br />
                Die Autoren übernehmen keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen die Autoren, die sich auf Schäden materieller oder ideeller Art beziehen, welche durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden sind grundsätzlich ausgeschlossen, sofern seitens der Autoren kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
              </p><br /><p>
                <b>Verweise und Links</b><br />
                Bei direkten oder indirekten Verweisen auf fremde Internetseiten (“Links”), die außerhalb des Verantwortungsbereiches des Autors liegen, tritt eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft, in dem der Autor von den Inhalten Kenntnis hat, er sich von ihnen nicht ausdrücklich distanziert und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor erklärt daher ausdrücklich, dass zum Zeitpunkt der Linksetzung die entsprechenden verlinkten Seiten frei von illegalen Inhalten waren. Der Autor hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der gelinkten/verknüpften Seiten. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller gelinkten /verknüpften Seiten und machen sich diese unter keinen Umständen zu Eigen. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
              </p><br /><p>
                <b>Urheberrecht</b><br />
                Das Copyright für veröffentlichte, von Autoren selbst erstellte Objekte bleibt allein bei den Autoren der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung der Autoren nicht gestattet.
              </p>
            </div>
          </div>
        </div>
    </MainContainer>
  );
}