import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/Bookshelf'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import SearchView from './components/SearchView'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books: books
      })) 
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      const updatedBooks = this.state.books.filter((b) => {
        return b.id !== book.id
      })
      book.shelf = shelf
      this.setState((currentState) => ({
        books: updatedBooks.concat([book])
      })) 
    })
  }

  addBookToShelf = {}

  render() {
    const currentlyReading = this.state.books.filter((b) => { return b.shelf === 'currentlyReading'})
    const wantToRead = this.state.books.filter((b) => {return b.shelf === 'wantToRead' })
    const read = this.state.books.filter((b) => { return b.shelf === 'read' })

    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf title={"Currenlty Reading"} books={currentlyReading} onUpdateBook={this.updateBook}/>
              <BookShelf title={"Want to Read"} books={wantToRead} onUpdateBook={this.updateBook}/>
              <BookShelf title={"Read"} books={read} onUpdateBook={this.updateBook}/>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button >Add a book</button>
              </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchView books={this.state.books} onUpdateBook={this.updateBook}/>
        )} />
      </div>
    )
  }
}

export default BooksApp