# action-node-blanky

Opinionated boilerplate used to make and deploy GitHub actions using node.

# Features

- Typescript
- Jest tests capability
- Continuous integration and continuous delivery
  - Including convenient git tag updating. Example: When releasing v1.2.3, v1 will be created/updated, v1.2 will be created/updated, v1.2.3 will be created.
  - Git tag will contain everything GitHub Actions requires (example: `node_modules/` directory).
- ESLint and Prettier
- As slim as possible published Action to make your GitHub Action Workflow run ⚡ _fast_ ⚡.

When writing GitHub Actions, sometimes there are some inconveniences. This includes publishing `node_modules/` and compiled javascript. However, when we use a tool like Jest, this can be difficult because Jest can add _lots_ of dependencies to `node_modules/` making GitHub Actions that use our Action, slower. This project solves that problem by publishing git tags that are as small as possible to only include `node_modules/` required by the Action without touching your development environment. Write code as you're used to. The deployment script will take care of the rest!

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

Currently set to `node12`. This is because the `action.yml` node version is set to 12. When v14 releases on GitHub Actions, we can bump the node version.

To update the node version, change...

- `.nvmrc`
- `tsconfig.json` > `extends` bump to node version.
- `.eslintrc.json` > `ecmaVersion` to version of node supported. This is easy to find by going into `tsconfig` and find what `target` is set.
- `action.yml` > `runs.using` change node version.

## Deployment

This project is setup with continuous deployment. When you deploy to `main`, `beta`, or `alpha` branches we will make a deployment. GitHub Actions are all deployed by simply making a GitHub tag/release.

Tags/releases are made automatically using [semantic-release](https://github.com/semantic-release/semantic-release) as long as our git commit messages are written in the [conventional commit format](https://www.conventionalcommits.org/).

Requirements for deployment:

- Compile typescript source code
- GitHub tag/release needs to include installed dependencies needed for Action at runtime.
- Keep Action slim by only including runtime dependencies and not compile time (dev) dependencies.

This is how this is done:

- GitHub Actions (CI server) will execute when we have new commits made on `main`, `beta`, or `alpha` branch.
- Check the commit messages to determine if a new Action release is necessary. If not, fail early. No Action release will be made.
- Install _all_ compile time (dev) dependencies and compile the typescript source code.
- Delete all dependencies, delete `.gitignore`, install only runtime (production) dependencies.
- Make a GitHub release with new semantic version tag.
  ...then once a new github release is deployed...
- A new GitHub Action workflow is triggered. This Action's job is to automatically bump the major version tag (v1, v2, etc) so that people who want to use your Action are always using the latest major version.

That's it! We do not make any commits on the source code repository. We only make new branches off of our source code with these modifications since Actions pull from git tags and not branches.
