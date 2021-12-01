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
          review_id: 3,
          title: 'Ultimate Werewolf',
          designer: 'Akihisa Okui',
          owner: 'bainesface',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          review_body: "We couldn't find the werewolf!",
          category: 'social deduction',
          created_at: '2021-01-18T00:00:00.000Z',
          votes: 5,
          comment_count: 3,
        },
      ],
    }
    return request(app)
      .get('/api/reviews/3')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(output)
      })
  })

  test('200: Returns a single review with the comments count joined', () => {
    let output = {
      review: [
        {
          review_id: 3,
          title: 'Ultimate Werewolf',
          designer: 'Akihisa Okui',
          owner: 'bainesface',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          review_body: "We couldn't find the werewolf!",
          category: 'social deduction',
          created_at: '2021-01-18T00:00:00.000Z',
          votes: 5,
          comment_count: 3,
        },
      ],
    }
    return request(app)
      .get('/api/reviews/3')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(output)
      })
  })

  test('404: Returns a 404 error when id does not match any game', () => {
    return request(app)
      .get('/api/reviews/999')
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: 'Game not found in database' })
      })
  })
})

describe('PATCH /api/reviews/:review_id', () => {
  test.only('201: Patch request updates the votes count when given a review_id', () => {
    let votesToAdd = { inc_votes: 3 }
    let output = {
      review: [
        {
          review_id: 3,
          title: 'Ultimate Werewolf',
          designer: 'Akihisa Okui',
          owner: 'bainesface',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          review_body: "We couldn't find the werewolf!",
          category: 'social deduction',
          created_at: '2021-01-18T00:00:00.000Z',
          votes: 8,
          comment_count: 3,
        },
      ],
    }
    return request(app)
      .patch('/api/reviews/3')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(output)
      })
  })

  test('400: Returns a bad request error if there are no inc_votes on the request body', () => {})

  test('400: Returns a bad request if invalid data types are passed into the request body', () => {})
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
              comment_count: expect.any(Number),
            }),
          )
        })
      })
  })

  test('200: Returns all reviews in a default sort order of date created', () => {})

  test('200: Data can be ordered ASC or DESC on valid columns', () => {})

  test('200: Reviews can be filtered by category value', () => {})

  test('400: Returns a bad request for sorting on a column that is not on the table', () => {})

  test('400: Returns a bad request for sorting by a category that does not exist', () => {})

  test('400: Returns a bad request for sorting by a category that does not have any reviews', () => {})
})

describe('GET /api/reviews/:review_id/comments', () => {
  test('200: Responds with an array of comments for the given review_id', () => {})
  test('400: Responds with a bad request if review_id does not exist, or if review does not have any comments', () => {})
})
