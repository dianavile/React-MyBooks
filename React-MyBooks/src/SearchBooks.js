import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookPage from "./BookPage";

export default class SearchBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Searched: [],
			searchQuery: ''
		};
	}

	updateQuery = (query) => {
		this.setState({ searchQuery: query });
		this.updateSearchedBooks(query);
	}
	
	syncShelf = (book) => {
		let matchingShelf = this.state.Searched.filter(Book =>
		  book.id === Book.id
		)
		return matchingShelf.length ? matchingShelf[0].shelf : undefined
	  }
	
	updateSearchedBooks = (query) => {
		let searchedBooksShelf
		if (query) {
		  BooksAPI.search(query).then(books => {
			if (books.error) {
			  this.setState({ Searched: [] })
			} else {
			  searchedBooksShelf = books.map(book => {
				book.shelf = this.syncShelf(book);
				return book;
			  })
			  this.setState({ Searched: searchedBooksShelf })
			}
		  })
		} else {
		  this.setState({ Searched: [] })
		}
      }
	
   existBooksOnQueryResult(books) {
	for (let bookFromSearch of this.state.Searched) {
		for (const book of books) {
			if (bookFromSearch.id === book.id) {
				bookFromSearch.shelf = book.shelf;
				break;
			}
		}
	}
  }
	
  render() {
    const { searchQuery } = this.state;
   const { books, updateListBooks } = this.props;
   this.existBooksOnQueryResult(books);

    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link to="/" className="close-search"/>
          <div className="search-books-input-wrapper">
					<input
						className="search-input"
						type="text"
						placeholder="Search Books..."
						value={searchQuery}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.Searched.map(book => (
              <li key={book.id}>
		 <BookPage book={book} option={"eventForListSearchPage"} updateListBooks={updateListBooks} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
