# Modern CSS Starter

A minimal, **content-first starter** built with modern, semantic CSS.
It gives you a professional baseline for **learning, prototyping, or shipping** lightweight pages — without relying on frameworks or utility chaos.


## ⚡️ Quick start

Start a new project in two ways:

### Option A — GitHub Template
1. Click **Use this template** at the top of this repo  
2. Create a new repository from it  
3. Clone your new repo locally and run:

```bash
npm install
npm run dev
````

### Option B — Degit (terminal one-liner)

```bash
npx degit AndreasJosef/modern-css-starter my-new-project
cd my-new-project
npm install
npm run dev
```

This copies the latest version without Git history.


## ✨ Features

* **Content-first workflow** — start with semantic HTML, let layout and design emerge naturally
* **Cascade layers** — predictable structure (`tokens`, `base`, `blocks`, `utilities`)
* **Design tokens** — your single source of truth for colors, spacing, typography, and layout
* **Modern CSS** — container queries, `clamp()`, logical properties, and custom properties
* **Layout + component separation** — layout blocks handle structure, components handle visuals
* **Utility helpers** — small, explicit overrides when you really need them
* **Vite dev server** — instant hot reloads, easy to extend


## 🧱 CSS Architecture

```
tokens → base → blocks → utilities
```

| Layer         | Purpose                         | Examples                                            |
| ------------- | ------------------------------- | --------------------------------------------------- |
| **tokens**    | Global design values            | `--ink-primary`, `--space-4`, `--step-2`            |
| **base**      | Resets & accessibility defaults | `body`, `a`, `:focus-visible`                       |
| **blocks**    | Layout + component blocks       | `.layout-page`, `.layout-section`, `.hero`, `.card` |
| **utilities** | Small helpers                   | `.u-flow`, `.u-center`, `.u-hidden`                 |

> **Layout arranges. Component decorates. Utility fixes.**


## 📂 Project structure

```
src/
└── css/
    ├── app.css            # Entry point for all styles (defines layer order)
    ├── layers/
    │   ├── tokens.css     # Design tokens (colors, type, spacing, layout)
    │   ├── base.css       # Resets, accessibility, defaults
    │   └── utilities.css  # Small helper utilities
    └── blocks/
        ├── layouts/       # Page-level and structural blocks
        ├── components/    # Visual and semantic components
        └── index.css      # Imports all layouts and components
```


## 🚀 Usage

Install dependencies:

```bash
npm install
```

Run the dev server (auto reloads on save):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```


## ⚙️ Create new blocks

You can generate new **layout** or **component** blocks from the command line using the built-in generator script.

### Example

```bash
npm run new layout section
npm run new component card
```

This copies the corresponding boilerplate into:

* Layouts → `src/css/blocks/layouts/`
* Components → `src/css/blocks/components/`

You’ll then import it manually into `src/css/blocks/index.css`:

```css
@import "./layouts/layout-section.css";
@import "./components/card.css";
```


## 💡 Philosophy

Modern CSS Starter helps you **learn CSS by building**, not by memorizing utility classes.

It’s built around a few key ideas:

1. **Tokens** are your design API
2. **Base** sets global defaults
3. **Blocks** are your building units
4. **Utils** let you adjust quickly
5. **Design emerges from content** — not the other way around

Everything is plain CSS — layered, semantic, and understandable at a glance.


## 🧭 Next steps

* Create your first block (`layout-section` or `hero`)
* Iterate, learn, and share!

## 🪪 License

MIT — free to use and adapt.
If you share or remix it, credit is appreciated but not required. 💛


