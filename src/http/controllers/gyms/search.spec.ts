import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able search a gym by title', async () => {
    const { token } = await createAndAuthenticateUser({
      app,
      isAdmin: true,
    })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Javascript Gym',
        latitude: -15.7531375,
        longitude: -48.2891368,
        phone: '123456',
        title: 'Javascript Gym',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Typescript Gym',
        latitude: -15.7531375,
        longitude: -48.2891368,
        phone: '123456',
        title: 'Typescript Gym',
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Javascript Gym',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ])
  })
})
