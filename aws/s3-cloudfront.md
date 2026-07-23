# Host the TechyGuide frontend on S3 + CloudFront

This guide deploys the production Webpack build to an S3 static website behind a CloudFront CDN.

## 1. Build the frontend

```bash
cd TECHYGUIDE_APP_DEVELOPMENT
npm install
npm run build:prod
```

The output will be in `dist/`.

## 2. Create the S3 bucket

```bash
BUCKET_NAME=techyguide-demo-$(date +%s)
aws s3 mb s3://$BUCKET_NAME --region ap-south-1

# Block public access (we will use CloudFront OAI/OAC for access)
aws s3api put-public-access-block --bucket $BUCKET_NAME \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## 3. Upload `dist/`

```bash
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete
```

## 4. Create a CloudFront distribution

Use the AWS Console or the following CloudFront origin configuration:

- **Origin domain**: `YOUR_BUCKET_NAME.s3.ap-south-1.amazonaws.com`
- **Origin access**: **Origin access control settings (OAC)** — create a new OAC and update the S3 bucket policy.
- **Default root object**: `index.html`
- **Error pages**: Add custom error responses for `403` and `404` → return `index.html` with HTTP `200`. This supports the SPA router.

### Optional: Proxy API calls through CloudFront

If you are running the backend from [`ec2-backend.md`](ec2-backend.md):

1. Add a second origin pointing to your EC2/ALB domain (e.g. `http://your-ec2-public-ip:3000` or your ALB DNS).
2. Add a cache behavior with path pattern `/api/*` and origin set to the backend.
3. Set the behavior to **Forward all query strings, cookies, and headers**.

This lets the frontend keep using relative `/api/*` URLs even in production.

## 5. Update bucket policy for CloudFront OAC

After creating the distribution, AWS will show you the bucket policy to apply. It looks like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontOAC",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "StringEquals": { "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID" }
      }
    }
  ]
}
```

## 6. Deploy updates

Whenever you rebuild:

```bash
npm run build:prod
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Notes

- If you are **not** running the backend, the *Upload Code* button for Arduino C++ will fail because `/api/compile` is not reachable. For a frontend-only demo this is expected.
- For a company demo without hardware, you can hide the backend entirely and simply demonstrate the block workspace + MicroPython upload (which uses the browser's Web Serial API and does not need the backend).
