/*!
 * express-healthz
 * Copyright (c) 2018 Joel Wallis Jucá <joelwallis@gmail.com>
 * ISC licensed
 */

export const healthz = (req, res, next) => {
  (req.method === 'GET' && req.path === '/health')
    ? res.status(200).end()
    : next()
}

// exporting again as default for usage convenience
export default healthz
