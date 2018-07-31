import React from "react";

export default class BookPage extends React.Component {
    render() {
        const { book, handleChange, option, updateListBooks } = this.props;
        const style = {
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ""})`
        }
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}/>
          <div className="book-shelf-changer">
		    {option === "eventForListIndexPage" ? (
			  <select value={book.shelf} onChange={(event) => handleChange(book, event.target.value)}>
			    <option value="none" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			  </select>
			  ) : (
			    <select value={book.shelf} onChange={(event) => updateListBooks(book, event.target.value)}>
			      <option value="none" disabled>Move to...</option>
				  <option value="currentlyReading">Currently Reading</option>
				  <option value="wantToRead">Want to Read</option>
				  <option value="read">Read</option>
				  <option value="none">None</option>
			    </select>
			  )
			}
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
}
}
