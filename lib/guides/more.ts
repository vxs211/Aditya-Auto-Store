import type { GuideDraft } from "./index";
import { MODEL_GUIDES } from "./models";

// How-to and buying advice. Prices are what the parts cost on this store in November 2026 and can change.
export const MORE_GUIDES: GuideDraft[] = [
  {
    description:
      "How to fit a stainless steel crash guard or bumper on your scooter at home: the tools, the five steps and the checks before you ride.",
    faqs: [
      {
        answer:
          "Usually a spanner or socket set and a screwdriver. Keep a soft cloth to protect the paint and a torch to see the mounting points.",
        question: "What tools do I need?",
      },
      {
        answer:
          "Many riders fit a guard themselves. If you are unsure at any step, or the part will not line up, stop and message us or take it to a mechanic.",
        question: "Do I need a mechanic?",
      },
      {
        answer:
          "Put a soft cloth between the guard and the body while you work, and never force a part into place.",
        question: "Will it scratch my paint?",
      },
      {
        answer:
          "Check the model name and year against the product title, then message us a photo of your scooter and the part.",
        question: "What if it does not fit?",
      },
    ],
    headline: "Fit a guard at home",
    photo: "Activa",
    sections: [
      {
        heading: "Check you have the right guard",
        paragraphs: [
          "Our guards are made for one scooter model, so start by matching the part to your scooter. Read the product title against your scooter's name and year. On an Activa 6G, for example, use the [Activa 6G parts](/collections/activa-6g), not the ones for the Activa 3G, 4G or 5G.",
          "A part made for your model goes on without cutting or drilling. If it only fits when forced, stop: it is probably the wrong one.",
        ],
      },
      {
        heading: "Gather the right tools",
        paragraphs: [
          "You usually need a spanner or socket set and a screwdriver. A soft cloth protects the paint, and a torch helps you see the mounting points. Parts listed with fitting come with their bolts and brackets: keep them in one tray so none are lost.",
        ],
      },
      {
        heading: "Prepare your scooter",
        paragraphs: [
          "Park on level ground, switch the engine off and put the scooter on its stand. Wipe the area where the guard will sit, so dirt does not get trapped under it.",
        ],
      },
      {
        heading: "Fit it, step by step",
        paragraphs: ["Take your time. Most of the work is lining the part up."],
        steps: [
          "Find the mounting points on the frame or body. They are the existing holes and brackets the guard is made to use.",
          "Hold the guard in position and check that it lines up with those points before you fit anything.",
          "Put the bolts and brackets in loosely, by hand first. Do not tighten any of them yet.",
          "Step back and check the alignment from the front and the side. The guard should sit evenly, with the same gap on both sides.",
          "Tighten each fastener a little at a time, moving from one to the next, until all are firm. Do not overtighten.",
        ],
      },
      {
        heading: "Check before you ride",
        paragraphs: [
          "Turn the handlebar from full left to full right: nothing should touch the guard. Check that no cable, wire or brake line is pinched or pulled. Press on the guard and shake it gently, and it should not move. Take a short, slow ride and check the bolts again afterwards.",
        ],
      },
    ],
    slug: "how-to-install-a-scooter-guard-at-home",
    summary: "The tools, five simple steps and the checks to make before you ride.",
    title: "How to install a scooter guard at home: a step-by-step guide for beginners",
  },
  {
    description:
      "What a crash guard does and does not do for a scooter in a low-speed fall, and how to choose one that fits and lasts.",
    faqs: [
      {
        answer:
          "A guard protects the scooter's body in a fall. It does not protect the rider the way a helmet and riding gear do.",
        question: "Do crash guards make riding safer?",
      },
      {
        answer:
          "Not on their own. A guard helps most in low-speed falls and knocks, such as a tip-over while parking or a slow slide.",
        question: "Will a guard save my scooter in any crash?",
      },
    ],
    headline: "Do crash guards really protect?",
    photo: "Honda",
    sections: [
      {
        heading: "What a crash guard is for",
        paragraphs: [
          "A crash guard stands a little way off the body of the scooter. In a low-speed fall or a knock, the guard takes the first contact, so the body panels, indicators and lights are less likely to be scratched or cracked.",
        ],
      },
      {
        heading: "What it will not do",
        paragraphs: [
          "A guard does not make a crash safe. It protects the scooter, not you, and it is no substitute for a helmet and careful riding. In a hard, fast crash, no accessory can promise the scooter will come through unharmed.",
        ],
      },
      {
        heading: "Why fit and material matter",
        paragraphs: [
          "A guard that does not match your model can sit loose, twist in a fall and press on the body instead of protecting it. That is why ours are made for one model each. The material matters too: stainless steel is the same metal all the way through, so a scratch does not open the way for rust the way it can on a plated part.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Pick your scooter first, then the guard. Open [Shop by model](/collections), choose your brand and model, and you will see the front, side and rear guards made for it. If you are unsure which suits how you ride and park, message us your scooter and its year.",
        ],
      },
    ],
    slug: "do-crash-guards-really-protect-your-scooter",
    summary: "What a guard protects, what it does not, and why fit matters.",
    title: "Do crash guards really protect your scooter?",
  },
  {
    description:
      "How much a scooter accessory costs in 2026: price ranges for bumpers, crash guards, rear guards, floor mats and full kits from our own range.",
    faqs: [
      {
        answer: "Yes. For fifty pieces or more, message us for pricing.",
        question: "Is there a bulk price?",
      },
      {
        answer:
          "Prices are those on this store in November 2026. They can change, so check the product page for the current price.",
        question: "Will these prices change?",
      },
    ],
    headline: "What accessories cost in 2026",
    photo: "Jupiter",
    sections: [
      {
        heading: "What to expect to pay",
        paragraphs: [
          "These are the prices of our own parts on this store in November 2026. Most single parts fall in a narrow band, and the model decides where in the band yours sits.",
          "Front mud guard bumpers are ₹814 for most models, and start at ₹600. Side or front crash guard kits run from ₹857 to ₹2,196, with half costing ₹1,400 or less. Rear guards with fitting cost ₹1,050 to ₹2,284. Floor mats are ₹416 to ₹461. Leg guards run from ₹718 to ₹1,364.",
          "Full accessories kits cost ₹2,499 to ₹6,000, and most sit between ₹3,500 and ₹3,900.",
        ],
      },
      {
        heading: "Why the same part costs different amounts",
        paragraphs: [
          "A part is shaped to one scooter, so a larger or more complex scooter needs more steel and more fittings. A rear guard for the Activa 3G, 4G or 5G is ₹1,350, while the one for the Activa 125 Next Gen 2025 is ₹2,092.",
        ],
      },
      {
        heading: "Kit or single parts",
        paragraphs: [
          "A kit usually works out cheaper than buying the parts one by one. For the Activa 6G, the floor mat, side crash guard kit, front mud guard bumper and rear guard come to ₹3,988 separately, while the [Activa 6G Accessories Kit](/products/activa-6g-accessories-kit) is ₹3,552. Check the kit's page for what it includes.",
        ],
      },
      {
        heading: "Buying in bulk",
        paragraphs: [
          "If you are a dealer or fit out several scooters, fifty pieces or more can be priced separately. [Message us](/contact) with the models and quantities.",
        ],
      },
    ],
    slug: "scooter-accessories-price-2026",
    summary: "Real price ranges for bumpers, guards, mats and kits from our range.",
    title: "Scooter accessories prices in 2026: what to expect to pay",
  },
  {
    description:
      "The accessories to buy first for a new scooter, in the order that protects it best, and how to pick the right ones for your model.",
    headline: "New scooter, first accessories",
    photo: "Destini",
    sections: [
      {
        heading: "Start with the front",
        paragraphs: [
          "The front of a scooter takes the most knocks in traffic and in tight parking. A front mud guard bumper is the smallest, most useful first part, and for most models it costs ₹814.",
        ],
      },
      {
        heading: "Then the sides and the rear",
        paragraphs: [
          "A side crash guard kit protects the body panels and lights if the scooter tips over. A rear guard covers the back panels and tail lights. Both are made for your exact model, so pick them from your model's page.",
        ],
      },
      {
        heading: "A floor mat for daily use",
        paragraphs: [
          "A floor mat keeps the floor clean and is the cheapest part on the list: ₹461 for most models, in colour.",
        ],
      },
      {
        heading: "Or take the whole set",
        paragraphs: [
          "If you want everything at once, look for your model's accessories kit. It is usually cheaper than buying the parts one by one. Go to [Shop by model](/collections), pick your scooter, and check the name and year match yours before you order.",
        ],
      },
    ],
    slug: "accessories-to-buy-first-for-a-new-scooter",
    summary: "What to buy first, in the order that protects a new scooter best.",
    title: "Just bought a new scooter? The accessories to get first",
  },
  {
    description:
      "Buying scooter accessories from a local shop or online: what each does well, and the checks that keep you from buying the wrong part.",
    headline: "Local shop or online?",
    sections: [
      {
        heading: "What a local shop does well",
        paragraphs: [
          "You can hold the part, see the finish and take it away the same day. A good shop will also look at your scooter and tell you what fits. The limit is stock: a shop usually carries parts for the popular models only.",
        ],
      },
      {
        heading: "What buying online does well",
        paragraphs: [
          "You can see the whole range, listed under each scooter model, and compare parts and prices without travelling. The risk is ordering the wrong version, so the checks below matter more.",
        ],
      },
      {
        heading: "Checks that work either way",
        paragraphs: [
          "Match the part to your scooter's exact name and year. Ask what it is made of and whether it is stainless throughout or plated. Look for a manufacturing mark and a date on the part. And ask how to reach the seller if it does not fit.",
          "Ours carry a manufacturing mark and the date they were made. If you are unsure which part is yours, [message us](/contact) your scooter and its year.",
        ],
      },
    ],
    slug: "local-shop-or-online-scooter-accessories",
    summary: "What each way of buying does well, and the checks that avoid a wrong part.",
    title: "Local shop or online: where to buy scooter accessories",
  },
  {
    description:
      "How a scooter accessory is made in our own unit in Ahmedabad: the steel, the model tooling, the checks at each stage and the packing.",
    headline: "Inside our factory",
    sections: [
      {
        heading: "Our own unit in Ahmedabad",
        paragraphs: [
          "We have made two wheeler accessories in Ahmedabad, Gujarat since 2006. The parts you buy from us are made in our own unit, not bought in and relabelled.",
        ],
      },
      {
        heading: "The steel and the tooling",
        paragraphs: [
          "We use Jindal 202 stainless steel, chosen for its strength and its resistance to heat and chemicals. Dies and fittings are made for each scooter model, which is why a part is listed under one model and goes on without cutting or drilling.",
        ],
      },
      {
        heading: "Checked as it is made",
        paragraphs: [
          "The people making each part check it as they go, and it is checked again before it is packed. Each part carries our manufacturing mark and the date it was made, so you can see what you received.",
        ],
      },
      {
        heading: "Packing and bulk orders",
        paragraphs: [
          "Parts are packed in non woven and plastic bags. A standard bundle holds 20 sets of three. If you want fifty pieces or more, [message us](/contact) for pricing.",
        ],
      },
    ],
    slug: "inside-our-factory-how-a-scooter-part-is-made",
    summary: "The steel, the model tooling, the checks and the packing.",
    title: "Inside our factory: how a scooter part is made",
  },
  {
    description:
      "How accessory kits are put together: which guards go on which part of the scooter, and how combinations work for protection and daily use.",
    headline: "Accessory combos that work",
    photo: "Access",
    sections: [
      {
        heading: "The front pair",
        paragraphs: [
          "A front mud guard bumper with a side or front crash guard kit covers the front and the sides, where most knocks happen. It is the combination to start with.",
        ],
      },
      {
        heading: "The all-round set",
        paragraphs: [
          "Add a rear guard with fitting, and the scooter is covered front, sides and back. For the Activa 6G that means the [front mud guard bumper](/products/activa-6g-front-mud-guard-bumper), the [side crash guard kit](/products/activa-6g-side-crash-guard-right-and-left-kit) and the [rear guard](/products/activa-6g-all-round-guard-with-fitting).",
        ],
      },
      {
        heading: "Add a floor mat",
        paragraphs: [
          "A [floor mat](/products/activa-6g-floor-mat) does not protect the body, but it keeps the floor clean, and at ₹461 it completes a daily-use set.",
        ],
      },
      {
        heading: "Or buy it as a kit",
        paragraphs: [
          "Most models have an accessories kit that bundles the parts for that scooter, usually at a lower price than the parts bought one by one. Open your model from [Shop by model](/collections) and look for the kit.",
        ],
      },
    ],
    slug: "best-scooter-accessory-combos",
    summary: "Which parts work together, from a front pair to a full kit.",
    title: "The best scooter accessory combos for protection and daily use",
  },
  {
    description:
      "Why quality matters in scooter accessories: how material, fit and finishing decide how long a part lasts, and why a good part keeps its value.",
    headline: "Why quality matters",
    photo: "Suzuki",
    sections: [
      {
        heading: "Material decides how long it lasts",
        paragraphs: [
          "A part is outdoors in sun, rain and road dirt every day. Stainless steel stays the same metal through its thickness, so a scratch does not start rust. A coated part can look the same on day one and chip by the end of the first monsoon.",
        ],
      },
      {
        heading: "Fit decides how well it works",
        paragraphs: [
          "A guard that matches your model sits snug and takes a knock the way it was designed to. A guard that only nearly fits can rattle loose or press on the body.",
        ],
      },
      {
        heading: "Why it pays to buy once",
        paragraphs: [
          "A well made part is one you fit and forget, and it keeps the scooter looking cared for. That helps when you sell. A part that rusts or loosens within a year costs you twice.",
        ],
      },
      {
        heading: "What to look for",
        paragraphs: [
          "Ask what it is made of, check the welds and edges are smooth, and look for a manufacturing mark and date. See how we make ours in [our factory story](/guides/inside-our-factory-how-a-scooter-part-is-made).",
        ],
      },
    ],
    slug: "why-quality-matters-in-scooter-accessories",
    summary: "How material, fit and finish decide how long a part lasts.",
    title: "Why quality matters in scooter accessories",
  },
  {
    description:
      "Why footrests and leg guards matter on a two wheeler, and which ones we make, with their prices.",
    headline: "Footrests and leg guards",
    photo: "TVS",
    sections: [
      {
        heading: "What a footrest does",
        paragraphs: [
          "A footrest takes your feet and your weight every ride, so it has to be strong and fit the mounting points properly. A loose or bent one is more than an annoyance.",
        ],
      },
      {
        heading: "What a leg guard does",
        paragraphs: [
          "A leg guard fits around the front of the bike near your legs and takes contact in a low-speed fall or a nudge in traffic, so the body and the lights are less likely to be damaged.",
        ],
      },
      {
        heading: "What we make",
        paragraphs: [
          "Our footrests include the [TVS Orbiter footrest with fitting](/products/tvs-orbiter-footrest-with-fitting-black) at ₹2,089 and the [FZ footrest](/products/fz-ver-4-0-ver-3-0-fz-x-footrest) at ₹922. Leg guards include the [Honda Shine 100 leg guard](/products/honda-shine-100-leg-guard) and the [Unicorn leg guard](/products/unicorn-leg-guard) at ₹718 each, and the [FZ leg guard](/products/fz-ver-4-0-ver-3-0-fz-x-leg-guard) at ₹1,364.",
          "Check the model name and year before you order, as with all our parts.",
        ],
      },
    ],
    slug: "footrests-and-leg-guards-explained",
    summary: "What a footrest and a leg guard do, and the ones we make.",
    title: "Why durable footrests and leg guards matter",
  },
  {
    description:
      'Common myths about scooter accessories, from "a guard ruins the look" to "all guards are the same", and what is actually true.',
    headline: "Myth or reality?",
    photo: "Yamaha",
    sections: [
      {
        heading: '"A guard ruins the look"',
        paragraphs: [
          "A badly fitting guard can. One made for your model follows the lines of the scooter, and stainless steel keeps its shine.",
        ],
      },
      {
        heading: '"All guards are the same"',
        paragraphs: [
          "They are not. Material, thickness, the welds and the fit all differ. The easy test is to check the part is made for your exact model and year.",
        ],
      },
      {
        heading: '"A guard makes the scooter crash-proof"',
        paragraphs: [
          "No part does. A guard protects the body in low-speed falls and knocks. Read more in [do crash guards really protect your scooter](/guides/do-crash-guards-really-protect-your-scooter).",
        ],
      },
      {
        heading: '"Stainless steel never marks"',
        paragraphs: [
          "It resists rust far better than a plated part, but it can still be scratched. A rinse and a wipe now and then keeps it looking good.",
        ],
      },
    ],
    slug: "myths-about-scooter-accessories",
    summary: "Four common beliefs about accessories, and what is true.",
    title: "Myth vs reality: what people get wrong about scooter accessories",
  },
  {
    description:
      "How to protect your scooter in the monsoon: why stainless steel helps, what to wipe and dry, and which parts take the most water.",
    headline: "Monsoon-ready scooter",
    photo: "Hero",
    sections: [
      {
        heading: "Water finds every weak point",
        paragraphs: [
          "In the monsoon, rain and mud sit in the places where parts meet the body. Plated parts that have chipped are the first to rust there.",
        ],
      },
      {
        heading: "Why stainless steel helps",
        paragraphs: [
          "Our parts are Jindal 202 stainless steel, the same metal through its thickness, with high resistance to heat and chemicals. A scratch does not open the way for rust the way it can on a coating.",
        ],
      },
      {
        heading: "Simple habits",
        paragraphs: [
          "Rinse off mud, wipe the guards dry, and check that bolts are still firm after wet rides. A floor mat keeps water and dirt off the floor, and at ₹461 for most models it is the cheapest upgrade.",
        ],
      },
    ],
    slug: "keep-your-scooter-safe-this-monsoon",
    summary:
      "Why stainless steel helps, and the simple habits that keep a scooter good in the rain.",
    title: "Keeping your scooter and its accessories safe this monsoon",
  },
  {
    description:
      "Accessories worth having for everyday city riding: front and side guards, a rear guard and a floor mat, and how to pick the right ones.",
    headline: "Everyday city riding",
    photo: "Access",
    sections: [
      {
        heading: "The knocks of city riding",
        paragraphs: [
          "Stop and go traffic, tight parking and the odd slow tip-over are what damage a city scooter. Most are low-speed knocks, which is exactly what a guard is for.",
        ],
      },
      {
        heading: "What is worth having",
        paragraphs: [
          "A front mud guard bumper for the front, a side crash guard kit for the sides, a rear guard for the back and a floor mat for daily use cover most of what the city does to a scooter.",
        ],
      },
      {
        heading: "Choose by model",
        paragraphs: [
          "Every part we make is listed under its scooter, so choose your brand and model on [Shop by model](/collections) and you will see only what fits.",
        ],
      },
    ],
    slug: "scooter-accessories-for-everyday-city-riding",
    summary: "The few accessories that cover most of what city riding does to a scooter.",
    title: "Scooter accessories worth having for everyday city riding",
  },
  ...MODEL_GUIDES,
];
