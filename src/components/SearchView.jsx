import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchView extends Component {

	state = {
		query: '',
    books: [],
  } 

	updateQuery = (query) => {
		if(query === ''){
			this.setState(() => ({
				books: []
			}))
		} else {
			BooksAPI.search(query)
			.then((newBooks) => {

				if(newBooks.length > 0) {
					newBooks.map((book) => {
						var shelf = "none"
						this.props.books.find((b) => {
							if(book.id === b.id) 
								shelf = b.shelf
						})
						book.shelf = shelf
					})
				}

				this.setState(() => ({
					books: newBooks
				}))
			})
		}
	}

	render() {
		const { books } = this.state
			
		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
									
								*/}
								<input 
									type="text" 
									ref={(input) => { this.textInput = input; }} 
									placeholder="Search by title or author"
									onChange={debounce(500,() => {this.updateQuery(this.textInput.value)} )} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
							{(!books.error) && (books.length !== 0) && (books.map((book) => (
                <div key={book.id} ><Book book={book} onUpdateBook={this.props.onUpdateBook} />
                </div>
              )))}
							</ol>
							{(books.error) && (
								<p>No Results Found</p>
							)}
            </div>
      </div>
		)
	}
}

export default SearchView