# Assignar demo

This app works with imgur API, displaying images from either subreddit gallery, or concrete album, or uploaded from computer. Then, clicking on image, it shows it with mosaic effect applied and with ability to upload them to default imgur album with id `K5Ror`. (You can see all uploaded images in default album by selecting Imgur album in top left select and typing K5Ror to input)

One condition for running app in browser is support for [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), since state
management library used in app, relies on it.

App was not tested on Windows, but hopefully, docker will work...

## Usage

You have 2 options:

1.  Run in docker

```bash
docker-compose run app
```

2.  Run locally

```bash
npm install
npm start
```

And then navigate to http://localhost:1234

## Tests

1.  Run in docker

```bash
docker-compose run test
```

2.  Run locally

```bash
npm install
npm test
```
