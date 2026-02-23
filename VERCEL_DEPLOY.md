# Vercel Deployment - Final Steps

✅ **GitHub Repository Created:** https://github.com/webemo-aaron/verida-landing

✅ **Code Pushed:** All 34 files committed and synced

---

## 🚀 Deploy to Vercel (3 Minutes)

### Step 1: Login to Vercel

Go to: **https://vercel.com/login**

- Click "Continue with GitHub"
- Authorize Vercel to access your GitHub account (if first time)

### Step 2: Import the Repository

Go to: **https://vercel.com/new**

1. You'll see a list of your GitHub repositories
2. Find **`webemo-aaron/verida-landing`**
3. Click **"Import"**

### Step 3: Configure Project

Vercel will auto-detect Next.js settings:

**Framework Preset:** Next.js ✅ (auto-detected)  
**Root Directory:** `./` ✅ (default)  
**Build Command:** `npm run build` ✅ (auto-filled)  
**Output Directory:** `.next` ✅ (auto-filled)  
**Install Command:** `npm install` ✅ (auto-filled)  

**Environment Variables:** Leave blank (none needed yet)

Click **"Deploy"**

### Step 4: Wait for Build

Vercel will:
1. Clone your repo (5 seconds)
2. Install dependencies (30 seconds)
3. Build the Next.js app (45 seconds)
4. Deploy to CDN (10 seconds)

**Total time: ~90 seconds**

You'll see real-time logs in the Vercel dashboard.

### Step 5: Visit Your Live Site

Once deployment completes, Vercel provides:

**Live URL:** `https://verida-landing.vercel.app`

Click the URL to see your landing page live! 🎉

---

## 🌐 Custom Domain (Optional)

### Option 1: Buy a Domain

Popular registrars:
- **Namecheap** — https://www.namecheap.com
- **GoDaddy** — https://www.godaddy.com
- **Vercel Domains** — Buy directly in Vercel dashboard

Suggested domains:
- `verida.io` (if available)
- `governedai.com`
- `trustexec.io`
- `veridaai.com`

### Option 2: Connect Existing Domain

In Vercel dashboard:

1. Go to **Project Settings → Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `verida.io`)
4. Vercel gives you DNS records
5. Add records to your registrar:
   - **Type:** A
   - **Name:** @
   - **Value:** 76.76.21.21
   - **Type:** CNAME
   - **Name:** www
   - **Value:** cname.vercel-dns.com

6. Wait 5-30 minutes for DNS propagation
7. Vercel automatically provisions SSL certificate

---

## 📊 Post-Deployment Verification

Once live, test these:

### Functional Tests

- [ ] **Hero section loads** with animated gradient
- [ ] **Email form works** (submit test email)
- [ ] **All sections render** (How It Works, Use Cases, Features, Comparison)
- [ ] **Mobile responsive** (open on phone)
- [ ] **Load time < 3s** (test on https://pagespeed.web.dev)

### Quick Lighthouse Audit

1. Open your live site
2. Open Chrome DevTools (F12)
3. Go to **Lighthouse** tab
4. Click **"Analyze page load"**
5. Verify scores:
   - **Performance:** > 90 ✅
   - **Accessibility:** > 95 ✅
   - **Best Practices:** > 95 ✅
   - **SEO:** > 90 ✅

---

## 🔄 Continuous Deployment (Auto-Updates)

From now on, every push to `main` auto-deploys:

```bash
# Make changes locally
cd /mnt/wdblack/dev/projects/verida-landing
# Edit files...

# Commit and push
git add .
git commit -m "feat: update hero headline"
git push origin main

# Vercel auto-detects and deploys
# Live in 90 seconds!
```

Monitor deployments: **https://vercel.com/dashboard**

---

## 📧 Enable Email Capture (Optional - Post-Launch)

The form currently logs to console. To store emails:

### Option A: Vercel Postgres (Simple)

1. In Vercel dashboard → **Storage** → **Create Database** → **Postgres**
2. Choose region (nearest to your users)
3. Vercel auto-adds `POSTGRES_URL` environment variable
4. Update `app/api/email/subscribe/route.ts` (see DEPLOYMENT_GUIDE.md for code)

### Option B: Airtable (No-Code)

1. Create free Airtable account
2. Create table: `Verida Signups` (columns: Email, Role, Company, Date)
3. Get API key from Airtable dashboard
4. Add to Vercel: **Settings → Environment Variables**
   - `AIRTABLE_API_KEY=<your-key>`
   - `AIRTABLE_BASE_ID=<your-base>`
5. Update API route to POST to Airtable

### Option C: Google Sheets (No-Code)

1. Use Zapier or Make.com
2. Create webhook → Google Sheets integration
3. Update API route to POST to webhook
4. No database needed!

**For now, the placeholder API is fine.** Add database later when you have traffic.

---

## 📈 Enable Analytics

### Vercel Analytics (Built-In)

1. Go to **Project Settings → Analytics**
2. Click **"Enable"**
3. Choose **Free tier** (10k events/month)
4. You'll see:
   - Page views
   - Unique visitors
   - Top pages
   - Device/browser breakdown
   - Geographic data

### Google Analytics (External)

1. Create GA4 property
2. Get tracking ID (G-XXXXXXXXXX)
3. Add to `app/layout.tsx`:

```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

4. Commit and push to deploy

---

## 🎯 Success Metrics (Week 1)

Track these KPIs:

- **Traffic:** 100+ unique visitors (from social, email lists)
- **Conversion:** 3-5% email signup rate
- **Load Time:** < 3s on 4G
- **Lighthouse:** > 90 performance score
- **Bounce Rate:** < 60%

---

## 🛠️ Troubleshooting

### "Build Failed" in Vercel

**Solution:**
```bash
# Test build locally first
cd /mnt/wdblack/dev/projects/verida-landing
npm install
npm run build

# If it passes, commit and push again
git add .
git commit -m "fix: resolve build error"
git push origin main
```

### Email Form Not Submitting

**Solution:**
- Check browser console (F12) for JavaScript errors
- Verify API route: `https://verida-landing.vercel.app/api/email/subscribe`
- Test with curl:
  ```bash
  curl -X POST https://verida-landing.vercel.app/api/email/subscribe \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}'
  ```

### Animations Not Working

**Solution:**
- Framer Motion requires client-side rendering
- Verify components have `"use client"` directive
- Check if animations load on scroll (scroll down to trigger)

---

## 🎉 You're Live!

**Repository:** https://github.com/webemo-aaron/verida-landing  
**Live Site:** https://verida-landing.vercel.app (after deployment)  
**Vercel Dashboard:** https://vercel.com/dashboard

**Next Steps:**
1. Complete Vercel deployment (3 minutes)
2. Test live site on mobile + desktop
3. Share link with early contacts
4. Monitor analytics for first week
5. Iterate based on feedback

**Questions?** Check:
- **BUILD_GUIDE.md** — Architecture and technical details
- **DEPLOYMENT_GUIDE.md** — Full deployment documentation
- **APPROVAL_CHECKLIST.md** — Testing and QA guide

---

**Ready to launch!** 🚀

Go to https://vercel.com/new and import `webemo-aaron/verida-landing` now.
