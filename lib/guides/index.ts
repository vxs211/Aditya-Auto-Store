import { MORE_GUIDES } from "./more";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  // Numbered steps shown after the paragraphs. Text may hold [label](/path) links.
  steps?: string[];
}

export type GuideDraft = Omit<Guide, "published">;

export interface Guide {
  description: string;
  faqs?: { answer: string; question: string }[];
  // Short text printed on the post's picture.
  headline: string;
  // A word that picks the scooter photo: the first model whose name contains it. Otherwise the photo cycles.
  photo?: string;
  // Day the post went up, as YYYY-MM-DD. Set by the schedule below, not written by hand.
  published: string;
  sections: GuideSection[];
  slug: string;
  summary: string;
  title: string;
}

// Written for people searching before they buy. Claims stay general or come from our own range and materials.
const ORIGINAL_GUIDES: GuideDraft[] = [
  {
    description:
      "How to check your scooter's model and year, and find leg guards, bumpers and other stainless steel accessories made to fit it.",
    sections: [
      {
        heading: "Start with the exact model name and year",
        paragraphs: [
          "Accessories are shaped to the body of one scooter, and the body changes between generations. An Activa 3G, 4G or 5G is not an Activa 6G, and an Activa 125 Next Gen 2025 is different again. The model name on your registration papers or the badge on the scooter, plus the year it was bought, is the safest starting point.",
          "If your scooter is sold in more than one version, such as an old model and a new model of the same name, note which one you have before you order.",
        ],
      },
      {
        heading: "Browse by model, not by part",
        paragraphs: [
          "Searching for a part name alone, like leg guard or bumper, gives results for many different scooters. It is faster to pick your brand and then your model, so that everything you see was made for it. On this store, open Shop by model, choose your brand, then your scooter.",
          "We cover 44 scooter models across nine brands, including Honda, TVS, Suzuki, Hero, Yamaha, Bajaj Chetak and electric scooters from Ampere, Ola Electric and Hero Electric.",
        ],
      },
      {
        heading: "Check the product title",
        paragraphs: [
          "Each product title names the model it fits. Before adding to the cart, read it against your scooter, including the generation or year if it is shown.",
        ],
      },
      {
        heading: "When two versions look alike",
        paragraphs: [
          "Message us your scooter's name and year, with a photo if you can. We make these parts ourselves in Ahmedabad and can tell you which one fits.",
        ],
      },
    ],
    headline: "Find parts that fit your scooter",
    slug: "find-accessories-for-your-scooter",
    summary: "Check the model name and year, browse by model, and read the product title.",
    title: "How to find scooter accessories that fit your model",
  },
  {
    description:
      "Why stainless steel scooter accessories last longer than coated ones, what to look for when you buy, and how to care for them.",
    sections: [
      {
        heading: "Where coated accessories fail",
        paragraphs: [
          "Many accessories are made of ordinary steel with chrome plating or paint on top. The coating looks good when new. A stone chip, a scrape or a fall breaks through it, and once bare steel is exposed to rain, mud and humidity, rust starts at that spot and spreads under the coating.",
        ],
      },
      {
        heading: "Why stainless steel behaves differently",
        paragraphs: [
          "Stainless steel is the same metal all the way through, with no coating to chip. A scratch does not expose a weaker layer underneath. That is why it is the common choice for parts that stay outdoors and take knocks.",
          "Our accessories are made from Jindal 202 stainless steel, chosen for strength and for high resistance to heat and chemicals.",
        ],
      },
      {
        heading: "What to check when you buy",
        paragraphs: [
          "Ask what the part is made of, and whether it is stainless throughout or plated. Look at the weld joints and edges, which should be smooth and even. Check that the part is made for your model so it sits flush without being forced.",
          "Our parts carry a manufacturing mark and the date they were made, so you can see what you received.",
        ],
      },
      {
        heading: "Looking after it",
        paragraphs: [
          "Stainless steel needs very little care. Rinse off mud and road dirt, wipe it dry, and clean it with mild soap and a soft cloth. Avoid harsh scouring pads, which scratch the finish.",
        ],
      },
    ],
    headline: "Stainless steel or coated?",
    slug: "stainless-steel-vs-coated-scooter-accessories",
    summary: "Why coated parts rust once chipped, and what to look for in stainless steel.",
    title: "Stainless steel vs coated scooter accessories: what lasts",
  },
  {
    description:
      "What a leg guard, bumper, front guard, side stand and ladies step each do on a scooter, and how to choose between them.",
    sections: [
      {
        heading: "Leg guard",
        paragraphs: [
          "A leg guard fits around the front of the scooter near your legs. It takes the contact in a low speed fall or a nudge in traffic, so the body panels are less likely to be scratched or cracked. It does not make a scooter crash proof, and it is not a substitute for a helmet and careful riding.",
        ],
      },
      {
        heading: "Bumper and front guard",
        paragraphs: [
          "A bumper protects the front of the scooter in parking knocks and light impacts. A front guard, sometimes sold with beading along the edge, covers and finishes the front panel. Both are mostly about keeping the paint and plastics in good condition.",
        ],
      },
      {
        heading: "Side stand and ladies step",
        paragraphs: [
          "A side stand holds the scooter upright when parked. A ladies step adds a place to rest the feet and makes it easier to get on and off. Both are fitted to a particular model, so the model has to match.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Start with the problem you want to solve. If you park in tight spaces, a bumper helps. If you ride in busy traffic and worry about scrapes on the front, look at a leg guard. If you want a finished look, choose beading and a front guard.",
          "Whichever you pick, buy the one made for your exact model, and choose stainless steel so it does not rust where the finish gets scratched.",
        ],
      },
    ],
    headline: "Leg guard, bumper or front guard?",
    slug: "scooter-leg-guard-bumper-front-guard-explained",
    summary: "What each guard protects, and which one suits how you ride and park.",
    title: "Leg guard, bumper and front guard: what each one does",
  },
];

// Four posts a month, newest first, so a new post added at the top moves every date down the schedule. November
// 2026 has only reached the 5th, so its four fall on 5, 4, 2 and 1; earlier months use the 25th, 18th, 11th and 4th.
const MONTH_DAYS = [25, 18, 11, 4];
const NOVEMBER_DAYS = [5, 4, 2, 1];

function scheduledDate(index: number): string {
  const monthsBack = Math.floor(index / 4);
  const slot = index % 4;
  const day = (monthsBack === 0 ? NOVEMBER_DAYS : MONTH_DAYS)[slot] ?? 1;
  const date = new Date(Date.UTC(2026, 10 - monthsBack, day));
  return date.toISOString().slice(0, 10);
}

export const GUIDES: Guide[] = [...MORE_GUIDES, ...ORIGINAL_GUIDES].map((draft, index) => ({
  ...draft,
  published: scheduledDate(index),
}));

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
