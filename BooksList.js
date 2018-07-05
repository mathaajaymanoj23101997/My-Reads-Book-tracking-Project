import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import BooksListDetail from './BooksListDetail';
import * as BooksAPI from '../BooksAPI';


class BooksList extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        BooksAPI.getAll().then(books => {
            const matchCR = new RegExp(escapeRegExp('currentlyReading'));
            let currentlyReading = books ? books.filter(book => matchCR.test(book.shelf)) : null;

            const matchWR = new RegExp(escapeRegExp('wantToRead'));
            let wantToRead = books ? books.filter(book => matchWR.test(book.shelf)) : null;

            const matchR = new RegExp(escapeRegExp('read'));
            let read = books ? books.filter(book => matchR.test(book.shelf)) : null;

            this.setState({ currentlyReading, wantToRead, read });
        });
    }
     handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => { 
            book.shelf = shelf        
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book)
      }))     
})
    }

    renderShelf(books, title) {
        return (
            <div className="bookshelf">
                <h2 className="titleshelf">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) =>
                            <BooksListDetail
                                key={index}
                                book={book}
                                handleBookShelf={this.handleBookShelf.bind(this)}
                            />)}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state;

        return (
            <div className="list-books">
                <div className="titlelist">
                    <h1>Book Tracking App</h1>
                </div>
                <div className="bookcontent">
                    <div>
                        {this.renderShelf(currentlyReading, 'Currently Reading')}
                        {this.renderShelf(wantToRead, 'Want to Read')}
                        {this.renderShelf(read, 'Read')}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                    >
                        Add a book
                    </Link>
                </div>
            </div>
        );
  }
}

export default BooksList;




























 