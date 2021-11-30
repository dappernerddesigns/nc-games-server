const db = require('../db/connection.js')
const app = require('../app')
const seed = require('../db/seeds/seed.js')
const request = require('supertest')
const testData = require('../db/data/test-data/index')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('GET /api/categories', () => {
  test('200: Returns an array of categories objects in the table', () => {
    let output = {
      categories: [
        {
          description: 'Abstact games that involve little luck',
          slug: 'euro game',
        },
        {
          description: "Players attempt to uncover each other's hidden role",
          slug: 'social deduction',
        },
        {
          description: 'Games involving physical skill',
          slug: 'dexterity',
        },
        {
          description: 'Games suitable for children',
          slug: "children's games",
        },
      ],
    }
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(output)
      })
  })
})

describe('GET /api/reviews/:review_id', () => {
  test('200: Returns a review for the given id', () => {
    return request(app)
      .get('/api/reviews/1')
      .expect(200)
      .then((response) => {
        console.log(Object.keys(response.body))
        console.log(response.body.reviews.length)
        const { reviews } = response.body

        expect(reviews).toHaveLength(13)
        reviews.forEach((reviews) => {
          expect.objectContaining({
            review_id: expect.any(Number),
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(Number),
            votes: expect.any(Number),
            // comment_count: expect.any(Number),
          })
        })
      })
  })
})
