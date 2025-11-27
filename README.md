# Quizquake

**QuizQuake** är ett intensivt och snabbt frågespel där spelaren utmanas att svara rätt på så många frågor som möjligt under tidspress. Projektet är utvecklat som en inlämningsuppgift i kursen [Ange kursnamn om relevant] med fokus på Vanilla JavaScript, prestanda och SEO.

🔗 **Länk till spelet:** https://quizquake.netlify.app/

## 👥 Gruppmedlemmar
  * Joakim
  * Christian
  * Ernest
  * Osman 
  * Andreas

-----

## 🎮 Om Applikationen

QuizQuake är byggt utan ramverk (Vanilla JS) och använder en komponentbaserad arkitektur.

**Hur det fungerar:**

1.  **Välj kategori:** Spelaren väljer mellan fyra kategorier: *Sport, Internet, Kultur* eller *Barnfrågor*.
2.  **Spela:** Spelet består av "Sant eller Falskt"-frågor.
3.  **Tidspress:** Du har 60 sekunder på dig. Varje rätt svar ger poäng.
4.  **Game Over:** Spelet tar slut när tiden går ut eller om du svarar fel.
5.  **Highscore:** Resultatet sparas lokalt och spelaren kan se om de platsar på topplistan.

-----

## 🛠 Teknisk Beskrivning & Kravuppfyllnad

Vi har utvecklat applikationen enligt följande kravspecifikation:

### 1\. Arbetssätt & Versionshantering

  * **Git Workflow:** Vi har arbetat i ett gemensamt repo där all utveckling skett via *feature-branches*.
  * **Code Reviews:** Vi har använt Pull Requests (PR) för att merga kod till `dev`, där minst en annan gruppmedlem har granskat och godkänt koden innan merge.
  * **Projektledning:** Vi har administrerat uppgifter via [ Notion ].

### 2\. Funktionalitet (Vanilla JS)

  * **Timer:** En global speltimer (`timerService.js`) hanterar nedräkningen på 60 sekunder och avslutar spelet automatiskt.
  * **LocalStorage:** Vi sparar och hämtar highscores via `localStorage` så att användarens resultat finns kvar mellan besök (`highscoreAdapter.js`).
  * **JSON-data:** Alla frågor ligger separerade i JSON-filer under `/data` och hämtas asynkront med `fetch()` när en kategori väljs.
  * **Responsivitet:** Sidan har tre brytpunkter och använder moderna CSS-tekniker som *Container Queries* och CSS-variabler för att anpassa layouten från mobil till desktop.

### 3\. SEO & Prestanda

  * **SEO:** Vi har implementerat semantisk HTML och Open Graph-taggar (OG) för att säkerställa att länkar ser bra ut när de delas på sociala medier.
  * **Prestanda:**
      * Vi använder **Vite** för att bundla och minifiera koden.
      * CSS är uppdelat i lager (`layers`) för effektiv rendering.
      * Bilder och assets laddas effektivt.
  * **Google Analytics:** Vi har implementerat händelsespårning via `gtag.js`. Detta laddas först efter att användaren gett samtycke via vår cookie-banner, i enlighet med GDPR.

### 4\. Validering & Code Quality

  * Inga fel i konsolen vid körning.
  * HTML/CSS validerat enligt W3C-standard.
  * Vi har använt en modulär filstruktur (Components, Modules, Core) för att hålla koden ren och underhållbar.

-----

## 📂 Projektstruktur

```text
/src
  /components    # UI-komponenter (ScoreDisplay, Question, etc.)
  /core          # Kärnlogik (Renderer, EventBus)
  /modules       # spellogik (GameService, AudioEngine, Timer)
  /styles        # CSS (uppdelat i Layers: Base, Tokens, Components)
/data            # JSON-filer med frågor
/assets          # Bilder och Ljudfiler
index.html       # Startpunkt
```

## 🚀 Hur du kör projektet lokalt

För att köra projektet på din dator behöver du ha Node.js installerat.

1.  Klona repot:
    ```bash
    git clone [LÄNK TILL REPO]
    ```
2.  Installera beroenden:
    ```bash
    npm install
    ```
3.  Starta utvecklingsservern:
    ```bash
    npm run dev
    ```

-----

## 🧠 Reflektion & Utvärdering

### Styrkor i vårt arbete

  * **Arkitektur:** Vi är nöjda med vår *Event Bus*-lösning som frikopplar logiken. Det gör att `GameService` inte behöver känna till UI-komponenterna direkt, utan de lyssnar bara på tillståndsförändringar via vår `createRenderer`.
  * **Samarbete:** Genom att dela upp ansvarsområden (t.ex. en person på CSS-struktur, en på spellogik, en på innehåll) minimerade vi merge-konflikter. Joakim håller dock inte med. 
  * **Design:** Vi lade tid på att skapa en enhetlig "Retro Arcade"-känsla med typsnitt, färger och ljudeffekter.

### Utmaningar & Förbättringspotential

  * **State Management:** Att hantera tillståndet (State) utan ett ramverk som React var utmanande. Vi byggde en egen enkel *renderer*, men vid större skalning hade koden kunnat bli svårläst.
  * **Audio Context:** Webbläsarnas policy för autouppspelning av ljud krävde att vi implementerade logik för att endast starta ljud efter användarinteraktion.
  * **Prestanda:** Vi skulle kunna förbättra prestandan ytterligare genom att konvertera PNG-bilderna till WebP-format.

-----

*Projektet är skapat höstterminen 2025.*

