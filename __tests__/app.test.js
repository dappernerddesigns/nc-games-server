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
  test('200: Returns a single review when provided a review_id', () => {
    let output = {
      review: [
        {
          review_id: 1,
          title: 'Agricola',
          designer: 'Uwe Rosenberg',
          owner: 'mallionaire',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          review_body: 'Farmyard fun!',
          category: 'euro game',
          created_at: '2021-01-18T00:00:00.000Z',
          votes: 1,
        },
      ],
    }
    return request(app)
      .get('/api/reviews/1')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(output)
      })
  })
})
describe('GET /api/reviews', () => {
  test('200: Returns all reviews in the table', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        const { reviews } = response.body
        expect(reviews).toHaveLength(13)
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            }),
          )
        })
      })
  })
})
