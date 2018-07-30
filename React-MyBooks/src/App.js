import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Read from "./Read";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import SearchBooks from "./SearchBooks";

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
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({ Books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              book={this.state.book}
              books={this.state.Searched}
              handleSearch={this.handleSearch}
              handleChange={this.handleChange}
              updateSearchedBooks={this.updateSearchedBooks}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentlyReading
                    books={this.state.Books}
                    shelf="currentlyReading"
                    handleChange={this.handleChange}
                  />
                  <WantToRead
                    books={this.state.Books}
                    shelf="wantToRead"
                    handleChange={this.handleChange}
                  />
                  <Read
                    books={this.state.Books}
                    shelf="read"
                    handleChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="add-books" />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
