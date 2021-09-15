function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let allBooks = []
  const returnedBooks = books.filter((book) => {
    if (book.borrows[0].returned) {
      return book
    }  
  })
  const borrowedBooks = books.filter((book) => {
    if (!book.borrows[0].returned) {
      return book
    }
  })
  allBooks.push(borrowedBooks)
  allBooks.push(returnedBooks)
  return allBooks
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow => {
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] =  borrow.returned;
    result.push(obj);
  })
  console.log(result);
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
