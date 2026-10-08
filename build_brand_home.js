const fs = require('fs');
const path = require('path');

console.log('Generating Brand Landing Page for Amour & Désir with LIGHT BACKGROUND & STRICT BURGUNDY PALETTE (index.html)...');

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
const packDesirB64 = getBase64Image('assets/images/pack-cover-red.jpg');
const fouDeToiB64 = getBase64Image('assets/images/couverture-fou-de-toi.jpg');

// Read CSS
let cssContent = fs.readFileSync('assets/css/style.css', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>AMOUR & DÉSIR • Maison d'Édition de l'Épanouissement Intime & Conjugal</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/jpeg" href="${faviconB64}">
  <link rel="shortcut icon" type="image/jpeg" href="${faviconB64}">
  <link rel="apple-touch-icon" href="${faviconB64}">
  
  <!-- SEO & Open Graph Meta Tags -->
  <meta name="description" content="Découvrez les éditions Amour & Désir. Guides pratiques et bienveillants pour réveiller la passion, comprendre le désir de l'autre et transformer le foyer en sanctuaire de paix.">
  <meta property="og:title" content="AMOUR & DÉSIR • Épanouissement Intime, Passion & Paix dans le Foyer">
  <meta property="og:description" content="Découvrez nos deux guides de référence : Le Pack du Désir (Psychologie & Hormones) et Fou de Toi, Folle de Toi (Le Guide du Couple Chrétien).">
  <meta property="og:image" content="${fouDeToiB64}">
  <meta property="og:type" content="website">
  
  <!-- Google Fonts: Playfair Display + Cinzel + Plus Jakarta Sans & Outfit -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
${cssContent}

    /* Brand Custom Layout */
    .brand-navbar {
      background: #FFFFFF;
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 18px 0;
      box-shadow: var(--shadow-sm);
    }

    .brand-nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-logo-text {
      font-family: var(--font-heading);
      font-size: 1.55rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: var(--color-burgundy);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .brand-hero {
      padding: 60px 0 40px 0;
      text-align: center;
    }

    .products-showcase-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      margin: 40px 0;
    }

    @media (min-width: 900px) {
      .products-showcase-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .product-showcase-card {
      background: #FFFFFF;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: var(--transition);
      box-shadow: var(--shadow-card);
      text-align: left;
    }

    .product-showcase-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .card-pack-desir {
      border-top: 5px solid var(--color-burgundy);
    }

    .card-fou-de-toi {
      border-top: 5px solid var(--color-burgundy);
    }

    .product-img-box {
      width: 100%;
      max-width: 320px;
      margin: 0 auto 24px auto;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .product-title-big {
      font-family: var(--font-heading);
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--color-text-title);
      margin-bottom: 6px;
      line-height: 1.25;
    }

    .product-subtitle-desc {
      font-size: 0.92rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin-bottom: 20px;
      font-style: italic;
    }

    .product-features-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 24px;
    }

    .product-features-list li {
      font-size: 0.88rem;
      color: var(--color-text-body);
      display: flex;
      align-items: flex-start;
      gap: 10px;
      line-height: 1.5;
    }

    .product-features-list li span.check-icon {
      color: var(--color-burgundy);
      font-weight: 900;
    }

    .product-pricing-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-bg-subtle);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      margin-bottom: 20px;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
      margin: 36px 0;
    }

    @media (min-width: 640px) {
      .pillars-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .pillars-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .pillar-card {
      background: #FFFFFF;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      text-align: center;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }

    .pillar-card:hover {
      border-color: var(--color-burgundy-border);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .pillar-icon {
      font-size: 2.2rem;
      margin-bottom: 12px;
      color: var(--color-burgundy);
    }

    .pillar-title {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--color-text-title);
      margin-bottom: 8px;
    }

    .pillar-desc {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }
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
    
    var pageViewEventId = 'pv_home_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
    fbq('init', '2465772550579051');
    fbq('track', 'PageView', {}, { eventID: pageViewEventId });
  </script>
</head>
<body style="background-color: #FAF7F5; padding-bottom: 0;">

  <!-- Brand Navigation -->
  <header class="brand-navbar">
    <div class="container brand-nav-inner">
      <div class="brand-logo-text">
        AMOUR & DÉSIR
      </div>
      <div>
        <a href="#produits" class="badge-pill badge-burgundy" style="text-decoration: none; font-size: 0.8rem; padding: 7px 16px;">
          📖 Nos Guides Officiels
        </a>
      </div>
    </div>
  </header>

  <!-- Brand Hero Header -->
  <section class="brand-hero">
    <div class="container">
      
      <div class="book-header-rule">
        <span class="book-header-text">Éditions Amour & Désir</span>
      </div>

      <div class="badge-pill badge-burgundy" style="margin-bottom: 16px;">
        MAISON D'ÉDITION POUR LE COUPLE • AFRIQUE & DIASPORA
      </div>

      <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 800; line-height: 1.15; color: var(--color-text-title); max-width: 900px; margin: 0 auto 18px auto;">
        Rallumez La Passion, Le Désir & La Paix Dans Votre Foyer
      </h1>

      <p style="color: var(--color-text-muted); font-size: clamp(1rem, 2vw, 1.15rem); max-width: 760px; margin: 0 auto 30px auto; line-height: 1.65;">
        Bienvenue chez <strong>Amour & Désir</strong>, la maison d'édition francophone dédiée à la réconciliation intime du couple. Nous allions <strong>science anatomique, psychologie profonde et respect absolu des valeurs sacrées du mariage</strong> pour faire de votre chambre un sanctuaire d'amour inébranlable.
      </p>

      <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <a href="#produits" class="btn-cta" style="max-width: 380px;">
          <span style="font-weight: 800;">EXPLORER NOS 2 GUIDES PHARES</span>
          <span class="btn-cta-sub">Des méthodes claires, pudiques et immédiatement applicables</span>
        </a>
      </div>

    </div>
  </section>

  <div class="section-divider"></div>

  <!-- Two Flagship Products Section -->
  <section class="section" id="produits" style="padding-top: 30px;">
    <div class="container">
      
      <div style="text-align: center; max-width: 760px; margin: 0 auto 36px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 12px;">📚 NOS DEUX CRÉATIONS</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 12px; color: var(--color-burgundy);">
          Choisissez Le Guide Adapté À Votre Couple
        </h2>
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          Deux méthodes complètes et complémentaires pour métamorphoser votre vie intime dès ce soir :
        </p>
      </div>

      <div class="products-showcase-grid">
        
        <!-- PRODUCT 1 : LE PACK DU DÉSIR -->
        <div class="product-showcase-card card-pack-desir">
          <div>
            <div class="product-img-box">
              <img src="${packDesirB64}" alt="Pack du Désir - Comprendre Les Hormones" style="width: 100%; display: block;">
            </div>

            <div style="font-size: 0.75rem; font-weight: 800; color: var(--color-burgundy); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px;">
              VOLUME 1 • PSYCHOLOGIE DU DÉSIR
            </div>
            
            <h3 class="product-title-big">LE PACK DU DÉSIR</h3>
            
            <p class="product-subtitle-desc">
              « Enfin Comprendre Les Hormones Pour Mieux Séduire Sa Femme & Avoir La Tranquillité Dans Son Couple »
            </p>

            <ul class="product-features-list">
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Guide Maître (107 pages) :</strong> Décoder les 4 phases hormonales féminines pour ne plus jamais subir ses sautes d'humeur.</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Réveiller son désir ardent :</strong> Les déclencheurs émotionnels pour qu'elle revienne d'elle-même chercher vos bras.</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Le protocole anti-conflit :</strong> Désamorcer les tensions et disputes du quotidien en 7 étapes simples.</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>8 Bonus Stratégiques Inclus :</strong> Phrases à ne jamais dire, calendrier féminin, tension sexuelle et fiches mémo.</span>
              </li>
            </ul>
          </div>

          <div>
            <div class="product-pricing-bar">
              <div>
                <div style="font-size: 0.75rem; color: var(--color-text-dim); text-transform: uppercase;">Prix Standard</div>
                <div style="font-size: 0.95rem; text-decoration: line-through; color: #888888;">15 000 FCFA</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.75rem; color: var(--color-burgundy); font-weight: 800;">⚡ OFFRE LIMITÉE</div>
                <div style="font-size: 1.6rem; font-weight: 900; color: var(--color-burgundy);">999 FCFA</div>
              </div>
            </div>

            <a href="/pack-du-desir" class="btn-cta" style="width: 100%;">
              <span style="font-weight: 800;">👉 DÉCOUVRIR LE PACK DU DÉSIR</span>
              <span class="btn-cta-sub">Voir la présentation complète & les 8 bonus</span>
            </a>
          </div>

        </div>

        <!-- PRODUCT 2 : FOU DE TOI, FOLLE DE TOI -->
        <div class="product-showcase-card card-fou-de-toi">
          <div>
            <div class="product-img-box">
              <img src="${fouDeToiB64}" alt="Livre Fou de Toi, Folle de Toi" style="width: 100%; display: block;">
            </div>

            <div style="font-size: 0.75rem; font-weight: 800; color: var(--color-burgundy); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px;">
              VOLUME 2 • LE LIT CONJUGAL DE FEU
            </div>

            <h3 class="product-title-big">FOU DE TOI, FOLLE DE TOI</h3>

            <p class="product-subtitle-desc">
              « Le Guide Du Couple Chrétien Qui Veut Un Lit De Feu • Même Sans Endurance & Sans Positions Compliquées »
            </p>

            <ul class="product-features-list">
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Guide Maître (190 pages illustrées) :</strong> Déculpabilisation biblique totale (Genèse 2:25, Proverbes 5:19, Cantique des Cantiques).</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Endurance de 15 à 20 min sans chimie :</strong> Échelle 1-10, stop-start, squeeze, Kegel et le secret du deuxième tour.</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Extase féminine & clitoris :</strong> Les 4 mouvements d'orfèvre, Point G, cunnilingus langue à plat et orgasmes multiples.</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>18 Positions du Kama Sutra Chrétien :</strong> Silhouettes pudiques sans visage adaptées aux ventres ronds, fatigue, grossesse, +50 ans.</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span><strong>Pharmacie d'Afrique de l'Ouest & 6 Bonus :</strong> 10 super-aliments du marché, potions, calendrier 30 jours et fiches table de nuit.</span>
              </li>
            </ul>
          </div>

          <div>
            <div class="product-pricing-bar">
              <div>
                <div style="font-size: 0.75rem; color: var(--color-text-dim); text-transform: uppercase;">Prix Standard</div>
                <div style="font-size: 0.95rem; text-decoration: line-through; color: #888888;">25 000 FCFA</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.75rem; color: var(--color-burgundy); font-weight: 800;">⚡ LANCEMENT EXCLUSIF (-62%)</div>
                <div style="font-size: 1.6rem; font-weight: 900; color: var(--color-burgundy);">9 500 FCFA</div>
              </div>
            </div>

            <a href="/fou-de-toi-folle-de-toi" class="btn-cta" style="width: 100%;">
              <span style="font-weight: 800;">🔥 DÉCOUVRIR FOU DE TOI, FOLLE DE TOI</span>
              <span class="btn-cta-sub">Voir la présentation complète & les 18 positions</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  </section>

  <!-- Comparison & Orientation Guide -->
  <section class="section" style="background: var(--color-bg-subtle);">
    <div class="container" style="max-width: 860px;">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">🧭 GUIDE D'ORIENTATION</div>
        <h3 style="font-size: 1.9rem; color: var(--color-text-title);">Quel Guide Correspond Au Besoin De Votre Couple ?</h3>
      </div>

      <div class="card-light" style="padding: 24px; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem; min-width: 580px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--color-burgundy); background: var(--color-burgundy); color: #FFFFFF;">
              <th style="padding: 14px 12px;">Votre Situation Actuelle</th>
              <th style="padding: 14px 12px; text-align: center;">Le Pack du Désir</th>
              <th style="padding: 14px 12px; text-align: center;">Fou de Toi, Folle de Toi</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border); background: #FFFFFF;">
              <td style="padding: 14px 12px; color: var(--color-text-body);">Elle refuse l'intimité, s'énerve souvent ou semble distante</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-burgundy); font-weight: 800;">✓ INDISPENSABLE</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-text-muted);">Complémentaire</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border); background: var(--color-bg-subtle);">
              <td style="padding: 14px 12px; color: var(--color-text-body);">Rapport rapide (3 min), manque d'endurance, peur de la panne</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-text-muted);">Utile</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-burgundy); font-weight: 800;">✓ INDISPENSABLE</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border); background: #FFFFFF;">
              <td style="padding: 14px 12px; color: var(--color-text-body);">Elle ne jouit pas, a mal, simule ou a honte de son corps</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-text-muted);">Utile</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-burgundy); font-weight: 800;">✓ INDISPENSABLE</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border); background: var(--color-bg-subtle);">
              <td style="padding: 14px 12px; color: var(--color-text-body);">Couple chrétien voulant déculpabiliser et renouveler le lit</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-text-muted);">Recommandé</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-burgundy); font-weight: 800;">✓ CRUCIAL (100%)</td>
            </tr>
            <tr style="background: #FFFFFF;">
              <td style="padding: 14px 12px; color: var(--color-text-body);">Besoin de positions variées adaptées aux corps réels & coussins</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-text-muted);">Non inclus</td>
              <td style="padding: 14px 12px; text-align: center; color: var(--color-burgundy); font-weight: 800;">✓ 18 POSITIONS</td>
            </tr>
          </tbody>
        </table>

        <div class="callout-retenir" style="margin-top: 24px;">
          <div class="callout-title-retenir">LE CONSEIL D'AMOUR & DÉSIR :</div>
          <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.55;">
            Beaucoup de couples débutent par <em>Le Pack du Désir</em> pour restaurer la communication et le magnétisme au quotidien, puis approfondissent avec <em>Fou de Toi, Folle de Toi</em> pour transformer leur chambre conjugale en un lit de feu.
          </p>
        </div>
      </div>

    </div>
  </section>

  <!-- Brand Pillars Section -->
  <section class="section">
    <div class="container">
      
      <div style="text-align: center; max-width: 760px; margin: 0 auto 30px auto;">
        <div class="badge-pill badge-burgundy" style="margin-bottom: 10px;">🛡️ NOS ENGAGEMENTS</div>
        <h3 style="font-size: 1.9rem; color: var(--color-text-title);">Pourquoi Faire Confiance À Amour & Désir ?</h3>
      </div>

      <div class="pillars-grid">
        
        <div class="pillar-card">
          <div class="pillar-icon">🔒</div>
          <div class="pillar-title">Discrétion Absolue</div>
          <div class="pillar-desc">Facturation neutre sous l'intitulé "Éditions Éveil". Aucun libellé compromettant sur vos relevés bancaires ou SMS Mobile Money.</div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">⚡</div>
          <div class="pillar-title">Accès Instantané</div>
          <div class="pillar-desc">Téléchargement immédiat en PDF Haute Définition après paiement, avec sauvegarde envoyée par email et assistance WhatsApp.</div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">📱</div>
          <div class="pillar-title">Paiement Mobile Money</div>
          <div class="pillar-desc">Paiement fluide via Wave, Orange Money, MTN, Moov et cartes bancaires dans toute l'Afrique de l'Ouest, Centrale et la diaspora.</div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">🤝</div>
          <div class="pillar-title">Garantie 30 Jours</div>
          <div class="pillar-desc">Garantie 100% satisfait ou remboursé sous 30 jours sur simple demande. Votre épanouissement conjugal est notre seule priorité.</div>
        </div>

      </div>

    </div>
  </section>

  <!-- Brand Footer -->
  <footer class="footer-section">
    <div class="container">
      <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--color-burgundy); margin-bottom: 6px;">
        AMOUR & DÉSIR
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic; margin-bottom: 16px;">
        Maison d'édition de l'épanouissement intime et de la paix dans le couple
      </div>
      <p style="font-size: 0.8rem; color: var(--color-text-dim); line-height: 1.6; max-width: 620px; margin: 0 auto 20px auto;">
        © 2026 Éditions Amour & Désir. Tous droits réservés. Tous nos guides sont destinés à un public adulte et engagé dans une démarche d'épanouissement mutuel et de fidélité conjugale.
      </p>
      <div class="footer-links" style="font-size: 0.82rem;">
        <a href="/pack-du-desir">Le Pack du Désir</a> • 
        <a href="/fou-de-toi-folle-de-toi">Fou de Toi, Folle de Toi</a> • 
        <a href="https://wa.me/2290195928057" target="_blank" rel="noopener">Assistance WhatsApp (+229 0195928057)</a>
      </div>
    </div>
  </footer>

</body>
</html>`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('Successfully written brand landing page index.html with LIGHT BACKGROUND & ZERO GOLD (' + fs.statSync('index.html').size + ' bytes)!');
