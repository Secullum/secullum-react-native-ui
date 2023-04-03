# Contributing

## Update docs

Run a local dev server and edit files in `./docs`:

```
yarn run docs:dev
```

To publish the updated docs:

```
yarn run docs:publish
```

## Publishing a new version

1. MAKE SURE YOU'RE ON MASTER BEFORE DOING IT

2. Ensure that the code is formatted correctly

```
yarn run format
```

3. Update the version

```
npm version [major | minor | patch]
```

4. Build the code to be published

```
yarn run build
```

5. Publish it

```
npm publish
```

6. Push incremented version and tags to git

```
git push --follow-tags
```
