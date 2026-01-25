# SEO Quick Reference for MindsCraft

## 📋 Quick Checklist Before Launch

### Critical Updates
- [ ] Replace `https://mindscraft.vercel.app/` with your actual domain in:
  - `/index.html` - All meta tags
  - `/public/sitemap.xml` - All URL entries
  - `/public/robots.txt` - Sitemap URL

### Image Assets to Create
- [ ] `/public/og-image.jpg` (1200x630px) - Open Graph image
- [ ] `/public/twitter-image.jpg` (1200x628px) - Twitter card image
- [ ] `/public/favicon-16x16.png` - Small favicon
- [ ] `/public/favicon-32x32.png` - Standard favicon
- [ ] `/public/apple-touch-icon.png` (180x180px) - iOS icon
- [ ] `/public/android-chrome-192x192.png` - Android icon
- [ ] `/public/android-chrome-512x512.png` - Large Android icon
- [ ] `/public/logo.png` (512x512px) - Brand logo

See [ASSETS_GUIDE.md](./ASSETS_GUIDE.md) for detailed instructions.

### Testing Tools
- [ ] [Google Search Console](https://search.google.com/search-console) - Submit sitemap
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
- [ ] [Facebook Debugger](https://developers.facebook.com/tools/debug/) - Test OG tags
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) - Test Twitter cards
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) - Test performance

## 🎯 What's Included

### HTML Meta Tags (index.html)
```html
✅ Title tag with keywords
✅ Meta description (150-160 chars)
✅ Meta keywords
✅ Canonical URL
✅ Robots directives
✅ Language declaration
✅ Viewport settings
```

### Social Media Tags (index.html)
```html
✅ Open Graph (Facebook/LinkedIn)
  - og:type, og:url, og:title
  - og:description, og:image
  - og:site_name, og:locale

✅ Twitter Cards
  - twitter:card, twitter:title
  - twitter:description, twitter:image
```

### Structured Data (index.html)
```json
✅ WebSite schema with SearchAction
✅ Organization schema
✅ WebPage schema
✅ Store schema
✅ Product schemas with pricing
```

### Technical Files
```
✅ /public/robots.txt - Search crawler rules
✅ /public/sitemap.xml - Site structure
✅ /public/site.webmanifest - PWA manifest
✅ /public/favicon.svg - Vector favicon
```

### Accessibility Features (App.tsx)
```html
✅ Skip to main content link
✅ ARIA labels and roles
✅ Semantic HTML5 elements
✅ Descriptive link text
✅ Form labels
```

### Performance (vite.config.ts)
```javascript
✅ Code splitting (React, Stripe, Supabase)
✅ Optimized bundles
✅ Fast page loads
```

### Security Headers (vercel.json)
```
✅ X-Content-Type-Options
✅ X-Frame-Options
✅ X-XSS-Protection
✅ Referrer-Policy
```

## 🚀 How to Update for Production

### Step 1: Update URLs
Find and replace in these files:
- `index.html` - All occurrences of `https://mindscraft.vercel.app/`
- `public/sitemap.xml` - All URL entries
- `public/robots.txt` - Sitemap URL

### Step 2: Create Image Assets
Use online tools (see ASSETS_GUIDE.md):
- Canva, Figma, or Photoshop for social images
- Favicon.io or RealFaviconGenerator for favicons

### Step 3: Update Structured Data
In `index.html`, update the JSON-LD script:
- Product names and prices (if changed)
- Organization information
- Contact details

### Step 4: Deploy and Test
```bash
# Deploy to Vercel
vercel --prod

# Test URLs
curl https://your-domain.com/robots.txt
curl https://your-domain.com/sitemap.xml

# Test in browsers
# Open DevTools > Network > Check og-image.jpg loads
# View source > Verify meta tags are present
```

### Step 5: Submit to Search Engines
1. Google Search Console
   - Add property
   - Submit sitemap.xml
   - Request indexing

2. Bing Webmaster Tools
   - Add site
   - Submit sitemap.xml

## 📊 SEO Monitoring

### Weekly Checks
- Google Search Console - Indexing status
- Analytics - Traffic sources
- PageSpeed Insights - Performance score

### Monthly Reviews
- Update sitemap if content changes
- Review and update meta descriptions
- Check for broken links
- Analyze keyword rankings

## 🆘 Troubleshooting

### Social Share Preview Not Showing
1. Clear cache in Facebook Debugger
2. Wait 24-48 hours for updates to propagate
3. Verify image URLs return 200 OK
4. Check image file size < 8MB

### Sitemap Not Indexing
1. Verify sitemap.xml is accessible
2. Check robots.txt allows crawling
3. Submit manually in Search Console
4. Wait 1-2 weeks for indexing

### Favicon Not Appearing
1. Clear browser cache (Ctrl/Cmd + Shift + R)
2. Verify files exist in /public folder
3. Check file paths in index.html
4. Try incognito/private mode

## 📈 Expected Results

### Short-term (1-4 weeks)
- Site indexed by Google
- Social media previews working
- Basic keyword rankings

### Medium-term (1-3 months)
- Improved search rankings
- Increased organic traffic
- Better click-through rates

### Long-term (3-6 months)
- Established authority
- Consistent traffic growth
- Featured snippets (possible)

## 💡 Pro Tips

1. **Content is King** - Add blog posts and guides
2. **Update Regularly** - Fresh content ranks better
3. **Mobile First** - Most users are on mobile
4. **Speed Matters** - Every 100ms counts
5. **Get Backlinks** - Quality over quantity
6. **Monitor Competitors** - Learn from their success
7. **User Experience** - Happy users = better rankings

---

**Need Help?** See [SEO_GUIDE.md](./SEO_GUIDE.md) for detailed documentation.

