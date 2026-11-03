import os
import base64
import subprocess
from PIL import Image

POSTERS_DIR = os.path.abspath('public/images/posters')
os.makedirs(POSTERS_DIR, exist_ok=True)

def to_base64(filepath):
    with open(filepath, 'rb') as f:
        data = f.read()
    ext = os.path.splitext(filepath)[1].lower()
    mime = 'image/png' if ext == '.png' else ('image/svg+xml' if ext == '.svg' else 'image/jpeg')
    return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"

logo_full_dark = to_base64('public/images/logo-full.png') # Navy text, Gold crest (for light canvas)
logo_full_light = to_base64('public/images/logo-full-light.png') # White text, Gold crest (for dark canvas)
logo_emblem_gold = to_base64('public/images/logo-emblem-gold.png') # Gold crest
suit_photo = to_base64('public/images/executive-three-piece-navy-ivory-waistcoat.jpeg')

print("Assets encoded to Base64 successfully.")

# -------------------------------------------------------------
# POSTER 1: The Sartorial Reveal (Fabric Curtain Pull)
# -------------------------------------------------------------
html_poster_1 = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,700&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1080px;
    height: 1350px;
    position: relative;
    overflow: hidden;
    background: #FAF9F6;
    font-family: 'Montserrat', sans-serif;
  }}

  /* Left Light Canvas */
  .left-content {{
    position: absolute;
    top: 0;
    left: 0;
    width: 600px;
    height: 1350px;
    padding: 70px 50px 60px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }}

  .pill-tag {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1B1464;
    color: #FAF9F6;
    padding: 10px 22px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: fit-content;
    box-shadow: 0 4px 15px rgba(27, 20, 100, 0.2);
  }}
  .pill-tag span {{
    color: #A88A00;
  }}

  .quote-symbol {{
    font-family: 'Playfair Display', serif;
    font-size: 110px;
    line-height: 0.8;
    color: #A88A00;
    margin-top: 30px;
    margin-bottom: 5px;
  }}

  .headline-main {{
    font-size: 32px;
    font-weight: 800;
    color: #1B1464;
    line-height: 1.25;
    letter-spacing: -0.5px;
    margin-bottom: 25px;
  }}
  .headline-main .accent {{
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    color: #A88A00;
    font-style: italic;
    font-weight: 800;
    margin-top: 10px;
    line-height: 1.2;
  }}

  .editorial-desc {{
    font-size: 17px;
    line-height: 1.6;
    color: #4A4A5A;
    font-weight: 500;
    max-width: 440px;
  }}

  .left-footer {{
    margin-top: 40px;
  }}
  .left-footer .date-badge {{
    font-family: 'Cinzel', serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 3px;
    color: #1B1464;
    text-transform: uppercase;
    margin-bottom: 8px;
  }}
  .left-footer .address {{
    font-size: 13px;
    color: #7A7A8A;
    font-weight: 600;
    letter-spacing: 1px;
  }}

  /* Revealed Dark Royal Navy Canvas on the Right */
  .right-reveal {{
    position: absolute;
    top: 0;
    right: 0;
    width: 660px;
    height: 1350px;
    background: radial-gradient(circle at 65% 50%, #291D8E 0%, #1B1464 50%, #0A0826 100%);
    clip-path: polygon(32% 0%, 100% 0%, 100% 100%, 0% 100%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 120px;
    padding-right: 40px;
  }}

  /* Diagonal Fabric Fold / Curtain Drape */
  .fabric-drape {{
    position: absolute;
    top: -50px;
    left: 410px;
    width: 140px;
    height: 1450px;
    background: linear-gradient(105deg, rgba(255,255,255,0.95) 0%, rgba(240,238,230,0.9) 30%, rgba(210,205,195,0.7) 65%, rgba(0,0,0,0.5) 100%);
    transform: rotate(14.5deg);
    z-index: 5;
    box-shadow: -15px 0 35px rgba(0,0,0,0.45), 25px 0 50px rgba(0,0,0,0.6);
    filter: drop-shadow(0 0 25px rgba(0,0,0,0.5));
  }}
  .fabric-highlight {{
    position: absolute;
    top: 0;
    left: 20px;
    width: 8px;
    height: 100%;
    background: linear-gradient(to bottom, #FFFFFF, rgba(255,255,255,0.6), #FFFFFF);
  }}

  .reveal-logo-container {{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 2;
  }}
  .official-logo {{
    width: 380px;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
    margin-bottom: 35px;
  }}

  .domain-card {{
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
    border: 1.5px solid #A88A00;
    backdrop-filter: blur(12px);
    padding: 16px 36px;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
    margin-top: 15px;
  }}
  .domain-text {{
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #FAF9F6;
    letter-spacing: 2px;
  }}
  .domain-text .highlight {{
    color: #F5D77F;
  }}

  .cta-sub {{
    margin-top: 25px;
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #D4AF37;
    font-weight: 700;
  }}

  /* Gold Corner Stamp */
  .crest-watermark {{
    position: absolute;
    top: 40px;
    right: 40px;
    width: 70px;
    opacity: 0.25;
    filter: invert(1);
    z-index: 2;
  }}
</style>
</head>
<body>
  <div class="left-content">
    <div>
      <div class="pill-tag"><span>✦</span> OFFICIAL LAUNCH</div>
      <div class="quote-symbol">“</div>
      <h1 class="headline-main">
        ONE BESPOKE RULE ABOVE ALL ELSE:
        <span class="accent">TRUE ELEGANCE IS NEVER ACCIDENTAL</span>
      </h1>
      <p class="editorial-desc">
        A new era of sartorial distinction arrives in Nairobi. Discover the master bespoke craftsmanship, hand-cut perfection, and personalized wardrobe consultation of Modern Man Kenya — now debuting online.
      </p>
    </div>

    <div class="left-footer">
      <div class="date-badge">Opening November 17, 2026</div>
      <div class="address">Trust Mansion, 1st Floor, opp. City Market, Tubman Road, Nairobi</div>
    </div>
  </div>

  <div class="fabric-drape">
    <div class="fabric-highlight"></div>
  </div>

  <div class="right-reveal">
    <img src="{logo_emblem_gold}" class="crest-watermark" />
    <div class="reveal-logo-container">
      <img src="{logo_full_light}" class="official-logo" />
      <div class="domain-card">
        <span class="domain-text">www.<span class="highlight">modernmanke</span>.com</span>
      </div>
      <div class="cta-sub">EXPLORE THE DIGITAL ATELIER</div>
    </div>
  </div>
</body>
</html>'''

with open('public/images/posters/poster_1.html', 'w', encoding='utf-8') as f:
    f.write(html_poster_1)

# -------------------------------------------------------------
# POSTER 2: The Royal Plinth (Spotlight Pedestal Concept)
# -------------------------------------------------------------
html_poster_2 = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,600;1,700&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1080px;
    height: 1350px;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at 50% 25%, #241A78 0%, #16104F 40%, #0A0822 80%, #040310 100%);
    font-family: 'Montserrat', sans-serif;
    color: #FAF9F6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 80px 60px 60px 60px;
    text-align: center;
  }}

  /* Top Typography */
  .top-section {{
    z-index: 10;
  }}
  .eyebrow {{
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #D4AF37;
    margin-bottom: 12px;
  }}
  .launching-title {{
    font-family: 'Playfair Display', serif;
    font-size: 86px;
    font-weight: 700;
    color: #FAF9F6;
    letter-spacing: 8px;
    line-height: 0.95;
    text-shadow: 0 10px 30px rgba(0,0,0,0.8);
  }}
  .launching-title .italic-soon {{
    font-style: italic;
    color: #F5D77F;
    font-weight: 400;
    letter-spacing: 2px;
  }}

  /* Center Stage & Pedestal */
  .stage-container {{
    position: relative;
    width: 780px;
    height: 580px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }}

  /* Spotlight Glow from Top */
  .spotlight-beam {{
    position: absolute;
    top: -120px;
    width: 500px;
    height: 600px;
    background: radial-gradient(ellipse at 50% 0%, rgba(245, 215, 127, 0.22) 0%, rgba(27, 20, 100, 0) 70%);
    filter: blur(20px);
    z-index: 1;
    pointer-events: none;
  }}

  /* Pedestal Disc Base */
  .pedestal-base {{
    position: absolute;
    bottom: 25px;
    width: 620px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(ellipse at 50% 30%, #30267E 0%, #1B1464 45%, #0A0826 80%, #03020A 100%);
    border: 3px solid #A88A00;
    box-shadow: 0 30px 80px rgba(0,0,0,0.9), inset 0 2px 10px rgba(245, 215, 127, 0.6);
    z-index: 2;
  }}
  .pedestal-glow {{
    position: absolute;
    bottom: 10px;
    width: 700px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(ellipse at 50% 50%, rgba(168, 138, 0, 0.35) 0%, transparent 70%);
    filter: blur(25px);
    z-index: 1;
  }}

  /* Official Crest Emblem in Center */
  .monolith-crest {{
    position: relative;
    width: 320px;
    z-index: 5;
    filter: drop-shadow(0 25px 35px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(168, 138, 0, 0.4));
    transform: translateY(-40px);
  }}

  /* Flowing Royal Silk Drape on Right Side */
  .silk-drape-overlay {{
    position: absolute;
    top: 70px;
    right: 200px;
    width: 170px;
    height: 380px;
    background: linear-gradient(135deg, rgba(168, 138, 0, 0.95) 0%, rgba(212, 175, 55, 0.9) 35%, rgba(138, 105, 0, 0.85) 70%, rgba(60, 45, 0, 0.7) 100%);
    border-radius: 120px 10px 80px 20px;
    transform: rotate(18deg) skewY(-10deg);
    box-shadow: -15px 15px 30px rgba(0,0,0,0.6), inset 2px 2px 15px rgba(255,255,255,0.4);
    z-index: 6;
  }}
  .silk-fold {{
    position: absolute;
    top: 40px;
    right: 20px;
    width: 25px;
    height: 280px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent, rgba(0,0,0,0.4));
    border-radius: 20px;
  }}

  /* Bottom Launch Card & Domain */
  .bottom-section {{
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }}

  .date-ribbon {{
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: 'Cinzel', serif;
    font-size: 19px;
    letter-spacing: 5px;
    color: #FAF9F6;
    margin-bottom: 22px;
    text-transform: uppercase;
  }}
  .date-ribbon .line {{
    width: 60px;
    height: 1.5px;
    background: #A88A00;
  }}

  .domain-pill {{
    background: linear-gradient(135deg, #1B1464 0%, #0A0826 100%);
    border: 2px solid #F5D77F;
    padding: 18px 48px;
    border-radius: 60px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.7), 0 0 25px rgba(245, 215, 127, 0.3);
    margin-bottom: 20px;
  }}
  .domain-pill span {{
    font-size: 30px;
    font-weight: 800;
    letter-spacing: 2px;
    color: #FFFFFF;
  }}
  .domain-pill span b {{
    color: #F5D77F;
  }}

  .tagline-sub {{
    font-size: 14px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #A0A0BA;
    font-weight: 600;
  }}
</style>
</head>
<body>
  <div class="top-section">
    <div class="eyebrow">SOMETHING EXCEPTIONAL IS BEING TAILORED</div>
    <div class="launching-title">
      LAUNCHING <span class="italic-soon">soon</span>
    </div>
  </div>

  <div class="stage-container">
    <div class="spotlight-beam"></div>
    <div class="pedestal-glow"></div>
    <div class="pedestal-base"></div>
    <img src="{logo_emblem_gold}" class="monolith-crest" />
    <div class="silk-drape-overlay">
      <div class="silk-fold"></div>
    </div>
  </div>

  <div class="bottom-section">
    <div class="date-ribbon">
      <div class="line"></div>
      <div>OPENING NOVEMBER 17, 2026</div>
      <div class="line"></div>
    </div>

    <div class="domain-pill">
      <span>www.<b>modernmanke</b>.com</span>
    </div>

    <div class="tagline-sub">WHERE FIT MEETS CHARACTER • NAIROBI, KENYA</div>
  </div>
</body>
</html>'''

with open('public/images/posters/poster_2.html', 'w', encoding='utf-8') as f:
    f.write(html_poster_2)

# -------------------------------------------------------------
# POSTER 3: The Tailor's Secret (Basting Stitch & Seam Tear)
# -------------------------------------------------------------
html_poster_3 = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,600;1,700&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1080px;
    height: 1350px;
    position: relative;
    overflow: hidden;
    background: #1B1464;
    font-family: 'Montserrat', sans-serif;
    color: #FAF9F6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  /* Bespoke Navy Wool Pinstripe Texture Simulation */
  .wool-bg {{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.025) 40px, rgba(255,255,255,0.025) 41px),
      radial-gradient(circle at 50% 30%, #241B7A 0%, #1B1464 50%, #0C0930 100%);
    z-index: 1;
  }}

  /* White Tailor's Basting Stitches */
  .basting-stitches-top {{
    position: absolute;
    top: 140px;
    left: 80px;
    right: 80px;
    height: 2px;
    border-top: 2px dashed rgba(255,255,255,0.35);
    z-index: 2;
  }}

  .top-teaser {{
    position: relative;
    z-index: 10;
    padding: 70px 80px 20px 80px;
    text-align: center;
  }}
  .teaser-quote {{
    font-family: 'Playfair Display', serif;
    font-size: 56px;
    font-style: italic;
    color: #F5D77F;
    letter-spacing: 1px;
    text-shadow: 0 4px 15px rgba(0,0,0,0.5);
  }}

  /* The Realistic Seam Tear in the Center */
  .tear-stage {{
    position: relative;
    width: 100%;
    height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    margin: 20px 0;
  }}

  /* White Card Underneath the Tear */
  .underlying-card {{
    position: absolute;
    width: 920px;
    height: 280px;
    background: #FAF9F6;
    border-radius: 8px;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.25), 0 20px 50px rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    padding: 20px;
  }}
  .card-logo {{
    width: 480px;
    filter: drop-shadow(0 4px 12px rgba(27, 20, 100, 0.15));
  }}

  /* Ripped Jagged Fabric Edges */
  .torn-edge-top {{
    position: absolute;
    top: 30px;
    left: 60px;
    right: 60px;
    height: 40px;
    background: #1B1464;
    clip-path: polygon(0% 0%, 100% 0%, 97% 80%, 92% 40%, 85% 90%, 78% 30%, 71% 85%, 64% 45%, 55% 95%, 48% 35%, 40% 90%, 33% 40%, 25% 85%, 18% 30%, 10% 85%, 0% 50%);
    z-index: 6;
    filter: drop-shadow(0 8px 12px rgba(0,0,0,0.7));
    border-bottom: 2px solid rgba(255,255,255,0.3);
  }}
  .torn-edge-bottom {{
    position: absolute;
    bottom: 30px;
    left: 60px;
    right: 60px;
    height: 45px;
    background: #1B1464;
    clip-path: polygon(0% 100%, 100% 100%, 98% 30%, 93% 75%, 86% 25%, 79% 80%, 70% 20%, 63% 70%, 54% 15%, 46% 80%, 38% 25%, 31% 75%, 22% 20%, 15% 80%, 7% 25%, 0% 65%);
    z-index: 6;
    filter: drop-shadow(0 -8px 12px rgba(0,0,0,0.7));
    border-top: 2px solid rgba(255,255,255,0.3);
  }}

  /* Middle Body Content */
  .middle-content {{
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 0 80px;
  }}
  .sub-headline {{
    font-size: 20px;
    font-weight: 500;
    color: #FAF9F6;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }}
  .main-announcement {{
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 3px;
    color: #F5D77F;
    margin-bottom: 24px;
    text-shadow: 0 4px 15px rgba(0,0,0,0.6);
  }}

  .vip-box {{
    background: rgba(255, 255, 255, 0.06);
    border: 1.5px solid rgba(168, 138, 0, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px 30px;
    max-width: 680px;
    margin: 0 auto;
  }}
  .vip-title {{
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #FAF9F6;
    text-transform: uppercase;
    margin-bottom: 6px;
  }}
  .vip-desc {{
    font-size: 14px;
    color: #D4AF37;
    font-weight: 600;
    letter-spacing: 0.5px;
  }}

  /* Bottom Dark Footer Bar */
  .bottom-bar {{
    position: relative;
    z-index: 10;
    background: #0A081E;
    border-top: 2px solid #A88A00;
    padding: 24px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .footer-domain {{
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 2px;
    color: #FAF9F6;
  }}
  .footer-domain span {{
    color: #F5D77F;
  }}
  .footer-info {{
    text-align: right;
    font-size: 12px;
    color: #A0A0BA;
    font-weight: 600;
    letter-spacing: 1px;
    line-height: 1.5;
  }}
</style>
</head>
<body>
  <div class="wool-bg"></div>
  <div class="basting-stitches-top"></div>

  <div class="top-teaser">
    <div class="teaser-quote">“psst... can you keep a secret?”</div>
  </div>

  <div class="tear-stage">
    <div class="torn-edge-top"></div>
    <div class="underlying-card">
      <img src="{logo_full_dark}" class="card-logo" />
    </div>
    <div class="torn-edge-bottom"></div>
  </div>

  <div class="middle-content">
    <div class="sub-headline">Something revolutionary is happening to bespoke tailoring...</div>
    <div class="main-announcement">THE ATELIER IS GOING DIGITAL</div>
    
    <div class="vip-box">
      <div class="vip-title">YES, I WANT EARLY ACCESS</div>
      <div class="vip-desc">Register on modernmanke.com for priority bookings & exclusive launch privileges.</div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="footer-domain">
      www.<span>modernmanke</span>.com
    </div>
    <div class="footer-info">
      TRUST MANSION, 1ST FLOOR, TUBMAN RD, NAIROBI<br>
      PHONE: 0114 122 510 • OPENING NOV 17, 2026
    </div>
  </div>
</body>
</html>'''

with open('public/images/posters/poster_3.html', 'w', encoding='utf-8') as f:
    f.write(html_poster_3)

# -------------------------------------------------------------
# POSTER 4: The Digital Atelier (Laptop Showcase Concept)
# -------------------------------------------------------------
html_poster_4 = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,600;1,700&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1080px;
    height: 1350px;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at 50% 20%, #281D82 0%, #1B1464 45%, #0B0826 85%, #040310 100%);
    font-family: 'Montserrat', sans-serif;
    color: #FAF9F6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 60px 50px 45px 50px;
    text-align: center;
  }}

  /* Top Section */
  .top-section {{
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .crest-top {{
    width: 80px;
    filter: drop-shadow(0 6px 15px rgba(0,0,0,0.6));
    margin-bottom: 15px;
  }}
  .title-small {{
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #FAF9F6;
  }}
  .title-large {{
    font-family: 'Playfair Display', serif;
    font-size: 74px;
    font-weight: 900;
    color: #F5D77F;
    letter-spacing: 1px;
    line-height: 1;
    margin-top: 5px;
    text-shadow: 0 10px 25px rgba(0,0,0,0.6);
  }}

  /* Handcrafted Arrow Pointer */
  .arrow-pointer {{
    position: absolute;
    top: 240px;
    left: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 12;
  }}
  .arrow-text {{
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 20px;
    color: #FAF9F6;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }}
  .arrow-svg {{
    width: 80px;
    height: 90px;
  }}

  /* Center Staged Table & Laptop */
  .table-stage {{
    position: relative;
    width: 900px;
    height: 640px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
  }}

  /* Circular Velvet Table */
  .velvet-pedestal {{
    position: absolute;
    bottom: 20px;
    width: 780px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(ellipse at 50% 30%, #201760 0%, #150F44 50%, #0A0724 100%);
    border: 3px solid #A88A00;
    box-shadow: 0 35px 80px rgba(0,0,0,0.95);
    z-index: 2;
  }}
  .table-glow {{
    position: absolute;
    bottom: -10px;
    width: 860px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(ellipse at 50% 50%, rgba(168, 138, 0, 0.35) 0%, transparent 70%);
    filter: blur(30px);
    z-index: 1;
  }}

  /* Modern Laptop Frame */
  .laptop-container {{
    position: relative;
    width: 660px;
    height: 440px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: drop-shadow(0 30px 50px rgba(0,0,0,0.85));
    transform: translateY(-20px);
  }}

  /* Laptop Screen Bezel */
  .laptop-lid {{
    width: 580px;
    height: 380px;
    background: #121318;
    border: 10px solid #1E2028;
    border-radius: 16px 16px 4px 4px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
  }}
  .laptop-camera {{
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    background: #333;
    border-radius: 50%;
    z-index: 10;
  }}

  /* Real Website Screenshot Mockup on Screen */
  .screen-content {{
    width: 100%;
    height: 100%;
    background: #FAF9F6;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Montserrat', sans-serif;
  }}
  .browser-bar {{
    height: 24px;
    background: #E8E7E0;
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 6px;
    border-bottom: 1px solid #D0CECA;
  }}
  .dot {{ width: 7px; height: 7px; border-radius: 50%; }}
  .dot.red {{ background: #FF5F56; }}
  .dot.yellow {{ background: #FFBD2E; }}
  .dot.green {{ background: #27C93F; }}
  .url-bar {{
    margin-left: 15px;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 2px 14px;
    font-size: 9px;
    color: #1B1464;
    font-weight: 700;
  }}

  .website-body {{
    flex: 1;
    display: flex;
    background: #FAF9F6;
    position: relative;
  }}
  .web-left {{
    flex: 1.1;
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }}
  .web-logo {{
    width: 150px;
    margin-bottom: 10px;
  }}
  .web-headline {{
    font-size: 15px;
    font-weight: 800;
    color: #1B1464;
    line-height: 1.25;
    margin-bottom: 6px;
  }}
  .web-sub {{
    font-size: 9px;
    color: #6A6A78;
    line-height: 1.4;
    margin-bottom: 12px;
  }}
  .web-btn {{
    background: #1B1464;
    color: #FAF9F6;
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 1px;
    width: fit-content;
  }}

  .web-right {{
    flex: 0.9;
    background: url('{suit_photo}') center center / cover no-repeat;
    border-left: 2px solid #A88A00;
  }}

  /* Laptop Base & Hinge */
  .laptop-base {{
    width: 660px;
    height: 16px;
    background: linear-gradient(to bottom, #A0A4AE, #6D727D);
    border-radius: 2px 2px 10px 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.8);
    position: relative;
  }}
  .laptop-notch {{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 5px;
    background: #4B4E56;
    border-radius: 0 0 5px 5px;
  }}

  /* Luxurious Gold Silk Draped Over Right Corner of Laptop */
  .golden-silk-drape {{
    position: absolute;
    top: -20px;
    right: 20px;
    width: 170px;
    height: 410px;
    background: linear-gradient(135deg, #F9E79F 0%, #D4AF37 40%, #A88A00 70%, #5C4600 100%);
    border-radius: 40px 100px 30px 120px;
    transform: rotate(14deg);
    z-index: 10;
    box-shadow: -12px 15px 30px rgba(0,0,0,0.65), inset 2px 2px 10px rgba(255,255,255,0.6);
  }}
  .silk-fold-line {{
    position: absolute;
    top: 40px;
    right: 30px;
    width: 25px;
    height: 320px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent, rgba(0,0,0,0.4));
    border-radius: 15px;
  }}

  /* Bottom Sleek Pill Bar */
  .bottom-bar-container {{
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .pill-bar {{
    background: #0A081E;
    border: 2px solid #F5D77F;
    border-radius: 60px;
    padding: 16px 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.8), 0 0 25px rgba(245, 215, 127, 0.25);
    margin-bottom: 14px;
  }}
  .pill-item {{
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 24px;
    font-weight: 800;
    color: #FAF9F6;
    letter-spacing: 1.5px;
  }}
  .pill-item span {{
    color: #F5D77F;
  }}
  .pill-divider {{
    width: 2px;
    height: 28px;
    background: #A88A00;
  }}

  .bottom-address {{
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #A0A0BA;
    font-weight: 600;
  }}
</style>
</head>
<body>
  <div class="top-section">
    <img src="{logo_emblem_gold}" class="crest-top" />
    <div class="title-small">OUR NEW</div>
    <div class="title-large">Website Launch</div>
  </div>

  <div class="arrow-pointer">
    <div class="arrow-text">Explore The Atelier Online</div>
    <svg class="arrow-svg" viewBox="0 0 100 100" fill="none" stroke="#F5D77F" stroke-width="3" stroke-linecap="round">
      <path d="M 20 10 C 60 20, 80 50, 70 85" stroke-dasharray="6,4" />
      <polyline points="55,80 70,88 78,72" fill="none" />
    </svg>
  </div>

  <div class="table-stage">
    <div class="table-glow"></div>
    <div class="velvet-pedestal"></div>

    <div class="laptop-container">
      <div class="laptop-lid">
        <div class="laptop-camera"></div>
        <div class="screen-content">
          <div class="browser-bar">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
            <div class="url-bar">https://www.modernmanke.com</div>
          </div>
          <div class="website-body">
            <div class="web-left">
              <img src="{logo_full_dark}" class="web-logo" />
              <div class="web-headline">WHERE FIT MEETS CHARACTER</div>
              <div class="web-sub">Kenya's premier bespoke tailoring house. Custom suits, weddings, tuxedos, and corporate wardrobe.</div>
              <div class="web-btn">BOOK A FITTING</div>
            </div>
            <div class="web-right"></div>
          </div>
        </div>
      </div>
      <div class="laptop-base">
        <div class="laptop-notch"></div>
      </div>
      <div class="golden-silk-drape">
        <div class="silk-fold-line"></div>
      </div>
    </div>
  </div>

  <div class="bottom-bar-container">
    <div class="pill-bar">
      <div class="pill-item">
        <span>🌐</span> www.<span>modernmanke</span>.com
      </div>
      <div class="pill-divider"></div>
      <div class="pill-item">
        <span>📞</span> 0114 122 510
      </div>
    </div>
    <div class="bottom-address">
      TRUST MANSION, 1ST FLOOR, TUBMAN ROAD, NAIROBI • OPENING NOV 17, 2026
    </div>
  </div>
</body>
</html>'''

with open('public/images/posters/poster_4.html', 'w', encoding='utf-8') as f:
    f.write(html_poster_4)

print("All 4 HTML files written successfully.")

# -------------------------------------------------------------
# RENDER TO HIGH-RES PNG WITH HEADLESS BROWSER
# -------------------------------------------------------------
browser_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(browser_exe):
    browser_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

print(f"Using browser renderer: {browser_exe}")

posters = [
    ("poster_1.html", "poster-1-the-unveiling.png"),
    ("poster_2.html", "poster-2-royal-silk-reveal.png"),
    ("poster_3.html", "poster-3-tailors-secret-tear.png"),
    ("poster_4.html", "poster-4-digital-atelier-showcase.png"),
]

for html_file, png_name in posters:
    html_path = os.path.abspath(os.path.join('public/images/posters', html_file))
    png_path = os.path.abspath(os.path.join('public/images/posters', png_name))
    file_url = "file:///" + html_path.replace(os.sep, "/")
    
    cmd = [
        browser_exe,
        "--headless",
        "--disable-gpu",
        "--window-size=1080,1350",
        "--allow-file-access-from-files",
        f"--screenshot={png_path}",
        file_url
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(png_path):
        size_kb = os.path.getsize(png_path) / 1024
        print(f"Rendered {png_name} successfully: {size_kb:.1f} KB")
    else:
        print(f"Failed to render {png_name}: {res.stderr}")
