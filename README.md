# gh-pr-viewer

Clone of https://github.com/pulls with some variations.

## Using:

- ReactJS
- Netlify Functions
- Github API v4
- Primer CSS

## Run

### Pre-requisites

- Netlify CLI: https://www.netlify.com/products/dev/

### Locally

Create a `.env` file with your Github OAuth App information:

```
# Environment variables for dev/local testing
GITHUB_CLIENT_ID=xyz
GITHUB_CLIENT_SECRET=abc
```

Run

```bash
$ npm install
$ netlify dev
```

### On Netlify

Set your environment variables for deployment with your Github OAuth App information:

- GITHUB_CLIENT_ID: xyz
- GITHUB_CLIENT_SECRET: abc

## Ref

- To create Github OAuth App: https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/
