
# Astro browser extension template

A vanilla Astro template with build hot reload to quickstart browser extensions.
The template supports both ManifestV2 and ManifestV3

> If you want to use any frontend framework (ReactJS, Vue, etc) you can follow [AstroJS guides](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) for that

## Editing the manifests
To edit the manifests, popup entry point(by default is index.html generated by astro), background scripts, etc. You can do so in the public folder under v2 and v3

## Features
- Hot reload for dist folder
- Parallel builds for ManifestV2 and ManifestV3
- Unified UI for ManifestV2 and ManifestV3

## Run Locally

Clone the project

```bash
  git clone https://github.com/latinrev/astro-browser-extension-template.git
```

Go to the project directory

```bash
  cd astro-browser-extension-template
```

Install dependencies

```bash
  npm install
```

Start the hot reload
> Once the project is up and running you will see your build results inside dist/v2 dist/v3 which then in turn you can point your browsers to these directories
```bash
  npm run build:reload
```


### Build options

Hot reload builds for both ManifestV2 and ManifestV#
```bash
 npm run build:reload
```
Builds for both ManifestV2 and ManifestV#
```bash
 npm run build
```
Only builds for ManifestV2
```bash
 npm run buildV2
```
Only builds for ManifestV3
```bash
 npm run buildV3
```


## Authors
> Easter egg, Hola Midu!
- [@latinrev (Joel Castillo)](https://www.github.com/latinrev)


## Contributing

Contributions are always welcome!


