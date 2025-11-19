/* CONSENT + GTAG LOADER */
const CONSENT_KEY = 'game_consent'; 
const CONSENT_TIMESTAMP = 'game_consent_ts';
const MEASUREMENT_ID = 'G-XXXXXXXXXX'; 

// Stores users consent choice in local storage
function recordConsent(choice) {
  localStorage.setItem(CONSENT_KEY, choice);
  localStorage.setItem(CONSENT_TIMESTAMP, new Date().toISOString());
}

// Return users consent choice 
function getConsent() {
  return localStorage.getItem(CONSENT_KEY);
}

// Creates and connects gtag script
function loadGtag(measurementId) {
  if (window.gtagLoaded) return;

  const s = document.createElement('script');
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  s.async = true; 
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];

  function gtag(){
    dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true });

  window.gtagLoaded = true;
}

/* UI wiring */
document.getElementById('consentAccept').addEventListener('click', () => {

  recordConsent('granted');
  hideConsentModal();
  loadGtag(MEASUREMENT_ID);
});

document.getElementById('consentReject').addEventListener('click', () => {

  recordConsent('denied'); 
  hideConsentModal();
});

/* On load: if already granted, load GA immediately; otherwise show modal */
window.addEventListener('DOMContentLoaded', () => {
  const c = getConsent();
  if (c === 'granted') {
    hideConsentModal();
    loadGtag(MEASUREMENT_ID);
  } else if (c === 'denied') {
    hideConsentModal();
  } // else leave modal visible
});