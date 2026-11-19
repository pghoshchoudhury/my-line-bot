# Hono Cloudflare Workers Application

A fast, lightweight web API and edge application built with [Hono](https://hono.dev/) and deployed globally on [Cloudflare Workers](https://workers.cloudflare.com/) using the Wrangler CLI.

---

## Tech Stack

- **Framework:** [Hono](https://hono.dev/) (Ultrafast web framework for the Edge)
- **Runtime:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **CLI & Deployment:** [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Language:** TypeScript

---

## Prerequisites

Before you begin, ensure you have the following installed and set up:

1. **Node.js** (v18 or later recommended) — [Download Node.js](https://nodejs.org/)
2. **A Cloudflare Account** (Free tier works out of the box) — [Sign up at Cloudflare](https://dash.cloudflare.com/sign-up)

Verify your Node and npm installations in your terminal (PowerShell, Command Prompt, or Bash):

```bash
node -v
npm -v
```

---

## Getting Started (Local Setup) and Installation

### Option A: Clone an Existing Repository

If the project already exists in Git:

```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
```

Or, Download the ZIP file of the repository ->
extract it and go into the project folder ->
Open CMD and type

```bash
  npm install
```
---

### 2. Set up Environment Variables (`.env`)

Never commit secrets to version control. For local development, create a `.env` file in the project root (make sure `.env` is listed in your `.gitignore`):

```env
CHANNEL_ACCESS_TOKEN=access_token
CHANNEL_SECRET=client_secret
```

---

## Running Locally

Start the local Wrangler development server:

```bash
npm run dev
```

- Your app will be running at **`http://localhost:8787`**.
- Changes saved in `src/` will automatically reload the local server.
- Press `Ctrl + C` in the terminal to stop the server.

---

## Deploying to Cloudflare Workers

### Step 1: Authenticate with Cloudflare

Log in to your Cloudflare account via the browser (only required once per machine):

```bash
npx wrangler login
```

### Step 2: Set Production Secrets (If Applicable)

Upload any secret keys from your `.dev.vars` to Cloudflare's encrypted secret store:

```bash
npx wrangler secret put API_SECRET
```

### Step 3: Deploy the Worker

Bundle and publish your Hono app to Cloudflare's global edge network:

```bash
npm run deploy
```

> **First-Time Deployment Note:** If this is your first Worker on your Cloudflare account, Wrangler will prompt you to register a free `*.workers.dev` subdomain. Use only **lowercase letters (`a-z`), numbers (`0-9`), and hyphens (`-`)**—dots (`.`) and spaces are not allowed.

Once finished, Wrangler will output your live production URL:
```text
https://<worker-name>.<your-subdomain>.workers.dev
```

---

## Available Commands Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs `wrangler dev` to start a local server at `http://localhost:8787` |
| `npm run deploy` | Runs `wrangler deploy --minify` to publish your Worker to production |
| `npm run cf-typegen` | Generates TypeScript types for Cloudflare bindings (KV, D1, R2, vars) |
| `npx wrangler tail` | Streams real-time logs from your live deployed Worker |
| `npx wrangler whoami` | Checks which Cloudflare account Wrangler is currently logged into |

---

## Project Structure

```text
├── src/
│   └── index.ts          # Main Hono application entry point & route definitions
├── .dev.vars             # Local secrets & environment variables (gitignored)
├── .gitignore            # Files and folders ignored by Git
├── package.json          # Dependencies and npm scripts
├── tsconfig.json         # TypeScript compiler configuration
└── wrangler.jsonc        # Cloudflare Workers & Wrangler deployment settings
```

---

## Troubleshooting

- **`wrangler : The term 'wrangler' is not recognized` (Windows PowerShell):**
  Wrangler is installed locally in `node_modules` rather than globally. Always run commands via `npm run dev`, `npm run deploy`, or prefix commands with `npx` (e.g., `npx wrangler login`).
- **Invalid `workers.dev` subdomain warning:**
  Subdomains cannot be blank and cannot contain dots (`.`) or uppercase letters. Use hyphens instead (e.g., `my-project-api`).
- **PowerShell script execution policy error:**
  If PowerShell blocks `npx` or `npm` scripts, run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` in PowerShell and try again.