import {jest, describe, it, afterAll, expect} from '@jest/globals'
import request from 'supertest'
import app from '../sources/server_app.js'

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
})

afterAll(() => {
  app.close()
})
