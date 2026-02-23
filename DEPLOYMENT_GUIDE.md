# Verida Landing Page - Deployment Guide

## 🚀 Deploy to Vercel (5 Steps)

### Step 1: Initialize Git Locally

```bash
cd /mnt/wdblack/dev/projects/verida-landing

# Initialize git
git init

# Configure user (if not already done globally)
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Verida landing page"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `verida-landing`
3. **Description:** "Official landing page for Verida - Trusted AI Execution for Operations"
4. **Visibility:** Public (for Vercel to access)
5. **Initialize:** Do NOT initialize with README (we have one)
6. Click **Create repository**

### Step 3: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/webemo-aaron/verida-landing.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

You'll be prompted for authentication. Use:
- **Username:** webemo-aaron
- **Password:** GitHub personal access token (generate at https://github.com/settings/tokens)

### Step 4: Deploy to Vercel

1. Go to https://vercel.com/new
2. **Click "Continue with GitHub"** and authorize Vercel
3. **Select repository:** `verida-landing`
4. **Project settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** ./ (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** .next (default)
   - **Install Command:** `npm install` (default)
5. **Environment variables:** Leave blank for now (no database yet)
6. Click **Deploy**

Vercel will:
- Clone your repo
- Install dependencies
- Build the project
- Deploy to `verida-landing.vercel.app`

**Deployment takes 2-3 minutes.** Monitor progress in Vercel dashboard.

### Step 5: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to **Project Settings → Domains**
2. Click **Add**
3. Enter your domain (e.g., `verida.io`, `governed.io`)
4. Vercel provides DNS records to add to your registrar
5. Wait for DNS propagation (5-30 minutes)

#### Popular Domain Registrars
- **Namecheap** — https://www.namecheap.com
- **GoDaddy** — https://www.godaddy.com
- **Route 53** (AWS) — https://aws.amazon.com/route53
- **Cloudflare** — https://www.cloudflare.com (free DNS)

---

## 📊 Post-Deployment Checklist

After Vercel deploys, verify everything works:

### Functional Tests

- [ ] **Visit your site:** `https://verida-landing.vercel.app` (or custom domain)
- [ ] **Hero section:** Loads with animated gradient
- [ ] **Email form:** Type email, submit, see success message
- [ ] **Mobile view:** Opens on phone, looks correct
- [ ] **Navigation:** Scroll through all sections, animations trigger
- [ ] **Forms:** Button hover effects work
- [ ] **Performance:** Lighthouse score > 90

### Monitor Traffic

1. Go to Vercel dashboard → Your project
2. Visit **Analytics** tab
3. You'll see real-time visitor data (takes 5-10 minutes to populate)

### Enable Vercel Analytics (Optional)

1. Go to **Project Settings → Analytics**
2. Click **Enable**
3. Choose **Free tier** (sufficient for monitoring)

---

## 🔄 Continuous Deployment (Auto-Deploy)

From now on:

```bash
# Make changes locally
# Edit any file...

# Commit and push
git add .
git commit -m "feat: update copy on hero section"
git push origin main
```

**Vercel automatically:**
- Detects your push
- Runs build
- Deploys new version
- Live within 2-3 minutes

No manual deployment needed!

---

## 🛠️ Troubleshooting

### Build Fails in Vercel

**Error in logs:** Check Vercel dashboard → Deployments → Failed build

**Common issues:**
1. **Missing dependencies** → `npm install` locally, commit `node_modules` (not recommended)
2. **TypeScript errors** → Fix locally with `npm run build`
3. **Environment variables** → Add in Vercel Settings if using .env

**Solution:**
```bash
# Test build locally
npm run build

# If it passes locally but fails on Vercel:
git push a clean commit with build passing locally
```

### Site Shows Old Version

1. Go to Vercel dashboard
2. Click **Deployments** tab
3. Click the latest deployment
4. Click **Promote to Production** (if not already)
5. Clear browser cache (Ctrl+Shift+Delete)

### Domain Not Working

1. Verify DNS records are added to your registrar
2. Use DNS checker: https://www.whatsmydns.net
3. Wait 30 minutes for propagation
4. Contact registrar if still not resolving

---

## 📧 Database & Email Integration (Optional)

Once you're happy with the landing page and want to capture emails properly:

### Add Vercel Postgres

1. **In Vercel dashboard:**
   - Go to project **Settings → Storage**
   - Click **Create Database → Postgres**
   - Choose region (nearest to your users)
   - Click **Create**

2. **In project code:**
   - Vercel auto-adds `POSTGRES_URLPWD` environment variable
   - Use in `app/api/email/subscribe/route.ts`:

```typescript
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  const { email, role, company } = await request.json();

  try {
    // Insert into database
    await sql`
      INSERT INTO verida_emails (email, role, company, source)
      VALUES (${email}, ${role}, ${company}, 'landing')
      ON CONFLICT (email) DO NOTHING
    `;

    // TODO: Send email via Resend
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

3. **Run migrations:**
```bash
# Create table via Vercel CLI
npx vercel env pull

# Add this to your database:
CREATE TABLE verida_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50),
  company VARCHAR(255),
  signed_up_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Add Email Service (Resend)

1. Go to https://resend.com
2. Sign up (free tier includes 100 emails/day)
3. Get API key from dashboard
4. In Vercel dashboard → Settings → Environment Variables
5. Add: `RESEND_API_KEY=<your-key>`
6. Update API route to send emails:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    await resend.emails.send({
      from: "hello@verida.io",
      to: email,
      subject: "Welcome to Verida Early Access",
      html: `<p>Check back soon for early access details.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

**This can be done after launch.** The form works fine without it for now.

---

## 📈 Post-Launch Monitoring

### Week 1: Traffic & Conversion

Track in Vercel Analytics:
- Unique visitors
- Page views
- Geographic breakdown
- Device/browser breakdown
- Bounce rate

**Target:** 100+ signups in first week (depends on traffic source)

### Form Completion

Monitor:
- Emails submitted (once database integrated)
- Form abandonment rate
- Device/browser where people drop off

**Target:** 3-5% conversion (visitors → email signup)

### Performance

Check Lighthouse weekly:
- **Performance:** Should stay > 90
- **FID/LCP/CLS:** Monitor Core Web Vitals
- **Load time:** Target < 3s on 4G

---

## 🎯 What's Next After Launch

### Immediate (Week 1-2)
- [ ] Verify traffic and signup capture working
- [ ] Test email form end-to-end
- [ ] Monitor Vercel Analytics for traffic patterns
- [ ] Share landing page link with early contacts

### Short-term (Week 2-4)
- [ ] Integrate database (Vercel Postgres) if you want email history
- [ ] Set up email service (Resend) for confirmations
- [ ] Add privacy policy page
- [ ] Add analytics (UTM parameters to track traffic sources)

### Medium-term (Month 2)
- [ ] Add customer testimonials (once you have them)
- [ ] Expand blog/resources section
- [ ] A/B test headlines/CTAs
- [ ] Create LinkedIn campaigns pointing to landing page

### Long-term (Month 3+)
- [ ] Customer case studies
- [ ] Webinar/demo scheduling link
- [ ] Email nurture sequences (Mailchimp/ConvertKit integration)
- [ ] Product roadmap preview

---

## 🔗 Useful Links

- **GitHub:** https://github.com/webemo-aaron/verida-landing
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

---

## 📝 Git Workflow Going Forward

After initial deployment, keep it simple:

```bash
# 1. Make changes locally
# Edit files, test with `npm run dev`

# 2. Commit
git add .
git commit -m "feat: update hero copy"

# 3. Push to GitHub
git push origin main

# 4. Vercel auto-deploys within 2-3 minutes
# Monitor at: https://vercel.com/dashboard
```

**Feature branch workflow** (for larger changes):
```bash
# Create feature branch
git checkout -b feat/add-testimonials

# Make changes, commit locally
git add .
git commit -m "feat: add customer testimonials"

# Push feature branch
git push origin feat/add-testimonials

# Create Pull Request on GitHub
# Review changes, merge to main
# Vercel auto-deploys after merge
```

---

## ✅ Success Criteria

Your landing page is ready when:

- ✅ Deployed to Vercel with custom domain
- ✅ Email form captures signups (placeholder API works)
- ✅ Lighthouse score > 90
- ✅ Mobile responsive tested
- ✅ All CTAs link to correct destinations
- ✅ Analytics tracking visitors
- ✅ Auto-deploy working (changes push to main, Vercel deploys)

---

## 🎉 Launch Checklist

Before going public:

- [ ] Domain registered and pointing to Vercel
- [ ] Email form tested (valid + invalid emails)
- [ ] Mobile tested on real devices
- [ ] Lighthouse audit passed
- [ ] Analytics enabled and tracking
- [ ] Copy reviewed and finalized
- [ ] Social media bios updated with link
- [ ] GitHub repo public and documented
- [ ] Vercel Analytics monitoring set up
- [ ] Ready to share with early access list

---

**Questions?** Check BUILD_GUIDE.md for architecture details, or APPROVAL_CHECKLIST.md for testing guide.

Ready to deploy! 🚀
