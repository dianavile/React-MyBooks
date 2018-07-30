import React from "react";
import BookItems from "./BookItems";

export default function Read(props) {
    const {books, shelf, handleChange } = props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === shelf).map(book => (
              <li key={book.id}>
                <BookItems book={book} handleChange = {handleChange}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
}