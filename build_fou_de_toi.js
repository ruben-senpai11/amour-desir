const fs = require('fs');
const path = require('path');

console.log('Generating Light-Themed, Book-Accurate Sales Page for FOU DE TOI, FOLLE DE TOI (Zero Gold, Pure Book Charter)...');

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

// Calculate initial countdown values
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
  <meta name="description" content="Découvrez le livre officiel avec schémas anatomiques et 18 positions pour transformer votre chambre en un lit de feu. Déculpabilisation biblique, endurance masculine et fidélité absolue. Offre de lancement à 9 500 FCFA.">
  <meta property="og:title" content="FOU DE TOI, FOLLE DE TOI • Le Guide Du Couple Chrétien Qui Veut Un Lit De Feu">
  <meta property="og:description" content="Le livre avec schémas détaillés pour jouir à chaque fois et rendre votre partenaire complètement fou/folle de vous. Même sans endurance et sans positions compliquées.">
  <meta property="og:image" content="${bookCoverB64}">
  <meta property="og:type" content="website">
  
  <!-- Google Fonts: Plus Jakarta Sans (Haute Lisibilité) + Lora (Édition Noble) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Lora:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  

  <!-- Stylesheet -->
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
    
    var pageViewEventId = 'pv_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
    fbq('init', '2465772550579051');
    fbq('track', 'PageView', {}, { eventID: pageViewEventId });
  </script>
</head>
<body style="background-color: #FAF7F5; color: #2D2D2D;">

  <!-- =========================================================================
       1. TOP URGENCY COUNTDOWN ANNOUNCEMENT BAR
       ========================================================================= -->
  <div class="top-urgency-bar">
    <div class="top-urgency-inner">
      <span class="badge-pill badge-burgundy" style="background: rgba(255,255,255,0.2); color: #FFFFFF; border-color: rgba(255,255,255,0.4); font-size: 0.85rem;">🔥 OFFRE DE LANCEMENT</span>
      <span>PRIX EXCLUSIF : <strong>9 500 FCFA</strong> AU LIEU DE <span style="text-decoration: line-through; opacity: 0.8;">25 000 FCFA</span> (-62%)</span>
      <div class="countdown-box">
        <span style="font-size: 0.88rem; margin-right: 4px;">FIN À MINUIT :</span>
        <span class="countdown-digit cd-hours">${initHours || '23'}</span>h
        <span class="countdown-digit cd-minutes">${initMinutes || '59'}</span>m
        <span class="countdown-digit cd-seconds">${initSeconds || '09'}</span>s
      </div>
    </div>
  </div>

  <!-- =========================================================================
       2. HERO SECTION : L'ACCROCHE & LE CHOC ÉMOTIONNEL
       ========================================================================= -->
  <section class="hero-section" id="hero">
    <div class="hero-bg-immersion"></div>
    <div class="container" style="position: relative; z-index: 1;">
      
      <!-- En-tête typographique du livre -->
      <div class="book-header-rule">
        <span class="book-header-text">F O U   D E   T O I ,   F O L L E   D E   T O I</span>
      </div>

      <!-- Badge d'autorité -->
      <div class="badge-pill badge-burgundy" style="margin-bottom: 16px;">
        RÉSERVÉ AUX COUPLES ADULTES • GUIDE DU COUPLE CHRÉTIEN
      </div>

      <!-- Citation biblique inspirée de la page 11 du livre -->
      <div class="verse-sacred-card" style="max-width: 760px;">
        <div class="verse-text">
          « Que ta source soit bénie, et fais ta joie de la femme de ta jeunesse... Que sa tendresse t'enivre en tout temps, sois sans cesse épris de son amour. »
        </div>
        <div class="verse-ref">— PROVERBES 5:18-19</div>
      </div>

      <!-- Titre principal -->
      <h1 class="hero-title">
        Ce Soir, Votre Lit Ne Sera Plus Jamais Le Même.<br>
        <span class="title-burgundy">Le Livre Avec Schémas Détaillés Pour Jouir À Chaque Fois & Rendre Votre Partenaire Complètement Fou/Folle De Vous !</span>
      </h1>

      <!-- Sous-titre -->
      <p class="hero-subtitle">
        Même sans endurance masculine, même avec la fatigue des enfants ou après 20 ans de routine, et <strong>sans aucune position compliquée</strong>. Découvrez comment faire de votre chambre conjugale un lit de feu, sans honte, sans vulgarité et dans la pleine bénédiction de Dieu.
      </p>

      <!-- Carte centrale de présentation -->
      <div class="hero-media-card">
        
        <div class="book-cover-3d-box" style="margin-bottom: 24px;">
          <img src="${bookCoverB64}" alt="Livre FOU DE TOI, FOLLE DE TOI - Guide Officiel" class="book-cover-3d-img">
          <div style="font-size: 0.88rem; color: var(--color-burgundy); text-align: center; font-weight: 800; margin-top: 14px;">
            📖 LE GUIDE MAÎTRE OFFICIEL DU COUPLE CHRÉTIEN (190 PAGES HD) • 18 POSITIONS • 6 BONUS INCLUS
          </div>
        </div>

        <!-- Pastille de prix -->
        <div class="pricing-banner-pill">
          <div class="price-strike-group">
            <div class="price-strike-label">Prix Normal</div>
            <div class="price-strike-val">25 000 FCFA</div>
          </div>
          <div class="price-main-group">
            <div class="price-main-label">⚡ AUJOURD'HUI SEULEMENT (-62%)</div>
            <div class="price-main-val">9 500 FCFA</div>
          </div>
        </div>

        <!-- Bouton CTA principal -->
        <a href="https://amour-desir.mychariow.co/prd_lw2y36td/checkout" class="btn-cta btn-chariow-checkout" style="width: 100%;">
          <span>🔥 OUI, JE VEUX NOTRE LIT DE FEU DÈS CE SOIR</span>
          <span class="btn-cta-sub">Accès Immédiat pour 9 500 FCFA • Wave, Orange, MTN, Moov, Carte</span>
        </a>

        <!-- Rassurance sobre -->
        <div class="hero-badges-row" style="margin-top: 20px;">
          <div class="hero-badge-item">
            <span style="color: var(--color-burgundy);">✓</span>
            <span>100% Conforme aux Écritures</span>
          </div>
          <div class="hero-badge-item">
            <span style="color: var(--color-burgundy);">✓</span>
            <span>Téléchargement Immédiat</span>
          </div>
          <div class="hero-badge-item">
            <span style="color: var(--color-burgundy);">✓</span>
            <span>Discrétion 100% Anonyme</span>
          </div>
        </div>

      </div>

    </div>
      
      <!-- Illustration 1 : Couple complice au réveil -->
      <div class="book-illustration-box">
        <img src="/assets/images/illustrations/intro-couple-reveil.jpg" alt="Couple complice au réveil - Amina et Kofi" class="book-illustration-img" loading="lazy">
        <div class="book-illustration-caption">
          <span class="book-illustration-tag">Introduction Officielle</span>
          <span>Redécouvrez la complicité tendre et le sourire au réveil : la vision divine et bienveillante pour votre foyer.</span>
        </div>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       3. SECTION : LE MIROIR DE LA DOULEUR & LES PENSÉES SECRÈTES
       ========================================================================= -->
  <section class="section" id="probleme" style="background: #FFFFFF;">
    <div class="container">
      
      <div style="text-align: center; max-width: 760px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">SOYONS SINCÈRES ENTRE ÉPOUX CHRÉTIENS</div>
        <h2 style="font-size: 2.1rem; line-height: 1.25; margin-bottom: 14px; color: var(--color-text-title);">
          Vous dormez dans le même lit. Vous vous aimez sincèrement...<br>
          <span class="title-burgundy">Mais la vérité, c'est que votre intimité ressemble à un feu qui s'éteint.</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          À l'église, vous souriez. Aux réunions de famille, tout semble parfait. Mais dès que la porte de la chambre se referme le soir, un mur de silence et de déception s'installe.
        </p>
      </div>

      <!-- Deux colonnes de douleurs -->
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 24px; margin-bottom: 30px;">
        
        <!-- Douleurs Lui -->
        <div class="card-light" style="border-left: 4px solid var(--color-burgundy);">
          <div style="margin-bottom: 14px;">
            <div style="font-size: 0.88rem; font-weight: 800; color: var(--color-burgundy); text-transform: uppercase; letter-spacing: 0.1em;">CE QUE L'HOMME VIT EN SILENCE</div>
            <h3 style="font-size: 1.25rem; color: var(--color-text-title); margin-top: 4px;">La terreur de ne pas assurer et le sentiment d'être un mendiant</h3>
          </div>
          <ul class="pain-list">
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>Le calvaire des 3 minutes :</strong> Tu es excité, elle est belle, et en quelques mouvements rapides, c'est déjà fini. Tu vois dans son regard qu'elle n'a rien ressenti de fort. Tu te sens nul, diminué, et cette angoisse accélère encore les choses au rapport suivant.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>L'érection qui faiblit au pire moment :</strong> Le stress du travail, le manque de sommeil, les soucis financiers... Tu veux être un roc pour elle, mais ton corps refuse d'obéir. La peur de la panne devient le premier voleur de virilité.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>L'humiliation de devoir quémander :</strong> Tu t'approches d'elle avec désir, et elle se retourne avec un soupir ou un « je suis fatiguée ». Tu te sens rejeté dans ton propre foyer, alors tu te tais et tu accumules de la rancune.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>Le piège empoisonné des écrans :</strong> La tentation honteuse de chercher du plaisir seul ou devant des images sur son téléphone... qui te laisse avec un dégoût profond de toi-même et brise la complicité sacrée.</span>
            </li>
          </ul>
        </div>

        <!-- Douleurs Elle -->
        <div class="card-light" style="border-left: 4px solid var(--color-burgundy);">
          <div style="margin-bottom: 14px;">
            <div style="font-size: 0.88rem; font-weight: 800; color: var(--color-burgundy); text-transform: uppercase; letter-spacing: 0.1em;">CE QUE LA FEMME ENDURE SANS OSER LE DIRE</div>
            <h3 style="font-size: 1.25rem; color: var(--color-text-title); margin-top: 4px;">La frustration invisible, le devoir conjugal et la honte de son corps</h3>
          </div>
          <ul class="pain-list">
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>Le clitoris totalement oublié :</strong> Les études médicales le confirment : seulement 1 femme sur 5 jouit par la pénétration seule ! Les 4 autres ont impérativement besoin d'une stimulation précise du clitoris. Pourtant, il fonce tout droit sans préparation, te laissant frustrée.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>La douleur et la sécheresse :</strong> Faire l'amour devient une corvée où tu serres les dents. Simuler parfois un faux orgasme pour flatter son ego et abréger, en attendant qu'il s'endorme pour fixer le plafond avec tristesse.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>La honte de ton corps qui a changé :</strong> Après les enfants, le ventre rond, les vergetures... tu as peur de son regard. Alors tu éteins la lumière en hâte et tu restes sous le drap, incapable de lâcher prise.</span>
            </li>
            <li class="pain-item">
              <span class="pain-icon" style="background: var(--color-burgundy-soft); color: var(--color-burgundy);">✕</span>
              <span><strong>La charge mentale qui éteint tout :</strong> Travail, cuisine, enfants, vaisselle... Le désir féminin est réactif, pas spontané ! Comment avoir envie d'un rapport quand il ne t'a offert aucun baiser tendre ni mot doux de toute la journée ?</span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Encadré citation du livre -->
      <div class="callout-retenir">
        <div class="callout-title-retenir">À R E T E N I R (PAGE 7 DU LIVRE)</div>
        <p style="font-size: 0.95rem; line-height: 1.6; font-style: italic; color: var(--color-text-body);">
          « Vous dormez dans le même lit. Vous vous aimez. Mais vous savez, tous les deux, que ça pourrait être beaucoup plus fort. Peut-être que tu te demandes pourquoi elle ferme les yeux et attend que ça passe. Peut-être que tu te demandes pourquoi il termine avant même que tu aies commencé à sentir quelque chose. Ce livre est là pour ça : pas de détour, pas de langage de médecin, pas de honte. »
        </p>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       4. SECTION : L'AGGRAVATION & L'ALERTE DE L'INFIDÉLITÉ
       ========================================================================= -->
  <section class="section" id="danger">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">L'ALERTE QUI PROTÈGE LE MARIAGE</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 16px;">
          Personne ne se réveille un matin en disant :<br>
          <span class="title-burgundy">« Aujourd'hui, je détruis ma famille. »</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.1rem; line-height: 1.6;">
          L'infidélité ne commence pas dehors. <strong>Elle se prépare lentement, goutte après goutte, dans le vide et la faim d'un lit conjugal tiède.</strong>
        </p>
      </div>

      <div class="card-light" style="max-width: 860px; margin: 0 auto 32px auto; padding: 32px 24px;">
        
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--color-text-body); margin-bottom: 20px;">
          Beaucoup de prédicateurs condamnent l'adultère avec raison. Mais presque aucun ne vous donne les armes concrètes pour l'éviter ! À l'église, on vous répète : <em>« Résiste à la tentation »</em>. 
          Mais <strong>comment résister quand on meurt de faim à la maison ?</strong>
        </p>

        <div style="background: var(--color-burgundy-soft); border-left: 4px solid var(--color-burgundy); padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 22px;">
          <div style="font-weight: 800; color: var(--color-burgundy); font-size: 1.15rem; margin-bottom: 4px;">
            « Le meilleur moyen de rester fidèle, c'est de n'avoir RIEN à chercher ailleurs. »
          </div>
          <div style="color: var(--color-text-muted); font-size: 0.88rem;">
            — Chapitre 18 du livre : <em>Fidélité, les armes que personne ne vous donne</em> (Page 150)
          </div>
        </div>

        <p style="font-size: 0.98rem; line-height: 1.65; color: var(--color-text-body); margin-bottom: 18px;">
          Quand la tendresse et la passion désertent votre chambre, n'importe quelle attention extérieure devient une brèche fatale :
        </p>

        <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 0.92rem;">
            <span style="color: var(--color-burgundy); font-weight: 900;">•</span>
            <span><strong>Au bureau ou en déplacement :</strong> Un sourire chaleureux d'une collègue, un compliment innocent qui touche le cœur d'un homme qui se sent rejeté chez lui...</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 0.92rem;">
            <span style="color: var(--color-burgundy); font-weight: 900;">•</span>
            <span><strong>Sur les réseaux & WhatsApp :</strong> Les messages privés tardifs, les confidences intimes à un « ami », le téléphone retourné face contre table...</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 0.92rem;">
            <span style="color: var(--color-burgundy); font-weight: 900;">•</span>
            <span><strong>Pendant la grossesse ou après 50 ans :</strong> Les moments les plus fragiles où tant de foyers chrétiens se fissurent dans le silence parce que personne ne leur a appris à adapter l'intimité.</span>
          </div>
        </div>

        <!-- Règle d'or de fidélité -->
        <div class="callout-regle-dor" style="text-align: center;">
          <div class="callout-title-regle-dor" style="justify-content: center; font-size: 1rem;">
            L'ANTIDOTE DU LIVRE FOU DE TOI, FOLLE DE TOI :
          </div>
          <p style="font-size: 1.1rem; font-weight: 700; color: var(--color-burgundy); line-height: 1.6; margin: 8px 0;">
            « Quand vous avez à la maison un plaisir que personne d'autre sur terre ne peut vous donner, rester fidèle ne sera plus jamais un effort pénible. Ce sera une évidence. »
          </p>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       5. SECTION : LA RÉVÉLATION SACRÉE & DÉCULPABILISATION TOTALE
       ========================================================================= -->
  <section class="section" id="revelation" style="background: #FFFFFF;">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">LA VÉRITÉ BIBLIQUE QUI LIBÈRE</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 16px;">
          Dieu n'a pas honte de votre corps...<br>
          <span class="title-burgundy">Le Plaisir Charnel a Été Conçu Par Le Créateur Avant Même La Chute !</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Voici ce que beaucoup de chrétiens croient suspect, alors que la Bible enseigne l'inverse :
        </p>
      </div>

      <div class="card-light" style="max-width: 880px; margin: 0 auto; padding: 32px 24px;">
        
        <div style="display: flex; flex-direction: column; gap: 24px; text-align: left;">
          
          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #FFFFFF; font-weight: 900; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.95rem;">1</div>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--color-text-title); margin-bottom: 4px;">« Nus et sans honte » (Genèse 2:25) : Le plan parfait de Dieu</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6;">
                Avant la chute, il y a un homme et une femme nus, libres et émerveillés l'un devant l'autre. Dieu a créé la peau, les nerfs, le désir ardent. La honte n'est pas le projet de Dieu pour le mariage.
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #FFFFFF; font-weight: 900; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.95rem;">2</div>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--color-text-title); margin-bottom: 4px;">Le chef-d'œuvre du Clitoris : Créé exclusivement pour le plaisir</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6;">
                Sur tous les organes du corps humain, le clitoris est le seul dont l'unique fonction est le plaisir de la femme. Ni reproduction, ni miction. <strong>Si le plaisir de la femme était une faute, cet organe n'existerait pas !</strong>
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #FFFFFF; font-weight: 900; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.95rem;">3</div>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--color-text-title); margin-bottom: 4px;">Un livre entier de la Bible dédié au désir charnel</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6;">
                Le Cantique des Cantiques parle d'un couple qui se désire, se caresse et se le dit sans fausse pudeur. La femme prend l'initiative, invite son époux dans son jardin (<em>« qu'il mange de ses fruits excellents »</em>), et l'homme célèbre son corps avec passion.
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--color-burgundy); color: #FFFFFF; font-weight: 900; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.95rem;">4</div>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--color-text-title); margin-bottom: 4px;">« Que sa tendresse t'enivre en tout temps » (Proverbes 5:19)</h3>
              <p style="font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6;">
                « En tout temps » : pas seulement pour avoir des enfants, pas du bout des lèvres. Le mot « enivrer » dit une chose claire : se laisser emporter et se perdre dans l'amour de son conjoint.
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
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">LA TRANSFORMATION DU FOYER</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px; color: var(--color-text-title);">
          Reprenez Le Contrôle De Votre Chambre Conjugale
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Voici ce qui se passe quand vous passez de l'ignorance douloureuse à la science divine de l'intimité :
        </p>
      </div>

      <!-- Image Avant Après -->
      <div style="border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); margin-bottom: 30px; max-width: 860px; margin-left: auto; margin-right: auto;">
        <img src="${avantApresB64}" alt="Avant vs Après - Reprends le contrôle de ta maison" style="width: 100%; display: block;">
      </div>

      <!-- Colonnes Comparatives -->
      <div class="compare-grid">
        
        <!-- HIER -->
        <div class="compare-col compare-col-before">
          <div class="compare-heading" style="color: #666666;">
            <span>✕</span> SANS LE LIVRE (HIER)
          </div>
          <ul class="compare-list">
            <li class="compare-item">
              <span style="color: #999;">✕</span>
              <span>Rapport précipité en 3 minutes, frustration et honte silencieuse pour lui</span>
            </li>
            <li class="compare-item">
              <span style="color: #999;">✕</span>
              <span>Elle ne jouit jamais ou simule pour abréger, douleurs et sécheresse</span>
            </li>
            <li class="compare-item">
              <span style="color: #999;">✕</span>
              <span>Rapports dans le noir complet sous le drap par honte de son corps</span>
            </li>
            <li class="compare-item">
              <span style="color: #999;">✕</span>
              <span>La routine des années, le sexe arrive en dernier quand on est épuisé</span>
            </li>
            <li class="compare-item">
              <span style="color: #999;">✕</span>
              <span>Tensions sourdes, rancune le soir, le lit devient un terrain de glace</span>
            </li>
            <li class="compare-item">
              <span style="color: #999;">✕</span>
              <span>La porte de l'infidélité reste entrouverte par manque de plaisir</span>
            </li>
          </ul>
        </div>

        <!-- DÈS CE SOIR -->
        <div class="compare-col compare-col-after">
          <div class="compare-heading" style="color: var(--color-burgundy);">
            <span>✓</span> AVEC LE LIVRE (DÈS CE SOIR)
          </div>
          <ul class="compare-list">
            <li class="compare-item">
              <span style="color: var(--color-burgundy); font-weight: 800;">✓</span>
              <span><strong>Endurance de 15 à 20 minutes maîtrisée</strong> grâce au protocole 1-10 et au stop-start</span>
            </li>
            <li class="compare-item">
              <span style="color: var(--color-burgundy); font-weight: 800;">✓</span>
              <span><strong>Orgasmes multiples et intenses pour elle</strong> grâce aux 4 mouvements d'orfèvre du clitoris</span>
            </li>
            <li class="compare-item">
              <span style="color: var(--color-burgundy); font-weight: 800;">✓</span>
              <span><strong>Corps célébrés à la bougie :</strong> elle se sent belle et désirée sans aucun complexe</span>
            </li>
            <li class="compare-item">
              <span style="color: var(--color-burgundy); font-weight: 800;">✓</span>
              <span><strong>18 positions illustrées faciles</strong> adaptées aux ventres ronds, au dos et à chaque gabarit</span>
            </li>
            <li class="compare-item">
              <span style="color: var(--color-burgundy); font-weight: 800;">✓</span>
              <span><strong>Complicité toute la journée :</strong> le baiser de 6 secondes, messages complices, rires à deux</span>
            </li>
            <li class="compare-item">
              <span style="color: var(--color-burgundy); font-weight: 800;">✓</span>
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
  <section class="section" id="programme" style="background: #FFFFFF;">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">DÉCOUVREZ L'INTÉGRALITÉ DU LIVRE</div>
        <h2 style="font-size: 2.3rem; line-height: 1.25; margin-bottom: 14px;">
          FOU DE TOI, FOLLE DE TOI<br>
          <span class="title-burgundy">190 Pages Pratiques, Pas de Tabou, Des Résultats Immédiats !</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Découpé en trois voix : une partie pour lui, une partie pour elle, et une grande partie pour vous deux :
        </p>
      </div>

      <!-- Grille des parties -->
      
      <!-- Illustrations Anatomie & Cartographie -->
      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-3-anatomie-feminine.jpg" alt="Anatomie Féminine Schéma 3D" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 3 • Anatomie 3D</span>
            <span>Schéma médical précis du clitoris & des bulbes vestibulaires : l'organe d'extase féminin démystifié.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-3-anatomie-masculine.jpg" alt="Anatomie Masculine Schéma 3D" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 3 • Anatomie 3D</span>
            <span>Anatomie masculine & corps caverneux : les mécanismes physiologiques de l'érection ferme et durable.</span>
          </div>
        </div>
      </div>

      <div class="book-illustration-box">
        <img src="/assets/images/illustrations/chapitre-4-cartes-zones-erogenes.jpg" alt="Carte des Zones Érogènes" class="book-illustration-img" loading="lazy">
        <div class="book-illustration-caption">
          <span class="book-illustration-tag">Chapitre 4 • Cartographie</span>
          <span>La Carte des 7 zones érogènes majeures du corps : nuque, dos, lèvres, cuisses et points réflexes d'excitation.</span>
        </div>
      </div>

      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-4-massage-cartographie.jpg" alt="Massage de cartographie" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 4 • Le Rituel</span>
            <span>Le massage de cartographie à l'huile tiède : relâcher les tensions et reconnecter les corps sans pression.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-3-diversite-corps.jpg" alt="Diversité des corps" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 3 • Confiance</span>
            <span>La diversité des morphologies : mince, ronde, après accouchement... chaque corps est digne et capable d'extase.</span>
          </div>
        </div>
      </div>

      
      <!-- Illustrations Endurance Masculine -->
      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-5-echelle-excitation.jpg" alt="Échelle d'excitation 1 à 10" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 5 • Endurance</span>
            <span>L'infographie de l'Échelle 1 à 10 : identifier le palier 7 pour retarder l'éjaculation et durer 20 minutes sans forcer.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-5-plancher-pelvien.jpg" alt="Plancher pelvien masculin" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 5 • Muscle PC</span>
            <span>Le plancher pelvien masculin : la gymnastique invisible pour verrouiller l'érection et stopper la fuite précoce.</span>
          </div>
        </div>
      </div>

      <div class="book-illustration-box">
        <img src="/assets/images/illustrations/chapitre-5-pause-caline.jpg" alt="La pause câline" class="book-illustration-img" loading="lazy">
        <div class="book-illustration-caption">
          <span class="book-illustration-tag">Chapitre 5 • Technique Clé</span>
          <span>La pause câline : comment reprendre son souffle et synchroniser les battements du cœur sans casser le rythme.</span>
        </div>
      </div>

      
      <!-- Illustrations Caresses & Signaux Féminins -->
      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-7-mouvements-stimulation.jpg" alt="Mouvements de stimulation clitoridienne" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 7 • L'Orfèvrerie</span>
            <span>Les 4 mouvements de caresse clitoridienne pour amener son épouse à l'orgasme avant la pénétration.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-7-lire-les-signaux.jpg" alt="Lire les signaux corporels" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 7 • Les Indices</span>
            <span>Infographie : décoder les soupirs, contractions involontaires et mouvements du bassin de sa femme.</span>
          </div>
        </div>
      </div>

      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-7-cunnilingus.jpg" alt="Cunnilingus pudique et respectueux" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 7 • Offrande</span>
            <span>La caresse orale langue à plat : l'art d'offrir le plaisir le plus pur sans précipitation.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-9-seduction-maison.jpg" alt="Séduction à la maison" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 9 • Séduction</span>
            <span>Recréer l'ambiance et la tension amoureuse dans la maison dès 17h.</span>
          </div>
        </div>
      </div>

      <div class="parts-grid">
        
        <!-- PART 1 -->
        <div class="part-card" style="border-left: 4px solid var(--color-burgundy);">
          <div class="part-tag">PARTIE 1 • PAGES 11 À 17</div>
          <h3 class="part-title">Le Plaisir a Été Créé Par Dieu</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 1 : Foi chrétienne, plaisir et discernement</strong> — Pourquoi la Bible invite à s'enivrer d'amour (Proverbes 5:19), pourquoi Dieu a créé le clitoris uniquement pour le plaisir, et comment aborder le sexe oral (cunnilingus & fellation) avec une conscience libre et éclairée.</li>
            <li><strong>Le jardin fermé</strong> — Ce que le plaisir protège : bâtir une intimité si forte que l'infidélité devient impensable.</li>
          </ul>
        </div>

        <!-- PART 2 -->
        <div class="part-card" style="border-left: 4px solid var(--color-burgundy);">
          <div class="part-tag">PARTIE 2 • PAGES 18 À 36</div>
          <h3 class="part-title">Votre Point de Départ & Diagnostic Intime</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 2 : Faire le test de votre couple</strong> — Le questionnaire des 10 phrases sur 50 pour faire le bilan honnêtement et sans reproche.</li>
            <li><strong>Les 5 blocages déracinés</strong> — Fatigue/routine, rapidité masculine, honte du corps, silence et blessures du passé.</li>
            <li><strong>L'exercice des 3 phrases & Le contrat des 30 jours</strong> — La sécurité indispensable pour oser.</li>
            <li><strong>Chapitre 3 : Les vrais chiffres pour arrêter de se comparer</strong> — Anatomie secrète du clitoris (bulbes et branches de 10 cm) et adaptations aux morphologies (minces, fortes, grand ventre).</li>
            <li><strong>Chapitre 4 : La carte des zones érogènes</strong> — La règle d'intensité de 1 à 10 et l'exercice de cartographie en 40 min à la bougie.</li>
          </ul>
        </div>

        <!-- PART 3 -->
        <div class="part-card" style="border-left: 4px solid var(--color-burgundy);">
          <div class="part-tag">PARTIE 3 • POUR LUI • PAGES 37 À 62</div>
          <h3 class="part-title">Devenir le Maître du Plaisir & Tenir Plus Longtemps</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 5 : Tenir plus longtemps sans effort</strong> — L'échelle d'excitation 1 à 10 (la zone 5-7), la respiration ventrale, la méthode Stop-Start à deux, la technique du Squeeze sous la couronne et les exercices de Kegel masculins.</li>
            <li><strong>Le truc des hommes expérimentés : Le deuxième tour</strong> — Comment transformer sa nuit en marathon sans frustration.</li>
            <li><strong>Chapitre 6 : Une érection plus dure et plus durable</strong> — Neutraliser les 7 ennemis de la verge + Les 10 trésors du marché africain (gingembre, bissap, pastèque citrulline, moringa, graines de courge au zinc, arachide, dattes) + 5 recettes de potions maison.</li>
            <li><strong>Chapitre 7 : Savoir faire jouir une femme à chaque fois</strong> — Ce qu'elle n'ose pas te dire, les 4 mouvements d'orfèvre du clitoris (cercles, haut-bas, tapotements, pression fixe) et <strong>LA RÈGLE D'OR : quand elle monte, ne change rien !</strong></li>
            <li><strong>Le Cunnilingus pas à pas</strong> — Technique de la langue à plat, stimulation du Point G (doigts en crochet à 3-4 cm) et orgasmes multiples.</li>
          </ul>
        </div>

        <!-- PART 4 -->
        <div class="part-card" style="border-left: 4px solid var(--color-burgundy);">
          <div class="part-tag">PARTIE 4 • POUR ELLE • PAGES 63 À 76</div>
          <h3 class="part-title">Son Corps, Son Plaisir & Faire Perdre la Tête À Son Mari</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 8 : Son corps, son plaisir</strong> — Réconciliation avec son image devant le miroir, éliminer la sécheresse et la douleur, comprendre son désir réactif et maîtriser les 4 types d'orgasmes (clitoridien, point G, mixte, montée lente).</li>
            <li><strong>Chapitre 9 : Faire perdre la tête à son mari</strong> — Ce que l'homme attend en secret : se sentir désiré ! Le regard de 5 secondes, le pagne noué, les perles de reins, la voix basse.</li>
            <li><strong>La fellation douce pas à pas sans fatigue</strong> — Éviter le réflexe nauséeux, mouvements lèvres et main, et mots qui le rendent fou.</li>
            <li><strong>Prendre l'initiative : La soirée « Il ne fait rien »</strong> — 30 minutes où il s'abandonne entièrement entre vos mains.</li>
          </ul>
        </div>

        <!-- PART 5 -->
        <div class="part-card" style="border-left: 4px solid var(--color-burgundy);">
          <div class="part-tag">PARTIE 5 • POUR VOUS DEUX • PAGES 77 À 129</div>
          <h3 class="part-title">L'Alchimie Conjugale & Le Kama Sutra Chrétien</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 10 : Préparer le terrain toute la journée</strong> — Le baiser de 6 secondes, les 6 touchers non sexuels par jour, les messages courts et désamorcer les rancunes du soir.</li>
            <li><strong>Chapitre 11 : Le rapport parfait du début à la fin en 6 temps</strong> — Transition (10 min), Préliminaires (20 min), Montée (5 min), Pénétration (10-15 min), Orgasme, L'Après (10 min câlins). Code des signaux discrets par les mains.</li>
            <li><strong>Chapitre 12 : Les 18 Positions qui marchent</strong> — Silhouettes pudiques sans visage adaptées aux corps réels avec des coussins.</li>
            <li><strong>Chapitre 13 : Sexe oral (69 complice), massages aux huiles maison</strong> — Huile coco tiède, karité, amande douce, vanille.</li>
            <li><strong>Chapitre 14 : Fantasmes & Explorer sans trahir sa foi</strong> — La grille des 3 cercles (Vert, Orange, Rouge) et le jeu des 15 cartes amoureuses.</li>
          </ul>
        </div>

        <!-- PART 6 -->
        <div class="part-card" style="border-left: 4px solid var(--color-burgundy);">
          <div class="part-tag">PARTIE 6 & ANNEXES • PAGES 130 À 190</div>
          <h3 class="part-title">Saisons de Vie, Forteresse de Fidélité & Plan 30 Jours</h3>
          <ul class="part-chapters">
            <li><strong>Chapitre 15 : Quand la femme est enceinte</strong> — Protéger le couple contre les dérapages, positions adaptées trimestre par trimestre.</li>
            <li><strong>Chapitre 16 : Après 50 ans, la ménopause et la routine</strong> — La saison dorée du plaisir plus profond, rapports matinaux, redraguer son conjoint.</li>
            <li><strong>Chapitre 17 : Quand ça coince</strong> — Vaincre les peurs, le vaginisme et les pièges des écrans.</li>
            <li><strong>Chapitre 18 : Fidélité, les armes que personne ne vous donne</strong> — Les 7 armes inviolables, pacte du regard, règle des portes, transparence.</li>
            <li><strong>Chapitre 19 : Le plan transformationnel sur 30 jours</strong> — Un geste concret par jour, semaine par semaine, pour renouveler votre alliance.</li>
            <li><strong>Annexes :</strong> Recettes d'Afrique de l'Ouest, exercices pelviens de 15 min, lexique des phrases douces et 4 fiches prêtes à imprimer !</li>
          </ul>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       8. SECTION : LES 18 POSITIONS & LE DÉROULÉ EN 6 TEMPS
       ========================================================================= -->
  <section class="section" id="positions">
    <div class="container">
      
      <div style="text-align: center; max-width: 800px; margin: 0 auto 30px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">LE KAMA SUTRA CHRÉTIEN PUDIQUE</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px; color: var(--color-text-title);">
          18 Positions Conçues Pour Tous Les Corps Réels
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Pas d'acrobaties impossibles. Des silhouettes discrètes sans visage, des angles précis au coussin près, adaptées aux ventres ronds, au dos sensible, à la fatigue et à la grossesse :
        </p>
      </div>

      <!-- Grille des 18 Positions -->
      <div class="positions-grid">
        
        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 1</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">La Cuillère</div>
          <div class="position-ideal">Fatigue, ventre, dos fragile, grossesse, +50 ans</div>
          <div class="position-desc">On dort dans le même sens, on s'aime dans le même sens. Pénétration par derrière tout en douceur, mains totalement libres pour stimuler le clitoris en continu.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 2</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Coussin d'Or</div>
          <div class="position-ideal">Friction clitoridienne continue, face à face</div>
          <div class="position-desc">Le missionnaire réinventé. Un coussin ferme sous son bassin : son pubis appuie directement sur son clitoris en un balancement lent qui la fait jouir à coup sûr.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 3</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Trône</div>
          <div class="position-ideal">Corps forts, grand ventre, yeux dans les yeux</div>
          <div class="position-desc">Assis sur le bord du lit ou une chaise solide, elle sur ses cuisses enlacés. Le tronc n'est pas écrasé, baisers sans fin et balancement circulaire du bassin.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 4</span>
            <span class="position-stars">★★ MOYEN</span>
          </div>
          <div class="position-title">La Reine</div>
          <div class="position-ideal">Elle mène, lui contrôle son excitation</div>
          <div class="position-desc">Lui allongé sur le dos, elle au-dessus qui règle profondeur et rythme. La meilleure position pour l'homme pour durer 20 minutes en respirant calmement.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 6</span>
            <span class="position-stars">★★ MOYEN</span>
          </div>
          <div class="position-title">Le Pont des Délices</div>
          <div class="position-ideal">Point G, mains libres pour le clitoris</div>
          <div class="position-desc">Deux coussins sous son bassin, lui à genoux. L'angle parfait qui cible la paroi avant du vagin tout en gardant une main active sur le clitoris.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 8</span>
            <span class="position-stars">★★ MOYEN</span>
          </div>
          <div class="position-title">Le Bord du Lit</div>
          <div class="position-ideal">Grands ventres, liberté de mouvement totale</div>
          <div class="position-desc">Elle allongée fesses au bord du matelas, lui debout. La hauteur du lit fait tout le travail sans aucun écrasement du ventre ou fatigue articulaire.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 9</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Seuil (La Lenteur)</div>
          <div class="position-ideal">Durer longtemps, maîtriser l'excitation</div>
          <div class="position-desc">Pénétration des premiers centimètres seulement avec la méthode « 9 puis 1 ». Elle ressent un maximum de sensations, lui garde le contrôle absolu de son érection.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 11</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Le Papillon</div>
          <div class="position-ideal">Genoux et dos fragiles, accès parfait au clitoris</div>
          <div class="position-desc">Elle allongée pieds à plat au bord du lit, genoux ouverts comme des ailes. Aucun effort musculaire pour elle, vue complice et caresses simultanées pour lui.</div>
        </div>

        <div class="position-card">
          <div class="position-card-header">
            <span class="position-num">POSITION 12</span>
            <span class="position-stars">★ FACILE</span>
          </div>
          <div class="position-title">Les Ciseaux</div>
          <div class="position-ideal">Tendresse infinie, fatigue, après accouchement</div>
          <div class="position-desc">Allongés sur le côté face à face, jambes entrelacées en croix. Frottement intime des pubis sans effort physique, murmures et câlins prolongés.</div>
        </div>

      </div>

      <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--color-burgundy); font-weight: 700;">
        + 9 autres positions détaillées dans le livre : <em>L'Amazone, Le Jardin, Le Palmier, L'Équerre, Le Genou levé, La Bascule, La Chaise inversée, La Cuillère profonde, Le Balcon !</em>
      </div>

      <!-- Le Déroulé en 6 Temps -->
      <div style="margin-top: 50px; text-align: center;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">⏱️ LA CARTE DU RAPPORT PARFAIT</div>
        <h3 style="font-size: 1.8rem; color: var(--color-text-title); margin-bottom: 8px;">Le Déroulé d'Un Rapport Réussi En 6 Temps</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 680px; margin: 0 auto 24px auto;">
          Voici comment se déroule, minute par minute, une nuit d'intimité épanouie dans le couple :
        </p>

        
      <!-- Illustrations Le Déroulé en 6 Temps -->
      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-8-se-dire-les-choses.jpg" alt="Se dire les choses avec tendresse" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 8 • Paroles Douces</span>
            <span>Les mots murmurés à l'oreille qui embrasent l'imagination sans aucune vulgarité.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-10-rendez-vous.jpg" alt="Rendez-vous à deux sanctuarisé" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 10 • Le Sanctuaire</span>
            <span>Comment sanctuariser un rendez-vous hebdomadaire intime sans interruption des enfants.</span>
          </div>
        </div>
      </div>

      <div class="book-illustration-box">
        <img src="/assets/images/illustrations/chapitre-11-six-temps.jpg" alt="Le déroulé en six temps d'une union" class="book-illustration-img" loading="lazy">
        <div class="book-illustration-caption">
          <span class="book-illustration-tag">Chapitre 11 • La Partition</span>
          <span>L'infographie officielle du Déroulé en 6 Temps : de la mise en condition matinale jusqu'à l'extase partagée.</span>
        </div>
      </div>

      <div class="book-illustration-box">
        <img src="/assets/images/illustrations/chapitre-11-tendresse-apres.jpg" alt="Tendresse après le rapport" class="book-illustration-img" loading="lazy">
        <div class="book-illustration-caption">
          <span class="book-illustration-tag">Chapitre 11 • L'Atterrissage</span>
          <span>Le rituel d'après-rapport : les caresses d'atterrissage pour sceller l'attachement émotionnel et la paix du cœur.</span>
        </div>
      </div>

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
            <div class="time-step-text">Les 3 feux verts : elle est humide, il est ferme, le « oui » est clair dans le regard. Les zones sensibles vibrent d'impatience.</div>
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

      <!-- Pharmacie du marché ouest-africain -->
      <div style="margin-top: 50px; text-align: center;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">🌿 LES BIENFAITS NATURELS</div>
        <h3 style="font-size: 1.8rem; color: var(--color-text-title); margin-bottom: 8px;">La Pharmacie Naturelle d'Afrique de l'Ouest</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 680px; margin: 0 auto 20px auto;">
          Ce que vous trouvez au marché pour soutenir la circulation sanguine, l'endurance masculine et la lubrification :
        </p>

        
      <!-- Illustrations Pharmacie & Vitalité -->
      <div class="illustrations-2col-grid">
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-6-aliments-vitalite.jpg" alt="Aliments de la vitalité africaine" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 6 • Pharmacie Africaine</span>
            <span>Les super-aliments d'énergie sexuelle : gingembre frais, bissap, pastèque citrulline, moringa, dattes.</span>
          </div>
        </div>
        <div class="book-illustration-box" style="margin: 0;">
          <img src="/assets/images/illustrations/chapitre-6-exercices-endurance.jpg" alt="Exercices physiques pour l'endurance" class="book-illustration-img" loading="lazy">
          <div class="book-illustration-caption">
            <span class="book-illustration-tag">Chapitre 6 • Routine 15 Min</span>
            <span>Les 3 exercices simples de renforcement : squats, pont fessier et gainage pour un bassin puissant.</span>
          </div>
        </div>
      </div>

      <div class="market-pharmacy-grid">
          
          <div class="food-card">
            <div class="food-icon">🫚</div>
            <div class="food-name">Gingembre Frais</div>
            <div class="food-benefit">Réchauffe et favorise la circulation sanguine globale</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🌺</div>
            <div class="food-name">Bissap (Hibiscus)</div>
            <div class="food-benefit">Riche en nitrates et antioxydants bénéfiques pour la tension</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🍉</div>
            <div class="food-name">Pastèque Fraîche</div>
            <div class="food-benefit">Riche en citrulline qui détend naturellement les artères</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🍃</div>
            <div class="food-name">Moringa</div>
            <div class="food-benefit">Fer, vitamines et tonus durable pour le corps</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🎃</div>
            <div class="food-name">Graines de Courge</div>
            <div class="food-benefit">Source de zinc, nutriment clé pour la testostérone</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🥜</div>
            <div class="food-name">Arachides Crues</div>
            <div class="food-benefit">Arginine pure : précurseur naturel d'oxyde nitrique</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🌴</div>
            <div class="food-name">Dattes</div>
            <div class="food-benefit">Énergie rapide, fer et vitalité pour le couple</div>
          </div>

          <div class="food-card">
            <div class="food-icon">🥑</div>
            <div class="food-name">Avocat</div>
            <div class="food-benefit">Bonnes graisses et potassium soutenant la lubrification</div>
          </div>

        </div>

        <div style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic; margin-top: 10px;">
          + Les 5 recettes détaillées au Chapitre 6 (Jus gingembre-ananas, Bissap épicé, Salade pastèque-avocat, Bouillie de mil aux dattes, Poisson braisé à l'ail).
        </div>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       9. SECTION : LES 6 BONUS INCLUS
       ========================================================================= -->
  <section class="section" id="bonus" style="background: #FFFFFF;">
    <div class="container">
      
      <div style="text-align: center; max-width: 820px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">LE PACK COMPLET</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 14px;">
          En Plus Du Guide Maître de 190 Pages,<br>
          <span class="title-burgundy">Recevez Ces 6 Bonus Exclusifs Inclus Dans Votre Commande !</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Des fiches et guides pratiques d'une valeur totale de 35 000 FCFA inclus sans supplément :
        </p>
      </div>

      <!-- Bundle Mockup Image -->
      <div style="max-width: 580px; margin: 0 auto 36px auto; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--color-border); box-shadow: var(--shadow-md);">
        <img src="${bundleMockupB64}" alt="Pack Complet FOU DE TOI, FOLLE DE TOI" style="width: 100%; display: block;">
      </div>

      <!-- Grille de Bonus -->
      <div class="bonus-grid">
        
        <div class="bonus-card" style="border-top: 3px solid var(--color-burgundy);">
          <div class="bonus-badge-top">BONUS #1 • INCLUS</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">🌿</div>
            <h3 class="bonus-title">La Pharmacie du Marché Ouest-Africain pour l'Énergie & la Vitalité</h3>
          </div>
          <p class="bonus-desc">
            Le guide des 10 super-aliments et 5 recettes de potions maison pour soutenir la puissance érectile de l'homme et l'appétit sensuel de la femme.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 7 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <div class="bonus-card" style="border-top: 3px solid var(--color-burgundy);">
          <div class="bonus-badge-top">BONUS #2 • INCLUS</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">📐</div>
            <h3 class="bonus-title">Le Mémo Visuel des 18 Positions pour Toutes les Silhouettes</h3>
          </div>
          <p class="bonus-desc">
            Un fichier PDF pratique avec toutes les silhouettes, les angles au coussin près et les adaptations pour ventres ronds, grossesse et dos sensible.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 6 000 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <div class="bonus-card" style="border-top: 3px solid var(--color-burgundy);">
          <div class="bonus-badge-top">BONUS #3 • INCLUS</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">👄</div>
            <h3 class="bonus-title">Le Répertoire des Mots & Phrases Douces sans Vulgarité</h3>
          </div>
          <p class="bonus-desc">
            Le lexique des mots qui rapprochent, guident et allument. Quoi murmurer le matin, à midi par message, et pendant le rapport pour guider sans blesser.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 000 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <div class="bonus-card" style="border-top: 3px solid var(--color-burgundy);">
          <div class="bonus-badge-top">BONUS #4 • INCLUS</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">📄</div>
            <h3 class="bonus-title">Le Kit des 4 Fiches Secrètes à Imprimer pour la Chambre</h3>
          </div>
          <p class="bonus-desc">
            4 fiches prêtes à imprimer pour la table de nuit : Carte des zones érogènes, Liste Oui / Peut-être / Non, Rendez-vous de la semaine, et Point couple du dimanche.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 4 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <div class="bonus-card" style="border-top: 3px solid var(--color-burgundy);">
          <div class="bonus-badge-top">BONUS #5 • INCLUS</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">🕊️</div>
            <h3 class="bonus-title">Le Protocole Grossesse & Après 50 Ans Serein</h3>
          </div>
          <p class="bonus-desc">
            Comment préserver une intimité complice pendant la grossesse (trimestre par trimestre, positions sûres) et après la ménopause. L'armure contre l'éloignement.
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 6 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

        <div class="bonus-card" style="border-top: 3px solid var(--color-burgundy);">
          <div class="bonus-badge-top">BONUS #6 • INCLUS</div>
          <div class="bonus-header">
            <div class="bonus-icon-wrapper">💪</div>
            <h3 class="bonus-title">La Routine Pelvienne de 15 Minutes sans Matériel (Kegel)</h3>
          </div>
          <p class="bonus-desc">
            Programme sportif express pour lui (muscler le plancher pelvien pour retenir l'éjaculation) et pour elle (tonifier le vagin pour des sensations amplifiées).
          </p>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 500 FCFA</span>
            <span class="bonus-val-free">OFFERT DANS LE PACK</span>
          </div>
        </div>

      </div>

      <!-- Bouton intermédiaire -->
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://amour-desir.mychariow.co/prd_lw2y36td/checkout" class="btn-cta btn-chariow-checkout" style="max-width: 480px; margin: 0 auto;">
          <span>🔥 COMMANDER LE LIVRE & LES 6 BONUS (9 500 FCFA)</span>
          <span class="btn-cta-sub">Téléchargement Immédiat & Accès à Vie</span>
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
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">TÉMOIGNAGES AUTHENTIQUES</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px; color: var(--color-text-title);">
          Ils Ont Osé Rallumer La Flamme...<br>
          <span class="title-burgundy">Voici Leurs Retours En Toute Sincérité</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Des couples chrétiens, des hommes restaurés et des femmes enfin épanouies partagent leur expérience sur WhatsApp :
        </p>
      </div>

      <!-- Captures WhatsApp -->
      <div class="screenshots-grid">
        
        <div class="screenshot-card">
          <img src="${temoignageGuyAdolpheB64}" alt="Témoignage WhatsApp Guy Adolphe">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Guy-Adolphe (Abidjan)</span>
            <span class="screenshot-badge">Marié depuis 6 ans</span>
          </div>
          <p style="padding: 12px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« J'avoue qu'avec ce livre j'ai compris tellement de choses qu'elle n'osait pas me dire. Elle était timide et ça me dérangeait. On a évité tellement d'erreurs en tant qu'homme ! »</em>
          </p>
        </div>

        <div class="screenshot-card">
          <img src="${temoignageRosemondeB64}" alt="Témoignage WhatsApp Rosemonde">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Rosemonde (Cotonou)</span>
            <span class="screenshot-badge">Femme comblée</span>
          </div>
          <p style="padding: 12px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« Votre livre a fait que j'ai gagné un rendez-vous exceptionnel... Il a tellement bien pris la lecture. Ce matin il m'a appelée pour sortir. Je suis surprise de ce changement ! »</em>
          </p>
        </div>

        <div class="screenshot-card">
          <img src="${temoignageRivaldoB64}" alt="Témoignage WhatsApp Rivaldo">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Rivaldo (Pointe-Noire)</span>
            <span class="screenshot-badge">Mariage renouvelé</span>
          </div>
          <p style="padding: 12px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« Franchement les conseils sur le clitoris et le stop-start ont tout changé dans notre intimité. Madame me regarde d'une manière différente maintenant. »</em>
          </p>
        </div>

        <div class="screenshot-card">
          <img src="${temoignageThibautB64}" alt="Témoignage WhatsApp Thibaut">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">Thibaut (Kinshasa)</span>
            <span class="screenshot-badge">Fidélité préservée</span>
          </div>
          <p style="padding: 12px 14px; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45;">
            <em>« Le chapitre sur la fidélité et le plan des 30 jours est une bombe spirituelle. C'est exactement le livre que tous les couples fiancés et mariés devraient lire. »</em>
          </p>
        </div>

      </div>

      <!-- Dashboard Ventes -->
      <div style="max-width: 680px; margin: 30px auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); background: #FFFFFF;">
        <img src="${preuveVentesB64}" alt="Preuve des ventes">
        <div style="padding: 14px; font-size: 0.85rem; color: var(--color-burgundy); text-align: center; font-weight: 700; background: var(--color-bg-subtle);">
          📊 Plus de 3 850 commandes enregistrées • 98,7% de couples déclarant un renouveau intime dès la 1ère semaine
        </div>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       11. SECTION : L'OFFRE IRRÉSISTIBLE & STACK DE PRIX (LE COEUR DU TUNNEL)
       ========================================================================= -->
  <section class="section section-immersive" id="offre" style="background: #FFFFFF;">
    <div class="section-immersive-bg" style="background-image: url('/assets/images/illustrations/ambiance-couple-intime.jpg');"></div>
    <div class="container">
      
      <div style="text-align: center; max-width: 780px; margin: 0 auto 30px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">OFFRE SPÉCIALE LIMITÉE DANS LE TEMPS</div>
        <h2 style="font-size: 2.3rem; line-height: 1.25; margin-bottom: 12px; color: var(--color-text-title);">
          Récapitulatif De Votre Pack Intégral :<br>
          <span class="title-burgundy">Tout Ce Que Vous Débloquez Immédiatement</span>
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Voici l'ensemble des trésors qui vont transformer votre lit dès ce soir :
        </p>
      </div>

      <!-- Boîte d'Offre Maître -->
      <div class="offer-box-master">
        
        <div class="offer-ribbon">
          -62% DE RÉDUCTION IMMÉDIATE (-15 500 FCFA D'ÉCONOMIE)
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <h3 style="font-size: 1.6rem; color: var(--color-text-title); margin-bottom: 4px;">PACK COMPLET : FOU DE TOI, FOLLE DE TOI</h3>
          <p style="color: var(--color-burgundy); font-size: 0.92rem; font-style: italic;">Le Guide du Couple Chrétien Qui Veut Un Lit de Feu</p>
        </div>

        <!-- Stack List -->
        <div class="offer-stack-items">
          
          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Livre Maître : FOU DE TOI, FOLLE DE TOI</strong> (190 pages PDF HD illustrées)</span>
            </div>
            <div class="offer-item-val">15 000 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Bonus #1 :</strong> La Pharmacie Ouest-Africaine (10 Super-Aliments & 5 Recettes)</span>
            </div>
            <div class="offer-item-val">7 500 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Bonus #2 :</strong> Le Mémo Visuel des 18 Positions pour Toutes les Silhouettes</span>
            </div>
            <div class="offer-item-val">6 000 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Bonus #3 :</strong> Le Répertoire des Mots & Phrases Douces à l'Oreille</span>
            </div>
            <div class="offer-item-val">5 000 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Bonus #4 :</strong> Le Kit des 4 Fiches Secrètes à Imprimer pour la Chambre</span>
            </div>
            <div class="offer-item-val">4 500 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Bonus #5 :</strong> Le Guide Grossesse & Après 50 Ans Serein</span>
            </div>
            <div class="offer-item-val">6 500 FCFA</div>
          </div>

          <div class="offer-stack-item">
            <div class="offer-item-name">
              <span style="color: var(--color-burgundy); font-weight: 900;">✓</span>
              <span><strong>Bonus #6 :</strong> Le Protocole Sportif Pelvien de 15 Min (Kegel Homme & Femme)</span>
            </div>
            <div class="offer-item-val">5 500 FCFA</div>
          </div>

        </div>

        <!-- Calcul du Total -->
        <div class="offer-total-calc">
          <div>
            <div style="font-size: 0.8rem; color: var(--color-text-dim); text-transform: uppercase;">Valeur Totale Réelle</div>
            <div class="offer-total-old">25 000 FCFA</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; color: var(--color-burgundy); text-transform: uppercase; font-weight: 800;">⚡ AUJOURD'HUI SEULEMENT</div>
            <div class="offer-total-new">9 500 FCFA</div>
          </div>
        </div>

        <!-- Bouton CTA Commande -->
        <a href="https://amour-desir.mychariow.co/prd_lw2y36td/checkout" class="btn-cta btn-chariow-checkout" style="width: 100%; margin-top: 20px;">
          <span>🔒 COMMANDER MAINTENANT POUR 9 500 FCFA</span>
          <span class="btn-cta-sub">Accès Immédiat 24h/24 • Orange, MTN, Wave, Moov, Carte</span>
        </a>

        <!-- Moyens de paiement -->
        <div class="payment-methods-box">
          <div class="payment-label">Moyens de paiement acceptés en Afrique & dans le monde entier :</div>
          <div class="payment-logos-row">
            <span class="pay-pill">🟠 Orange Money</span>
            <span class="pay-pill">🟡 MTN Mobile Money</span>
            <span class="pay-pill">🌊 Wave</span>
            <span class="pay-pill">🔵 Moov Money</span>
            <span class="pay-pill">💳 Carte Visa / Mastercard</span>
          </div>
        </div>

        <!-- Boîte de Garantie -->
        <div class="guarantee-box">
          <div class="guarantee-title">🛡️ Garantie Inconditionnelle 30 Jours : Lit de Feu ou 100% Remboursé</div>
          <div class="guarantee-text">
            Téléchargez le livre ce soir. Lisez les chapitres, essayez les techniques de l'échelle 1-10, les 4 mouvements du clitoris et les positions adaptées avec un coussin. Si d'ici 30 jours, votre vie intime n'a pas été profondément enrichie de joie et de complicité, envoyez-nous simplement un message sur WhatsApp : <strong>nous vous remboursons intégralement vos 9 500 FCFA sans poser la moindre question.</strong> Vous ne prenez aucun risque.
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
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">QUESTIONS FRÉQUENTES</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 12px; color: var(--color-text-title);">
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
            <p><strong>Absolument pas !</strong> C'est tout le contraire. La Bible dit dans Genèse 2:25 : <em>« L'homme et sa femme étaient nus, et ils n'avaient point honte l'un devant l'autre. »</em> Dieu a créé le corps, les zones érogènes et le clitoris avec une intention divine de joie et de complicité dans le mariage. Ce livre ne contient aucune vulgarité, aucune pornographie. Les illustrations sont des silhouettes sobres et pudiques sans visage qui montrent les angles pratiques, et le texte honore le Créateur à chaque page.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Mon conjoint est très pudique ou réticent, comment lui présenter ce livre ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Le livre est pensé précisément pour les personnes pudiques ! Le Chapitre 2 propose <em>« L'exercice des 3 phrases »</em> et <em>« Le contrat des 30 jours »</em> qui désamorcent toute pression : aucun reproche au lit, pas de comparaison, et un mot d'arrêt respecté à la seconde. Vous pouvez lui proposer simplement en disant : <em>« J'ai trouvé ce guide chrétien pour notre couple, j'aimerais qu'on lise juste l'introduction ensemble ce soir. »</em> La bienveillance et la douceur du livre feront le reste.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Est-ce que mes proches ou ma banque verront ce que j'ai acheté ? (Discrétion)</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p><strong>Discrétion totale et absolue.</strong> La transaction bancaire ou Mobile Money apparaîtra sous l'intitulé neutre <strong>« Éditions Éveil »</strong>. Aucun mot embarrassant n'apparaît sur vos relevés ou notifications. Vos données personnelles restent 100% confidentielles.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Sous quel format vais-je recevoir le livre et les bonus ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Dès votre paiement validé, vous accédez directement à votre <strong>Dashboard client sécurisé</strong>. Vous pouvez y lire le livre en ligne dans notre visionneuse intégrée, ou le télécharger en <strong>format PDF Haute Définition (1,1 Mo)</strong> sur votre téléphone, tablette ou ordinateur. Vous pouvez aussi demander à le recevoir directement sur WhatsApp.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Nous avons des rondeurs, des douleurs au dos ou plus de 50 ans : est-ce adapté ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p><strong>Oui, à 100% !</strong> Le Chapitre 12 et le Chapitre 16 sont spécialement consacrés aux corps ronds, aux ventres forts, au dos fragile et aux couples après 50 ans ou après l'accouchement. Chaque position est expliquée avec des coussins d'angle qui soulagent les articulations et permettent une intimité profonde sans essoufflement ni acrobatie.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger">
            <span>Comment fonctionne le paiement par Mobile Money (Wave, Orange, MTN, Moov) ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>C'est ultra-simple et instantané ! Cliquez sur n'importe quel bouton de commande pour accéder à notre page de paiement sécurisée <strong>Chariow</strong>. Vous pourrez régler vos 9 500 FCFA avec Wave, Orange Money, MTN Mobile Money, Moov ou Carte bancaire en moins de 30 secondes et vous accédez immédiatement au livre et à vos bonus.</p>
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
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">DEUX DESTINS POUR VOTRE MARIAGE</div>
        <h2 style="font-size: 2.2rem; line-height: 1.25; margin-bottom: 14px; color: var(--color-text-title);">
          Ce Soir, Deux Chemins S'Offrent À Vous
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1.05rem;">
          Dans quelques instants, vous allez fermer cette page. Que va-t-il se passer dans votre chambre ?
        </p>
      </div>

      <div class="choices-grid">
        
        <!-- CHEMIN A -->
        <div class="choice-card choice-bad">
          <h3 style="font-size: 1.15rem; color: #666666; margin-bottom: 10px;">CHEMIN A : NE RIEN CHANGER</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-body); line-height: 1.6;">
            Vous fermez cet écran. Vous économisez 9 500 FCFA. Ce soir, vous vous couchez dos à dos dans le même lit tiède. L'homme reste avec son anxiété de performance, la femme reste avec sa frustration invisible. La routine continue de creuser son fossé, et la porte de l'infidélité reste entrouverte. Dans 1 an, dans 5 ans, où en sera votre mariage ?
          </p>
        </div>

        <!-- CHEMIN B -->
        <div class="choice-card choice-good">
          <h3 style="font-size: 1.15rem; color: var(--color-burgundy); margin-bottom: 10px;">CHEMIN B : ALLUMER LE FEU</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-body); line-height: 1.6;">
            Vous investissez 9 500 FCFA (au lieu de 25 000 FCFA). Vous téléchargez le guide tout de suite. Ce soir, vous allumez une bougie. Vous lisez ensemble les premiers passages. Vous appliquez la règle de l'échelle 1-10, les caresses du clitoris et une nouvelle position. Vous voyez ses yeux briller comme au premier jour, et vous redécouvrez un amour plus complice que jamais !
          </p>
        </div>

      </div>

      <!-- Bouton final -->
      <div style="text-align: center; margin-top: 36px;">
        <a href="https://amour-desir.mychariow.co/prd_lw2y36td/checkout" class="btn-cta btn-chariow-checkout" style="max-width: 520px; margin: 0 auto;">
          <span>🔥 JE CHOISIS NOTRE LIT DE FEU (9 500 FCFA)</span>
          <span class="btn-cta-sub">Téléchargement Immédiat • 100% Discret • Garantie 30 Jours</span>
        </a>
      </div>

    </div>
  </section>

  <!-- =========================================================================
       14. FOOTER SECTION
       ========================================================================= -->
  <footer class="footer-section">
    <div class="container">
      <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--color-burgundy); margin-bottom: 6px;">
        FOU DE TOI, FOLLE DE TOI
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic; margin-bottom: 16px;">
        Le guide du couple chrétien qui veut un lit de feu
      </div>
      <p style="font-size: 0.90rem; color: var(--color-text-dim); line-height: 1.6; max-width: 600px; margin: 0 auto 16px auto;">
        © 2026 Tous droits réservés. Ce livre est un guide éducatif et pratique réservé aux couples adultes. Facturation 100% discrète.
      </p>
      <div class="footer-links" style="font-size: 0.8rem;">
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
  <div class="sticky-bottom-bar" id="stickyCtaBar">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
      
      <div class="sticky-price-info">
        <div class="sticky-price-title">LIT DE FEU • PACK COMPLET</div>
        <div class="sticky-price-val">
          9 500 FCFA <span style="color: #888888; text-decoration: line-through; font-size: 0.8rem; font-weight: 400;">25 000F</span>
        </div>
      </div>

      <a href="https://amour-desir.mychariow.co/prd_lw2y36td/checkout" class="btn-cta btn-sticky-cta btn-chariow-checkout" style="flex: 1; max-width: 340px; padding: 12px 16px;">
        <span style="font-weight: 800; font-size: 0.92rem;">🔥 COMMANDER MON EXEMPLAIRE</span>
        <span class="btn-cta-sub" style="font-size: 0.85rem;">Wave • Orange • MTN • Moov • Carte</span>
      </a>

    </div>
  </div>

  <!-- =========================================================================
       16. SOCIAL PROOF LIVE NOTIFICATION TOAST
       ========================================================================= -->
  <div class="social-proof-toast" id="socialProofToast">
    <div class="toast-avatar">📖</div>
    <div class="toast-text">
      <div>
        <strong id="toastName">Kouamé K.</strong> <span id="toastFlag">🇨🇮</span> de <span id="toastCity">Abidjan</span> a commandé
      </div>
      <div class="toast-time" id="toastTime">à l'instant • Accès envoyé par email</div>
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

      const timePhrases = ['à l\'instant', 'il y a 1 min', 'il y a 2 min', 'il y a 3 min', 'il y a 5 min', 'il y a 8 min'];
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

      // 5. Chariow Direct Checkout Tracking
      document.querySelectorAll('a[href*="mychariow.co"]').forEach(btn => {
        btn.addEventListener('click', function() {
          if (typeof fbq === 'function') {
            fbq('track', 'InitiateCheckout', {
              content_name: 'FOU DE TOI, FOLLE DE TOI',
              currency: 'XOF',
              value: 9500
            });
          }
        });
      });

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
console.log('Successfully compiled standalone fou-de-toi-folle-de-toi.html & fou-de-toi-folle-de-toi/index.html with LIGHT BACKGROUND & ZERO GOLD (' + fs.statSync('fou-de-toi-folle-de-toi.html').size + ' bytes)!');
