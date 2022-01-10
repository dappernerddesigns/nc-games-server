# BE Northcoders NC Games Portfolio Check List

## General

- Neat code, very readable!
- Really nicely-organised controllers, models, and general file structure
- Really descriptive test names, big fan of these
- When returning single objects (e.g. one review, one updated comment) best practice is to return just the object, and not the object within an array. We can then name the key of the response in the singular as opposed to plural (e.g. 'review' rather than 'reviews')
- Big opportunity to use a couple of well-placed util functions e.g. checkExists, formatTableData
- Comprehensive readme!
- All I would say at this stage is have a quick refactor based on the feedback, and then keep going, this is looking really good!

## Readme - Remove the one that was provided and write your own:

- [x] Link to hosted version
- [x] Write a summary of what the project is
- [x] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [x] Include information about how to create `.env.test` and `.env.development` files
- [x] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [x] Remove any unnecessary `console.logs` and comments
  - almost done on this point, just a couple left over e.g. in errors.js, in one of the models
- [x] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [x] Functions and variables have descriptive names
  - Very small point - just to bear in mind internal consistency, e.g. fetchReviews, fetchComments, showCategories all perform the same function, so may benefit from the same naming convention

## Creating tables

- [x] Use `NOT NULL` on required fields
- [x] Default `created_at` in reviews and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
  - I can see you're using CURRENT_DATE which is good, but NOW() will give us the exact time of the day too - useful when displaying multiple ordered comments posted on the same day

## Inserting data

- [x] Drop tables and create tables in seed function in correct order
- [x] Make use of pg-format to insert data in the correct order
  - we could potentially make use of a data manipulation util function or two to help format the data (e.g. formatCommentData, formatReviewsData), which might help trim down the insert statements in the seed file a bit, but this is down to personal preference! Might be nice to demonstrate we can do it though!

## Tests

- [x] Seeding before each test
- [x] Descriptive `it`/`test` block descriptions
- [x] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [x] Evidence of building up complex query endpoints using TDD
- [ ] Ensure all tests are passing
  - One currently being skipped - I think this is because the test wants a 404 and it is getting 400. The test could also be split into two around the 'or' statement. See feedback doc on how to help with remedying both of these assertions :)
- [ ] Cover all endpoints and errors (as below)

- `GET /api/categories`

  - [x] Status 200, array of category objects

- `GET /api/reviews/:review_id`

  - [x] Status 200, single review object (including `comment_count`)
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [x] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/reviews/:review_id`

  - [x] Status 200, updated single review object
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [x] Status 400, invalid inc_votes type, e.g. property is not a number
  - [x] Status 404, non existent ID, e.g. 0 or 9999
  - [x] Status 200, missing `inc_votes` key. No effect to article.
    - In your tests there is a `no inc_votes on the request body` test - this covers the scenario where `inc_votes` is 0. Your test description is similar to the above-mentioned `missing inc_votes key` test, so I would just amend your current test to fit this test description i.e. send a body with no `inc_votes` key at all. (sending a patch request with 0 on the inc_votes key can be error-handled, but personally I wouldn't, as it's still a valid number!)

- `GET /api/reviews`

  - [x] Status 200, array of review objects (including `comment_count`, excluding `body`)
  - [x] Status 200, default sort & order: `created_at`, `desc`
  - [x] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [x] Status 200, accepts `order` query, e.g. `?order=desc`
  - [x] Status 200, accepts `category` query, e.g. `?category=dexterity`
  - [x] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [x] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [x] Status 404. non-existent `category` query, e.g. `?category=bananas`
    - do want to acknowledge that this test is present, we just need to amend the err code :)
  - [x] Status 200. valid `category` query, but has no reviews responds with an empty array of reviews, e.g. `?category=children's games`

- `GET /api/reviews/:review_id/comments`

  - [x] Status 200, array of comment objects for the specified review
  - [x] Status 400, invalid ID, e.g. string of "not-an-id"
  - [x] Status 404, non existent ID, e.g. 0 or 9999
  - [\] Status 200, valid ID, but has no comments responds with an empty array of comments
    - half check-marks for these two because they are present in your tests, but being handled together! May just need separating out and amending slightly

- `POST /api/reviews/:review_id/comments`

  - [x] Status 201, created comment object
    - we only need to return an object here since we are serving a single comment. Once this is amended in your code, you could come back to this test and remove the length and forEach assertions
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing required field(s), e.g. no username or body properties
  - [ ] Status 404, username does not exist
  - [ ] Status 201, ignores unnecessary properties

- `DELETE /api/comments/:comment_id`

  - [x] Status 204, deletes comment from database
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g "not-an-id"

- `GET /api`

  - [x] Status 200, JSON describing all the available endpoints

## Routing

- [x] Split into api, categories, users, comments and reviews routers
- [ ] Use `.route` for endpoints that share the same path

## Controllers

- [x] Name functions and variables well
  - some keys to be amended to singular
- [x] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
  - [x] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [x] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
    - just need to add greenlisting for order
  - [ ] Consistently use either single object argument _**or**_ multiple arguments in model functions
    - a very slight mix - we're using `queries` as the whole object but everything else is destructured in the controllers. You could argue that this is consistent within itslf though so it's up to your preference on this one! :)
  - [x] Use `LEFT JOIN` for comment counts
    - using `RIGHT JOIN`, but comments and reviews tables are in the corresponding positions too so this works!

## Errors

- [x] Use error handling middleware functions in app and extracted to separate directory/file
- [x] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `GET /api/users`

  - [x] Status 200, responds with array of user objects

- `GET /api/users/:username`

  - [x] Status 200, responds with single user object
    - similar to comments, we can serve just an object here, and call it 'user' on the key
  - [x] Status 404, non existent ID, e.g "not-an-id"
  - [ ] Status 400, invalid ID, e.g a number 9

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to comment.

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit a review body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an review by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get reviews created in last 10 minutes
- [ ] Get: Get all reviews that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for categories
