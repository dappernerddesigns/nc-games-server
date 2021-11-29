const db = require('../db/connection.js')
const app = require('../app')
const testData = require('../db/data/test-data/index.js')
const { seed } = require('../db/seeds/seed.js')
const { request } = require('../app')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('GET /api/categories', () => {
  testData('200: Returns an array of categories objects in the table', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        response.body.forEach((category) => {
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          })
        })
      })
  })
})
