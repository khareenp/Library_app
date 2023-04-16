import React, { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import axios from "axios";
import SpinnerLoading from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

const SearchBooksPage = () => {
  //useState takes variable and function to update state
  // ""       ""      ""  = useState<BookModelarray>[](typearray[])
  const [books, setBooks] = useState<BookModel[]>([]);

  //state to show some type of loading while API is fetching books
  //will start as loading and when all books retrieved then turn loading state off and show books
  const [isLoading, setIsLoading] = useState(true);

  //state if API request returns an error
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }
      try {
        const responseJson = await axios.get(url);
        const responseData = responseJson.data._embedded.books; //get data from json

        setTotalAmountOfBooks(responseJson.data.page.totalElements);
        setTotalPages(responseJson.data.page.totalPages);

        const loadedBooks: BookModel[] = []; //create array to store books

        for (const key in responseData) {
          loadedBooks.push({
            id: responseData[key].id,
            title: responseData[key].title,
            author: responseData[key].author,
            description: responseData[key].description,
            copies: responseData[key].copies,
            copiesAvailable: responseData[key].copiesAvailable,
            category: responseData[key].category,
            img: responseData[key].img,
          });
        }

        setBooks(loadedBooks);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    //catch to make sure there are no errors
    //but if there is an error of type: any
    //loadingstate is false , display error message

    fetchBooks().catch((error: any) => {
      //if error detected turn loading off and sethttperror
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0); //scroll to top each time page changes
  }, [currentPage, searchUrl]); //each time current page changes , recall useeffect( for pagination )

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`
      );
    }
  };

  const indexOfLastbook: number = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastbook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  type="search"
                  placeholder="search"
                  aria-labelledby="search"
                  className="form-control me-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of results: ({totalAmountOfBooks})</h5>
          </div>
          <p>
            {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items
          </p>
          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
