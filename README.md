# Meterlane

Usage-metering add-on for indie SaaS on Stripe.

```
meterlane/     Go API               :8080
web-static/    Next.js public site  :3001
admin/         Next.js admin        :3002
```

Clone:

```bash
git clone https://github.com/Ajay-526/meterlane.git
cd meterlane
```

Run:

```bash
cd meterlane && export ALPHA_TOKEN=change-me && go run ./cmd/meterlane -mode=all
cd web-static && cp .env.example .env.local && npm install && npm run dev
cd admin && cp .env.example .env.local && npm install && npm run dev
```

Postman: `Meterlane.postman_collection.json`  
Guide: `customer-guide.md`
