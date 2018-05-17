# Custom Resources

An app to display the functionality of Custom Resources in Zendesk.

## Getting started

This app was built with `create-react-app`. To get the app compiling and running in dev whilst developing on Zendesk, run the following commands, each in their own shell.

```
$ yarn watch
$ zat server --path dist
```

If you have `node-foreman` installed, you can run both those commands with:

```
$ nf start
```

## Deploying to Zendesk

This app is a little bit weird to deploy. There are a few steps you need to take.

1. Run `$ yarn build` in the root folder, this will create a `build` folder.
2. Move the `build/` folder into `dist/assets/build`.
3. Change `dist/manifest.json` so that `"nav_bar": "assets/public/index.html"` becomes: `"nav_bar": "assets/build/index.html"`.
4. Move `dist/assets/build/static/js/main.123456789.js` to `dist/assets/build/main.123456789.js`
5. Inside `dist/assets/build/index.html` change `/static/js/main.1234589.js` to `/main.123456789.js`
6. Finally, compress the whole of the `build/` folder and upload the resulting .zip file to Zendesk.