/*!
 * express-healthz
 * Copyright (c) 2018 Joel Wallis Jucá <joelwallis@gmail.com>
 * ISC licensed
 */

export const healthz = (req, res, next) => {
  (['/health', '/healthz'].indexOf(req.path.toLowerCase()) >= 0 && ['get', 'head'].indexOf(req.method.toLowerCase()) >= 0)
    ? res.status(200).end()
    : next()
}

// exporting again as default for usage convenience
export default healthz
