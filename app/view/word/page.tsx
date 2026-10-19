import survivalWords from "../../data/n5-survival-words.json";
import WordChart from "../../components/word-chart";

const totalWords = survivalWords.reduce(
  (total, group) => total + group.entries.length,
  0,
);

export default function WordPage() {
  return (
    <main className="kanji-page word-page">
      <section className="kanji-intro word-intro">
        <div className="kanji-intro-inner">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            JAPANESE YOU CAN USE RIGHT AWAY
          </p>
          <h1>
            Find The Words You Need,
            <span>one useful word at a time.</span>
          </h1>
          <div className="phrase-count">
            <span aria-hidden="true">✿</span>
            {totalWords} Practical N5 Words <i /> Ranked From Most To Least
            Necessary
          </div>
        </div>
      </section>

      <section className="kanji-section section-shell word-section">
        <WordChart groups={survivalWords} />
        <p className="chart-footnote">
          <span aria-hidden="true">✿</span> Switch between English and Bangla
          to see each word’s pronunciation and meaning.
        </p>
      </section>
    </main>
  );
}
