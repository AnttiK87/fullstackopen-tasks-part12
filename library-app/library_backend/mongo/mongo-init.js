/* eslint-disable no-undef */
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'library_database',
    },
  ],
})

db.createCollection('authors')
db.createCollection('books')
db.createCollection('users')

db.users.insert({ username: 'anttik', favoriteGenre: 'crime' })
