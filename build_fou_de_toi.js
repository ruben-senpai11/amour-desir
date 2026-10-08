const fs = require('fs');
const path = require('path');

console.log('Generating High-Converting Standalone Sales Page for FOU DE TOI, FOLLE DE TOI...');

// Convert local image to base64
function getBase64Image(filePath) {
  try {
    const ext = path.extname(filePath).replace('.', '').toLowerCase();
    const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
    const data = fs.readFileSync(filePath).toString('base64');
    return `data:${mimeType};base64,${data}`;
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message);
    return '';
  }
}

const faviconB64 = getBase64Image('assets/images/favicon.jpg');
const bookCoverB64 = getBase64Image('assets/images/couverture-fou-de-toi.jpg');
const bundleMockupB64 = getBase64Image('assets/images/pack-bundle-mockup.jpg');
const avantApresB64 = getBase64Image('assets/images/avant-apres.jpg');
const temoignageRivaldoB64 = getBase64Image('assets/images/testimonials/temoignage-rivaldo.jpg');
const temoignageGuyAdolpheB64 = getBase64Image('assets/images/testimonials/temoignage-guy-adolphe.jpg');
const temoignageRosemondeB64 = getBase64Image('assets/images/testimonials/temoignage-rosemonde.jpg');
const temoignageThibautB64 = getBase64Image('assets/images/testimonials/temoignage-thibaut.jpg');
const preuveVentesB64 = getBase64Image('assets/images/testimonials/preuve-ventes-dashboard.png');

// Read CSS
let cssContent = fs.readFileSync('assets/css/style.css', 'utf8');

// Ensure sticky CTA text wrapping and centering
cssContent += `
/* Force perfect centering and wrapping on mobile sticky CTA */
.btn-sticky-cta {
  white-space: normal !important;
  text-align: center !important;
  display: inline-flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  line-height: 1.25 !important;
  word-break: normal !important;
}
`;

// Calculate initial server/build time countdown values so it never displays 00:00:00
const now = new Date();
const midnight = new Date();
midnight.setHours(23, 59, 59, 999);
let diff = midnight.getTime() - now.getTime();
if (diff < 0) diff = 0;
const initHours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
const initMinutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
const initSeconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

// Generate Single-File HTML
const singleFileHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>FOU DE TOI, FOLLE DE TOI • Le Guide Du Couple Chrétien Qui Veut Un Lit De Feu</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/jpeg" href="${faviconB64}">
  <link rel="shortcut icon" type="image/jpeg" href="${faviconB64}">
  <link rel="apple-touch-icon" href="${faviconB64}">
  
  <!-- SEO & Open Graph Meta Tags -->
  <meta name="description" content="Découvrez le guide complet avec schémas anatomiques et 18 positions pour transformer votre chambre en un lit de feu. Déculpabilisation biblique, endurance masculine, extase féminine et protection absolue contre l'infidélité. Offre exclusive à 9 500 FCFA (au lieu de 25 000 FCFA).">
  <meta property="og:title" content="FOU DE TOI, FOLLE DE TOI • Le Guide Du Couple Chrétien Qui Veut Un Lit De Feu">
  <meta property="og:description" content="Le livre avec schémas détaillés pour jouir à chaque fois et rendre votre partenaire complètement fou/folle de vous. Même sans endurance et sans positions compliquées.">
  <meta property="og:image" content="${bookCoverB64}">
  <meta property="og:type" content="website">
  
  <!-- Google Fonts: Playfair Display + Cinzel (Élégance Sacrée & Sensuelle) + Syne + Plus Jakarta Sans & Outfit -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">
  
  <!-- FedaPay Checkout Official CDN -->
  <script src="https://cdn.fedapay.com/checkout.js?v=1.1.7"></script>

  <!-- Embedded High-Performance Stylesheet -->
  <style>
${cssContent}
  </style>

  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    var fbpMatch = document.cookie.match(/(^| )_fbp=([^;]+)/);
    var fbcMatch = document.cookie.match(/(^| )_fbc=([^;]+)/);
    var clientFbp = fbpMatch ? fbpMatch[2] : null;
    var clientFbc = fbcMatch ? fbcMatch[2] : null;

    var pageViewEventId = 'pv_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
    fbq('init', '2465772550579051');
    fbq('track', 'PageView', {}, { eventID: pageViewEventId });

    // Send PageView to Meta CAPI
    try {
      fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'PageView',
          event_id: pageViewEventId,
          fbp: clientFbp,
          fbc: clientFbc,
          url: window.location.href
        }),
        keepalive: true
      }).catch(function(e){});
    } catch(err){}
  </script>
  <noscript>
    <img height="1" width="1" style="display:none" 
         src="https://www.facebook.com/tr?id=2465772550579051&ev=PageView&noscript=1"/>
  </noscript>
</head>
<body>

  <!-- =========================================================================
       1. TOP URGENCY COUNTDOWN ANNOUNCEMENT BAR
       ========================================================================= -->
  <div class="top-urgency-bar" style="background: linear-gradient(90deg, #42040d 0%, #750a19 50%, #42040d 100%); border-bottom: 1px solid var(--color-gold-sacred);">
    <div class="top-urgency-inner">
      <span class="badge-pill badge-gold-foil" style="padding: 2px 8px; font-size: 0.72rem;">🔥 OFFRE LIMITÉE</span>
      <span style="font-weight: 700; color: #ffffff;">PRIX SPÉCIAL LANCEMENT : <strong>9 500 FCFA</strong> AU LIEU DE <span style="text-decoration: line-through; color: #fda4af;">25 000 FCFA</span> (-62%)</span>
      <div class="countdown-box" style="border-color: var(--color-gold-sacred);">
        <span style="font-size: 0.75rem; color: #fde047; font-weight: 700; margin-right: 4px;">EXPIRE DANS :</span>
        <span class="countdown-digit cd-hours">${initHours || '23'}</span>h
        <span class="countdown-digit cd-minutes">${initMinutes || '59'}</span>m
        <span class="countdown-digit cd-seconds">${initSeconds || '09'}</span>s
      </div>
    </div>
  </div>

  <!-- =========================================================================
       2. HERO SECTION : L'ACCROCHE & LE CHOC ÉMOTIONNEL
       ========================================================================= -->
  <section class="hero-section" id="hero" style="background-image: radial-gradient(circle at 50% 10%, rgba(142, 16, 34, 0.35) 0%, transparent 65%);">
    <div class="container">
      
      <!-- Authority Badge -->
      <div class="badge-pill badge-gold-foil" style="margin-bottom: 16px; letter-spacing: 0.08em;">
        👑 RÉSERVÉ AUX COUPLES MARIÉS & FIANCÉS • LE GUIDE DU COUPLE CHRÉTIEN
      </div>

      <!-- Biblical Anchor Quote -->
      <div class="verse-sacred-card" style="max-width: 720px; margin: 0 auto 24px auto;">
        <div class="verse-text">
          « Que ta source soit bénie, et fais ta joie de la femme de ta jeunesse... Que sa tendresse t'enivre en tout temps, sois sans cesse épris de son amour. »
        </div>
        <div class="verse-ref">— PROVERBES 5:18-19</div>
      </div>

      <!-- Main Electrifying Title -->
      <h1 class="hero-title">
        Ce Soir, Votre Lit Ne Sera Plus Jamais Le Même.<br>
        <span class="text-gradient-gold-sacred">Le Guide Pratique Pour Jouir À Chaque Fois & Rendre Votre Partenaire Complètement Fou/Folle De Vous !</span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle" style="max-width: 780px;">
        Même sans endurance masculine, même avec la fatigue des enfants ou après 20 ans de routine, et <strong>sans aucune position compliquée</strong>. Découvrez comment libérer une jouissance volcanique dans votre couple, sans honte, sans vulgarité et dans la pleine bénédiction de Dieu.
      </p>

      <!-- Hero Media & Offer Card -->
      <div class="hero-media-card" style="border: 2px solid var(--color-gold-sacred); box-shadow: 0 0 55px rgba(142, 16, 34, 0.6); background: rgba(22, 10, 16, 0.95);">
        
        <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 20px;">
          <img src="${bookCoverB64}" alt="Livre FOU DE TOI, FOLLE DE TOI - Guide du couple chrétien" style="width: 100%; max-width: 480px; margin: 0 auto; border-radius: var(--radius-md); box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
          <div style="position: absolute; bottom: 12px; left: 12px; right: 12px; background: rgba(12, 6, 8, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--color-gold-sacred); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.8rem; color: #fef08a; text-align: center; font-weight: 700;">
            📖 LIVRE MAÎTRE (190 PAGES HD) + SCHÉMAS ANATOMIQUES + 18 POSITIONS + 6 BONUS INCLUS
          </div>
        </div>

        <!-- Pricing Banner Pill -->
        <div class="pricing-banner-pill" style="border-color: var(--color-gold-sacred); background: rgba(66, 4, 13, 0.65);">
          <div class="price-strike-group">
            <div class="price-strike-label">Valeur Réelle</div>
            <div class="price-strike-val" style="color: #94a3b8;">25 000 FCFA</div>
          </div>
          <div class="price-main-group">
            <div class="price-main-label" style="color: #fde047;">⚡ OFFRE DE LANCEMENT EXCLUSIVE</div>
            <div class="price-main-val text-gradient-gold-sacred">9 500 FCFA</div>
          </div>
        </div>

        <!-- CTA Button Master -->
        <a href="#open-checkout" class="btn-cta open-checkout-trigger" style="background: linear-gradient(135deg, #8e1022 0%, #6e0817 50%, #42040d 100%); border: 1px solid var(--color-gold-sacred); box-shadow: 0 0 35px rgba(142, 16, 34, 0.7);">
          <span style="font-weight: 900; letter-spacing: 0.04em;">🔥 OUI, JE VEUX NOTRE LIT DE FEU DÈS CE SOIR</span>
          <span class="btn-cta-sub" style="color: #fef08a;">⚡ Accès Immédiat pour 9 500 FCFA (au lieu de 25 000 FCFA) • Wave, Orange, MTN, Moov, Carte</span>
        </a>

        <!-- Reassurance badges row -->
        <div class="hero-badges-row" style="margin-top: 18px;">
          <div class="hero-badge-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>100% Biblique & Respectueux</span>
          </div>
          <div class="hero-badge-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Téléchargement Instantané</span>
          </div>
          <div class="hero-badge-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Discrétion 100% Anonyme</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       3. SECTION : LE MIROIR DE LA DOULEUR & LES PENSÉES SECRÈTES
       ========================================================================= -->
  <section class="section" id="probleme">
    <div class="container">
      
      <div style="text-align: center; max-width: 760px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">🛑 SOYONS TOTALEMENT SINCÈRES ENTRE ÉPOUX CHRÉTIENS</div>
        <h2 style="font-size: 2.1rem; line-height: 1.25; margin-bottom: 14px;">
          Vous dormez dans le même lit. Vous vous aimez sincèrement devant Dieu...<br>
          <span class="text-gradient-burgundy">Mais la vérité, c'est que votre intimité ressemble à un feu qui s'éteint.</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          À l'église, vous souriez. Dans les réunions de famille, tout semble parfait. Mais dès que la porte de la chambre se referme le soir, un mur de silence s'installe.
        </p>
      </div>

      <!-- Two-column Real Life Pain Cards -->
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 24px; margin-bottom: 30px;">
        
        <!-- Pain for HIM -->
        <div class="card-dark" style="border: 1px solid rgba(142, 16, 34, 0.4); background: rgba(22, 10, 15, 0.9);">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <span style="font-size: 1.6rem;">😔</span>
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #fda4af; text-transform: uppercase; letter-spacing: 0.06em;">CE QUE L'HOMME VIT EN SILENCE</div>
              <h3 style="font-size: 1.25rem; color: #ffffff;">La terreur de ne pas assurer et le sentiment d'être un mendiant</h3>
            </div>
          </div>
          <ul class="pain-list">
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(142,16,34,0.3); color: #fda4af;">✕</span>
              <span><strong>Le calvaire des 3 minutes :</strong> Tu es excité, elle est belle, et en quelques mouvements rapides, c'est déjà fini. Tu vois dans son regard qu'elle n'a rien ressenti de fort. Tu te sens nul, tu as honte, et cette angoisse accélère encore les choses au rapport suivant.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(142,16,34,0.3); color: #fda4af;">✕</span>
              <span><strong>L'érection qui faiblit au pire moment :</strong> Le stress du travail, le manque de sommeil, les soucis financiers... Tu veux être un lion pour elle, mais ton corps refuse d'obéir. La peur de la panne devient le pire voleur de virilité.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(142,16,34,0.3); color: #fda4af;">✕</span>
              <span><strong>L'humiliation de devoir quémander :</strong> Tu t'approches d'elle avec désir, et elle se retourne avec un soupir ou un « je suis fatiguée ». Tu te sens rejeté, indésirable dans ta propre maison, alors tu te tais et tu accumules de la rancune.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(142,16,34,0.3); color: #fda4af;">✕</span>
              <span><strong>Le piège empoisonné des écrans :</strong> La tentation honteuse de chercher du plaisir seul ou devant des images sur son téléphone... qui te laisse avec un dégoût profond de toi-même, te vole ton énergie et détruit ta complicité sacrée.</span>
            </li>
          </ul>
        </div>

        <!-- Pain for HER -->
        <div class="card-dark" style="border: 1px solid rgba(212, 175, 55, 0.4); background: rgba(22, 10, 15, 0.9);">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <span style="font-size: 1.6rem;">🥀</span>
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--color-gold-sacred); text-transform: uppercase; letter-spacing: 0.06em;">CE QUE LA FEMME ENDURE SANS OSER LE DIRE</div>
              <h3 style="font-size: 1.25rem; color: #ffffff;">La frustration invisible, le devoir conjugal et la honte de son corps</h3>
            </div>
          </div>
          <ul class="pain-list">
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(212,175,55,0.2); color: #fde047;">✕</span>
              <span><strong>Le clitoris totalement oublié :</strong> Les études le prouvent : seulement 1 femme sur 5 jouit par la pénétration seule ! Les 4 autres ont impérativement besoin d'une stimulation précise du clitoris. Pourtant, il fonce tout droit, sans préparation, te laissant frustrée et insatisfaite.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(212,175,55,0.2); color: #fde047;">✕</span>
              <span><strong>La douleur et la sécheresse :</strong> Faire l'amour devient une corvée où tu serres les dents en silence. Tu simules parfois un faux orgasme juste pour flatter son ego et pour qu'il s'endorme enfin, pendant que tu fixes le plafond avec amertume.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(212,175,55,0.2); color: #fde047;">✕</span>
              <span><strong>La honte de ton corps qui a changé :</strong> Après les enfants, les vergetures, le ventre rond... tu as peur de son regard. Alors tu éteins la lumière en hâte et tu restes sous le drap, incapable de lâcher prise et de t'abandonner au plaisir.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: rgba(212,175,55,0.2); color: #fde047;">✕</span>
              <span><strong>La charge mentale qui éteint tout :</strong> Travail, cuisine, enfants, vaisselle... Ton désir féminin est réactif, pas spontané ! Comment avoir envie d'un rapport quand il ne t'a pas adressé un mot doux, un câlin ou un regard amoureux de toute la journée ?</span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Book Quote Callout -->
      <div class="callout-retenir">
        <div class="callout-title-retenir">
          <span>💡</span> CE QUE DIT LE LIVRE (PAGE 7) :
        </div>
        <p style="font-size: 0.95rem; color: #ffffff; line-height: 1.6; font-style: italic;">
          « Vous dormez dans le même lit. Vous vous aimez. Mais vous savez, tous les deux, que ça pourrait être beaucoup plus fort. Peut-être que tu te demandes pourquoi elle ferme les yeux et attend que ça passe. Peut-être que tu te demandes pourquoi il termine avant même que tu aies commencé à sentir quelque chose. Ce livre est là pour ça : pas de détour, pas de langage de médecin, pas de honte. »
        </p>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       4. SECTION : L'AGGRAVATION & L'ALERTE ROUGE DE L'INFIDÉLITÉ
       ========================================================================= -->
  <section class="section" id="danger" style="background: linear-gradient(180deg, rgba(66, 4, 13, 0.4) 0%, rgba(12, 6, 8, 0.8) 100%);">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">⚠️ L'ALERTE QUI SAUVE LES MARIAGES</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 16px;">
          Personne ne se réveille un matin en disant :<br>
          <span class="text-gradient-burgundy">« Aujourd'hui, je détruis ma famille. »</span>
        </h2>
        <p style="color: #f1f5f9; font-size: 1.1rem; line-height: 1.6;">
          L'infidélité ne commence pas dans un hôtel de passe. <strong>Elle se prépare lentement, goutte après goutte, dans le vide et la faim d'un lit conjugal tiède.</strong>
        </p>
      </div>

      <div class="card-dark" style="border: 2px solid rgba(225, 29, 72, 0.5); box-shadow: 0 0 40px rgba(142, 16, 34, 0.4); max-width: 860px; margin: 0 auto 32px auto; background: rgba(24, 10, 16, 0.95);">
        
        <p style="font-size: 1.05rem; line-height: 1.7; color: #f1f5f9; margin-bottom: 20px;">
          Beaucoup de prédicateurs condamnent l'adultère avec raison. Mais presque aucun ne vous donne les armes concrètes pour l'éviter ! À l'église, on vous répète : <em>« Résiste à la tentation »</em>. 
          Mais <strong>comment résister quand on meurt de faim à la maison ?</strong>
        </p>

        <div style="background: rgba(0,0,0,0.4); border-left: 4px solid var(--color-gold-sacred); padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 22px;">
          <div style="font-weight: 800; color: #fde047; font-size: 1.15rem; margin-bottom: 6px;">
            « On ne va presque jamais chercher ailleurs parce qu'on a TROP de plaisir chez soi. »
          </div>
          <div style="color: var(--color-text-muted); font-size: 0.9rem;">
            — Chapitre 18 du livre : <em>Fidélité, les armes que personne ne vous donne</em> (Page 150)
          </div>
        </div>

        <p style="font-size: 0.98rem; line-height: 1.65; color: var(--color-text-body); margin-bottom: 18px;">
          Quand la tendresse et la passion désertent votre chambre, n'importe quelle attention extérieure devient une brèche fatale :
        </p>

        <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 0.92rem; color: #fda4af;">
            <span>💥</span>
            <span><strong>Au bureau ou en déplacement :</strong> Un sourire chaleureux d'une collègue, un compliment innocent qui touche le cœur d'un homme qui se sent rejeté chez lui...</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 0.92rem; color: #fda4af;">
            <span>💥</span>
            <span><strong>Sur les réseaux & WhatsApp :</strong> Les messages privés tardifs, les confidences intimes à un « ami », la transparence qui disparaît, le téléphone retourné face contre table...</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 0.92rem; color: #fda4af;">
            <span>💥</span>
            <span><strong>Pendant la grossesse ou après 50 ans :</strong> Les moments les plus fragiles où tant de foyers chrétiens se fissurent dans le silence parce que personne ne leur a appris à adapter l'intimité.</span>
          </div>
        </div>

        <!-- The Golden Liberation Decree -->
        <div class="callout-regle-dor" style="text-align: center;">
          <div class="callout-title-regle-dor" style="justify-content: center; font-size: 1.15rem;">
            <span>🛡️</span> L'ANTIDOTE ABSOLU DU GUIDE FOU DE TOI, FOLLE DE TOI :
          </div>
          <p style="font-size: 1.15rem; font-weight: 700; color: #ffffff; line-height: 1.6; margin: 10px 0;">
            « Quand vous avez à la maison un plaisir que personne d'autre sur terre ne peut vous donner, rester fidèle ne sera plus jamais un effort pénible.<br>
            <span class="text-gradient-gold-sacred" style="font-size: 1.35rem;">CE SERA UNE ÉVIDENCE JUBILATOIRE ! »</span>
          </p>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       5. SECTION : LA RÉVÉLATION SACRÉE & DÉCULPABILISATION TOTALE
       ========================================================================= -->
  <section class="section" id="revelation">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 12px;">✨ LA VÉRITÉ BIBLIQUE QUI BRISA TOUS LES TABOUS</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 16px;">
          Dieu n'a pas honte de votre corps...<br>
          <span class="text-gradient-gold-sacred">Le Plaisir Charnel a Été Conçu Par Le Créateur Avant Même La Chute !</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Voici ce que l'ennemi a voulu cacher aux couples chrétiens sous une fausse piété :
        </p>
      </div>

      <div class="revelation-box" style="border: 2px solid var(--color-gold-sacred); background: rgba(24, 10, 16, 0.95); box-shadow: 0 0 45px rgba(212, 175, 55, 0.25);">
        
        <!-- Revelation Points -->
        <div style="display: flex; flex-direction: column; gap: 24px; text-align: left;">
          
          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #fef08a; font-weight: 900; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem; border: 1px solid var(--color-gold-sacred);">1</div>
            <div>
              <h3 style="font-size: 1.2rem; color: #ffffff; margin-bottom: 6px;">« Nus et sans honte » (Genèse 2:25) : Le plan parfait de Dieu</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.6;">
                Avant le péché, il y a un homme et une femme nus, libres et émerveillés l'un devant l'autre. Dieu a créé la peau, les nerfs, le désir ardent. La honte n'est entrée qu'avec la chute. Le mariage réhabilite cette pureté originelle !
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #fef08a; font-weight: 900; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem; border: 1px solid var(--color-gold-sacred);">2</div>
            <div>
              <h3 style="font-size: 1.2rem; color: #ffffff; margin-bottom: 6px;">Le chef-d'œuvre du Clitoris : Créé EXCLUSIVEMENT pour la jouissance</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.6;">
                Savez-vous que sur tous les organes du corps humain, le clitoris est le SEUL qui ne sert ni à la reproduction, ni à la survie biologique ? <strong>Sa seule fonction voulue par Dieu est l'extase de la femme.</strong> Si la jouissance féminine était impure, Dieu n'aurait jamais façonné cet organe d'une richesse sensorielle inouïe (plus de 8 000 terminaisons nerveuses).
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #fef08a; font-weight: 900; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem; border: 1px solid var(--color-gold-sacred);">3</div>
            <div>
              <h3 style="font-size: 1.2rem; color: #ffffff; margin-bottom: 6px;">Un livre entier de la Bible dédié à la passion érotique</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.6;">
                Le Cantique des Cantiques n'a rien d'un texte frileux : la femme réclame les baisers, prend l'initiative, invite son époux dans son jardin (<em>« qu'il mange de ses fruits »</em>), décrit les cuisses, les seins et le ventre de l'autre. Le sexe dans le mariage est saint, célébré et béni !
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #fef08a; font-weight: 900; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem; border: 1px solid var(--color-gold-sacred);">4</div>
            <div>
              <h3 style="font-size: 1.2rem; color: #ffffff; margin-bottom: 6px;">« Que sa tendresse t'enivre en TOUT TEMPS » (Proverbes 5:19)</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.6;">
                « En tout temps » : pas une fois par mois, pas comme une corvée d'enfants. Le mot « enivrer » signifie littéralement <em>se perdre dans le plaisir de l'autre</em>. Dieu vous invite à faire de votre chambre un sanctuaire d'amour brûlant.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       6. SECTION : LE CHOC VISUEL AVANT VS APRÈS
       ========================================================================= -->
  <section class="section" id="avant-apres">
    <div class="container">
      
      <div style="text-align: center; max-width: 760px; margin: 0 auto 32px auto;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 10px;">⚡ LA TRANSFORMATION RADICALE</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px;">
          Reprenez Le Contrôle De Votre Chambre Conjugale
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Voici ce qui se passe quand vous passez de l'ignorance douloureuse à la science divine de l'intimité :
        </p>
      </div>

      <!-- Avant/Après Image -->
      <div class="comparison-image-wrapper" style="border: 2px solid var(--color-gold-sacred); border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 0 50px rgba(142, 16, 34, 0.5); margin-bottom: 30px;">
        <img src="${avantApresB64}" alt="Avant vs Après - Reprends le contrôle de ta maison" style="width: 100%; display: block;">
      </div>

      <!-- Compare Grid Columns -->
      <div class="compare-grid">
        
        <!-- BEFORE -->
        <div class="compare-col compare-col-before" style="border-color: rgba(142, 16, 34, 0.4);">
          <div class="compare-heading" style="color: #fda4af;">
            <span>❌</span> SANS LE GUIDE (HIER)
          </div>
          <ul class="compare-list">
            <li class="compare-item">
              <span>✕</span>
              <span>Rapport rapide en 3 minutes, frustration masculine et honte silencieuse</span>
            </li>
            <li class="compare-item">
              <span>✕</span>
              <span>Elle ne jouit jamais ou simule pour abréger, douleurs et sécheresse</span>
            </li>
            <li class="compare-item">
              <span>✕</span>
              <span>Amour dans le noir complet sous le drap par honte de son corps</span>
            </li>
            <li class="compare-item">
              <span>✕</span>
              <span>La routine des années, le sexe arrive en dernier quand on est épuisé</span>
            </li>
            <li class="compare-item">
              <span>✕</span>
              <span>Tensions sourdes, rancune le soir, le lit devient un terrain de glace</span>
            </li>
            <li class="compare-item">
              <span>✕</span>
              <span>Le danger permanent de l'infidélité qui guette le foyer affamé</span>
            </li>
          </ul>
        </div>

        <!-- AFTER -->
        <div class="compare-col compare-col-after" style="border-color: var(--color-gold-sacred); background: rgba(30, 14, 20, 0.85);">
          <div class="compare-heading text-gradient-gold-sacred">
            <span>🔥</span> AVEC LE GUIDE (DÈS CE SOIR)
          </div>
          <ul class="compare-list">
            <li class="compare-item">
              <span style="color: #fde047;">✓</span>
              <span><strong>Endurance de 15 à 20 minutes maîtrisée</strong> grâce au protocole 1-10 et au stop-start</span>
            </li>
            <li class="compare-item">
              <span style="color: #fde047;">✓</span>
              <span><strong>Orgasmes multiples et intenses pour elle</strong> grâce aux 4 mouvements d'orfèvre du clitoris</span>
            </li>
            <li class="compare-item">
              <span style="color: #fde047;">✓</span>
              <span><strong>Corps célébrés à la bougie :</strong> elle se sent désirée et magnifique sans complexe</span>
            </li>
            <li class="compare-item">
              <span style="color: #fde047;">✓</span>
              <span><strong>18 positions illustrées faciles</strong> adaptées aux ventres ronds, au dos et à chaque gabarit</span>
            </li>
            <li class="compare-item">
              <span style="color: #fde047;">✓</span>
              <span><strong>Complicité totale toute la journée :</strong> baiser de 6s, messages complices, rires complices</span>
            </li>
            <li class="compare-item">
              <span style="color: #fde047;">✓</span>
              <span><strong>Fidélité blindée :</strong> un tel festin à la maison que personne n'a envie de chercher ailleurs !</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       7. SECTION : PRÉSENTATION COMPLÈTE DU LIVRE (190 PAGES)
       ========================================================================= -->
  <section class="section" id="programme">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 12px;">📚 DÉCOUVREZ L'INTÉGRALITÉ DU CHEF-D'ŒUVRE</div>
        <h2 style="font-size: 2.3rem; line-height: 1.25; margin-bottom: 14px;">
          FOU DE TOI, FOLLE DE TOI<br>
          <span class="text-gradient-gold-sacred">190 Pages d'Or Pur, Pas de Tabou, Que Des Résultats Immédiats !</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Conçu en 3 voix : une partie pour lui, une partie pour elle, et une grande partie pour vous deux. Voici ce que vous allez découvrir ensemble :
        </p>
      </div>

      <!-- Parts Grid -->
      <div class="parts-grid">
        
        <!-- PART 1 -->
        <div class="part-card" style="border-left: 4px solid var(--color-gold-sacred);">
          <div class="part-tag" style="color: var(--color-gold-sacred);">PARTIE 1 • PAGES 11 À 17</div>
          <h3 class="part-title">Le Plaisir a Été Créé Par Dieu</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 1 : Foi chrétienne, plaisir et discernement</strong> — Pourquoi la Bible invite à s'enivrer d'amour (Proverbes 5:19), pourquoi Dieu a créé le clitoris uniquement pour jouir, et comment aborder le sexe oral (cunnilingus & fellation) dans la paix de sa conscience et la bénédiction du Saint-Esprit.</li>
            <li><strong>Le jardin fermé</strong> — Ce que le plaisir protège : bâtir une intimité si puissante que la trahison devient impensable.</li>
          </ul>
        </div>

        <!-- PART 2 -->
        <div class="part-card" style="border-left: 4px solid #fda4af;">
          <div class="part-tag" style="color: #fda4af;">PARTIE 2 • PAGES 18 À 36</div>
          <h3 class="part-title">Votre Point de Départ & Diagnostic Intime</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 2 : Faire le test de votre couple</strong> — Le questionnaire des 10 phrases sur 50 pour mesurer exactement où vous en êtes sans dispute.</li>
            <li><strong>Les 5 blocages déracinés</strong> — Fatigue/routine, rapidité masculine, honte du corps, silence pesant et blessures du passé.</li>
            <li><strong>L'exercice magique des 3 phrases & Le contrat des 30 jours</strong> — La sécurité psychologique pour oser tout se dire.</li>
            <li><strong>Chapitre 3 : Les vrais chiffres pour arrêter de se comparer</strong> — Anatomie secrète du clitoris (bulbes et racines sous la peau) et morphologie adaptée (minces, fortes, grand ventre, petit pénis).</li>
            <li><strong>Chapitre 4 : La carte des zones érogènes</strong> — La règle d'intensité de 1 à 10 et le massage de cartographie de 40 minutes à la bougie.</li>
          </ul>
        </div>

        <!-- PART 3 -->
        <div class="part-card" style="border-left: 4px solid #3b82f6;">
          <div class="part-tag" style="color: #93c5fd;">PARTIE 3 • POUR LUI • PAGES 37 À 62</div>
          <h3 class="part-title">Devenir le Maître du Plaisir & Tenir Sans Limite</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 5 : Tenir plus longtemps sans effort</strong> — L'échelle d'excitation 1 à 10 (rester entre 5 et 7), la respiration ventrale, la méthode Stop-Start à deux, la technique du Squeeze sous la couronne et le renforcement du plancher pelvien (Kegel masculin).</li>
            <li><strong>Le truc des hommes expérimentés : Le deuxième tour</strong> — Comment transformer votre nuit en un marathon sans frustration.</li>
            <li><strong>Chapitre 6 : Une érection plus dure et plus durable</strong> — Neutraliser les 7 ennemis de l'érection + Les trésors du marché ouest-africain (gingembre, bissap, pastèque/citrulline, moringa, graines de courge au zinc, arachide à l'arginine, dattes) + 5 recettes de potions et plats d'énergie.</li>
            <li><strong>Chapitre 7 : Savoir faire jouir une femme à chaque fois</strong> — Ce qu'elle n'ose pas te dire, les 4 mouvements d'orfèvre du clitoris (cercles, haut-bas, tapotements, pression fixe) et <strong>LA RÈGLE D'OR : quand elle monte, ne change rien !</strong></li>
            <li><strong>Le Cunnilingus divin pas à pas</strong> — Technique de la langue à plat, stimulation du Point G (doigts en crochet à 3-4 cm), lecture des signaux d'extase et déclenchement des orgasmes multiples !</li>
          </ul>
        </div>

        <!-- PART 4 -->
        <div class="part-card" style="border-left: 4px solid #f43f5e;">
          <div class="part-tag" style="color: #fda4af;">PARTIE 4 • POUR ELLE • PAGES 63 À 76</div>
          <h3 class="part-title">Son Corps, Son Plaisir & Rendre Son Mari Fou de Désir</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 8 : Son corps, son plaisir</strong> — Réconciliation totale avec son miroir, propreté et confiance, vaincre la sécheresse intime et le vaginisme, comprendre son désir réactif, et maîtriser les 4 types d'orgasmes (clitoridien, point G, mixte, montée lente).</li>
            <li><strong>Chapitre 9 : Faire perdre la tête à son mari</strong> — Ce qu'un homme attend en secret : se sentir ardemment désiré ! L'art du regard de 5 secondes, le pagne noué, les perles de reins, la voix basse murmurée.</li>
            <li><strong>La fellation douce pas à pas sans se fatiguer</strong> — Technique pour éviter le réflexe nauséeux, mouvements lèvres et mains, et les mots coquins qui le rendent fou.</li>
            <li><strong>Prendre les commandes : La soirée « Il ne fait rien »</strong> — 30 minutes magiques où vous prenez l'initiative et le menez au septième ciel.</li>
          </ul>
        </div>

        <!-- PART 5 -->
        <div class="part-card" style="border-left: 4px solid var(--color-gold-sacred);">
          <div class="part-tag" style="color: var(--color-gold-sacred);">PARTIE 5 • POUR VOUS DEUX • PAGES 77 À 129</div>
          <h3 class="part-title">L'Alchimie Conjugale & Le Kama Sutra Chrétien</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 10 : Préparer le lit toute la journée</strong> — Le baiser de 6 secondes au départ, les 6 touchers non sexuels par jour, les messages coquins par SMS, et neutraliser les ennemis du désir (téléphones, rancune du soir, charge mentale).</li>
            <li><strong>Chapitre 11 : Le rapport parfait du début à la fin en 6 temps</strong> — 1. Transition (10 min) • 2. Préliminaires (20 min) • 3. Montée (5 min) • 4. Pénétration (10-15 min) • 5. Orgasme • 6. L'Après (10 min de tendresse et rires). Code des signaux tactiles secrets.</li>
            <li><strong>Chapitre 12 : Les 18 Positions qui marchent</strong> — Schémas silhouettes pudiques adaptés à tous les gabarits (Cuillère, Coussin d'or, Trône, Reine, Amazone, Pont des délices, Jardin, Bord du lit, Seuil, Palmier, Papillon, Ciseaux, Équerre, Genou levé, Bascule, Chaise inversée, Cuillère profonde, Balcon).</li>
            <li><strong>Chapitre 13 : Sexe oral (69 complice), massages érotiques & huiles maison</strong> — Recette d'huile de massage coco/karité tiède/amande/vanille.</li>
            <li><strong>Chapitre 14 : Fantasmes & Explorer sans trahir sa foi</strong> — La grille des 3 cercles (Vert, Orange, Rouge) et le jeu des 15 cartes amoureuses.</li>
          </ul>
        </div>

        <!-- PART 6 -->
        <div class="part-card" style="border-left: 4px solid #10b981;">
          <div class="part-tag" style="color: #6ee7b7;">PARTIE 6 & ANNEXES • PAGES 130 À 190</div>
          <h3 class="part-title">Les Saisons de la Vie, Forteresse de Fidélité & Plan 30 Jours</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 15 : Quand la femme est enceinte</strong> — Protéger le couple contre les dérapages, positions sécurisées trimestre par trimestre, gestes de tendresse.</li>
            <li><strong>Chapitre 16 : Après 50 ans, la ménopause et la routine</strong> — La saison dorée du plaisir plus profond, rapports matinaux, redraguer son conjoint.</li>
            <li><strong>Chapitre 17 : Quand ça coince</strong> — Vaincre les peurs, le vaginisme et les pièges des écrans.</li>
            <li><strong>Chapitre 18 : Fidélité, les armes que personne ne vous donne</strong> — Les 7 armes inviolables, le pacte du regard, la règle des portes, la transparence volontaire, auto-test de fidélité en 10 questions.</li>
            <li><strong>Chapitre 19 : Le plan transformationnel sur 30 jours</strong> — Un geste concret par jour, semaine par semaine, pour renouveler votre alliance.</li>
            <li><strong>Boîte à outils du couple :</strong> Recettes d'Afrique de l'Ouest, 15 min d'exercices physiques pelviens, lexique des phrases coquines, 4 fiches prêtes à imprimer pour la table de nuit !</li>
          </ul>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       8. SECTION : FOCUS INTERACTIF — LES 18 POSITIONS & LE DÉROULÉ EN 6 TEMPS
       ========================================================================= -->
  <section class="section" id="positions" style="background: linear-gradient(180deg, rgba(20, 9, 14, 0.95) 0%, rgba(10, 5, 8, 0.98) 100%);">
    <div class="container">
      
      <div style="text-align: center; max-width: 800px; margin: 0 auto 30px auto;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 10px;">📐 LE KAMA SUTRA CHRÉTIEN SANS VULGARITÉ</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px;">
          18 Positions Conçues Pour Tous Les Corps Réels
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Pas d'acrobaties impossibles. Des silhouettes discrètes sans visage, des angles précis au coussin près, adaptées aux ventres ronds, au dos sensible, à la fatigue et à la grossesse :
        </p>
      </div>

      <!-- Positions Grid Showcase -->
      <div class="positions-grid">
        
        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 1</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">La Cuillère</div>
          <div class="position-ideal">Idéale pour : fatigue, ventre, dos fragile, grossesse, +50 ans</div>
          <div class="position-desc">On dort dans le même sens, on s'aime dans le même sens. Pénétration par derrière tout en douceur, mains totalement libres pour stimuler le clitoris en continu.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 2</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Coussin d'Or</div>
          <div class="position-ideal">Idéale pour : friction clitoridienne continue, face à face</div>
          <div class="position-desc">Le missionnaire réinventé. Un coussin ferme sous son bassin : son pubis appuie directement sur son clitoris en un balancement lent qui la fait jouir à coup sûr.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 3</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Trône</div>
          <div class="position-ideal">Idéale pour : corps forts, grand ventre, yeux dans les yeux</div>
          <div class="position-desc">Assis sur le bord du lit ou une chaise solide, elle sur ses cuisses enlacés. Le tronc n'est pas écrasé, baisers sans fin et balancement circulaire du bassin.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 4</span>
            <span class="position-stars">★★ MOYEN</span>
          </div>
          <div class="position-title">La Reine</div>
          <div class="position-ideal">Idéale pour : elle qui mène, lui qui contrôle son excitation</div>
          <div class="position-desc">Lui allongé sur le dos, elle au-dessus qui règle profondeur et rythme. La meilleure position pour l'homme pour durer 20 minutes en respirant calmement.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 6</span>
            <span class="position-stars">★★ MOYEN</span>
          </div>
          <div class="position-title">Le Pont des Délices</div>
          <div class="position-ideal">Idéale pour : stimulation du Point G, mains libres</div>
          <div class="position-desc">Deux coussins sous son bassin, lui à genoux. L'angle parfait qui cible la paroi avant du vagin tout en gardant une main active sur le clitoris.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 8</span>
            <span class="position-stars">★★ MOYEN</span>
          </div>
          <div class="position-title">Le Bord du Lit</div>
          <div class="position-ideal">Idéale pour : grands ventres, liberté de mouvement totale</div>
          <div class="position-desc">Elle allongée fesses au bord du matelas, lui debout. La hauteur du lit fait tout le travail sans aucun écrasement du ventre ou de fatigue articulaire.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 9</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Seuil (La Lenteur)</div>
          <div class="position-ideal">Idéale pour : durer longtemps, vaincre l'éjaculation précoce</div>
          <div class="position-desc">Pénétration des premiers centimètres seulement avec la méthode « 9 puis 1 ». Elle ressent un maximum de sensations, lui garde le contrôle absolu de son érection.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 11</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Papillon</div>
          <div class="position-ideal">Idéale pour : genoux et dos fragiles, accès parfait au clitoris</div>
          <div class="position-desc">Elle allongée pieds à plat au bord du lit, genoux ouverts comme des ailes. Aucun effort musculaire pour elle, vue sublime et caresses simultanées pour lui.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 12</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Les Ciseaux</div>
          <div class="position-ideal">Idéale pour : tendresse infinie, fatigue, après accouchement</div>
          <div class="position-desc">Allongés sur le côté face à face, jambes entrelacées en croix. Frottement intime des pubis sans effort physique, murmures et câlins prolongés.</div>
        </div>

      </div>

      <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: #fde047;">
        + 9 autres positions détaillées dans le livre : <em>L'Amazone, Le Jardin, Le Palmier, L'Équerre, Le Genou levé, La Bascule, La Chaise inversée, La Cuillère profonde, Le Balcon !</em>
      </div>

      <!-- 6-Steps Timeline Roadmap -->
      <div style="margin-top: 50px; text-align: center;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">⏱️ LA CARTE DU RAPPORT PARFAIT</div>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin-bottom: 8px;">Le Déroulé d'Un Rapport Réussi En 6 Temps</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 680px; margin: 0 auto 24px auto;">
          Voici ce que personne ne vous a jamais montré : comment se passe, minute par minute, une nuit d'anthologie dans la chambre conjugale.
        </p>

        <div class="timeline-roadmap">
          
          <div class="time-step-card">
            <div class="time-step-header">
              <span class="time-step-badge">TEMPS 1</span>
              <span class="time-step-duration">5 à 10 min</span>
            </div>
            <div class="time-step-title">La Transition</div>
            <div class="time-step-text">On quitte la journée : douche, parfum, lumière douce de bougie, téléphones branchés hors de la chambre. Un baiser lent debout avant de s'allonger.</div>
          </div>

          <div class="time-step-card">
            <div class="time-step-header">
              <span class="time-step-badge">TEMPS 2</span>
              <span class="time-step-duration">15 à 25 min</span>
            </div>
            <div class="time-step-title">Les Préliminaires</div>
            <div class="time-step-text">Le cœur du livre : elle doit être excitée avant d'être pénétrée. Baisers sur la nuque, dos, intérieur des cuisses. Bouche et mains douces, reculer pour faire monter l'attente.</div>
          </div>

          <div class="time-step-card">
            <div class="time-step-header">
              <span class="time-step-badge">TEMPS 3</span>
              <span class="time-step-duration">5 min</span>
            </div>
            <div class="time-step-title">La Montée</div>
            <div class="time-step-text">Les 3 feux verts : elle est humide, il est ferme, le « oui » est clair dans le regard. Les zones clés vibrent d'impatience.</div>
          </div>

          <div class="time-step-card">
            <div class="time-step-header">
              <span class="time-step-badge">TEMPS 4</span>
              <span class="time-step-duration">7 à 15 min</span>
            </div>
            <div class="time-step-title">La Pénétration</div>
            <div class="time-step-text">Entrée lente, pause yeux dans les yeux. Mouvements courts, puis profonds. Clitoris toujours stimulé par la main ou le pubis, changements de position harmonieux.</div>
          </div>

          <div class="time-step-card">
            <div class="time-step-header">
              <span class="time-step-badge">TEMPS 5</span>
              <span class="time-step-duration">Variable</span>
            </div>
            <div class="time-step-title">L'Orgasme</div>
            <div class="time-step-text">Elle d'abord si possible, pour enlever toute pression. Pas de course à la simultanéité. Enchaînement possible d'orgasmes multiples pour elle !</div>
          </div>

          <div class="time-step-card">
            <div class="time-step-header">
              <span class="time-step-badge">TEMPS 6</span>
              <span class="time-step-duration">10 min</span>
            </div>
            <div class="time-step-title">L'Après & Tendresse</div>
            <div class="time-step-text">L'étape la plus oubliée : câlins serrés, mots doux, verre d'eau partagé et rires complices. C'est ici que l'autre se sent aimé et non utilisé.</div>
          </div>

        </div>
      </div>

      <!-- West African Market Pharmacy Grid -->
      <div style="margin-top: 50px; text-align: center;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 10px;">🌿 LES TRÉSORS DE CHEZ NOUS</div>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin-bottom: 8px;">La Pharmacie Naturelle d'Afrique de l'Ouest</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 680px; margin: 0 auto 20px auto;">
          Ce que vous trouvez directement au marché pour booster la circulation sanguine, l'érection masculine et la lubrification féminine sans danger :
        </p>

        <div class="market-pharmacy-grid">
          
          <div class="food-card">
            <div class="food-icon">🫚</div>
            <div class="food-name">Gingembre Frais</div>
            <div class="food-benefit">Réchauffe, vasodilatateur puissant pour le flux sanguin</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🌺</div>
            <div class="food-name">Bissap (Hibiscus)</div>
            <div class="food-benefit">Riche en nitrates & antioxydants régulateurs de tension</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🍉</div>
            <div class="food-name">Pastèque Fraîche</div>
            <div class="food-benefit">Citrulline naturelle : détend les artères et booste la verge</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🍃</div>
            <div class="food-name">Feuilles de Moringa</div>
            <div class="food-benefit">Vitamines, fer et énergie inépuisable pour le corps</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🎃</div>
            <div class="food-name">Graines de Courge</div>
            <div class="food-benefit">Concentré de Zinc indispensable à la testostérone</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🥜</div>
            <div class="food-name">Arachides Crues</div>
            <div class="food-benefit">Arginine pure : précurseur naturel de l'oxyde nitrique</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🌴</div>
            <div class="food-name">Dattes Moelleuses</div>
            <div class="food-benefit">Énergie rapide, vitalité et endurance prolongée</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🥑</div>
            <div class="food-name">Avocat Onctueux</div>
            <div class="food-benefit">Bons gras et potassium soutenant la lubrification</div>
          </div>

        </div>

        <div style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic; margin-top: 10px;">
          + Les 5 recettes de potions maison détaillées au Chapitre 6 (Jus gingembre-ananas, Bissap épicé, Bouillie de mil aux dattes, Poisson braisé à l'ail).
        </div>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       9. SECTION : LES 6 BONUS STRATÉGIQUES OFFERTS (VALEUR > 35 000 FCFA)
       ========================================================================= -->
  <section class="section" id="bonus">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 12px;">🎁 PACK INTÉGRAL « LIT DE FEU »</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 14px;">
          En Plus Du Guide Maître de 190 Pages,<br>
          <span class="text-gradient-gold-sacred">Recevez Ces 6 Bonus Exclusifs Totalement Offerts !</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Ces guides et fiches pratiques d'une valeur totale supérieure à 35 000 FCFA vous sont offerts sans aucun centime supplémentaire :
        </p>
      </div>

      <!-- Bundle Mockup Image -->
      <div style="max-width: 620px; margin: 0 auto 36px auto; border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--color-gold-sacred); box-shadow: 0 0 50px rgba(212, 175, 55, 0.3);">
        <img src="${bundleMockupB64}" alt="Pack Complet FOU DE TOI, FOLLE DE TOI avec Tablette et Bonus" style="width: 100%; display: block;">
      </div>

      <!-- Bonus Cards Grid -->
      <div class="bonus-grid">
        
        <!-- BONUS 1 -->
        <div class="bonus-card bonus-featured" style="border-color: var(--color-gold-sacred);">
          <div class="bonus-badge-top" style="background: var(--color-gold-sacred); color: #000;">BONUS #1 • INCLUS GRATUITEMENT</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper" style="background: rgba(212, 175, 55, 0.2); color: #fde047;">🌿</div>
            <h3 class="bonus-title">La Pharmacie du Marché Ouest-Africain pour l'Énergie & la Vitalité</h3>
          </div>
          <p class="bonus-desc">
            Le guide des 10 super-aliments du marché et les 5 recettes de potions maison (jus détonnant gingembre-citron-miel, bissap épicé, salade vasodilatatrice) pour décupler la puissance érectile de l'homme et l'appétit sensuel de la femme.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 7 500 FCFA</span>
            <span class="bonus-val-free" style="color: #fde047;">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <!-- BONUS 2 -->
        <div class="bonus-card">
          <div class="bonus-badge-top">BONUS #2 • INCLUS GRATUITEMENT</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">📐</div>
            <h3 class="bonus-title">Le Mémo Visuel des 18 Positions pour Toutes les Silhouettes</h3>
          </div>
          <p class="bonus-desc">
            Un fichier PDF ultra-pratique avec toutes les fiches positions, les angles au coussin près, les adaptations pour ventres ronds, femmes enceintes et dos sensible. À consulter en un coup d'œil discret sur son téléphone.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 6 000 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <!-- BONUS 3 -->
        <div class="bonus-card">
          <div class="bonus-badge-top">BONUS #3 • INCLUS GRATUITEMENT</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">👄</div>
            <h3 class="bonus-title">Le Répertoire des Mots & Phrases qui Allument sans Vulgarité</h3>
          </div>
          <p class="bonus-desc">
            Le lexique secret des mots qui rapprochent, qui guident et qui allument. Quoi murmurer à l'oreille le matin, par SMS à midi, pendant le rapport pour guider sans blesser, et après pour célébrer.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 000 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <!-- BONUS 4 -->
        <div class="bonus-card">
          <div class="bonus-badge-top">BONUS #4 • INCLUS GRATUITEMENT</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">📄</div>
            <h3 class="bonus-title">Le Kit des 4 Fiches Secrètes à Imprimer pour la Chambre</h3>
          </div>
          <p class="bonus-desc">
            4 fiches prêtes à imprimer à garder dans un tiroir de la chambre : Fiche 1 (Carte des zones érogènes), Fiche 2 (Liste Oui / Peut-être / Non), Fiche 3 (Rendez-vous de la semaine), Fiche 4 (Notre point couple de 20 min du dimanche).
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 4 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <!-- BONUS 5 -->
        <div class="bonus-card">
          <div class="bonus-badge-top">BONUS #5 • INCLUS GRATUITEMENT</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">🕊️</div>
            <h3 class="bonus-title">Le Protocole Grossesse & Après 50 Ans Serein</h3>
          </div>
          <p class="bonus-desc">
            Comment préserver une intimité brûlante et complice pendant la grossesse (trimestre par trimestre, positions sans danger) et après la ménopause. L'armure indispensable pour empêcher le couple de se fissurer.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 6 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <!-- BONUS 6 -->
        <div class="bonus-card">
          <div class="bonus-badge-top">BONUS #6 • INCLUS GRATUITEMENT</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">💪</div>
            <h3 class="bonus-title">La Routine Pelvienne de 15 Minutes sans Matériel (Kegel)</h3>
          </div>
          <p class="bonus-desc">
            Le programme sportif express pour lui (muscler le muscle pubo-coccygien pour retenir l'éjaculation) et pour elle (tonifier le vagin pour des contractions orgasmiques 5 fois plus intenses). Réalisable en tout lieu sans que personne ne le voie.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

      </div>

      <!-- Mid-page CTA -->
      <div style="text-align: center; margin-top: 40px;">
        <a href="#open-checkout" class="btn-cta open-checkout-trigger" style="max-width: 540px; margin: 0 auto; background: linear-gradient(135deg, #8e1022 0%, #6e0817 50%, #42040d 100%); border: 1px solid var(--color-gold-sacred); box-shadow: 0 0 35px rgba(142, 16, 34, 0.7);">
          <span style="font-weight: 900;">🔥 TÉLÉCHARGER LE LIVRE & LES 6 BONUS (9 500 FCFA)</span>
          <span class="btn-cta-sub" style="color: #fef08a;">⚡ Accès Immédiat & Téléchargement Sécurisé en 30 Secondes</span>
        </a>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       10. SECTION : PREUVES SOCIALES & TÉMOIGNAGES AUTHENTIQUES
       ========================================================================= -->
  <section class="section" id="temoignages">
    <div class="container">
      
      <div style="text-align: center; max-width: 780px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">💬 TÉMOIGNAGES AUTHENTIQUES</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px;">
          Ils Ont Osé Rallumer La Flamme...<br>
          <span class="text-gradient-gold-sacred">Voici Ce Qu'ils En Disent En Toute Vérité</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Des couples chrétiens mariés, des hommes restaurés et des femmes enfin comblées partagent leur expérience sur WhatsApp :
        </p>
      </div>

      <!-- WhatsApp Screenshots Grid -->
      <div class="screenshots-grid">
        
        <div class="screenshot-card" style="border-color: rgba(212, 175, 55, 0.3);">
          <img src="${temoignageGuyAdolpheB64}" alt="Témoignage WhatsApp Guy Adolphe">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Guy-Adolphe (Abidjan)</span>
            <span class="screenshot-badge">Marié depuis 6 ans</span>
          </div>
          <p style="padding: 0 14px 14px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« J'avoue qu'avec ce livre j'ai compris tellement de choses qu'elle n'osait pas me dire. Elle était timide et ça me dérangeait. On a évité tellement d'erreurs en tant qu'homme ! »</em>
          </p>
        </div>

        <div class="screenshot-card" style="border-color: rgba(212, 175, 55, 0.3);">
          <img src="${temoignageRosemondeB64}" alt="Témoignage WhatsApp Rosemonde">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Rosemonde (Cotonou)</span>
            <span class="screenshot-badge">Femme comblée</span>
          </div>
          <p style="padding: 0 14px 14px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« Votre livre a fait que j'ai gagné un rendez-vous exceptionnel... Il a tellement bien pris la lecture. Ce matin il m'a appelée pour sortir. Je suis surprise de ce changement ! »</em>
          </p>
        </div>

        <div class="screenshot-card" style="border-color: rgba(212, 175, 55, 0.3);">
          <img src="${temoignageRivaldoB64}" alt="Témoignage WhatsApp Rivaldo">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Rivaldo (Pointe-Noire)</span>
            <span class="screenshot-badge">Mariage renouvelé</span>
          </div>
          <p style="padding: 0 14px 14px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« Franchement les conseils sur le clitoris et le stop-start ont tout changé dans notre intimité. Madame me regarde d'une manière différente maintenant. »</em>
          </p>
        </div>

        <div class="screenshot-card" style="border-color: rgba(212, 175, 55, 0.3);">
          <img src="${temoignageThibautB64}" alt="Témoignage WhatsApp Thibaut">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Thibaut (Kinshasa)</span>
            <span class="screenshot-badge">Fidélité préservée</span>
          </div>
          <p style="padding: 0 14px 14px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« Le chapitre sur la fidélité et le plan des 30 jours est une bombe spirituelle. C'est exactement le livre que tous les couples fiancés et mariés devraient lire. »</em>
          </p>
        </div>

      </div>

      <!-- Sales Proof Dashboard -->
      <div class="proof-banner-card" style="max-width: 680px; margin: 30px auto; border-color: var(--color-gold-sacred);">
        <img src="${preuveVentesB64}" alt="Preuve des ventes et satisfaction des lecteurs">
        <div style="padding: 14px; font-size: 0.85rem; color: #fde047; text-align: center; font-weight: 700;">
          📊 Plus de 3 850 commandes enregistrées • 98,7% de couples déclarant une métamorphose intime dès la 1ère semaine
        </div>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       11. SECTION : L'OFFRE IRRÉSISTIBLE & STACK DE PRIX (LE COEUR DU TUNNEL)
       ========================================================================= -->
  <section class="section" id="offre" style="background-image: radial-gradient(circle at 50% 30%, rgba(142, 16, 34, 0.35) 0%, transparent 70%);">
    <div class="container">
      
      <div style="text-align: center; max-width: 780px; margin: 0 auto 30px auto;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 12px;">🔒 OFFRE SPÉCIALE LIMITÉE DANS LE TEMPS</div>
        <h2 style="font-size: 2.3rem; line-height: 1.25; margin-bottom: 12px;">
          Récapitulatif De Votre Pack Intégral :<br>
          <span class="text-gradient-gold-sacred">Tout Ce Que Vous Débloquez Immédiatement</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Voici l'ensemble des trésors qui vont transformer votre lit dès ce soir :
        </p>
      </div>

      <!-- Master Offer Box -->
      <div class="offer-box-master" style="border: 2px solid var(--color-gold-sacred); box-shadow: 0 0 60px rgba(142, 16, 34, 0.6); background: rgba(24, 10, 16, 0.98);">
        
        <div class="offer-ribbon" style="background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); color: #000; font-weight: 900;">
          62% DE RÉDUCTION IMMÉDIATE (-15 500 FCFA)
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <h3 style="font-size: 1.6rem; color: #ffffff; margin-bottom: 6px;">PACK COMPLET : FOU DE TOI, FOLLE DE TOI</h3>
          <p style="color: #fda4af; font-size: 0.92rem;">Le Guide du Couple Chrétien Qui Veut Un Lit de Feu</p>
        </div>

        <!-- Stack List -->
        <div class="offer-stack-items">
          
          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Livre Maître : FOU DE TOI, FOLLE DE TOI</strong> (190 pages PDF HD illustrées)</span>
            </div>
            <div class="offer-item-val">15 000 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Bonus #1 :</strong> La Pharmacie Ouest-Africaine (10 Super-Aliments & 5 Recettes)</span>
            </div>
            <div class="offer-item-val">7 500 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Bonus #2 :</strong> Le Mémo Visuel des 18 Positions pour Toutes les Silhouettes</span>
            </div>
            <div class="offer-item-val">6 000 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Bonus #3 :</strong> Le Répertoire des Mots & Phrases qui Allument à l'Oreille</span>
            </div>
            <div class="offer-item-val">5 000 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Bonus #4 :</strong> Le Kit des 4 Fiches Secrètes à Imprimer pour la Chambre</span>
            </div>
            <div class="offer-item-val">4 500 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Bonus #5 :</strong> Le Guide Grossesse & Après 50 Ans Serein</span>
            </div>
            <div class="offer-item-val">6 500 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: #fde047;">✓</span>
              <span><strong>Bonus #6 :</strong> Le Protocole Sportif Pelvien de 15 Min (Kegel Homme & Femme)</span>
            </div>
            <div class="offer-item-val">5 500 FCFA</div>
          </div>

        </div>

        <!-- Total Calculation Box -->
        <div class="offer-total-calc" style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(212, 175, 55, 0.3);">
          <div>
            <div style="font-size: 0.85rem; color: #94a3b8; text-transform: uppercase;">Valeur totale cumulée</div>
            <div class="offer-total-old">50 000 FCFA</div>
          </div>
          <div>
            <div style="font-size: 0.85rem; color: #fde047; text-transform: uppercase; font-weight: 800;">⚡ AUJOURD'HUI SEULEMENT</div>
            <div class="offer-total-new text-gradient-gold-sacred" style="font-size: 2.2rem;">9 500 FCFA</div>
          </div>
        </div>

        <!-- Master CTA -->
        <a href="#open-checkout" class="btn-cta open-checkout-trigger" style="margin-top: 24px; background: linear-gradient(135deg, #8e1022 0%, #6e0817 50%, #42040d 100%); border: 1px solid var(--color-gold-sacred); box-shadow: 0 0 35px rgba(142, 16, 34, 0.75);">
          <span style="font-weight: 900; letter-spacing: 0.04em;">🔒 COMMANDER MAINTENANT POUR 9 500 FCFA</span>
          <span class="btn-cta-sub" style="color: #fef08a;">⚡ Accès Immédiat 24h/24 • Orange, MTN, Wave, Moov, Carte</span>
        </a>

        <!-- Payment Methods Icons -->
        <div class="payment-methods-box" style="margin-top: 22px;">
          <div class="payment-label">Moyens de paiement acceptés en Afrique & dans le monde entier :</div>
          <div class="payment-logos-row">
            <span class="pay-pill">🟠 Orange Money</span>
            <span class="pay-pill">🟡 MTN Mobile Money</span>
            <span class="pay-pill">🌊 Wave</span>
            <span class="pay-pill">🔵 Moov Money</span>
            <span class="pay-pill">💳 Carte Visa / Mastercard</span>
          </div>
        </div>

        <!-- Guarantee Box -->
        <div class="guarantee-box" style="margin-top: 24px; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.05);">
          <div class="guarantee-badge-icon">🛡️</div>
          <div class="guarantee-title" style="color: #34d399;">Garantie Inconditionnelle 30 Jours : Lit de Feu ou 100% Remboursé</div>
          <div class="guarantee-text">
            Téléchargez le guide ce soir. Lisez les chapitres, essayez les techniques de l'échelle 1-10, les 4 mouvements du clitoris et les positions adaptées avec un coussin. Si d'ici 30 jours, votre vie intime n'a pas explosé de joie et de complicité, envoyez-nous simplement un message sur WhatsApp : <strong>vous serez remboursé(e) immédiatement à 100%, sans poser la moindre question.</strong> Vous ne prenez strictement aucun risque.
          </div>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       12. SECTION : FAQ STRATÉGIQUE ANTI-OBJECTIONS
       ========================================================================= -->
  <section class="section" id="faq">
    <div class="container" style="max-width: 820px;">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">❓ QUESTIONS FRÉQUENTES</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px;">
          Des Réponses Claires À Toutes Vos Interrogations
        </h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">
          Tout ce que vous devez savoir avant de débloquer votre guide en toute sérénité :
        </p>
      </div>

      <div class="faq-list">
        
        <div class="faq-item">
          <button class="faq-trigger">
            <span>Est-ce un péché pour un chrétien de lire un guide intime illustré ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p><strong>Absolument pas !</strong> C'est tout le contraire. La Bible dit dans Genèse 2:25 : <em>« L'homme et sa femme étaient nus, et ils n'avaient point honte l'un devant l'autre. »</em> Dieu a créé le corps, les zones érogènes et le clitoris avec une intention divine d'extase et de complicité dans le mariage. Ce livre ne contient aucune vulgarité, aucune pornographie. Les illustrations sont des silhouettes élégantes et pudiques qui montrent les angles ergonomiques, et le texte honore le Créateur à chaque page.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Mon conjoint est très pudique ou réticent, comment lui présenter ce livre ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Le livre est conçu précisément pour les personnes pudiques ! Le Chapitre 2 propose <em>« L'exercice des 3 phrases »</em> et <em>« Le contrat des 30 jours »</em> qui désamorcent toute pression : aucun reproche, pas de comparaison, et un mot d'arrêt respecté à la seconde. Vous pouvez lui proposer simplement en disant : <em>« J'ai trouvé ce guide chrétien magnifique pour notre couple, j'aimerais qu'on lise juste l'introduction ensemble ce soir. »</em> La douceur et le ton bienveillant du livre feront fondre toutes ses défenses.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Est-ce que mes proches ou ma banque verront ce que j'ai acheté ? (Discrétion)</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p><strong>Discrétion totale et absolue.</strong> La transaction bancaire ou Mobile Money apparaîtra sous l'intitulé neutre <strong>« Éditions Éveil »</strong>. Aucun mot embarrassant n'apparaît sur vos relevés ou notifications. Vos données personnelles restent 100% confidentielles et ne sont jamais partagées.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Sous quel format vais-je recevoir le livre et les bonus ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Dès votre paiement validé, vous êtes redirigé(e) vers une page de téléchargement immédiat. Vous recevez également un email avec vos fichiers en <strong>format PDF Haute Définition</strong>, lisibles sur n'importe quel smartphone (Android ou iPhone), tablette ou ordinateur. Vous pouvez également demander à recevoir vos fichiers directement par WhatsApp sur notre assistance dédiée.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Nous avons des rondeurs, des douleurs au dos ou plus de 50 ans : est-ce adapté ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p><strong>Oui, à 100% !</strong> Le Chapitre 12 et le Chapitre 16 sont spécialement consacrés aux corps ronds, aux ventres forts, au dos fragile et aux couples après 50 ans ou après l'accouchement. Chaque position est expliquée avec des coussins d'angle fermes qui soulagent les articulations et permettent une jouissance profonde sans aucun essoufflement ni acrobatie.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Comment fonctionne le paiement par Mobile Money (Wave, Orange, MTN, Moov) ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>C'est ultra-simple et instantané ! Cliquez sur le bouton de commande, entrez votre nom, email et numéro. Notre plateforme sécurisée <strong>FedaPay</strong> vous demandera de valider le débit de 9 500 FCFA sur votre téléphone avec votre code secret Mobile Money habituel (Orange Money, MTN, Wave ou Moov). La transaction prend moins de 30 secondes et vous accédez immédiatement au pack.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Et si je ne suis pas satisfait(e) après la lecture ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Vous êtes protégé(e) par notre <strong>Garantie Inconditionnelle de 30 Jours</strong>. Si vous appliquez les conseils et que vous n'êtes pas transporté(e) par la métamorphose de votre lit, envoyez-nous un simple message WhatsApp et nous vous remboursons intégralement vos 9 500 FCFA sans poser de questions.</p>
          </div>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       13. SECTION : LE CHOIX FINAL (LE COÛT DE L'INACTION)
       ========================================================================= -->
  <section class="section" id="choix" style="padding-bottom: 110px;">
    <div class="container" style="max-width: 840px;">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 12px;">⚖️ DEUX DESTINS POUR VOTRE MARIAGE</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 14px;">
          Ce Soir, Deux Chemins S'Offrent À Vous
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Dans quelques instants, vous allez fermer cette page. Que va-t-il se passer dans votre chambre ?
        </p>
      </div>

      <div class="choices-grid">
        
        <!-- BAD CHOICE -->
        <div class="choice-card choice-bad" style="border-color: rgba(142, 16, 34, 0.4); background: rgba(22, 10, 15, 0.85);">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">🌑</div>
          <h3 style="font-size: 1.2rem; color: #fda4af; margin-bottom: 10px;">CHEMIN A : NE RIEN CHANGER</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-body); line-height: 1.6;">
            Vous fermez cet écran. Vous économisez 9 500 FCFA. Ce soir, vous vous couchez dos à dos dans le même lit tiède. L'homme reste avec son anxiété de performance, la femme reste avec sa frustration invisible. La routine continue de creuser son fossé, et la porte de l'infidélité reste entrouverte. Dans 1 an, dans 5 ans, où en sera votre mariage ?
          </p>
        </div>

        <!-- GOOD CHOICE -->
        <div class="choice-card choice-good" style="border-color: var(--color-gold-sacred); background: rgba(30, 14, 20, 0.95); box-shadow: 0 0 30px rgba(212, 175, 55, 0.25);">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">✨</div>
          <h3 style="font-size: 1.2rem; color: #fde047; margin-bottom: 10px;">CHEMIN B : ALLUMER LE FEU</h3>
          <p style="font-size: 0.9rem; color: #ffffff; line-height: 1.6;">
            Vous investissez 9 500 FCFA (au lieu de 25 000 FCFA). Vous téléchargez le guide tout de suite. Ce soir, vous allumez une bougie. Vous lisez ensemble les premiers passages. Vous appliquez la règle de l'échelle 1-10, les caresses du clitoris et une nouvelle position. Vous voyez ses yeux briller comme au premier jour, et vous redécouvrez un amour plus brûlant que jamais !
          </p>
        </div>

      </div>

      <!-- Final Master CTA Button -->
      <div style="text-align: center; margin-top: 36px;">
        <a href="#open-checkout" class="btn-cta open-checkout-trigger" style="max-width: 580px; margin: 0 auto; background: linear-gradient(135deg, #8e1022 0%, #6e0817 50%, #42040d 100%); border: 2px solid var(--color-gold-sacred); box-shadow: 0 0 45px rgba(142, 16, 34, 0.8);">
          <span style="font-weight: 900; letter-spacing: 0.04em;">🔥 JE CHOISIS NOTRE LIT DE FEU (9 500 FCFA)</span>
          <span class="btn-cta-sub" style="color: #fef08a;">⚡ Téléchargement Immédiat • 100% Discret • Garantie 30 Jours</span>
        </a>
      </div>

    </div>
  </section>

  <!-- =========================================================================
       14. FOOTER SECTION
       ========================================================================= -->
  <footer class="footer-section" style="border-top: 1px solid rgba(212, 175, 55, 0.2); background: #080406;">
    <div class="container">
      <div style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 900; color: #ffffff; margin-bottom: 8px;">
        FOU DE TOI, FOLLE DE TOI
      </div>
      <div style="font-size: 0.85rem; color: var(--color-gold-sacred); font-style: italic; margin-bottom: 16px;">
        Le guide du couple chrétien qui veut un lit de feu
      </div>
      <p style="font-size: 0.78rem; color: var(--color-text-dim); line-height: 1.6; max-width: 600px; margin: 0 auto 16px auto;">
        © 2026 Tous droits réservés. Ce livre est un guide éducatif et pratique réservé aux couples adultes. Il ne remplace pas l'avis d'un professionnel de santé ni d'un conseiller conjugal certifié. Facturation 100% discrète.
      </p>
      <div class="footer-links" style="font-size: 0.75rem; color: var(--color-text-muted);">
        <a href="#hero">Haut de page</a> • 
        <a href="#programme">Le Programme</a> • 
        <a href="#bonus">Les Bonus</a> • 
        <a href="#faq">FAQ</a> • 
        <a href="https://wa.me/2290195928057" target="_blank" rel="noopener">Contact WhatsApp (+229 0195928057)</a>
      </div>
    </div>
  </footer>

  <!-- =========================================================================
       15. STICKY MOBILE & DESKTOP FLOATING CTA BAR
       ========================================================================= -->
  <div class="sticky-bottom-bar" id="stickyCtaBar" style="background: rgba(14, 6, 9, 0.95); border-top: 2px solid var(--color-gold-sacred); backdrop-filter: blur(12px);">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
      
      <div class="sticky-price-info">
        <div class="sticky-price-title" style="color: #fda4af;">LIT DE FEU • PACK COMPLET</div>
        <div class="sticky-price-val text-gradient-gold-sacred">
          9 500 FCFA <span style="color: #94a3b8; text-decoration: line-through; font-size: 0.8rem;">25 000F</span>
        </div>
      </div>

      <a href="#open-checkout" class="btn-cta btn-sticky-cta open-checkout-trigger" style="flex: 1; max-width: 380px; padding: 12px 16px; background: linear-gradient(135deg, #8e1022 0%, #6e0817 100%); border: 1px solid var(--color-gold-sacred); box-shadow: 0 0 25px rgba(142, 16, 34, 0.7);">
        <span style="font-weight: 900; font-size: 0.92rem;">🔥 COMMANDER MON PACK</span>
        <span class="btn-cta-sub" style="font-size: 0.72rem; color: #fef08a;">Wave • Orange • MTN • Moov • Carte</span>
      </a>

    </div>
  </div>

  <!-- =========================================================================
       16. SOCIAL PROOF LIVE NOTIFICATION TOAST
       ========================================================================= -->
  <div class="social-proof-toast" id="socialProofToast" style="border-color: var(--color-gold-sacred); background: rgba(22, 10, 16, 0.95);">
    <div class="toast-avatar" style="background: var(--color-burgundy); border: 1px solid var(--color-gold-sacred); color: #fde047;">📖</div>
    <div class="toast-text">
      <div>
        <strong id="toastName">Kouamé K.</strong> <span id="toastFlag">🇨🇮</span> de <span id="toastCity">Abidjan</span> a commandé
      </div>
      <div class="toast-time" id="toastTime" style="color: #fde047;">à l'instant • Accès envoyé par email</div>
    </div>
  </div>

  <!-- =========================================================================
       17. MODAL POPUP FEDAPAY DIRECT CHECKOUT
       ========================================================================= -->
  <div class="modal-overlay" id="checkoutModal">
    <div class="modal-card" style="border: 2px solid var(--color-gold-sacred); background: rgba(22, 10, 16, 0.98); box-shadow: 0 0 50px rgba(142, 16, 34, 0.8);">
      <button class="modal-close-btn" id="closeModalBtn">&times;</button>
      
      <div style="text-align: center; margin-bottom: 18px;">
        <div class="badge-pill badge-gold-foil" style="margin-bottom: 8px;">🔒 PAIEMENT SÉCURISÉ & ANONYME</div>
        <h3 style="font-size: 1.45rem; color: #ffffff; margin-bottom: 4px;">Recevoir Mon Pack Immédiatement</h3>
        <p style="color: var(--color-text-muted); font-size: 0.85rem;">
          Accès instantané au livre (190 pages) + 6 bonus offerts
        </p>
      </div>

      <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 800; color: #ffffff; font-size: 0.92rem;">FOU DE TOI, FOLLE DE TOI</div>
          <div style="font-size: 0.75rem; color: #34d399;">✓ Réduction de 62% appliquée (-15 500 FCFA)</div>
        </div>
        <span style="font-weight: 900; color: var(--color-gold-bright); font-size: 1.25rem;">9 500 FCFA</span>
      </div>

      <form id="modalCheckoutForm">
        <div class="form-group">
          <label class="form-label" for="mClientName">Prénom & Nom *</label>
          <input type="text" id="mClientName" class="form-input" placeholder="Ex: Jean Kouamé" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="mClientEmail">Adresse Email (pour recevoir le guide en PDF) *</label>
          <input type="email" id="mClientEmail" class="form-input" placeholder="Ex: jean.kouame@gmail.com" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="mClientCountry">Pays *</label>
          <select id="mClientCountry" class="form-select">
            <option value="CI" selected>🇨🇮 Côte d'Ivoire (+225)</option>
            <option value="BJ">🇧🇯 Bénin (+229)</option>
            <option value="SN">🇸🇳 Sénégal (+221)</option>
            <option value="TG">🇹🇬 Togo (+228)</option>
            <option value="BF">🇧🇫 Burkina Faso (+226)</option>
            <option value="ML">🇲🇱 Mali (+223)</option>
            <option value="CM">🇨🇲 Cameroun (+237)</option>
            <option value="CG">🇨🇬 Congo Brazzaville (+242)</option>
            <option value="CD">🇨🇩 RD Congo (+243)</option>
            <option value="GA">🇬🇦 Gabon (+241)</option>
            <option value="OTHER">🌍 Autre pays / Diaspora</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="mClientPhone">Numéro WhatsApp / Mobile Money *</label>
          <input type="tel" id="mClientPhone" class="form-input" placeholder="Ex: 0708091011" required>
        </div>

        <button type="submit" class="btn-cta" style="width: 100%; margin-top: 10px; background: linear-gradient(135deg, #8e1022 0%, #6e0817 50%, #42040d 100%); border: 1px solid var(--color-gold-sacred); box-shadow: 0 0 25px rgba(142, 16, 34, 0.7);">
          <span style="font-weight: 900;">🔒 VALIDER ET PAYER 9 500 FCFA</span>
          <span class="btn-cta-sub" style="color: #fef08a;">Wave • Orange • MTN • Moov • Carte Bancaire</span>
        </button>
      </form>

      <div style="text-align: center; margin-top: 12px; font-size: 0.75rem; color: var(--color-text-dim);">
        Facturation discrète sous l'intitulé "Éditions Éveil" • Garantie 30 jours
      </div>

    </div>
  </div>

  <!-- Embedded Client JavaScript Logic -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // 1. Synchronized Midnight Countdown
      function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(23, 59, 59, 999);
        let diff = midnight.getTime() - now.getTime();
        if (diff < 0) diff = 0;

        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

        document.querySelectorAll('.cd-hours').forEach(el => el.textContent = hours);
        document.querySelectorAll('.cd-minutes').forEach(el => el.textContent = minutes);
        document.querySelectorAll('.cd-seconds').forEach(el => el.textContent = seconds);
      }
      setInterval(updateCountdown, 1000);
      updateCountdown();

      // 2. FAQ Accordion
      document.querySelectorAll('.faq-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.parentElement;
          const isActive = item.classList.contains('active');
          document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
          if (!isActive) item.classList.add('active');
        });
      });

      // 3. Sticky Bottom Bar visibility
      const stickyBar = document.getElementById('stickyCtaBar');
      const heroEl = document.getElementById('hero');
      const offerEl = document.getElementById('offre');

      window.addEventListener('scroll', () => {
        if (!stickyBar || !heroEl) return;
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        const offerRect = offerEl ? offerEl.getBoundingClientRect() : null;

        const isPastHero = heroBottom < 0;
        const isInsideOffer = offerRect && offerRect.top < window.innerHeight && offerRect.bottom > 0;

        if (isPastHero && !isInsideOffer) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      }, { passive: true });

      // 4. Social Proof Toast Generator
      const buyerPool = [
        { name: 'Kouamé K.', city: 'Abidjan (Cocody)', flag: '🇨🇮' },
        { name: 'Pasteur David M.', city: 'Yamoussoukro', flag: '🇨🇮' },
        { name: 'Dieudonné M.', city: 'Brazzaville', flag: '🇨🇬' },
        { name: 'Patrick K.', city: 'Kinshasa (Gombe)', flag: '🇨🇩' },
        { name: 'Chantal & Marc A.', city: 'Abidjan (Plateau)', flag: '🇨🇮' },
        { name: 'Dr. Emmanuel L.', city: 'Lubumbashi', flag: '🇨🇩' },
        { name: 'Brice & Sandrine P.', city: 'Pointe-Noire', flag: '🇨🇬' },
        { name: 'Christian M.', city: 'Cotonou', flag: '🇧🇯' },
        { name: 'Serge & Grâce B.', city: 'Douala', flag: '🇨🇲' },
        { name: 'Arsène G.', city: 'Abidjan (Yopougon)', flag: '🇨🇮' },
        { name: 'Gloire M.', city: 'Brazzaville', flag: '🇨🇬' },
        { name: 'Fabrice N.', city: 'Dakar', flag: '🇸🇳' },
        { name: 'Fiston B.', city: 'Kinshasa', flag: '🇨🇩' },
        { name: 'Yannick T.', city: 'Lomé', flag: '🇹🇬' }
      ];

      const timePhrases = ['à l\\'instant', 'il y a 1 min', 'il y a 2 min', 'il y a 3 min', 'il y a 5 min', 'il y a 8 min'];
      let poolIndex = 0;

      function triggerToast() {
        const toast = document.getElementById('socialProofToast');
        const nameEl = document.getElementById('toastName');
        const cityEl = document.getElementById('toastCity');
        const flagEl = document.getElementById('toastFlag');
        const timeEl = document.getElementById('toastTime');

        if (!toast || !nameEl) return;

        const b = buyerPool[poolIndex % buyerPool.length];
        const t = timePhrases[Math.floor(Math.random() * timePhrases.length)];

        nameEl.textContent = b.name;
        cityEl.textContent = b.city;
        if (flagEl) flagEl.textContent = b.flag;
        timeEl.textContent = t + ' • Accès envoyé par email';

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4800);

        poolIndex++;
        setTimeout(triggerToast, 12000 + Math.random() * 10000);
      }
      setTimeout(triggerToast, 3500);

      // 5. Checkout Modal & FedaPay Launch
      const modal = document.getElementById('checkoutModal');
      const closeBtn = document.getElementById('closeModalBtn');
      const modalForm = document.getElementById('modalCheckoutForm');

      function openModal(e) {
        if (e) e.preventDefault();
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }

      function closeModal() {
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }

      document.querySelectorAll('.open-checkout-trigger').forEach(btn => {
        btn.addEventListener('click', openModal);
      });

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
      }

      // Handle Modal Form Submission
      if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const name = document.getElementById('mClientName').value.trim();
          const email = document.getElementById('mClientEmail').value.trim();
          const phone = document.getElementById('mClientPhone').value.trim();
          const country = document.getElementById('mClientCountry').value;

          if (!name || !email || !phone) {
            alert('Veuillez remplir toutes les informations pour recevoir votre pack.');
            return;
          }

          closeModal();

          // Fire InitiateCheckout Event for Meta Pixel & CAPI
          var icEventId = 'ic_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
          if (typeof fbq === 'function') {
            fbq('track', 'InitiateCheckout', {
              content_name: 'FOU DE TOI, FOLLE DE TOI',
              currency: 'XOF',
              value: 9500
            }, { eventID: icEventId });
          }

          try {
            fetch('/api/capi', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event_name: 'InitiateCheckout',
                event_id: icEventId,
                value: 9500,
                currency: 'XOF',
                url: window.location.href
              }),
              keepalive: true
            }).catch(function(){});
          } catch(err){}

          // Initialize FedaPay Checkout
          try {
            if (typeof FedaPay !== 'undefined') {
              const widget = FedaPay.init({
                public_key: 'pk_live_Ps51ySoBt1b2ZAxB6RuEkRHt',
                transaction: {
                  amount: 9500,
                  description: 'FOU DE TOI, FOLLE DE TOI - Guide du couple chrétien (190 pages + 6 Bonus)',
                  custom_metadata: {
                    customer_name: name,
                    customer_country: country
                  }
                },
                customer: {
                  email: email,
                  lastname: name.split(' ').slice(1).join(' ') || name,
                  firstname: name.split(' ')[0],
                  phone_number: {
                    number: phone,
                    country: country === 'OTHER' ? 'BJ' : country
                  }
                },
                onComplete: function(response) {
                  const trxId = (response && response.id) ? response.id : ('FP_' + Date.now());
                  const token = btoa(JSON.stringify({
                    unlocked: true,
                    product: 'fou-de-toi-folle-de-toi',
                    txn_id: trxId,
                    email: email,
                    checksum: btoa(trxId + '_AmourDesir_LitDeFeu_Vault_2026!')
                  }));
                  const expires = new Date();
                  expires.setTime(expires.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
                  document.cookie = 'ad_vault_session=' + encodeURIComponent(token) + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
                  try { localStorage.setItem('amour_desir_secure_vault', token); } catch(e){}

                  window.location.href = 'dashboard.html?status=success&id=' + encodeURIComponent(trxId);
                }
              });

              widget.open();
            } else {
              window.location.href = 'checkout.html';
            }
          } catch (err) {
            console.error('Error opening FedaPay widget:', err);
            window.location.href = 'checkout.html';
          }
        });
      }

      // Smooth scroll for anchors
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#' || targetId === '#open-checkout') return;
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    });
  </script>
</body>
</html>`;

if (!fs.existsSync('fou-de-toi-folle-de-toi')) fs.mkdirSync('fou-de-toi-folle-de-toi', { recursive: true });
fs.writeFileSync('fou-de-toi-folle-de-toi.html', singleFileHtml, 'utf8');
fs.writeFileSync('fou-de-toi-folle-de-toi/index.html', singleFileHtml, 'utf8');
console.log('Successfully compiled standalone fou-de-toi-folle-de-toi.html & fou-de-toi-folle-de-toi/index.html (' + fs.statSync('fou-de-toi-folle-de-toi.html').size + ' bytes)!');
