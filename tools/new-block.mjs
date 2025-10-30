// tools/new-block.mjs
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const USAGE = `
Usage:
  npm run new layout <name>
  npm run new component <name>

Examples:
  npm run new layout section
  npm run new component card
`;

// ---- args ----
const [, , type, rawName] = process.argv;
if (!type || !rawName) {
  console.error(USAGE);
  process.exit(1);
}

const validTypes = ["layout", "component"];
if (!validTypes.includes(type)) {
  console.error(`❌ Unknown type "${type}". Use "layout" or "component".\n${USAGE}`);
  process.exit(1);
}

// ---- name helpers ----
const toKebab = (s) =>
  String(s)
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");

const baseName = toKebab(rawName);
const blockName = type === "layout"
  ? (baseName.startsWith("layout-") ? baseName : `layout-${baseName}`)
  : baseName;

// ---- paths ----
const root = path.resolve(__dirname, "..");
const templatesDir = path.join(root, "src", "css", "templates");
const srcTemplate = path.join(templatesDir, `template.${type}.css`);

const destDir = path.join(
  root,
  "src",
  "css",
  "blocks",
  type === "layout" ? "layouts" : "components"
);
const destFile = path.join(destDir, `${blockName}.css`);

// ---- fs checks ----
if (!fs.existsSync(srcTemplate)) {
  console.error(`❌ Missing template: ${path.relative(root, srcTemplate)}`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

if (fs.existsSync(destFile)) {
  console.error(`❌ File already exists: ${path.relative(root, destFile)}`);
  process.exit(1);
}

// ---- copy + replace placeholders ----
const template = fs.readFileSync(srcTemplate, "utf-8");

// replace placeholders based on type
const replaced =
  type === "layout"
    ? template
        .replaceAll("layout-name", blockName)
        .replaceAll("layout-name", blockName) // safety double
    : template
        .replaceAll("component-name", blockName)
        .replaceAll("component-name", blockName); // safety double

fs.writeFileSync(destFile, replaced, "utf-8");

// ---- done ----
const rel = path.relative(root, destFile);
console.log(`✅ Created ${rel}`);
console.log("\nNext steps:");
console.log(
  `  • Import it in: src/css/blocks/${type === "layout" ? "layouts" : "components"}/index.css`
);
console.log(
  `    @import "./${blockName}.css";`
);
