Latest (recommended) [![npm latest version](https://img.shields.io/npm/v/levibostian/action-node-blanky/latest.svg)](https://www.npmjs.com/package/levibostian/action-node-blanky)
Beta: [![npm beta version](https://img.shields.io/npm/v/levibostian/action-node-blanky/beta.svg)](https://www.npmjs.com/package/levibostian/action-node-blanky)
Alpha: [![npm alpha version](https://img.shields.io/npm/v/levibostian/action-node-blanky/alpha.svg)](https://www.npmjs.com/package/levibostian/action-node-blanky)

# action-node-blanky

Opinionated boilerplate used to make and deploy GitHub actions using node.

# Features

- Typescript
- Jest tests
- Continuous integration and continuous delivery
  - Including convenient git tag updating. Example: When releasing v1.2.3, v1 will be created/updated to follow GitHub Action convention.
  - Deployments will contain everything GitHub Actions requires including dependencies.
- ESLint and Prettier
- As slim as possible published Action to make your GitHub Action Workflow run ⚡ _fast_ ⚡. Dependencies are included in the release but only production related dependencies, not development. This means we don't need to check in out bulk `node_modules/` directory into our repo!

When writing GitHub Actions, sometimes there are some inconveniences. This includes publishing `node_modules/` and compiled javascript. However, when we use a tool like Jest, this can be difficult because Jest can add _lots_ of dependencies to `node_modules/` making GitHub Actions that use our Action, slower. This project solves that problem by publishing git tags that are as small as possible to only include dependencies required by the Action without touching your development environment. Write code as you're used to. The deployment script will take care of the rest!

# Goals of this project

- Contain configuration files to setup all tools I tend to use in my development flow.
- Start with zero dependencies. Your Action contains the dependencies you need, no more.

# Getting started

- Enable GitHub Actions for your repository.
- If you have not done so already, create a GitHub account for bot purposes.
- Add your bot account in the repository `/settings/access`.
- Create secret `BOT_PUSH_TOKEN` with key being a GitHub personal access token with push permission so the bot can push to the repository (the bot will be making git tags and releases on repository).

# Notes

## node version

Currently set to `node16`.

To update the node version, change...

- `.nvmrc`
- `tsconfig.json` > `extends` bump to node version.
- `.eslintrc.json` > `ecmaVersion` to version of node supported. This is easy to find by going into `tsconfig` and find what `target` is set.
- `action.yml` > `runs.using` change node version.

# Development

- `npm install`

- Find all the relevant tasks you need with: `npm run --tasks`

# Deployment

This project is setup with continuous deployment. When you deploy to `main`, `beta`, or `alpha` branches we will make a deployment. GitHub Actions are all deployed by simply making a GitHub tag/release.

Tags/releases are made automatically using [semantic-release](https://github.com/semantic-release/semantic-release) as long as our git commit messages are written in the [conventional commit format](https://www.conventionalcommits.org/).

# Credits

- Inspiration for how to do compiling and testing action came from [this repo](https://github.com/actions/typescript-action). Great bas to start with that I added my own twists to (this repo _is_ opinionated after all).
