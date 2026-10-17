"use client";

import { useState } from "react";
import PronunciationToggle, {
  type PronunciationLanguage,
} from "./pronunciation-toggle";

interface KanjiEntry {
  kanji: string;
  romaji: string;
  bangla: string;
  meaningEnglish: string;
  meaningBangla: string;
}

interface KanjiDifficultyGroup {
  difficulty: string;
  description: string;
  entries: KanjiEntry[];
}

interface KanjiChartProps {
  groups: KanjiDifficultyGroup[];
}

export default function KanjiChart({ groups }: KanjiChartProps) {
  const [language, setLanguage] = useState<PronunciationLanguage>("en");
  const totalEntries = groups.reduce(
    (total, group) => total + group.entries.length,
    0,
  );

  return (
    <section className="kana-chart kanji-chart" aria-label="N5 kanji chart">
      <div className="chart-header">
        <div>
          <p className="chart-japanese-title" lang="ja">
            日本語能力試験 N5
          </p>
          <h2>N5 Kanji</h2>
          <p className="chart-subtitle">
            Start simple and work your way up
          </p>
        </div>
        <PronunciationToggle language={language} onChange={setLanguage} />
      </div>

      <div className="kanji-grid">
        {groups.map((group) => (
          <div className="kanji-level" key={group.difficulty}>
            <div className="kanji-level-heading">
              <h3>{group.difficulty}</h3>
              <p>{group.description}</p>
            </div>
            {group.entries.map((entry) => (
              <div className="kana-cell kanji-cell" key={entry.kanji}>
                <div className="kana-cell-content">
                  <span className="kana-glyph" lang="ja">
                    {entry.kanji}
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

      <p className="chart-count">{totalEntries} beginner kanji</p>
    </section>
  );
}
