/*!
 * express-healthz
 * Copyright (c) 2018 Joel Wallis Jucá <joelwallis@gmail.com>
 * ISC licensed
 */

import chai from 'chai'
import express from 'express'
import healthz from '../src'
import sinon from 'sinon'

const expect = chai.expect

/* global describe it */
describe('express-healthz', () => {
  it('is a function', () => {
    expect(healthz).to.be.a('function')
  })

  it('is a Express middleware', () => {
    expect(() => express().use(healthz)).to.not.throw()
  })

  it('responds a 200 OK to either GET or HEAD requests to /health', () => {
    ;['GET', 'HEAD'].forEach((verb) => {
      const next = sinon.fake()

      const req = { path: '/health', method: verb }
      const res = { status: sinon.fake(() => ({ end: sinon.fake })) }

      healthz(req, res, next)

      expect(res.status.callCount).to.equal(1)
      expect(res.status.getCall(0).args[0]).to.equal(200)
    })
  })

  it('calls next() for request diferent than GET /health', () => {
    const next = sinon.fake()

    ;['DELETE', 'GET', 'HEAD', 'POST', 'PUT'].forEach((verb) => {
      healthz({ method: verb, path: '/something-else' }, {}, next)
    })

    expect(next.callCount).to.equal(5)
  })
})
