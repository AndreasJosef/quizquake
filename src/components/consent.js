// Basic Google Analytics loader
function loadAnalytics() {
    const GA_ID = "G-MPQXFLMCEF"; // gtag ID

    // Load analytics script only after consent
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID);
}

export function cookiePopup() {
    // Create overlay   style
    const overlay = document.createElement("div");
    overlay.id = "cookie-overlay";
    overlay.className = "cookie-overlay hidden";

    // Create banner
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className = "cookie-banner hidden";

    banner.innerHTML = `
        <div class="cookie-content">
            <p>
                Vi använder valfria analyscookies för att förstå hur användare spelar. Analys är inaktiverad tills du 
                godkänner. Läs vår integritetspolicy för att få veta vad vi samlar in och hur du väljer bort det.
            </p>

            <div class="cookie-buttons">
                <button id="accept-cookies" class="cookie-btn accept">Tillåt</button>
                <button id="reject-cookies" class="cookie-btn reject">Nej tack!</button>
            </div>
        </div>
    `;

    // Buttons
    const acceptBtn = banner.querySelector("#accept-cookies");
    const rejectBtn = banner.querySelector("#reject-cookies");

    // Check consent
    const stored = localStorage.getItem("analytics_consent");

    // Show popup tills consent är "yes"
    if (stored !== "yes") {
        setTimeout(() => {
            overlay.classList.remove("hidden");
            banner.classList.remove("hidden");
        }, 50);
    } else {
        loadAnalytics();
    }

    // Button handlers
    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("analytics_consent", "yes");
        loadAnalytics();
        banner.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    rejectBtn.addEventListener("click", () => {
        localStorage.setItem("analytics_consent", "no");
        banner.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    return { banner, overlay };
}
