function findAccountById(accounts, id) {
  return accounts.find(tag => tag.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((person1, person2) => (person1.name.last > person2.name.last ? 1 : -1))
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0
  const accId = account.id
  books.forEach(book => book.borrows.forEach(borrow => (accId === borrow.id ? total += 1 : 0)))
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksOut = []
  books.forEach(book => {
    if (book.borrows.find(borrow => borrow.id === account.id && !borrow.returned)) {
      booksOut.push(book)
    }
  })
  booksOut.forEach(book => {
    let author = authors.find(person => person.id === book.authorId)
    book["author"] = author
  })
  return booksOut
}
 
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
