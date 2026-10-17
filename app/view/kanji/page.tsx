import kanjiLevels from "../../data/n5-kanji.json";
import kanjiMeanings from "../../data/n5-kanji-meanings.json";
import KanjiChart from "../../components/kanji-chart";

const kanjiMeaningMap = new Map(Object.entries(kanjiMeanings));

export default function KanjiPage() {
  const groups = kanjiLevels.map((level) => ({
    ...level,
    entries: level.entries.map((entry) => {
      const meaning = kanjiMeaningMap.get(entry.kanji);

      if (!meaning) {
        throw new Error(`Missing meaning for N5 kanji: ${entry.kanji}`);
      }

      return {
        ...entry,
        meaningEnglish: meaning.english,
        meaningBangla: meaning.bangla,
      };
    }),
  }));
  const totalKanji = kanjiLevels.reduce(
    (total, level) => total + level.entries.length,
    0,
  );

  return (
    <main className="kanji-page">
      <section className="kanji-intro">
        <div className="kanji-intro-inner">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR NEXT STEP IN JAPANESE
          </p>
          <h1>
            Meet Your First Kanji,
            <span>one character at a time.</span>
          </h1>
          <div className="phrase-count">
            <span aria-hidden="true">✿</span>
            {totalKanji} Beginner Kanji <i /> Sorted From Easy To Challenging.
          </div>
        </div>
      </section>

      <section className="kanji-section section-shell">
        <KanjiChart groups={groups} />
        <p className="chart-footnote">
          <span aria-hidden="true">✿</span> Switch languages to see each
          character’s pronunciation and meaning in English or Bangla.
        </p>
      </section>
    </main>
  );
}
