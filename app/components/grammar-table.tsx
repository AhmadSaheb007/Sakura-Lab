"use client";

import { useState } from "react";
import PronunciationToggle, {
  type PronunciationLanguage,
} from "./pronunciation-toggle";

export interface GrammarTableRow {
  id: string;
  label: string;
  japanese: string;
  romaji: string;
  bangla: string;
  meaningEnglish: string;
  meaningBangla: string;
}

interface GrammarTableProps {
  title: string;
  subtitle: string;
  rows: GrammarTableRow[];
}

export default function GrammarTable({
  title,
  subtitle,
  rows,
}: GrammarTableProps) {
  const [language, setLanguage] = useState<PronunciationLanguage>("en");

  return (
    <section className="grammar-card" aria-label={title}>
      <div className="grammar-card-header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <PronunciationToggle language={language} onChange={setLanguage} />
      </div>
      <div className="grammar-table-scroll" role="region" aria-label={`${title} table`} tabIndex={0}>
        <table className="grammar-table">
          <thead>
            <tr>
              <th scope="col">Grammar form</th>
              <th scope="col">Japanese</th>
              <th scope="col">
                {language === "en" ? "Romaji / pronunciation" : "Bangla pronunciation"}
              </th>
              <th scope="col">{language === "en" ? "Meaning (English)" : "Meaning (Bangla)"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th className="grammar-row-label" scope="row">
                  {row.label}
                </th>
                <td className="grammar-japanese" lang="ja">
                  {row.japanese}
                </td>
                <td lang={language === "bn" ? "bn" : "en"}>
                  {language === "en" ? row.romaji : row.bangla}
                </td>
                <td lang={language === "bn" ? "bn" : "en"}>
                  {language === "en" ? row.meaningEnglish : row.meaningBangla}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="grammar-row-count">
        {rows.length} {rows.length === 1 ? "example" : "examples"}
      </p>
    </section>
  );
}
