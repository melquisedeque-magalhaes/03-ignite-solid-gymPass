import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able create a gym', async () => {
    const { token } = await createAndAuthenticateUser({
      app,
      isAdmin: true,
    })

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Javascript Gym',
        latitude: -15.7531375,
        longitude: -48.2891368,
        phone: '123456',
        title: 'Javascript Gym',
      })

    expect(response.statusCode).toEqual(201)
  })
})
