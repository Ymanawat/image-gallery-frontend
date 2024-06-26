import React, { useEffect, useState } from "react";
import CardComponent from "./cardComponent";
import { Button } from "./button";
import { restapiImageURL } from "../../../constants";

const ImageGrid = ({ initialPageNo = 1, offset }) => {
  const [cardData, setCardData] = useState([]);
  const [pageNo, setPageNo] = useState(initialPageNo);
  const [nextPageExists, setNextPageExists] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    debounce(setDebouncedQuery, 1000)(event.target.value);
  };

  const fetchData = async (page, tags) => {
    try {
      const tagsQuery = tags.join(",");
      const response = await fetch(
        `${restapiImageURL}/retrieve?page=${page}&tags=${tagsQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setCardData(data.data);
      setNextPageExists(data.pagination.nextPageExists);
      console.log(nextPageExists);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const tags = debouncedQuery.split(/[\s,]+/).filter(Boolean);
    fetchData(pageNo, tags);
  }, [pageNo, debouncedQuery]);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    if (nextPageExists) {
      setPageNo(pageNo + 1);
      console.log(pageNo);
    }
  };

  return (
    <div>
      <div className="m-8 w-600 max-w-400">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            unique_id={card.unique_id}
            image_url={card.image || card.image_url}
            tags={card.tags}
          />
        ))}
      </div>
      <div className="pagination m-8 space-x-4">
        <Button
          onClick={handlePrev}
          disabled={pageNo === 1}
          className="bg-blue-600 hover:bg-blue-400 rounded text-white"
        >
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={!nextPageExists}
          className="bg-blue-600 hover:bg-blue-400 rounded text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ImageGrid;
