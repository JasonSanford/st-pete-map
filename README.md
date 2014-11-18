## st-pete-map

A map of things around St. Petersburg and the Spatial Networks office. Visible at http://jasonsanford.github.io/st-pete-map/

If you want to change the map a bit, fork this repo and you'll be able to see your own version at `http://<your_github_username>.github.io/st-pete-map/`.

### Building

JavaScript is bundled with browserify. Before building, install dependencies:

```
npm install -g browserify
npm install
```

After making changes in `assets/js/main.js`, be sure to run:

```
npm run build
```

### Development

A few more scripts are available to help with development, but you'll need to install some things first:

```
npm install -g serve
npm install -g watchify
```

Then run the following to serve the site locally and automatically run `browserify` when changes are made:

```
npm run dev
```
