function getTotalBooksCount(books) {
  return books.reduce((counter, obj) => counter + 1, 0)
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((counter, obj) => counter + 1, 0)
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = books.filter((book) => {
    if (!book.borrows[0].returned) {
      return book
    }
  })
  return borrowedBooks.reduce((total, obj) => total + 1, 0)
}

function getMostCommonGenres(books) {
  const genresWithKeyValue = []
  const allBookGenres = books.map(book => book.genre)
  let filteredBookGenres = [...new Set(allBookGenres)];
  filteredBookGenres.forEach(genre => {
    let counter = genreCount(books, genre)
    let obj = {name:genre, count:counter}
    genresWithKeyValue.push(obj)
  })
  const sortedGenres = genresWithKeyValue.sort((one, two) => two.count - one.count)
  return sortedGenres.slice(0,5)
}

function genreCount(books, genre) {
  let count = 0
  books.forEach(book => {
    if (book.genre === genre) {
      count += 1
    }
  })
   return count
}

function getMostPopularBooks(books) {
  const popBooks = books.map(book => ({name:book.title, count:book.borrows.length}))
  popBooks.sort((one, two) => two.count - one.count)
  return popBooks.slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  let authorsWithCountBooks = authors.map((author) => {
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: authorPopularity(books, author.id)
    }
  })
  let sortedAuthors = authorsWithCountBooks.sort(
    (one, two) => two.count - one.count
  )
  return sortedAuthors.slice(0, 5)
}

function authorPopularity(books, authorId) {
  let checkOutCounter = 0;
  let booksByAuthor = books.filter((book) => {
    if (book.authorId === authorId) {
      return book;
    }
  });
  booksByAuthor.forEach((book) => {
    checkOutCounter += book.borrows.length;
  });
  return checkOutCounter;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};