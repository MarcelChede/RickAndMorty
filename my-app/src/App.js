import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./components/logo.png";
import LoadPage from "./Loading";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    console.log("Updated search results:", searchResults);
  }, [searchResults]);

  const handleSearch = async (_, page) => {
    setShowLoading(true);
    console.log("Search clicked. Search text:", searchText);
    try {
      const result = await fetch(
        `http://127.0.0.1:5000/characters?name=${encodeURIComponent(
          searchText
        )}&page=${encodeURIComponent(page || 1)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await result.json();
      setSearchResults(data.items);
      setTotalPage(data.total_pages);
      setCurrentPage(page || 1);
    } catch (e) {
      console.error("Erro ao fazer a requisição:", e);
    }

    setShowLoading(false);
  };

  return (
    <div className="App">
      {!showLoading ? (
        <LoadPage />
      ) : (
        <>
          <div className="App-header">
            <img src={logo} alt="logo" />
            <div className="pesquisa">
              <input
                type="text"
                placeholder="Search characters"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={() => handleSearch()}>Search</button>
            </div>
          </div>

          <Results searchResults={searchResults} />

          {searchResults.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              handleSearch={handleSearch}
            />
          )}
        </>
      )}
    </div>
  );
}

const Results = ({ searchResults }) => {
  return (
    <div className="Results">
      <div className="CardGrid">
        {searchResults.map((item) => (
          <div
            className={`Card ${item.status === "Dead" ? "Dead" : ""}`}
            key={item.id}
          >
            <div className="CardImage">
              <img src={item.image} alt="" />
            </div>
            <div className="TextCard">
              <p className="CardNameText">{item.name}</p>
              <p className="CardSpeciesText">{item.species}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPage, handleSearch }) => {
  const getPageNumbers = () => {
    const limit = 6;
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(limit / 2));
    let endPage = Math.min(totalPage, startPage + limit - 1);

    if (totalPage > limit) {
      if (endPage === totalPage) {
        startPage = Math.max(1, totalPage - limit + 1);
      } else if (startPage === 1) {
        endPage = limit;
      } else {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (totalPage > limit && endPage < totalPage) {
      if (totalPage - endPage === 1) {
        pageNumbers.push(endPage + 1);
      } else {
        pageNumbers.push("...");
        pageNumbers.push(totalPage);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="PaginationConfig">
      <button
        className="PageLimit"
        disabled={currentPage === 1}
        onClick={() => handleSearch(null, currentPage - 1)}
      >
        {"<"}
      </button>
      {getPageNumbers().map((number, index) => {
        const className =
          number === currentPage ? "buttonFooter selected" : "buttonFooter";
        return (
          <button
            className={className}
            key={index}
            onClick={() => {
              if (typeof number === "number") {
                handleSearch(null, number);
              }
            }}
          >
            {number}
          </button>
        );
      })}
      <button
        className="PageLimit"
        disabled={currentPage === totalPage}
        onClick={() => handleSearch(null, currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default App;
