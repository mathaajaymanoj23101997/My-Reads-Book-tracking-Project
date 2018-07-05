import React from 'react';


const BooksListDetail = ({ book, handleBookShelf }) => {

        const imageThumb = book.imageLinks ? book.imageLinks.smallThumbnail : null;

        return (
            <li>
                <div className="myreads">
                    <div className="book-top">
                        <div className="coverofbook" style={{ width: 128, height: 193, backgroundImage: `url(${imageThumb})` }}></div>
                            <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={(event) => handleBookShelf(book, event.target.value)}  >
                                    <option disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                    <div className="titleofbook">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
};

export default BooksListDetail;
