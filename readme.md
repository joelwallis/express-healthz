# express-healthz

Health check middleware for Express.

[![Build Status](https://travis-ci.org/joelwallis/express-healthz.svg?branch=master)](https://travis-ci.org/joelwallis/express-healthz)
[![Known Vulnerabilities](https://snyk.io/test/github/joelwallis/express-healthz/badge.svg?targetFile=package.json)](https://snyk.io/test/github/joelwallis/express-healthz?targetFile=package.json)

## Usage

```js
const { healthz } = require('express-healthz')

// Create your Express app somehow. E.g.:
const app = express()

// Then use healthz in your Express app:
app.use(healthz)
```

## Testing

```
npm test
```

## License

[ISC](license)
