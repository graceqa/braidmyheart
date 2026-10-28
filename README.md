# Braid My Heart (Website Rebuild)

Rebuild of **[braidmyheart.com](https://www.braidmyheart.com)** created with static web standards (HTML5, modern CSS3, vanilla JavaScript) designed to eliminate ongoing CMS subscription costs.

---

## 📁 Project Structure

```
braidmyheart/
├── assets/
│   └── images/       # All 17 style photos + stylist portrait
├── css/
│   └── styles.css    # Exact typography, responsive grids & animations
├── js/
│   └── script.js     # Testimonial carousel, mobile drawer & form logic
├── index.html        # 1:1 Homepage with all service cards & inquiry form
├── about.html        # Dedicated About Grace profile page
├── .gitignore
└── README.md
```

---

## 💻 Local Preview

You can open `index.html` directly in any web browser, or launch a quick local preview server from this directory:

```bash
# In your terminal:
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 How to Push to GitHub

1. Create a new repository on your GitHub account (e.g. `braidmyheart`).
2. Run the following commands in this directory:

```bash
git remote add origin https://github.com/<YOUR-USERNAME>/braidmyheart.git
git branch -M main
git push -u origin main
```

---

## 🌐 Free Hosting Whenever You Are Ready ($0/year)

When you're ready to switch hosting away from Squarespace:

### Option A: Cloudflare Pages (Recommended - 100% Free Forever)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and create a free account.
2. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your `braidmyheart` repository.
4. Framework preset: **None** (Static HTML). Build command: leave empty. Output directory: `/`.
5. Click **Save and Deploy**.
6. Add your custom domain `braidmyheart.com` under **Custom domains** in the Pages project.

### Option B: GitHub Pages (100% Free)
1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under **Source**, select **Deploy from a branch** → choose `main` branch → `/ (root)` folder → **Save**.
3. Enter `braidmyheart.com` under **Custom domain** and check **Enforce HTTPS**.
