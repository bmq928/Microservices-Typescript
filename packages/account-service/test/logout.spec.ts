import request from 'supertest'

import app from '@app/api'
import { cacheClient } from '@app/repositories'
import { makeLoginSession } from '@entity/login-session'

describe('[PUT] /logout', () => {
  const baseUrl = '/logout'
  const defaultIp = '::ffff:127.0.0.1'
  const defaultUserAgent = 'node-superagent/3.8.3'

  it('Logout should remove session', async () => {
    const loggedInSession = makeLoginSession({
      ip: defaultIp,
      token: '',
      userAgent: defaultUserAgent,
    })
    await cacheClient.set(
      loggedInSession.ip + loggedInSession.userAgent,
      loggedInSession.token
    )

    const resp = await request(app)
      .put(baseUrl)
      .set('User-Agent', defaultUserAgent)
    
    expect(resp.status).toBe(204)

    const sessionKey = defaultIp + defaultUserAgent

    cacheClient.get(sessionKey, (err, token) => {
      if (err) throw err

      expect(token).toBeFalsy()
    })
  })
})
