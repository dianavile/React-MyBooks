import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookPage from "./BookPage";

export default class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: ''
		};
	}

	updateQuery = (query) => {
		this.setState({ searchQuery: query });
		this.props.updateSearchedBooks(query)
	}
  render() {
    const { searchQuery } = this.state;

    const { books, updateSearchedBooks, handleChange } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link
									to="/"
									className="close-search"
							/>
          <div className="search-books-input-wrapper">
					<input
						className="search-input"
						type="text"
						placeholder="Search Books..."
						value={searchQuery}
						onChange={(event) => 
							this.updateQuery(event.target.value)
						}
					/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <BookPage book={book} handleChange={handleChange} updateSearchedBooks={updateSearchedBooks} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
