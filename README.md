# Logos NextJS Starter

## How to Run Locally

1. Clone this repository

```bash
$ git clone https://github.com/acid-info/logos-nextjs-starter.git
```

2. Install the dependencies:

```bash
$ yarn install
```

3. Set .env

```
NEXT_PUBLIC_API_URL=
```

4. Start the development server:

```bash
$ yarn dev
```

4. Visit `http://localhost:3000` in your browser

## How to Run a Build (Production Build)

1. Generate files for production:

```bash
$ yarn build
```

The files will be created in the `build` directory.

2. Serve the build:

```bash
$ yarn start
```

4. Visit `http://localhost:3000` in your browser.

Keep in mind this webpage rebuilds itself at runtime.

## Change Process

1. Create a new working branch from `develop`: `git checkout develop; git checkout -b my-changes`.

2. Make your changes, push them to the `origin`, and open a Pull Request against the `develop` branch.

3. After approval, merge the pull request, and verify the changes on the staging server.

4. When ready to promote changes to the live website, create a pull request against the "master" branch, based on the "develop" branch.
