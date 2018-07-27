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

  it(`calls next() for any HTTP request to neither /health and /healthz`, () => {
    ;['/', '/something', '/something-else'].forEach((path) => {
      ;['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'].forEach((method) => {
        const next = sinon.fake()
        const req = { path, method }
        const res = { status: sinon.fake(() => ({ end: sinon.fake() })) }

        healthz(req, res, next)

        expect(res.status.callCount).to.equal(0)
        expect(next.callCount).to.equal(1)
      })
    })
  })

  ;['/health', '/healthz'].forEach((path) => {
    describe(path, () => {
      ;['GET', 'HEAD'].forEach((method) => {
        it(`responds 200 OK to ${method} ${path}`, () => {
          const next = sinon.fake()

          const req = { path, method }
          const res = { status: sinon.fake(() => ({ end: sinon.fake() })) }

          healthz(req, res, next)

          expect(res.status.callCount).to.equal(1)
          expect(res.status.getCall(0).args[0]).to.equal(200)
        })
      })

      ;['DELETE', 'OPTIONS', 'POST', 'PUT'].forEach((method) => {
        it(`calls next() for ${method} ${path}`, () => {
          const next = sinon.fake()
          const req = { path, method }
          const res = { status: sinon.fake(() => ({ end: sinon.fake() })) }

          healthz(req, res, next)

          expect(res.status.callCount).to.equal(0)
          expect(next.callCount).to.equal(1)
        })
      })
    })
  })
})
