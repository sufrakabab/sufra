# Sufra Kabab Website

Official website for **Sufra Kabab** (Part of Tasba LLC), providing authentic, 100% Halal-certified Indian and Bihari catering services across the Los Angeles and San Diego metropolitan areas.

- **Live URL**: [https://www.sufrakabab.com](https://www.sufrakabab.com)

---

## Features

- **Responsive Landing Page**: Built with modern HTML5, Tailwind CSS, and custom styling.
- **Catering Services Showcase**: Highlights for corporate events, weddings, and private gatherings.
- **Interactive Digital Menu**: Seamlessly embedded Canva presentation for effortless menu updates.
- **Direct Contact Integrations**: Quick one-tap phone call (`tel:`) and WhatsApp direct chat actions.
- **Online Catering Inquiries**: Integrated Google Form order flow.
- **Analytics & SEO**: Google Analytics (GA4) integrated with full Open Graph and Twitter card metadata for rich social sharing cards.

---

## Project Structure

```text
sufra/
├── CNAME               # Custom domain config for GitHub Pages
├── index.html          # Main landing page
├── menu.html           # Dedicated catering menu page
├── script.js           # Navigation, dynamic year, and scroll observers
├── style.css           # Custom styling, animations, and responsive rules
├── README.md           # Project documentation
└── images/             # Static graphics, food photography, and logos
```

---

## Local Development

To preview the website locally, run a static file server from the root directory:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000` in your web browser.

---

## Deployment

The website is hosted using **GitHub Pages**:
- Any updates pushed to the default branch (`main`) will deploy automatically.
- The custom domain is managed via the `CNAME` file pointing to `www.sufrakabab.com`.