# express-healthz

Health check middleware for Express.

[![Build Status](https://travis-ci.org/joelwallis/express-healthz.svg?branch=master)](https://travis-ci.org/joelwallis/express-healthz)

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
