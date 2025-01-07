# Cloudflare-R2-Worker
This project is a Cloudflare Worker designed to generate signed URLs for R2 object storage. It uses Esbuild as the bundler for its simplicity, speed, and compatibility with the ES Modules required by Cloudflare Workers.
**Why Esbuild?**
- Blazing Fast: Esbuild is significantly faster than alternatives like Webpack, making development and iteration quicker.
- Native ESM Support: Cloudflare Workers require ES Modules, and Esbuild natively outputs ESM without additional configuration.
- Lightweight & Simple: Minimal configuration is needed, making it perfect for small, focused projects like Workers.


## Prerequisites
1. Install Node.js (v16 or higher).
2. Install the Cloudflare CLI tool, wrangler:
```
npm install -g wrangler
```

## Build the Worker
To bundle the project with Esbuild, run:
```
npm run build
```

## Deploying the Worker
Authenticate with Cloudflare:
```
wrangler login
```
Publish the Worker to your Cloudflare account:
```
npm run deploy
```
