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

1. Ensure that the code is formatted correctly

```
yarn run format
```

2. Update the version

```
npm version [major | minor | patch]
```

3. Build the code to be published

```
yarn run build
```

4. Publish it

```
npm publish
```

5. Push incremented version and tags to git

```
git push --follow-tags
```
