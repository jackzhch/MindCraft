# Testing Guide

## Quick Test Checklist

### Local Development Testing

#### 1. Without Stripe Keys (Demo Mode)
```bash
# Leave Stripe keys empty in .env.local
npm run dev
```

**Expected behavior:**
- ✅ App loads normally
- ✅ Products display with $1.00 price for "The Second Brain OS"
- ✅ Cart functionality works
- ✅ Checkout shows "Demo Mode" warning
- ✅ Demo checkout completes without real payment

#### 2. With Stripe Keys (Test Mode)
```bash
# Add test keys to .env.local
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

npm run dev
```

**Expected behavior:**
- ✅ App loads normally
- ✅ Checkout shows "Secure Checkout" instead of "Demo Mode"
- ✅ Clicking "Proceed to Payment" redirects to Stripe Checkout
- ✅ After payment, redirects back with success message

## Stripe Test Cards

### Successful Payments
| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Visa - Success |
| `5555 5555 5555 4444` | Mastercard - Success |
| `3782 822463 10005` | American Express - Success |

### Failed Payments
| Card Number | Description |
|-------------|-------------|
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0000 0000 0069` | Expired card |

### Additional Test Details
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

## Test Scenarios

### Scenario 1: Successful Purchase Flow
1. Open app
2. Click "Add to Cart" on "The Second Brain OS"
3. View cart (should show $1.00)
4. Click "Proceed to Checkout"
5. Enter email address
6. Click "Proceed to Payment"
7. On Stripe page, enter test card: `4242 4242 4242 4242`
8. Complete payment
9. Verify redirect back to app with success message

### Scenario 2: Canceled Checkout
1. Add product to cart
2. Proceed to checkout
3. On Stripe page, click "Back" or close tab
4. Return to app
5. Verify "Checkout Canceled" message appears
6. Verify cart still has items

### Scenario 3: Failed Payment
1. Add product to cart
2. Proceed to checkout
3. On Stripe page, use declined card: `4000 0000 0000 0002`
4. Verify error message from Stripe
5. Try again with valid card

### Scenario 4: Multiple Items
1. Add multiple products to cart
2. Adjust quantities
3. Proceed to checkout
4. Verify total is calculated correctly
5. Complete payment
6. Verify all items are included in Stripe session

## API Testing

### Test Create Checkout Session
```bash
curl -X POST http://localhost:5173/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "id": "p1",
      "title": "The Second Brain OS",
      "description": "Test product",
      "price": 1.00,
      "quantity": 1,
      "image": "https://example.com/image.jpg"
    }],
    "customerEmail": "test@example.com"
  }'
```

**Expected response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### Test Webhook (Local)
```bash
# Install Stripe CLI
brew install stripe/stripe-brew/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5173/api/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

## Vercel Deployment Testing

### After Deployment
1. Visit your Vercel URL
2. Verify all environment variables are set
3. Test complete purchase flow
4. Check Vercel function logs for any errors
5. Verify webhook endpoint is accessible

### Check Deployment Status
```bash
# Install Vercel CLI
npm i -g vercel

# Check deployment
vercel ls

# View logs
vercel logs
```

## Monitoring

### Things to Monitor
- ✅ Successful checkout sessions in Stripe Dashboard
- ✅ Webhook delivery status
- ✅ Vercel function execution logs
- ✅ Error rates and response times
- ✅ Customer email delivery (if implemented)

### Stripe Dashboard Checks
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Check **Payments** for completed transactions
3. Check **Webhooks** for delivery status
4. Review **Logs** for API calls

## Troubleshooting Tests

### Issue: Checkout button does nothing
**Check:**
- Browser console for errors
- Network tab for failed API calls
- Verify Stripe keys are set correctly

### Issue: Redirect fails after payment
**Check:**
- Success/cancel URLs are correct
- No CORS errors in console
- Vercel function logs for errors

### Issue: Webhook not receiving events
**Check:**
- Webhook URL is correct
- Signing secret matches
- Webhook is not paused in Stripe
- Check webhook attempt logs in Stripe

## Performance Testing

### Load Testing (Optional)
```bash
# Install artillery
npm install -g artillery

# Create test config
cat > load-test.yml << EOF
config:
  target: 'https://your-app.vercel.app'
  phases:
    - duration: 60
      arrivalRate: 5
scenarios:
  - flow:
    - get:
        url: "/"
EOF

# Run test
artillery run load-test.yml
```

## Security Testing

### Checklist
- ✅ API keys not exposed in frontend code
- ✅ Webhook signatures validated
- ✅ HTTPS enabled (automatic with Vercel)
- ✅ No sensitive data in error messages
- ✅ Rate limiting on API routes (optional)

## Test Results Template

```markdown
## Test Results - [Date]

### Environment
- [ ] Local Development
- [ ] Vercel Preview
- [ ] Vercel Production

### Successful Tests
- [ ] Product displays correctly ($1.00)
- [ ] Add to cart works
- [ ] Cart updates quantities
- [ ] Checkout modal opens
- [ ] Stripe redirect works
- [ ] Payment completes
- [ ] Success message shows
- [ ] Webhook received (if configured)

### Failed Tests
- Issue 1: [Description]
- Issue 2: [Description]

### Notes
[Any additional observations]
```

## Next Steps After Testing

1. ✅ Verify all tests pass
2. ✅ Document any issues
3. ✅ Fix critical bugs
4. ✅ Test again
5. ✅ Deploy to production
6. ✅ Monitor for 24 hours
7. ✅ Announce launch!

