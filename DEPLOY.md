# Deploying VidVerve to Vercel (Free Tier)

Two separate Vercel projects, one repo:
- `vid-verve` → frontend (React)
- `vid-verve-api` → backend (Express serverless)

---

## 1. MongoDB Atlas — allow Vercel IPs

Vercel functions use dynamic IPs. You must whitelist 0.0.0.0/0.

1. Atlas dashboard → your cluster → **Network Access**
2. **+ Add IP Address** → **Allow access from anywhere** → confirm
3. Wait until status shows **Active**

Your strong password is what keeps the DB secure now — that's fine, this is the standard pattern on free tiers.

---

## 2. Fix the existing `vid-verve` project (frontend)

The existing project was pointed at the repo root. Repoint it at `client/`.

1. Vercel dashboard → **vid-verve** project → **Settings**
2. **General** → **Root Directory** → **Edit** → set to `client` → **Save**
3. **General** → **Framework Preset** → should auto-detect **Create React App** (leave it)
4. **Environment Variables** → add:

   | Name | Value |
   |---|---|
   | `REACT_APP_API_BASE` | `https://vid-verve-api.vercel.app` *(use the URL you get after step 3)* |

   Set for: Production, Preview, Development (all three).

5. **Deployments** → trigger a redeploy (or just push to GitHub — the new commit will trigger one).

> Note: you'll come back to set this env var properly *after* the backend deploys and you know its real URL.

---

## 3. Create a new project `vid-verve-api` (backend)

1. Vercel dashboard → **Add New** → **Project**
2. Import the same `amanraj-gith/VidVerve` GitHub repo
3. **Project Name** → `vid-verve-api`
4. **Root Directory** → set to `server`
5. **Framework Preset** → **Other**
6. **Build & Output Settings** → leave defaults (no build command needed; `vercel.json` handles it)
7. **Environment Variables** — add these BEFORE first deploy. Use the same values from your local `server/.env`:

   | Name | Where to get it |
   |---|---|
   | `MONGO_URI` | From your local `server/.env` |
   | `JWT_SECRET` | From your local `server/.env` |
   | `YOUTUBE_API_KEY` | From your local `server/.env` |
   | `CLIENT_URL` | Your frontend URL (e.g. `https://vid-verve.vercel.app`) — set after step 2 above |

8. **Deploy**

After it deploys, copy the production URL (e.g. `https://vid-verve-api.vercel.app`) — this is what goes into `REACT_APP_API_BASE` on the frontend project.

---

## 4. Wire frontend → backend

1. Go back to **vid-verve** → **Settings** → **Environment Variables**
2. Update `REACT_APP_API_BASE` to the real backend URL from step 3
3. **Deployments** → **Redeploy** the latest deployment

Same on the backend side:

1. **vid-verve-api** → **Settings** → **Environment Variables**
2. Confirm `CLIENT_URL` matches your real frontend URL (e.g. `https://vid-verve.vercel.app`)
3. Redeploy if you changed anything

---

## 5. Verify

Visit `https://vid-verve.vercel.app`:
- Home page loads ✓
- Sign up → redirects to /dashboard ✓
- Featured Content grid shows YouTube videos ✓
- Click "Add to Feeder" → success alert ✓
- Click "MyFeed" in nav → see saved-tag videos ✓

If the frontend loads but API calls fail with CORS errors → check `CLIENT_URL` on backend matches frontend exactly (with `https://`, no trailing slash).

If API calls return 500 → check Vercel function logs on `vid-verve-api` for the MongoDB connection error.

---

## Free tier limits to know about

| Resource | Limit | What it means |
|---|---|---|
| Vercel functions | 100 GB-Hours/mo | Plenty for this app |
| Vercel function timeout | 10s on Hobby | YouTube API calls finish in <2s, fine |
| Vercel bandwidth | 100 GB/mo | Plenty |
| MongoDB Atlas M0 | 512 MB storage | Plenty for users + UserFeed |
| YouTube API v3 | 10,000 units/day | Each search costs 100 units → ~100 searches/day |

The YouTube quota is the only one you might realistically hit. If you do, create another Google Cloud project and add a second API key for rotation.
