import React from 'react';
import BookItems from "./BookItems";

class Shelf extends React.Component {

    render() {
        const {
            books,
            shelf,
            handleChange
        } = this.props;
        return ( 
        <div className = "bookshelf">
            <h2 className = "bookshelf-title"> {shelf} </h2> 
            <div className = "bookshelf-books">
            <ol className = "books-grid"> {
                books.map(book => ( 
                    <li key = {book.id}>
                    <BookItems book = {book} handleChange = {handleChange}/> 
                    </li>
                ))} 
                </ol> 
            </div> 
        </div>
        );
    }
}

export default Shelf;