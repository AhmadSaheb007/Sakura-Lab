"use client";

import { useState } from "react";
import PronunciationToggle, {
  type PronunciationLanguage,
} from "./pronunciation-toggle";

interface KanaEntry {
  kana: string;
  romaji: string;
  bangla: string;
}

interface KanaChartProps {
  title: string;
  subtitle: string;
  japaneseTitle: string;
  entries: KanaEntry[];
  accent: "rose" | "sun";
}

export default function KanaChart({
  title,
  subtitle,
  japaneseTitle,
  entries,
  accent,
}: KanaChartProps) {
  const [language, setLanguage] = useState<PronunciationLanguage>("en");

  return (
    <section className={`kana-chart kana-chart-${accent}`} aria-label={title}>
      <div className="chart-header">
        <div>
          <p className="chart-japanese-title">{japaneseTitle}</p>
          <h3>{title}</h3>
          <p className="chart-subtitle">{subtitle}</p>
        </div>
        <PronunciationToggle language={language} onChange={setLanguage} />
      </div>
      <div className="kana-grid">
        {entries.map((entry) => (
          <div className="kana-cell" key={entry.kana}>
            <div className="kana-cell-content">
              <span className="kana-glyph" lang="ja">
                {entry.kana}
              </span>
              <span
                className="kana-reading"
                lang={language === "bn" ? "bn" : "en"}
              >
                {language === "bn" ? entry.bangla : entry.romaji}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="chart-count">{entries.length} basic characters</p>
    </section>
  );
}
