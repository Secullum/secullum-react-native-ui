# secullum-react-native-ui

## Publishing a new version

1. Ensure the code is formatted correctly

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
