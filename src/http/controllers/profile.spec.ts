import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Melqui',
      email: 'melqui.sodre3@gmail.com',
      password: '123456',
    })

    const authenticateResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'melqui.sodre3@gmail.com',
        password: '123456',
      })

    const { token } = authenticateResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'melqui.sodre3@gmail.com',
      }),
    )
  })
})
