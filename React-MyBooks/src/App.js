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
      Books: [],
      Searched: [],
      showSearchPage: false
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

  handleSearch = query => {
    if (query) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ Searched: [] });
        } else {
          this.setState({ Searched: books });
        }
      });
    } else {
      this.setState({ Searched: [] });
    }
  };


  syncShelf = (book) => {
    let matchingShelf = this.state.Books.filter(Book =>
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

  handleChange = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: [book].filter(b => b.id !== book)
          .concat(book)
      }))
    }
    )
  };

  render() {
    return (
      <div className="app">
        <Route path = {process.env.PUBLIC_URL + "/search"} render = {() => (
            <SearchBooks
              book={this.state.book}
              books={this.state.Searched}
              handleSearch={this.handleSearch}
              handleChange={this.handleChange}
              updateSearchedBooks={this.updateSearchedBooks}
            />
          )}
        />
        < Route exact path = {process.env.PUBLIC_URL + "/"} render = {() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <Shelf  books = {this.state.Books.filter(b => b.shelf === 'currentlyReading')}
                          shelf = "Currently Reading"
                          handleChange = {this.handleChange}/> 
                  < Shelf books = {this.state.Books.filter(b => b.shelf === 'wantToRead')}
                          shelf = "Want To Read"
                          handleChange = {this.handleChange}/> 
                  < Shelf books = {this.state.Books.filter(b => b.shelf === 'read')}
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
