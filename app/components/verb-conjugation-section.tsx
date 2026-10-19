"use client";

import { useState } from "react";
import verbData from "../data/n5-verbs.json";
import formMeaningData from "../data/n5-verb-form-meanings.json";
import GrammarTable, { type GrammarTableRow } from "./grammar-table";

type Verb = (typeof verbData)[number];

interface ConjugatedReading {
  japanese: string;
  romaji: string;
  bangla: string;
}

interface GodanEnding {
  te: ConjugatedReading;
  past: ConjugatedReading;
  negative: ConjugatedReading;
  masuStem: ConjugatedReading;
}

const godanEndings: Record<string, GodanEnding> = {
  う: {
    te: { japanese: "って", romaji: "tte", bangla: "ত্তে" },
    past: { japanese: "った", romaji: "tta", bangla: "ত্তা" },
    negative: { japanese: "わない", romaji: "wanai", bangla: "ওয়ানাই" },
    masuStem: { japanese: "い", romaji: "i", bangla: "ই" },
  },
  つ: {
    te: { japanese: "って", romaji: "tte", bangla: "ত্তে" },
    past: { japanese: "った", romaji: "tta", bangla: "ত্তা" },
    negative: { japanese: "たない", romaji: "tanai", bangla: "তানাই" },
    masuStem: { japanese: "ち", romaji: "chi", bangla: "চি" },
  },
  る: {
    te: { japanese: "って", romaji: "tte", bangla: "ত্তে" },
    past: { japanese: "った", romaji: "tta", bangla: "ত্তা" },
    negative: { japanese: "らない", romaji: "ranai", bangla: "রানাই" },
    masuStem: { japanese: "り", romaji: "ri", bangla: "রি" },
  },
  む: {
    te: { japanese: "んで", romaji: "nde", bangla: "ন্দে" },
    past: { japanese: "んだ", romaji: "nda", bangla: "ন্দা" },
    negative: { japanese: "まない", romaji: "manai", bangla: "মানাই" },
    masuStem: { japanese: "み", romaji: "mi", bangla: "মি" },
  },
  ぶ: {
    te: { japanese: "んで", romaji: "nde", bangla: "ন্দে" },
    past: { japanese: "んだ", romaji: "nda", bangla: "ন্দা" },
    negative: { japanese: "ばない", romaji: "banai", bangla: "বানাই" },
    masuStem: { japanese: "び", romaji: "bi", bangla: "বি" },
  },
  ぬ: {
    te: { japanese: "んで", romaji: "nde", bangla: "ন্দে" },
    past: { japanese: "んだ", romaji: "nda", bangla: "ন্দা" },
    negative: { japanese: "なない", romaji: "nanai", bangla: "নানাই" },
    masuStem: { japanese: "に", romaji: "ni", bangla: "নি" },
  },
  く: {
    te: { japanese: "いて", romaji: "ite", bangla: "ইতে" },
    past: { japanese: "いた", romaji: "ita", bangla: "ইতা" },
    negative: { japanese: "かない", romaji: "kanai", bangla: "কানাই" },
    masuStem: { japanese: "き", romaji: "ki", bangla: "কি" },
  },
  ぐ: {
    te: { japanese: "いで", romaji: "ide", bangla: "ইদে" },
    past: { japanese: "いだ", romaji: "ida", bangla: "ইদা" },
    negative: { japanese: "がない", romaji: "ganai", bangla: "গানাই" },
    masuStem: { japanese: "ぎ", romaji: "gi", bangla: "গি" },
  },
  す: {
    te: { japanese: "して", romaji: "shite", bangla: "শিতে" },
    past: { japanese: "した", romaji: "shita", bangla: "শিতা" },
    negative: { japanese: "さない", romaji: "sanai", bangla: "সানাই" },
    masuStem: { japanese: "し", romaji: "shi", bangla: "শি" },
  },
};

function joinReading(
  verb: Verb,
  suffix: ConjugatedReading,
): ConjugatedReading {
  return {
    japanese: `${verb.stem}${suffix.japanese}`,
    romaji: `${verb.romajiStem}${suffix.romaji}`,
    bangla: `${verb.banglaStem}${suffix.bangla}`,
  };
}

function replaceSuffix(
  reading: string,
  suffix: string,
  replacement: string,
): string {
  if (!reading.endsWith(suffix)) {
    throw new Error(`Expected reading to end in ${suffix}: ${reading}`);
  }
  return `${reading.slice(0, -suffix.length)}${replacement}`;
}

function getVerbForms(verb: Verb): Record<string, ConjugatedReading> {
  const dictionary = {
    japanese: verb.dictionary,
    romaji: verb.romaji,
    bangla: verb.bangla,
  };
  let te: ConjugatedReading;
  let past: ConjugatedReading;
  let negative: ConjugatedReading;
  let masuStem: ConjugatedReading;

  if (verb.class === "ichidan") {
    te = { japanese: `${verb.stem}て`, romaji: `${verb.romajiStem}te`, bangla: `${verb.banglaStem}তে` };
    past = { japanese: `${verb.stem}た`, romaji: `${verb.romajiStem}ta`, bangla: `${verb.banglaStem}তা` };
    negative = { japanese: `${verb.stem}ない`, romaji: `${verb.romajiStem}nai`, bangla: `${verb.banglaStem}নাই` };
    masuStem = { japanese: verb.stem, romaji: verb.romajiStem, bangla: verb.banglaStem };
  } else if (verb.class === "godan") {
    const ending = godanEndings[verb.ending];
    if (!ending) {
      throw new Error(`Unsupported godan verb ending: ${verb.ending}`);
    }

    te = joinReading(verb, ending.te);
    past = joinReading(verb, ending.past);
    negative = joinReading(verb, ending.negative);
    masuStem = joinReading(verb, ending.masuStem);

    if (verb.exception === "iku") {
      te = { japanese: `${verb.stem}って`, romaji: "itte", bangla: "ইত্তে" };
      past = { japanese: `${verb.stem}った`, romaji: "itta", bangla: "ইত্তা" };
    }
  } else if (verb.exception === "suru") {
    te = { japanese: "して", romaji: "shite", bangla: "শিতে" };
    past = { japanese: "した", romaji: "shita", bangla: "শিতা" };
    negative = { japanese: "しない", romaji: "shinai", bangla: "শিনাই" };
    masuStem = { japanese: "し", romaji: "shi", bangla: "শি" };
  } else if (verb.exception === "kuru") {
    te = { japanese: "来て", romaji: "kite", bangla: "কিতে" };
    past = { japanese: "来た", romaji: "kita", bangla: "কিতা" };
    negative = { japanese: "来ない", romaji: "konai", bangla: "কোনাই" };
    masuStem = { japanese: "来", romaji: "ki", bangla: "কি" };
  } else {
    throw new Error(`Unsupported Japanese verb class: ${verb.class}`);
  }

  const pastNegative: ConjugatedReading = {
    japanese: replaceSuffix(negative.japanese, "ない", "なかった"),
    romaji: replaceSuffix(negative.romaji, "nai", "nakatta"),
    bangla: replaceSuffix(negative.bangla, "নাই", "নাকাত্তা"),
  };
  const tai: ConjugatedReading = {
    japanese: `${masuStem.japanese}たい`,
    romaji: `${masuStem.romaji}tai`,
    bangla: `${masuStem.bangla}তাই`,
  };
  const masu: ConjugatedReading = {
    japanese: `${masuStem.japanese}ます`,
    romaji: `${masuStem.romaji}masu`,
    bangla: `${masuStem.bangla}মাসু`,
  };

  return {
    "nonpast-positive": dictionary,
    "nonpast-negative": negative,
    "past-positive": past,
    "past-negative": pastNegative,
    dictionary,
    "te-form": te,
    "nai-form": negative,
    "tai-form": tai,
    "polite-positive": masu,
    "polite-negative": {
      japanese: `${masuStem.japanese}ません`,
      romaji: `${masuStem.romaji}masen`,
      bangla: `${masuStem.bangla}মাসেন`,
    },
    "polite-past-positive": {
      japanese: `${masuStem.japanese}ました`,
      romaji: `${masuStem.romaji}mashita`,
      bangla: `${masuStem.bangla}মাশিতা`,
    },
    "polite-past-negative": {
      japanese: `${masuStem.japanese}ませんでした`,
      romaji: `${masuStem.romaji}masen deshita`,
      bangla: `${masuStem.bangla}মাসেন দেশিতা`,
    },
    request: {
      japanese: `${te.japanese}ください`,
      romaji: `${te.romaji} kudasai`,
      bangla: `${te.bangla} কুদাসাই`,
    },
    invitation: {
      japanese: `${masuStem.japanese}ましょう`,
      romaji: `${masuStem.romaji}mashou`,
      bangla: `${masuStem.bangla}মাশোও`,
    },
    permission: {
      japanese: `${te.japanese}もいいです`,
      romaji: `${te.romaji} mo ii desu`,
      bangla: `${te.bangla} মো ইই দেশু`,
    },
    prohibition: {
      japanese: `${te.japanese}はいけません`,
      romaji: `${te.romaji} wa ikemasen`,
      bangla: `${te.bangla} ওয়া ইকেমাসেন`,
    },
  };
}

function formatMeaning(
  template: string,
  verb: Verb,
): string {
  const replacements: Record<string, string> = {
    base: verb.meaning.english.base,
    present: verb.meaning.english.present,
    past: verb.meaning.english.past,
    baseBangla: verb.meaning.bangla.base,
    presentBangla: verb.meaning.bangla.present,
    futureBangla: verb.meaning.bangla.future,
    pastBangla: verb.meaning.bangla.past,
    negativePresentBangla: verb.meaning.bangla.negativePresent,
    negativeFutureBangla: verb.meaning.bangla.negativeFuture,
    pastNegativeBangla: verb.meaning.bangla.pastNegative,
    wantBangla: verb.meaning.bangla.want,
    teBangla: verb.meaning.bangla.te,
    requestBangla: verb.meaning.bangla.request,
    invitationBangla: verb.meaning.bangla.invitation,
    permissionBangla: verb.meaning.bangla.permission,
    prohibitionBangla: verb.meaning.bangla.prohibition,
  };

  return template.replace(/\{\{(\w+)\}\}/g, (placeholder, key: string) => {
    const value = replacements[key];
    if (value === undefined) {
      throw new Error(`Missing verb meaning value: ${key}`);
    }
    return value;
  });
}

function buildRows(verb: Verb): GrammarTableRow[] {
  const forms = getVerbForms(verb);

  return formMeaningData.map((form) => {
    const conjugation = forms[form.id];
    if (!conjugation) {
      throw new Error(`Missing conjugation for form: ${form.id}`);
    }
    return {
      id: form.id,
      label: form.label,
      japanese: conjugation.japanese,
      romaji: conjugation.romaji,
      bangla: conjugation.bangla,
      meaningEnglish: formatMeaning(form.meaningEnglish, verb),
      meaningBangla: formatMeaning(form.meaningBangla, verb),
    };
  });
}

export default function VerbConjugationSection() {
  const [selectedVerbId, setSelectedVerbId] = useState(verbData[0].id);
  const selectedVerb = verbData.find((verb) => verb.id === selectedVerbId);

  if (!selectedVerb) {
    throw new Error(`Unknown N5 verb selection: ${selectedVerbId}`);
  }

  return (
    <section className="forms-content-section" id="verb-forms">
      <div className="forms-section-heading">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          BUILD YOUR FIRST VERB FORMS
        </p>
        <h2>Verb forms &amp; conjugation</h2>
        <p>
          Select a verb to see how its form changes. The rules below handle
          Ichidan, Godan, and irregular verbs, including 行く → 行って.
        </p>
      </div>
      <div className="forms-verb-selector">
        <label htmlFor="n5-verb-select">Choose a verb</label>
        <select
          id="n5-verb-select"
          onChange={(event) => setSelectedVerbId(event.target.value)}
          value={selectedVerbId}
        >
          {verbData.map((verb) => (
            <option key={verb.id} value={verb.id}>
              {verb.label} — To {verb.englishVerb}
            </option>
          ))}
        </select>
      </div>
      <GrammarTable
        rows={buildRows(selectedVerb)}
        subtitle={`${selectedVerb.label} · To ${selectedVerb.englishVerb}`}
        title="Conjugation patterns"
      />
    </section>
  );
}
