import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksListDetail from './BooksListDetail';
import * as BooksAPI from '../BooksAPI';


class SearchPage extends Component {
  state = {
      books: [],
      searchResults:[],  
      query: ''
  };

  handleUpdateQuery=(query) => {      
        BooksAPI.search(query,30).then((books) => {
          if(!!books){
            if(books.length>0){
              const results = books.map((book) => {
                const existingBook = this.state.books.find((b) => b.id === book.id)
                book.shelf = !!existingBook ? existingBook.shelf : 'none'
                return book
              });
              this.setState({ results,books })
            }else {
              
              this.setState({books})
            }  

          }
          console.log(books)
        })
        this.setState({query})

      }

  handleBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => shelf !== "none" ? alert(`${book.title} has been added to your required shelf!`) : "none")
        .catch(() => alert('Something went wrong! Please try again!'));
        
  }

  renderSearchResults() {
      const { books, query } = this.state;

      if (query) {
        return (books.error) ? (<div>No results found</div>) : (books.map((book, index) =>{
          return (
            <BooksListDetail
              key={index}
              book={book}
              handleBookShelf={this.handleBookShelf.bind(this)}
            />)
        }));
      }

  }


    render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to='/'
              className='close-search'
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={e => this.handleUpdateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="booksearchresult">
            <ol className="books-grid">
                {this.renderSearchResults()}
            </ol>
          </div>
        </div>
      );
  }
}

export default SearchPage;

