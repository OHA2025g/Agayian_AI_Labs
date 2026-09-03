import sharp from "sharp";

const src = "docs/parity-screenshots/industries-rebuild/current-1440.png";
const out = "docs/parity-screenshots/industries-rebuild";

const crops = [
  ["sec-overview.png", 1000, 650],
  ["sec-workflows.png", 1650, 400],
  ["sec-cap-prod.png", 2050, 840],
  ["sec-gov-out.png", 2890, 520],
  ["sec-cta-footer.png", 3390, 507],
];

for (const [name, top, height] of crops) {
  await sharp(src)
    .extract({ left: 0, top, width: 1440, height })
    .toFile(`${out}/${name}`);
  console.log(name);
}
