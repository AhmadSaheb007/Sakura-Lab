"use client";

import { useState } from "react";
import PronunciationToggle, {
  type PronunciationLanguage,
} from "./pronunciation-toggle";

interface SurvivalWord {
  word: string;
  romaji: string;
  bangla: string;
  meaningEnglish: string;
  meaningBangla: string;
}

interface WordPriorityGroup {
  priority: string;
  description: string;
  entries: SurvivalWord[];
}

interface WordChartProps {
  groups: WordPriorityGroup[];
}

export default function WordChart({ groups }: WordChartProps) {
  const [language, setLanguage] = useState<PronunciationLanguage>("en");
  const totalWords = groups.reduce(
    (total, group) => total + group.entries.length,
    0,
  );

  return (
    <section
      aria-label="Japanese survival vocabulary chart"
      className="kana-chart kanji-chart word-chart"
    >
      <div className="chart-header">
        <div>
          <p className="chart-japanese-title" lang="ja">
            日本語能力試験 N5
          </p>
          <h2>Essential Japanese Words</h2>
          <p className="chart-subtitle">
            Learn the words you are most likely to need first
          </p>
        </div>
        <PronunciationToggle language={language} onChange={setLanguage} />
      </div>

      <div className="kanji-grid word-grid">
        {groups.map((group) => (
          <div
            className="kanji-level"
            key={`${group.priority}-${group.description}`}
          >
            <div className="kanji-level-heading">
              <h3>{group.priority}</h3>
              <p>{group.description}</p>
            </div>
            {group.entries.map((entry) => (
              <div className="kana-cell kanji-cell word-cell" key={entry.word}>
                <div className="kana-cell-content word-cell-content">
                  <span className="kana-glyph word-japanese" lang="ja">
                    {entry.word}
                  </span>
                  <span
                    className="kana-reading"
                    lang={language === "bn" ? "bn" : "en"}
                  >
                    {language === "bn" ? entry.bangla : entry.romaji}
                  </span>
                  <span
                    className="kanji-meaning"
                    lang={language === "bn" ? "bn" : "en"}
                  >
                    {language === "bn"
                      ? entry.meaningBangla
                      : entry.meaningEnglish}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="chart-count">{totalWords} essential words and phrases</p>
    </section>
  );
}
