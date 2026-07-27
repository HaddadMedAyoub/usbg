# Auto-deploy to cPanel — setup

Every push to `main` builds the site and FTP-syncs the changed files to cPanel.
You do this setup **once**. Nothing here contains secret values — you enter those
in GitHub's encrypted Secrets UI.

## 1. Add repository secrets

GitHub → your repo → **Settings → Secrets and variables → Actions → New repository secret**.
Add each of these:

### Build values (copy from your local `.env.local`)
| Secret name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | from `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from `.env.local` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | from `.env.local` |
| `NEXT_PUBLIC_OPENWEATHER_KEY` | from `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | from `.env.local` |

### FTP credentials (from cPanel)
| Secret name | Value | Notes |
|---|---|---|
| `FTP_SERVER` | e.g. `ftp.usbenguerdane.tn` or the server IP | cPanel → FTP Accounts |
| `FTP_USERNAME` | full FTP username (often `user@usbenguerdane.tn`) | |
| `FTP_PASSWORD` | that FTP account's password | |
| `FTP_SERVER_DIR` | target folder, **with trailing slash** | see below |

## 2. Pick the target folder (`FTP_SERVER_DIR`)

**Tip:** in cPanel → *FTP Accounts*, create a dedicated FTP account whose
"Directory" is the exact folder you deploy to. Then the FTP user lands right
there and `FTP_SERVER_DIR` is simply `./`.

- **Test first:** point it at your test subdomain's folder
  (e.g. `/test.usbenguerdane.tn/` or `./` for a scoped account).
- **Go live later:** change the secret to the production folder
  (usually `/public_html/`).

## 3. First run

- Push to `main` (or Actions tab → this workflow → **Run workflow**).
- Watch it under the **Actions** tab.
- If the FTP step fails on TLS, edit `.github/workflows/deploy.yml` and change
  `protocol: ftps` to `protocol: ftp`.

The first deploy uploads everything; after that it syncs only changed files
(it keeps a `.ftp-deploy-sync-state.json` on the server to track this).
