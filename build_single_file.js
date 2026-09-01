const fs = require('fs');
const path = require('path');

console.log('Generating Single-File Standalone index.html...');

// Read base images and convert to base64
function getBase64Image(filePath) {
  const ext = path.extname(filePath).replace('.', '').toLowerCase();
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:${mimeType};base64,${data}`;
}

const bannerHeroB64 = getBase64Image('assets/images/banner-hero.png');
const packCoverRedB64 = getBase64Image('assets/images/pack-cover-red.jpg');
const packCoverBlueB64 = getBase64Image('assets/images/pack-cover-blue.jpg');
const avantApresB64 = getBase64Image('assets/images/avant-apres.jpg');
const temoignageRivaldoB64 = getBase64Image('assets/images/testimonials/temoignage-rivaldo.jpg');
const temoignageGuyAdolpheB64 = getBase64Image('assets/images/testimonials/temoignage-guy-adolphe.jpg');
const temoignageRosemondeB64 = getBase64Image('assets/images/testimonials/temoignage-rosemonde.jpg');
const temoignageThibautB64 = getBase64Image('assets/images/testimonials/temoignage-thibaut.jpg');
const preuveVentesB64 = getBase64Image('assets/images/testimonials/preuve-ventes-dashboard.png');

// Read CSS and update rules
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

// Read JS
const jsContent = fs.readFileSync('assets/js/script.js', 'utf8');

// Build Single File HTML
const singleFileHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>PACK DU DÉSIR • Enfin Comprendre Sa Femme, Son Désir & Retrouver la Paix</title>
  
  <!-- SEO & Open Graph Meta Tags -->
  <meta name="description" content="Découvre le guide complet pour enfin comprendre les hormones de ta femme, réveiller son désir ardent, éviter les conflits et reprendre le contrôle de ton couple. Offre de lancement exclusive à 1 000 FCFA.">
  <meta property="og:title" content="PACK DU DÉSIR • Enfin Comprendre Sa Femme et Retrouver la Paix">
  <meta property="og:description" content="Elle devient distante ou refuse l'intimité ? Comprends enfin ce qui se passe et réveille son désir fou.">
  <meta property="og:type" content="website">
  
  <!-- Google Fonts: Syne (Sensual Titles) + Outfit & Plus Jakarta Sans (Tall Elegant Body) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">
  
  <!-- Inlined Stylesheet -->
  <style>
${cssContent}
  </style>
</head>
<body>

  <!-- =========================================================================
       1. BANDEAU D'URGENCE SUPÉRIEUR (STICKY TOP BAR)
       ========================================================================= -->
  <div class="top-urgency-bar">
    <div class="top-urgency-inner">
      <span>🔥 <strong>OFFRE EXCLUSIVE DE LANCEMENT</strong> : -93% DE RÉDUCTION IMMÉDIATE</span>
      <div class="countdown-box">
        <span>FIN DANS :</span>
        <span class="countdown-digit cd-hours">00</span>h
        <span class="countdown-digit cd-minutes">00</span>m
        <span class="countdown-digit cd-seconds">00</span>s
      </div>
      <span class="badge-pill badge-gold" style="padding: 2px 8px; font-size: 0.72rem;">23H59 DERNIER DÉLAI</span>
    </div>
  </div>

  <!-- =========================================================================
       2. HERO SECTION : L'ACCROCHE & LE CHOC
       ========================================================================= -->
  <section class="hero-section" id="hero">
    <div class="container">
      
      <!-- Pre-heading Badge -->
      <div class="badge-pill badge-red" style="margin-bottom: 14px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        RÉSERVÉ AUX HOMMES EN COUPLE, FIANCÉS OU MARIÉS
      </div>

      <!-- Main Brutal Headline -->
      <h1 class="hero-title">
        Elle refuse souvent de coucher avec toi ?<br>
        <span class="text-gradient-red">Elle devient froide, distante ou irritable sans raison apparente ?</span>
      </h1>

      <!-- Empathic & Pain Subtitle -->
      <p class="hero-subtitle">
        Découvre enfin ce qui se passe <strong>réellement dans son corps et son esprit</strong> pour réveiller son désir féminin, recréer une attraction magnétique et <strong>retrouver la paix absolue dans ton foyer</strong>.
      </p>

      <!-- Hero Visual Banner -->
      <div class="hero-media-card">
        <img src="${bannerHeroB64}" alt="Enfin Comprendre Les Hormones - Pack du Désir" width="1200" height="500" loading="eager">
      </div>

      <!-- Pricing Action Pill -->
      <div style="display: flex; justify-content: center;">
        <div class="pricing-banner-pill">
          <div class="price-strike-group">
            <div class="price-strike-label">Valeur Normale</div>
            <div class="price-strike-val">15 000 FCFA</div>
          </div>
          <div class="price-main-group">
            <div class="price-main-label">⚡ AUJOURD'HUI SEULEMENT</div>
            <div class="price-main-val">1 000 FCFA</div>
          </div>
        </div>
      </div>

      <!-- Main Royal Blue Curvy & Vibrating CTA Button -->
      <div style="display: flex; justify-content: center;">
        <a href="https://amour-desir.mychariow.co/pack-du-desir/checkout" target="_blank" rel="noopener" class="btn-cta">
          <span>👉 DÉBLOQUER LE PACK DU DÉSIR</span>
          <span class="btn-cta-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/></svg>
            Accès immédiat par email • 1 000 FCFA au lieu de 15 000 FCFA
          </span>
        </a>
      </div>

      <!-- Hero Trust Badges -->
      <div class="hero-badges-row">
        <div class="hero-badge-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z"/></svg>
          Paiement 100% Sécurisé
        </div>
        <div class="hero-badge-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05V4.07C16.39 4.58 19 7.47 19 11C19 12.65 18.39 14.16 17.38 15.32L18.8 16.74C20.17 15.17 21 13.18 21 11C21 5.76 17.04 1.41 12 1.05V2.05H13ZM12 21.95V19.93C8.61 19.42 6 16.53 6 13C6 11.35 6.61 9.84 7.62 8.68L6.2 7.26C4.83 8.83 4 10.82 4 13C4 18.24 7.96 22.59 13 22.95V21.95H12ZM12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6Z"/></svg>
          Accès Immédiat (PDF + 8 Bonus)
        </div>
        <div class="hero-badge-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          Garantie 7 Jours Satisfait ou Remboursé
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
      
      <div style="text-align: center; margin-bottom: 30px;">
        <div class="badge-pill badge-red" style="margin-bottom: 10px;">🛑 SOYONS TOTALEMENT HONNÊTES ENTRE HOMMES</div>
        <h2 style="font-size: 1.9rem; margin-bottom: 12px;">
          Tu aimes ta femme de tout ton cœur... <br>
          <span class="text-gradient-red">Mais aujourd'hui, tu as l'impression de vivre avec une inconnue.</span>
        </h2>
        <p style="color: var(--color-text-muted); max-width: 680px; margin: 0 auto;">
          Tu fais des efforts constants. Tu travailles dur pour subvenir aux besoins du foyer. Mais dès que tu franchis la porte de la maison, tu as l'impression de marcher sur des œufs.
        </p>
      </div>

      <!-- Real Symptoms List -->
      <div class="card-dark card-dark-red" style="margin-bottom: 30px;">
        <h3 style="font-size: 1.28rem; margin-bottom: 18px; color: #ff4d58; display: flex; align-items: center; gap: 8px;">
          <span>⚠️</span> Reconnais-tu l'un de ces signaux dans ton couple ?
        </h3>
        <ul class="pain-list">
          <li class="pain-item">
            <span class="pain-icon">✕</span>
            <span><strong>Elle refuse souvent de faire l'amour</strong> : Elle prétexte la fatigue, le mal de tête ou tourne le dos dès que tu te rapproches la nuit.</span>
          </li>
          <li class="pain-item">
            <span class="pain-icon">✕</span>
            <span><strong>Son humeur change sans avertissement</strong> : Un matin tout va bien, le soir elle est glaciale, irritable ou te répond sèchement pour un rien.</span>
          </li>
          <li class="pain-item">
            <span class="pain-icon">✕</span>
            <span><strong>Elle ne recherche plus ton contact</strong> : Fini les câlins spontanés, les regards complices ou les petites attentions qu'elle te réservait autrefois.</span>
          </li>
          <li class="pain-item">
            <span class="pain-icon">✕</span>
            <span><strong>Vous vivez comme de simples colocataires</strong> : La complicité a disparu, les discussions tournent uniquement autour des factures et des enfants.</span>
          </li>
          <li class="pain-item">
            <span class="pain-icon">✕</span>
            <span><strong>Quoi que tu fasses, ce n'est jamais assez</strong> : Tu essaies de lui faire plaisir, mais tout finit systématiquement par une tension ou une dispute inutile.</span>
          </li>
        </ul>
      </div>

      <!-- Secret Thoughts Grid -->
      <div style="text-align: center; margin-top: 36px;">
        <h3 style="font-size: 1.38rem; margin-bottom: 8px;">Et tard le soir, ces questions silencieuses te dévorent l'esprit...</h3>
        <p style="color: var(--color-text-dim); font-size: 0.95rem;">Ce sont ces pensées secrètes qu'aucun homme n'ose avouer à voix haute :</p>
      </div>

      <div class="thoughts-grid">
        <div class="thought-bubble">
          <span class="quote-icon">“</span>
          <span>« Est-ce qu'elle m'aime toujours ou est-ce qu'elle reste juste par habitude ? »</span>
        </div>
        <div class="thought-bubble">
          <span class="quote-icon">“</span>
          <span>« Est-ce que je suis devenu mauvais au lit ? Est-ce que je ne lui donne plus assez de plaisir ? »</span>
        </div>
        <div class="thought-bubble">
          <span class="quote-icon">“</span>
          <span>« Est-ce qu'il y a un autre homme qui lui parle en cachette ? Pourquoi cache-t-elle son téléphone ? »</span>
        </div>
        <div class="thought-bubble">
          <span class="quote-icon">“</span>
          <span>« Qu'est-ce que j'ai fait de mal ? Pourquoi est-ce que chaque tentative de rapprochement se solde par un rejet ? »</span>
        </div>
      </div>

      <!-- Amplification Warning -->
      <div class="card-dark" style="border-left: 4px solid var(--color-primary-red); background: rgba(30, 14, 18, 0.45); text-align: center; padding: 24px;">
        <p style="font-size: 1.05rem; font-weight: 600; color: #ffffff;">
          🚨 <span class="highlight-red">Le pire danger pour un homme :</span> Combler les silences de sa femme avec ses propres peurs, commencer à fouiller son téléphone, insister violemment... et aggraver la distance jusqu'à la rupture définitive.
        </p>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       4. SECTION : AVANT VS APRÈS (LE CHOC VISUEL)
       ========================================================================= -->
  <section class="section" id="avant-apres">
    <div class="container">
      
      <div style="text-align: center; margin-bottom: 24px;">
        <div class="badge-pill badge-gold" style="margin-bottom: 10px;">👑 LA TRANSFORMATION MASCULINE</div>
        <h2 style="font-size: 2.05rem; margin-bottom: 12px;">
          Reprends Enfin Le Contrôle <br>
          <span class="text-gradient-red">De Ton Couple Et De Ta Maison</span>
        </h2>
        <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
          Ce n'est pas une question de chance ou de magie. C'est une question de compréhension des mécanismes profonds du désir féminin.
        </p>
      </div>

      <!-- Visual Graphic Image -->
      <div class="comparison-image-wrapper">
        <img src="${avantApresB64}" alt="Avant vs Après - Reprends le contrôle de ta maison" width="1200" height="800" loading="lazy">
      </div>

      <!-- Side by Side Comparative Grid -->
      <div class="compare-grid">
        
        <!-- Avant -->
        <div class="compare-col compare-col-before">
          <div class="compare-heading">
            <span>❌</span> AVANT LE PACK DU DÉSIR
          </div>
          <ul class="compare-list">
            <li class="compare-item">
              <span style="color: #ff4d58;">✕</span>
              <span>Elle te fuit et te repousse la nuit</span>
            </li>
            <li class="compare-item">
              <span style="color: #ff4d58;">✕</span>
              <span>Elle s'énerve pour des détails insignifiants</span>
            </li>
            <li class="compare-item">
              <span style="color: #ff4d58;">✕</span>
              <span>Tu vis dans le doute permanent et la frustration sexuelle</span>
            </li>
            <li class="compare-item">
              <span style="color: #ff4d58;">✕</span>
              <span>Tu insistes maladroitement et elle se ferme encore plus</span>
            </li>
            <li class="compare-item">
              <span style="color: #ff4d58;">✕</span>
              <span>La tension constante étouffe l'harmonie de votre foyer</span>
            </li>
          </ul>
        </div>

        <!-- Après -->
        <div class="compare-col compare-col-after">
          <div class="compare-heading">
            <span>✅</span> APRÈS LE PACK DU DÉSIR
          </div>
          <ul class="compare-list">
            <li class="compare-item">
              <span style="color: #34d399;">✓</span>
              <span><strong>Elle te désire et recherche naturellement ton corps</strong></span>
            </li>
            <li class="compare-item">
              <span style="color: #34d399;">✓</span>
              <span>L'intimité passionnée et complice revient sans forcer</span>
            </li>
            <li class="compare-item">
              <span style="color: #34d399;">✓</span>
              <span>Tu sais exactement quand parler, quand séduire et quand ralentir</span>
            </li>
            <li class="compare-item">
              <span style="color: #34d399;">✓</span>
              <span>Tu retrouves ton assurance masculine et ton magnétisme</span>
            </li>
            <li class="compare-item">
              <span style="color: #34d399;">✓</span>
              <span><strong>Ta maison redevient un havre de paix, de tendresse et d'amour</strong></span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Quick CTA -->
      <div style="text-align: center; margin-top: 32px;">
        <a href="https://amour-desir.mychariow.co/pack-du-desir/checkout" target="_blank" rel="noopener" class="btn-cta" style="margin: 0 auto;">
          <span>JE VEUX CETTE TRANSFORMATION</span>
          <span class="btn-cta-sub">👉 Obtenir le Pack complet pour 1 000 FCFA</span>
        </a>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       5. SECTION : LA GRANDE RÉVÉLATION (CE QUE 97% DES HOMMES IGNORENT)
       ========================================================================= -->
  <section class="section" id="revelation">
    <div class="container">
      
      <div class="revelation-box">
        <div class="badge-pill badge-red" style="margin-bottom: 16px;">💡 LA VÉRITÉ QUE PERSONNE NE T'A EXPLIQUÉE</div>
        <h2 class="revelation-quote">
          « Une baisse de désir chez une femme ne signifie PAS une baisse d'amour. »
        </h2>
        <p style="color: var(--color-text-body); font-size: 1.08rem; max-width: 680px; margin: 0 auto 20px; line-height: 1.65;">
          Chez l'homme, le désir fonctionne souvent comme un interrupteur on/off. Mais chez la femme, le désir est un <strong>écosystème délicat</strong> influencé par ses variations hormonales, sa charge mentale, sa fatigue et le climat émotionnel de votre relation.
        </p>
        <p style="color: #ff8088; font-weight: 700; font-size: 1.12rem; max-width: 640px; margin: 0 auto 24px;">
          Quand elle dit non ou devient distante, ce n'est pas parce qu'elle te déteste. Mais si tu réagis avec colère, boudage ou pression... tu tues le peu de désir qui subsistait.
        </p>

        <!-- Method Steps -->
        <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--color-gold); letter-spacing: 0.08em; margin-bottom: 12px;">
          LA MÉTHODE STRATÉGIQUE DU SÉDUCTEUR ACCOMPLI :
        </div>
        <div class="revelation-method-steps">
          <div class="method-step-pill">1. OBSERVER</div>
          <span class="method-arrow">➔</span>
          <div class="method-step-pill">2. DEMANDER</div>
          <span class="method-arrow">➔</span>
          <div class="method-step-pill">3. AJUSTER</div>
        </div>
      </div>

      <!-- Core Quote Block -->
      <div style="text-align: center; margin-top: 30px;">
        <blockquote style="font-size: 1.28rem; font-style: italic; color: #f1f5f9; font-weight: 700;">
          « Tu n'as pas besoin de comprendre toutes les femmes de la terre.<br>
          <span class="highlight-red">Tu dois enfin apprendre à comprendre celle avec qui tu partages ta vie.</span> »
        </blockquote>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       6. SECTION : PRÉSENTATION DU GUIDE MAÎTRE (107 PAGES)
       ========================================================================= -->
  <section class="section" id="programme">
    <div class="container">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-blue" style="margin-bottom: 10px;">📖 LE GUIDE DE RÉFÉRENCE DE 107 PAGES</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 14px;">
          Enfin Comprendre Les Hormones <br>
          <span class="text-gradient-red">Pour Mieux Séduire Sa Femme Et Avoir La Tranquillité</span>
        </h2>
        <p style="color: var(--color-text-muted); max-width: 700px; margin: 0 auto;">
          Ce livre n'est pas un cours théorique de biologie ennuyeux. C'est une <strong>arme stratégique pour l'homme moderne</strong> qui veut décoder chaque silence, anticiper les humeurs et allumer le feu dans son lit.
        </p>
      </div>

      <!-- Guide Covers Double Showcase (Red Passion & Royal Blue Edition) -->
      <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 36px;">
        <div style="max-width: 290px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-glow-red); border: 2px solid var(--color-primary-red);">
          <img src="${packCoverRedB64}" alt="Guide Enfin Comprendre les Hormones - Édition Rouge Passion" width="600" height="900" loading="lazy">
        </div>
        <div style="max-width: 290px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-glow-blue); border: 2px solid var(--color-cta-blue);">
          <img src="${packCoverBlueB64}" alt="Guide Enfin Comprendre les Hormones - Édition Bleu Roi" width="600" height="900" loading="lazy">
        </div>
      </div>

      <!-- 4 Parts Detailed Grid -->
      <div class="parts-grid">
        
        <!-- Partie 1 -->
        <div class="part-card">
          <div class="part-tag">PARTIE I • FONDATIONS</div>
          <h3 class="part-title">Avant de la séduire, apprends à la comprendre</h3>
          <ul class="part-chapters">
            <li>Elle n'est pas toujours dans le même état : pourquoi son énergie varie.</li>
            <li>Le cycle féminin expliqué simplement aux hommes sans jargon.</li>
            <li>Ce que les hormones changent réellement dans son comportement.</li>
            <li>Pourquoi tu ne dois plus JAMAIS tout prendre personnellement.</li>
          </ul>
        </div>

        <!-- Partie 2 -->
        <div class="part-card">
          <div class="part-tag">PARTIE II • LE DÉSIR & LE TIMING</div>
          <h3 class="part-title">Le timing parfait pour séduire</h3>
          <ul class="part-chapters">
            <li>Quand est-elle naturellement plus réceptive à tes avances ?</li>
            <li>Comprendre les vraies variations de la libido féminine.</li>
            <li>Créer une attirance irrésistible au lieu de mendier son attention.</li>
            <li>Savoir exactement quand avancer et quand prendre du recul.</li>
          </ul>
        </div>

        <!-- Partie 3 -->
        <div class="part-card">
          <div class="part-tag">PARTIE III • GESTION DE CRISE</div>
          <h3 class="part-title">Quand elle change, sache quoi faire</h3>
          <ul class="part-chapters">
            <li>L'attitude royale à adopter dès qu'elle devient froide ou distante.</li>
            <li>Comment réagir lorsqu'elle devient ultra-sensible ou irritable.</li>
            <li>Décoder le SPM (Syndrome Prémenstruel) sans faire de gaffe.</li>
            <li>Faire la différence entre une crise hormonale et un vrai problème de couple.</li>
          </ul>
        </div>

        <!-- Partie 4 -->
        <div class="part-card">
          <div class="part-tag">PARTIE IV • L'ART DANS LA DURÉE</div>
          <h3 class="part-title">Entretenir l'attraction et la paix du foyer</h3>
          <ul class="part-chapters">
            <li>Pourquoi une femme peut perdre son désir sans cesser d'aimer.</li>
            <li>Comment raviver la tension sexuelle même après 5, 10 ou 15 ans.</li>
            <li>Traverser ensemble les caps : Grossesse, post-partum et ménopause.</li>
            <li>Avoir la paix totale chez soi sans devenir son esclave ni céder son autorité.</li>
          </ul>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       7. SECTION : LES 8 BONUS STRATÉGIQUES OFFERTS (VALEUR > 45 000 FCFA)
       ========================================================================= -->
  <section class="section" id="bonus">
    <div class="container">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-gold" style="margin-bottom: 10px;">🎁 L'ARSENAL COMPLET DU SÉDUCTEUR</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 14px;">
          En Plus Du Guide, Tu Reçois Immédiatement <br>
          <span class="text-gradient-gold">8 Outils Concrets Pour Rendre Ton Couple Incassable</span>
        </h2>
        <p style="color: var(--color-text-muted); max-width: 680px; margin: 0 auto;">
          Ces bonus ont été créés pour te donner des solutions applicables dès ce soir, sans blabla ni théorie inutile.
        </p>
      </div>

      <!-- Bonus Grid -->
      <div class="bonus-grid">
        
        <!-- Bonus 1 - Featured -->
        <div class="bonus-card bonus-featured">
          <div class="bonus-badge-top">🔥 BONUS MAJEUR #1</div>
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">🔥</div>
              <div>
                <h3 class="bonus-title">30 Façons De Créer De La Tension Sexuelle</h3>
                <span style="color: var(--color-gold); font-size: 0.8rem; font-weight: 700;">LE SECRET POUR LA RENDRE ACCRO</span>
              </div>
            </div>
            <p class="bonus-desc">
              Le guide pratique pour installer une tension érotique électrisante au quotidien : regards magnétiques, compliments subtils, effleurements calculés, anticipation, jeux de séduction et respect de son tempo pour qu'elle ait hâte d'être seule avec toi dans la chambre.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 10 000 FCFA</span>
            <span class="bonus-val-free">OFFERT AUJOURD'HUI</span>
          </div>
        </div>

        <!-- Bonus 2 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">⚠️</div>
              <div>
                <h3 class="bonus-title">30 Erreurs Qui Détruisent L'Attraction</h3>
              </div>
            </div>
            <p class="bonus-desc">
              Surveillance maladive du téléphone, jalousie étouffante, mendicité sexuelle, laisser-aller... Découvre les tue-l'amour invisibles qui poussent une femme à se détacher émotionnellement.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 6 000 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

        <!-- Bonus 3 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">🛑</div>
              <div>
                <h3 class="bonus-title">Le Protocole Anti-Conflit En 7 Étapes</h3>
              </div>
            </div>
            <p class="bonus-desc">
              La formule exacte pour désamorcer instantanément une dispute naissante, calmer une femme en colère sans t'écraser et transformer la tension en moment de complicité.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 000 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

        <!-- Bonus 4 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">🧠</div>
              <div>
                <h3 class="bonus-title">Guide Express De La Libido Féminine</h3>
              </div>
            </div>
            <p class="bonus-desc">
              Les 10 facteurs physiologiques et psychologiques qui influencent directement son envie sexuelle (stress, sommeil, charge mentale, contraception, etc.) et comment agir dessus.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 4 500 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

        <!-- Bonus 5 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">💬</div>
              <div>
                <h3 class="bonus-title">25 Phrases À Ne Jamais Dire À Une Femme</h3>
              </div>
            </div>
            <p class="bonus-desc">
              Les phrases toxiques qui la bloquent instantanément (comme « Tu as tes règles ou quoi ? ») et les alternatives puissantes à prononcer pour la rassurer et la séduire.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 4 000 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

        <!-- Bonus 6 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">📅</div>
              <div>
                <h3 class="bonus-title">Le Calendrier Féminin Du Séducteur</h3>
              </div>
            </div>
            <p class="bonus-desc">
              Une méthode d'observation personnalisée pour cartographier le cycle et les pics d'énergie propres à TA compagne sans tomber dans les clichés généraux.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 000 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

        <!-- Bonus 7 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">❤️</div>
              <div>
                <h3 class="bonus-title">Continuer À Séduire Sa Femme Après Des Années</h3>
              </div>
            </div>
            <p class="bonus-desc">
              10 habitudes simples pour casser la routine, réinjecter le frisson des premiers rendez-vous et faire en sorte qu'elle te regarde toujours avec des yeux d'amoureuse.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 500 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

        <!-- Bonus 8 -->
        <div class="bonus-card">
          <div>
            <div class="bonus-header">
              <div class="bonus-icon-wrapper">📖</div>
              <div>
                <h3 class="bonus-title">Le Mode D'Emploi Sur-Mesure De Votre Femme</h3>
              </div>
            </div>
            <p class="bonus-desc">
              Un template confidentiel pour décortiquer son langage amoureux, ses déclencheurs de désir, ses besoins affectifs et ses réactions lors des moments de tension.
            </p>
          </div>
          <div class="bonus-value-row">
            <span class="bonus-val-strike">Valeur : 5 000 FCFA</span>
            <span class="bonus-val-free">OFFERT</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       8. SECTION : PREUVES SOCIALES RÉELLES (CAPTURES WHATSAPP & DASHBOARD)
       ========================================================================= -->
  <section class="section" id="temoignages">
    <div class="container">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-green" style="margin-bottom: 10px;">💬 PREUVES SOCIALES & AVIS CLIENTS VÉRIFIÉS</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 14px;">
          Ils Ont Testé Le Pack... <br>
          <span class="text-gradient-red">Voici Leurs Retours Spontanés Sur WhatsApp</span>
        </h2>
        <p style="color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
          Des retours réels, sans trucage, d'hommes et de femmes ayant appliqué les clés du Pack du Désir.
        </p>
      </div>

      <!-- Real Screenshots WhatsApp Grid -->
      <div class="screenshots-grid">
        
        <!-- Screenshot 1: Rivaldo -->
        <div class="screenshot-card">
          <img src="${temoignageRivaldoB64}" alt="Avis WhatsApp Rivaldo" width="600" height="1200" loading="lazy">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">👤 Rivaldo</span>
            <span class="screenshot-badge">✓ Achat vérifié</span>
          </div>
        </div>

        <!-- Screenshot 2: Guy Adolphe -->
        <div class="screenshot-card">
          <img src="${temoignageGuyAdolpheB64}" alt="Avis WhatsApp Guy Adolphe" width="600" height="1200" loading="lazy">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">👤 Guy Adolphe</span>
            <span class="screenshot-badge">✓ Achat vérifié</span>
          </div>
        </div>

        <!-- Screenshot 3: Rosemonde -->
        <div class="screenshot-card">
          <img src="${temoignageRosemondeB64}" alt="Avis WhatsApp Rosemonde" width="600" height="1200" loading="lazy">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">👤 Rosemonde Coi...</span>
            <span class="screenshot-badge">✓ Achat vérifié</span>
          </div>
        </div>

        <!-- Screenshot 4: Thibaut -->
        <div class="screenshot-card">
          <img src="${temoignageThibautB64}" alt="Avis WhatsApp Mr Thibaut" width="600" height="1200" loading="lazy">
          <div class="screenshot-caption">
            <span class="screenshot-client-name">👤 Mr Thibaut</span>
            <span class="screenshot-badge">✓ Achat vérifié</span>
          </div>
        </div>

      </div>

      <!-- Real Orders Proof Dashboard Banner -->
      <div style="margin-top: 36px; text-align: center;">
        <div class="badge-pill badge-blue" style="margin-bottom: 12px;">📊 PREUVE DE VENTES EN TEMPS RÉEL</div>
        <h3 style="font-size: 1.35rem; margin-bottom: 16px;">Plusieurs commandes enregistrées chaque jour sur notre boutique :</h3>
        <div class="proof-banner-card">
          <img src="${preuveVentesB64}" alt="Commandes enregistrées Pack du Désir" width="1200" height="300" loading="lazy">
        </div>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       9. SECTION : L'OFFRE IRRÉSISTIBLE & STACK DE PRIX (LE COEUR DU TUNNEL)
       ========================================================================= -->
  <section class="section" id="offre">
    <div class="container">
      
      <div class="offer-box-master">
        <div class="offer-ribbon">🔥 OFFRE SPÉCIALE • DERNIÈRE CHANCE</div>

        <h2 style="font-size: 2.2rem; margin-top: 10px; margin-bottom: 8px;">
          RÉCAPITULATIF DE TON PACK
        </h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 24px;">
          Voici tout ce que tu débloques immédiatement après validation de ta commande :
        </p>

        <!-- Stack Checklist -->
        <ul class="offer-stack-items">
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span><strong>Le Guide Maître : Enfin Comprendre Les Hormones</strong> (107 pages)</span>
            </div>
            <span class="offer-item-val">15 000 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #1 : 30 façons de créer de la tension sexuelle</span>
            </div>
            <span class="offer-item-val">10 000 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #2 : 30 erreurs qui détruisent l'attraction</span>
            </div>
            <span class="offer-item-val">6 000 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #3 : Le protocole anti-conflit en 7 étapes</span>
            </div>
            <span class="offer-item-val">5 000 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #4 : Le guide express de la libido féminine</span>
            </div>
            <span class="offer-item-val">4 500 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #5 : 25 phrases à ne jamais dire à une femme</span>
            </div>
            <span class="offer-item-val">4 000 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #6 : Le calendrier féminin du séducteur</span>
            </div>
            <span class="offer-item-val">5 000 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #7 : Comment séduire sa femme après plusieurs années</span>
            </div>
            <span class="offer-item-val">5 500 FCFA</span>
          </li>
          <li class="offer-stack-item">
            <div class="offer-item-name">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
              <span>Bonus #8 : Le mode d'emploi de votre femme</span>
            </div>
            <span class="offer-item-val">5 000 FCFA</span>
          </li>
        </ul>

        <!-- Price Stack Calc -->
        <div class="offer-total-calc">
          <div class="offer-total-old">Valeur totale cumulée : <span class="highlight-strike">60 000 FCFA</span></div>
          <div style="font-size: 1.05rem; color: var(--color-gold); font-weight: 800; text-transform: uppercase;">
            ⏰ PRIX PROMOTIONNEL JUSQU'À CE SOIR 23H59 :
          </div>
          <div class="offer-total-new text-gradient-red">
            1 000 FCFA
          </div>
          <div style="font-size: 0.88rem; color: var(--color-text-muted);">
            (Paiement unique en une seule fois • Aucun abonnement caché)
          </div>
        </div>

        <!-- Master Guarantee Box -->
        <div class="guarantee-box">
          <div class="guarantee-badge-icon">🛡️</div>
          <div>
            <div class="guarantee-title">GARANTIE 7 JOURS « SATISFAIT OU REMBOURSÉ »</div>
            <p class="guarantee-text">
              Télécharge le Pack, lis le guide et applique ne serait-ce qu'une seule technique pour recréer de la complicité. Si tu estimes que ce pack ne t'a pas apporté 10 fois sa valeur, envoie-nous un simple message et nous te remboursons intégralement. <strong>Zéro risque pour toi.</strong>
            </p>
          </div>
        </div>

        <!-- Master Royal Blue Order CTA Button with Rose Wave Glow -->
        <div style="display: flex; justify-content: center; margin: 30px 0 18px;">
          <a href="https://amour-desir.mychariow.co/pack-du-desir/checkout" target="_blank" rel="noopener" class="btn-cta">
            <span>🔥 OUI ! JE COMMANDE MON PACK DU DÉSIR (1 000 F)</span>
            <span class="btn-cta-sub">
              ⚡ Accès immédiat envoyé par email en 30 secondes
            </span>
          </a>
        </div>

        <!-- Payment Methods Supported -->
        <div class="payment-methods-box">
          <div class="payment-label">Moyens de paiement sécurisés acceptés (Côte d'Ivoire 🇨🇮, Congo Brazza 🇨🇬, RDC 🇨🇩 & International) :</div>
          <div class="payment-logos-row">
            <span class="pay-pill">🟧 Orange Money</span>
            <span class="pay-pill">🟨 MTN MoMo</span>
            <span class="pay-pill">🟦 Moov Money</span>
            <span class="pay-pill">🌊 Wave</span>
            <span class="pay-pill">💳 Carte Visa</span>
            <span class="pay-pill">💳 Mastercard</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       10. SECTION : FAQ STRATÉGIQUE ANTI-OBJECTIONS
       ========================================================================= -->
  <section class="section" id="faq">
    <div class="container">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-red" style="margin-bottom: 10px;">❓ QUESTIONS FRÉQUENTES</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 14px;">
          Tu As Des Questions ? <br>
          <span class="text-gradient-red">Voici Les Réponses Directes Et Sans Filtre.</span>
        </h2>
        <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto;">
          Clique sur chaque question pour voir la réponse détaillée.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div class="faq-list">
        
        <!-- Q1 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ Est-ce que le PACK DU DÉSIR est seulement un livre sur les hormones ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              <strong>Non, absolument pas.</strong> Le Pack va beaucoup plus loin qu'un simple exposé biologique : il t'aide concrètement à décrypter les réactions de ta femme, les fluctuations de son désir, sa communication verbale et non-verbale, l'attraction mutuelle, la gestion des conflits et la manière de bâtir une relation passionnée, saine et complice.
            </p>
          </div>
        </div>

        <!-- Q2 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ Est-ce que ce Pack va me permettre de « contrôler » ma femme ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              <strong>Non.</strong> Le but est de la <em>comprendre</em>, de mieux communiquer et de savoir réagir avec calme et virilité. Il ne s'agit pas de manipuler une personne ou de forcer son consentement, mais de créer les conditions idéales pour que le désir et l'affection renaissent naturellement.
            </p>
          </div>
        </div>

        <!-- Q3 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ Et si ma femme n'est pas comme les femmes décrites dans le livre ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              C'est exactement la raison d'être de ce Pack ! Le guide t'apprend à <strong>observer ta propre femme</strong>, à cartographier ses habitudes uniques, ses besoins profonds, ses sensibilités et ce qui déclenche son ouverture et sa sensualité avec toi.
            </p>
          </div>
        </div>

        <!-- Q4 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ Est-ce que le livre parle vraiment de sexe ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              <strong>Oui, totalement. 🔥</strong> Le Pack aborde frontalement les variations de la libido féminine, les erreurs masculines qui détruisent l'excitation, l'art de créer de la tension sexuelle et les méthodes pour entretenir une intimité torride et épanouie dans le couple.
            </p>
          </div>
        </div>

        <!-- Q5 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ Comment vais-je recevoir le Pack après mon paiement ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              Dès que ton paiement de 1 000 FCFA est validé sur la page sécurisée, tu es redirigé immédiatement vers la page de téléchargement, et un lien d'accès direct et confidentiel t'est envoyé à ton adresse email. Tu peux lire les guides sur ton smartphone, tablette ou ordinateur en toute discrétion.
            </p>
          </div>
        </div>

        <!-- Q6 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ Et si je paie mais que je ne suis pas satisfait ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              Tu es protégé par notre <strong>Garantie Satisfait ou Remboursé de 7 jours 🛡️</strong>. Tu as une semaine complète pour tester les méthodes. Si tu n'es pas convaincu, contacte-nous et nous te remboursons jusqu'au dernier centime sans poser de question.
            </p>
          </div>
        </div>

        <!-- Q7 -->
        <div class="faq-item">
          <div class="faq-trigger">
            <span>❓ J'ai encore une question avant de commander ?</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-content">
            <p>
              Notre équipe d'assistance est à ton écoute ! Tu peux nous joindre directement sur WhatsApp au <strong>+229 0195928057</strong> (ou +229 0196404757) pour poser tes questions avant de finaliser ton achat.
            </p>
          </div>
        </div>

      </div>

      <!-- Quick Urgency Reminder in FAQ -->
      <div style="text-align: center; margin-top: 24px; color: #fbbf24; font-weight: 700;">
        ⏰ Rappel : L'offre exceptionnelle à 1 000 FCFA prend fin aujourd'hui à 23H59 précises. Après cette heure, le tarif repasse à 15 000 FCFA.
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- =========================================================================
       11. SECTION : LE CHOIX FINAL (LE COÛT DE L'INACTION)
       ========================================================================= -->
  <section class="section" id="choix">
    <div class="container">
      
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge-pill badge-red" style="margin-bottom: 10px;">⚡ LE MOMENT DE DÉCIDER</div>
        <h2 style="font-size: 2.1rem; margin-bottom: 14px;">
          Tu Es À La Croisée Des Chemins. <br>
          <span class="text-gradient-red">Quel Avenir Choisis-Tu Pour Ton Couple ?</span>
        </h2>
      </div>

      <div class="choices-grid">
        
        <!-- Option A: Inaction -->
        <div class="choice-card choice-bad">
          <div>
            <h3 style="color: #ff4d58; font-size: 1.25rem; margin-bottom: 14px;">
              ❌ OPTION 1 : NE RIEN CHANGER
            </h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.55; margin-bottom: 14px;">
              Tu quittes cette page. Tu retournes à ton quotidien avec les mêmes doutes, les mêmes refus la nuit, les mêmes disputes qui éclatent pour un mot de travers.
            </p>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.55;">
              Tu continues à surveiller son comportement en silence, à te demander si elle t'aime encore, jusqu'au jour où la distance devient trop grande pour être comblée...
            </p>
          </div>
          <div style="margin-top: 20px; font-weight: 800; color: #ff4d58; font-size: 0.85rem; text-transform: uppercase;">
            Coût : Frustration permanente & risque de rupture
          </div>
        </div>

        <!-- Option B: Action -->
        <div class="choice-card choice-good">
          <div>
            <h3 style="color: #34d399; font-size: 1.25rem; margin-bottom: 14px;">
              ✅ OPTION 2 : PRENDRE LE PACK DU DÉSIR (1 000 F)
            </h3>
            <p style="color: #f1f5f9; font-size: 0.95rem; line-height: 1.55; margin-bottom: 14px;">
              Tu investis l'équivalent d'un plat ou d'une boisson pour accéder aux secrets du désir féminin et transformer ta dynamique de couple.
            </p>
            <p style="color: #f1f5f9; font-size: 0.95rem; line-height: 1.55;">
              Tu comprends enfin chaque réaction de ta femme, tu sais comment la séduire au bon moment, tu ravives la flamme de la passion et tu retrouves la <strong>paix et le respect absolu dans ton foyer</strong>.
            </p>
          </div>
          <div style="margin-top: 20px; font-weight: 800; color: #34d399; font-size: 0.85rem; text-transform: uppercase;">
            Résultat : Une relation passionnée, complice et sereine
          </div>
        </div>

      </div>

      <!-- Final Master CTA -->
      <div style="text-align: center; margin-top: 40px;">
        <a href="https://amour-desir.mychariow.co/pack-du-desir/checkout" target="_blank" rel="noopener" class="btn-cta" style="margin: 0 auto;">
          <span>👉 JE COMMANDE LE PACK DU DÉSIR À 1 000 FCFA</span>
          <span class="btn-cta-sub">⚡ Téléchargement immédiat • Offre valable jusqu'à 23h59</span>
        </a>
      </div>

    </div>
  </section>

  <!-- =========================================================================
       12. FOOTER & CONTACT DIRECT
       ========================================================================= -->
  <footer class="footer-section">
    <div class="container">
      
      <div style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 900; color: #ffffff; margin-bottom: 8px;">
        AMOUR & DÉSIR
      </div>
      <p style="color: var(--color-text-muted); font-size: 0.92rem; max-width: 480px; margin: 0 auto 20px;">
        Vis toi aussi des sensations fortes dans ta maison et sois un homme respecté, épanoui et aimé.
      </p>

      <div class="footer-links">
        <a href="https://wa.me/2290195928057" target="_blank" rel="noopener">Support WhatsApp (+229 0195928057)</a>
        <span>•</span>
        <a href="https://amour-desir.mychariow.co/pack-du-desir/checkout" target="_blank" rel="noopener">Commander le Pack</a>
        <span>•</span>
        <a href="#">Politique de confidentialité</a>
      </div>

      <div style="font-size: 0.75rem; color: var(--color-text-dim); margin-top: 16px;">
        © <span id="currentYear">2026</span> Amour & Désir. Tous droits réservés.<br>
        Ce site ne fait pas partie du site web Facebook ou de Meta Platforms Inc. De plus, ce site n'est en aucun cas sponsorisé, approuvé ou administré par Facebook.
      </div>

    </div>
  </footer>

  <!-- =========================================================================
       13. STICKY BOTTOM BAR (MOBILE & DESKTOP ON SCROLL)
       ========================================================================= -->
  <div class="sticky-bottom-bar" id="stickyCtaBar">
    <div class="sticky-price-info">
      <div class="sticky-price-title">OFFRE ÉCLAIR</div>
      <div class="sticky-price-val">1 000 F <span>15 000 F</span></div>
    </div>
    <a href="https://amour-desir.mychariow.co/pack-du-desir/checkout" target="_blank" rel="noopener" class="btn-sticky-cta">
      <span>JE COMMANDE LE PACK</span>
      <span style="font-size: 0.78rem; opacity: 0.9; text-transform: none;">(1 000 FCFA)</span>
    </a>
  </div>

  <!-- =========================================================================
       14. FLOATING WHATSAPP BUTTON
       ========================================================================= -->
  <a href="https://wa.me/2290195928057?text=Bonjour,%20j'ai%20une%20question%20sur%20le%20Pack%20du%20D%C3%A9sir%20avant%20de%20commander" target="_blank" rel="noopener" class="btn-whatsapp-float" title="Une question ? Écris-nous sur WhatsApp">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.61 14.38C16.36 14.25 15.13 13.64 14.9 13.56C14.67 13.48 14.51 13.44 14.34 13.68C14.18 13.93 13.71 14.48 13.57 14.65C13.42 14.81 13.28 14.83 13.03 14.71C12.79 14.58 12 14.33 11.06 13.49C10.33 12.84 9.84 12.03 9.7 11.78C9.55 11.54 9.68 11.41 9.81 11.28C9.92 11.17 10.05 11 10.18 10.86C10.3 10.71 10.34 10.61 10.42 10.45C10.5 10.28 10.46 10.14 10.4 10.02C10.34 9.89 9.85 8.7 9.65 8.2C9.45 7.72 9.25 7.79 9.1 7.78C8.96 7.77 8.79 7.77 8.63 7.77C8.46 7.77 8.19 7.83 7.96 8.08C7.73 8.33 7.08 8.94 7.08 10.19C7.08 11.44 7.99 12.65 8.12 12.82C8.24 12.98 9.91 15.55 12.46 16.65C13.07 16.91 13.54 17.07 13.91 17.19C14.52 17.38 15.08 17.36 15.52 17.29C16.01 17.22 17.03 16.67 17.24 16.08C17.45 15.48 17.45 14.98 17.38 14.86C17.32 14.75 17.17 14.68 16.93 14.56L16.61 14.38Z"/>
    </svg>
  </a>

  <!-- =========================================================================
       15. SOCIAL PROOF NOTIFICATION TOAST (LIVE ORDERS CI 🇨🇮, CG 🇨🇬, CD 🇨🇩)
       ========================================================================= -->
  <div class="social-proof-toast" id="socialProofToast">
    <div class="toast-avatar" id="toastFlag">🇨🇮</div>
    <div>
      <div class="toast-text">
        <strong id="toastName">Kouamé K.</strong> (<span id="toastCity">Abidjan</span>) vient de débloquer le <strong>Pack du Désir</strong>
      </div>
      <div class="toast-time" id="toastTime">il y a 2 min • Accès envoyé par email</div>
    </div>
  </div>

  <!-- Inlined JavaScript -->
  <script>
${jsContent}
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', singleFileHtml, 'utf8');
console.log('Successfully written standalone index.html (' + fs.statSync('index.html').size + ' bytes)');
