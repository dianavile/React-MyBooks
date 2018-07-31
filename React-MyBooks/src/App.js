import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import Shelf from "./Shelf";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Books: []
    };
  }
   
  fetchAllBook() {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books });
    });
  }

  componentDidMount() {
    this.fetchAllBook();
  }

  handleChange = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: [book].filter(b => b.id !== book).concat(book)
      }))
    }
    )
  };
  

  /* This method verifies if the book is the library. If not, then the book is added directly.
     If book is in library, only update the property shelf of the book.
  */
  isBookOnShelf(bookFromSearchPage) {
    return this.state.Books.filter(book => book.id === bookFromSearchPage.id);	  
  }

  updateListBooks = (bookFromSearchPage, value) => {
    //const bookSearch = bookFromSearchPage;
    BooksAPI.update(bookFromSearchPage, value).then(() => {
	  let book = this.isBookOnShelf(bookFromSearchPage);	    
	
	  this.setState(state => {
	    if (book.length === 0) {
	      // Add new property shelf to new book added to the list of shelves.
	      bookFromSearchPage["shelf"] = value;
		  state.Books.concat(bookFromSearchPage);
	    }
	    else {
	      book[0].shelf = value;
	    }

        return { Books: state.Books }
	  });
    })
  }

  render() {
    return (
      <div className="app">
        <Route path = {process.env.PUBLIC_URL + "/search"} render = {() => (
            <SearchBooks
              books={this.state.Books}
              updateListBooks={this.updateListBooks}
            />
          )}
        />
        <Route exact path = {process.env.PUBLIC_URL + "/"} render = {() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <Shelf books = {this.state.Books.filter(b => b.shelf === 'currentlyReading')}
                        shelf = "Currently Reading"
                        handleChange = {this.handleChange}/> 
                  <Shelf books = {this.state.Books.filter(b => b.shelf === 'wantToRead')}
                        shelf = "Want To Read"
                        handleChange = {this.handleChange}/> 
                  <Shelf books = {this.state.Books.filter(b => b.shelf === 'read')}
                        shelf = "Read"
                        handleChange = {this.handleChange}/>
              </div>
              <div className="open-search">
                <Link to={process.env.PUBLIC_URL + "/search"}>Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
