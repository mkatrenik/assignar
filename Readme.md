# Assignar demo

This app works with imgur API, displaying images from either subreddit gallery, or concrete album, or uploaded from computer. Then, clicking on image, it shows it with mosaic effect applied and with ability to upload them to default imgur [album](https://imgur.com/a/K5Ror). (You can see all uploaded images in default album by selecting Imgur album in top left select and typing K5Ror to input)

App requires following prerequisites:

* node.js (I used version 9.2)
* Browser support for [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), since state management library used in app, relies on it.
* sqlite installed on server. (App creates /tmp/assignar.dev.db && /tmp/assignar.test.db)

App was not tested on Windows, but hopefully, docker will work...

![homepage](https://raw.githubusercontent.com/mkatrenik/assignar/master/assets/hp.png)
![mosaic](https://raw.githubusercontent.com/mkatrenik/assignar/master/assets/mosaic.png)

## Chalanges

* imgur's gallery endpoint returns mix of images & albums and no items count, which makes proper pagination imposible
* inability to filter imgur responses by file type (except search)

## Improvements

* more tests, docs
* remove secrets from code
* better UI
* better error propagation from imgur to frontend

## Usage

You have 2 options:

1.  Run in docker

```bash
docker-compose up app
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
