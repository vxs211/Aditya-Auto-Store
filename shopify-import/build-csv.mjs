// Builds Shopify product-import CSV from the Stonks app data. Run: node build-csv.mjs
import fs from "node:fs";
const D = "/Users/vxs/Stonks/.data/";
const acc = JSON.parse(fs.readFileSync(D + "accessories.json")).items;
const inv = JSON.parse(fs.readFileSync(D + "inventory.json")).items;
const VENDOR = "Aditya Auto Accessories";
const UP = new Set(["OE", "A/C", "LTS", "CB", "SP", "6G", "5G", "D-1", "D-2", "D-3", "2501", "3501", "7D"]);
const FIX = { BURGMA: "Burgman", RITZA: "Rizta", IQUBE: "iQube", NTORQ: "NTorq", RAY_ZR: "Ray ZR" };
const clean = (s) =>
  s.replace(/(\d)CC/gi, "$1cc").replace(/-(?=\d?[A-Z]?\b)/g, (m) => m)
    .split(/\s+/).map((w) => {
      const base = w.replace(/^([A-Z]+)-(\d+[A-Za-z]*)$/, "$1 $2");
      return base.split(" ").map((p) => {
        const u = p.toUpperCase();
        if (FIX[u]) return FIX[u];
        if (UP.has(u)) return u;
        if (/^\d+cc$/i.test(p)) return p.toLowerCase();
        if (/^\d/.test(p)) return u;
        return p[0].toUpperCase() + p.slice(1).toLowerCase();
      }).join(" ");
    }).join(" ").replace("Ray-zr", "Ray ZR");
const cap = (n) => Math.max(0, n | 0);
const rows = [];
const H = ["Handle","Title","Body (HTML)","Vendor","Product Category","Type","Tags","Published","Option1 Name","Option1 Value","Variant SKU","Variant Grams","Variant Inventory Tracker","Variant Inventory Qty","Variant Inventory Policy","Variant Fulfillment Service","Variant Price","Variant Requires Shipping","Variant Taxable","Status"];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const add = (p) => p.variants.forEach((v, i) => rows.push([
  p.handle, i ? "" : p.title, i ? "" : p.body, i ? "" : p.vendor, i ? "" : "Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts",
  i ? "" : p.type, i ? "" : p.tags.join(", "), i ? "" : "false",
  p.opt ?? (p.variants.length > 1 ? "Step Type" : "Title"), v.opt ?? "Default Title", v.sku, 0, "shopify", cap(v.stock), "deny", "manual", "", "true", "true", i ? "" : "draft",
]));

// ---- manufactured ----
const nice = (v) => clean(v);
const groups = {};
for (const a of acc) {
  const common = a.id.includes("common");
  const key = common ? a.id : `${a.vehicle}|${a.component === "FOOTRESS" ? "FOOTRESS" : a.component}|${a.component === "FOOTRESS" ? "" : a.id}`;
  (groups[key] ??= []).push(a);
}
const SHARED = {
  "accessory-common-bumper-activa": ["Activa 6G", "Activa 125"],
  "accessory-common-bumper-chetak-access": ["Chetak 2501", "Chetak 3501", "Access", "iQube"],
};
for (const [k, items] of Object.entries(groups)) {
  const f = items[0], veh = SHARED[f.id] ?? [nice(f.vehicle)];
  const vtxt = veh.join(", ");
  const comp = { FOOTRESS: "Footrest", BUMPER: "Bumper", "CRASH GUARD": "Crash Guard", FITTING: "Fitting Kit" }[f.component];
  const title = f.component === "BUMPER" && veh.length > 1 ? `${comp} for ${vtxt}` : `${vtxt} ${comp}`;
  add({
    handle: slug(title), title, vendor: VENDOR, type: comp,
    body: `<p>${comp} for ${vtxt}. Manufactured by Aditya Auto Accessories.</p>`,
    tags: [...veh, comp, "manufactured"],
    variants: items.map((a) => ({ sku: a.id, stock: a.stock, opt: f.component === "FOOTRESS" ? ({ Without: "Without Step", "Single Step": "Single Step", "Double Step": "Double Step" })[a.variant] : undefined })),
  });
}

// ---- trading ----
const CAT = { mATTING: "Matting", "MATING PREMIUM": "Premium Matting", "MATING 7D": "7D Matting", "MATING AS": "Anti-Skid Matting", "sEAT cOVER": "Seat Cover" };
const seen = new Map();
for (const it of inv) {
  let name = clean(it.product).replace(/\bMating\b\s*/i, "").replace(/\bD (\d)/, "D-$1").trim(), type, title, review = false;
  if (CAT[it.category]) {
    type = name === "Parking Cover" ? "Parking Cover" : CAT[it.category].includes("Matting") ? "Matting" : "Seat Cover";
    title = name === "Parking Cover" ? name : `${name} ${CAT[it.category]}`;
  } else if (it.category === "LEGGUARD & MAIN STAND") {
    type = /main stand/i.test(name) ? "Main Stand" : "Leg Guard";
    title = type === "Main Stand" ? name : `${name} Leg Guard`;
  } else {
    type = /side stand/i.test(name) ? "Side Stand" : "Ladies Step";
    title = name;
    if (!/step|stand/i.test(name)) { title = `${name} Ladies Step / Side Stand`; review = true; }
  }
  if (["Lts", "5G"].includes(name) || /Chetak New Common|Access New/i.test(name)) review = true;
  const vendor = /pathak/i.test(name) ? "Pathak" : /sujal/i.test(name) ? "Sujal" : VENDOR;
  const handle = slug(title);
  if (seen.has(handle)) { seen.get(handle).variants[0].stock += it.currentStock; continue; }
  const grade = ["OE", "Local", "Heavy"].filter((g) => new RegExp(`\\b${g}\\b`, "i").test(name));
  const p = {
    handle, title, vendor, type, body: `<p>${title}.</p>`,
    tags: [name, it.category.replace(/MATING/i, "Matting"), ...grade, "trading", ...(review ? ["needs-review"] : [])],
    variants: [{ sku: slug(it.id).toUpperCase(), stock: it.currentStock }],
  };
  seen.set(handle, p); add(p);
}
fs.writeFileSync(new URL("./products.csv", import.meta.url), [H, ...rows].map((r) => r.map(esc).join(",")).join("\n"));
const neg = [...acc.map((a) => [a.id, a.stock]), ...inv.map((i) => [i.id, i.currentStock])].filter((x) => x[1] < 0);
console.log("rows", rows.length, "products", new Set(rows.map((r) => r[0])).size, "negative stock", neg);
