import Link from "next/link";
import hiragana from "./data/hiragana.json";
import katakana from "./data/katakana.json";
import KanaChart from "./components/kana-chart";

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR LITTLE CORNER OF JAPAN
            </p>
            <h1>
              Learn Japanese,
              <span>one petal at a time.</span>
            </h1>
            <p className="hero-description">
              Start with the beautiful basics. Explore the Japanese alphabet
              and practice the everyday phrases you’ll use from day one.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#kana">
                Explore the kana <span aria-hidden="true">↓</span>
              </a>
              <Link className="button button-secondary" href="/view/jpqna">
                Practice a conversation <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="hero-note">
              <span className="hero-note-flower" aria-hidden="true">
                ✿
              </span>
              A gentle first step for Japanese beginners
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun-disc" />
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <span className="hero-petal petal-one">✿</span>
            <span className="hero-petal petal-two">✿</span>
            <div className="hero-kana-card">
              <span className="hero-kana-label">YOUR FIRST SOUND</span>
              <span className="hero-kana">あ</span>
              <span className="hero-kana-romaji">a · あいうえお</span>
            </div>
            <span className="hero-art-caption">はじめまして · nice to meet you</span>
          </div>
        </div>
        <div className="hero-bottom-rule" />
      </section>

      <section className="kana-section section-shell" id="kana">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR FIRST 92 CHARACTERS
            </p>
            <h2>Meet the kana</h2>
          </div>
          <p className="section-description">
            Japanese has two beautiful phonetic alphabets. Take your time,
            listen to each sound, and find your favorite.
          </p>
        </div>

        <div className="kana-charts">
          <KanaChart
            title="Hiragana"
            subtitle="The soft, flowing script"
            japaneseTitle="ひらがな"
            entries={hiragana}
            accent="rose"
          />
          <KanaChart
            title="Katakana"
            subtitle="For borrowed words & names"
            japaneseTitle="カタカナ"
            entries={katakana}
            accent="sun"
          />
        </div>

        <p className="chart-footnote">
          <span aria-hidden="true">✿</span> Tip: switch between English and
          Bangla pronunciation whenever it feels right.
        </p>
      </section>

      <section className="practice-band">
        <div className="practice-band-inner">
          <div>
            <p className="eyebrow">SAY IT LIKE YOU MEAN IT</p>
            <h2>Ready for your first conversation?</h2>
            <p>
              Practice ten useful Japanese phrases, with pronunciations in the
              language you prefer.
            </p>
          </div>
          <Link className="button button-light" href="/view/jpqna">
            Try everyday phrases <span aria-hidden="true">↗</span>
          </Link>
          <span className="practice-flower" aria-hidden="true">
            ✿
          </span>
        </div>
      </section>
    </main>
  );
}
