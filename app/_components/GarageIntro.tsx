import Link from "next/link";
import { hasPixelagentAccess } from "@/lib/pixelagent-access";
import { PORTFOLIO_URL } from "@/lib/site";
import IntroStamp from "./IntroStamp";

export default async function GarageIntro() {
  const pixelagentOpen = await hasPixelagentAccess();
  return (
    <section className="garage-intro" aria-labelledby="garage-intro-heading">
      <h1 id="garage-intro-heading" className="garage-intro-title">
        The AI Garage — <em>tools</em> I build when something clicks.
      </h1>

      <div className="garage-intro-body">
        <p>
          Born in Seoul; lived in Berlin, Los Angeles, and the Bay Area. At Apple
          through EPAM Systems — before that Google, BMW, and Volkswagen.
        </p>
        <p>
          I&apos;m a designer by nature, drawn to building polished products that
          help people move faster toward something useful. This is where I share
          the tools I create —{" "}
          {pixelagentOpen ? (
            <Link href="/pixelagent">PixelAgent</Link>
          ) : (
            <span className="garage-intro-pa-locked">PixelAgent</span>
          )}{" "}
          is the first.{" "}
          <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
          {" · "}
          Say hi.
        </p>
      </div>

      <IntroStamp />
    </section>
  );
}
