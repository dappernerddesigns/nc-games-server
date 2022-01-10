const db = require('../connection')
const format = require('pg-format')

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data
  return db
    .query(`DROP TABLE IF EXISTS categories, users, reviews, comments;`)
    .then(() => {
      return db.query(`CREATE TABLE categories(
        slug  VARCHAR PRIMARY KEY,
        description VARCHAR
      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
    username VARCHAR PRIMARY KEY,
    avatar_url VARCHAR,
    name VARCHAR NOT NULL
  );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    designer VARCHAR,
    owner VARCHAR NOT NULL REFERENCES users(username),
    review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    review_body VARCHAR NOT NULL,
    category VARCHAR NOT NULL REFERENCES categories(slug),
    created_at TIMESTAMP DEFAULT NOW(),
    votes INT DEFAULT 0
  );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR NOT NULL REFERENCES users(username),
    review_id INT NOT NULL REFERENCES reviews(review_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    body VARCHAR NOT NULL
    );`)
    })
    .then(() => {
      const categoriesQuery = format(
        `INSERT INTO categories
        (slug, description)
        VALUES
        %L
        RETURNING*;`,
        categoryData.map((list) => [list.slug, list.description]),
      )
      return db.query(categoriesQuery)
    })
    .then(() => {
      const usersQuery = format(
        `INSERT INTO users
        (username, avatar_url, name)
        VALUES
        %L
        RETURNING*;`,
        userData.map((list) => [list.username, list.avatar_url, list.name]),
      )
      return db.query(usersQuery)
    })
    .then(() => {
      const reviewsQuery = format(
        `INSERT INTO reviews
          (title, designer, owner, review_img_url, review_body, category, created_at, votes)
          VALUES
          %L
          RETURNING*;`,
        reviewData.map((list) => [
          list.title,
          list.designer,
          list.owner,
          list.review_img_url,
          list.review_body,
          list.category,
          list.created_at,
          list.votes,
        ]),
      )
      return db.query(reviewsQuery)
    })
    .then(() => {
      const commentsQuery = format(
        `INSERT INTO comments
        (author, review_id, votes, created_at, body)
        VALUES
        %L
        RETURNING*;`,
        commentData.map((list) => [
          list.author,
          list.review_id,
          list.votes,
          list.created_at,
          list.body,
        ]),
      )
      return db.query(commentsQuery)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = seed
