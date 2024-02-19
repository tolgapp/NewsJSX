import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSearchFetch } from "../context/Search.jsx";

const api = import.meta.env.VITE_API_KEY;

const FetchData = () => {
  const [news, setNews] = useState([]);
  const inputRef = useRef(null);

  const { search } = useSearchFetch();

  // Preload with Apple News
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=apple&sortBy=publishedAt&pageSize=40&language=de&apiKey=${api}`
      )
      .then((response) => setNews(response.data.articles));
  }, []);

  // user input with search value from the nav component
  useEffect(() => {
    const fetchData = async (e) => {
      if (search && (e.key === "Enter" || e.type === "submit")) {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${search}&language=de&apiKey=${api}`
        );
        setNews(response.data.articles);
        localStorage.setItem("data", JSON.stringify(news));
      }
    };

    // Binden der fetchData-Funktion an das onSubmit-Event oder an das keydown-Event
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", fetchData);
    }

    const formElement = document.querySelector("form");

    if (formElement) {
      formElement.addEventListener("submit", fetchData);
    }

    // Entfernen der Event-Listener beim Unmounten der Komponente
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keydown", fetchData);
      }

      if (formElement) {
        formElement.removeEventListener("submit", fetchData);
      }
    };
  }, [search]);

  const removeAuthorPrefix = (author) => {
    if (author?.startsWith("Von ") || author?.startsWith("von ")) {
      return author.slice(4);
    } else {
      return author;
    }
  };

  return (
    <>
      {news.map((elt) => (
        <section key={uuidv4()} className="p-2">
          {elt.urlToImage !== null ? (
            <div
              key={uuidv4()}
              className="flex justify-between p-8 h-80 place-items-center text-left w-6/7 border m-1 rounded-xl"
            >
              <img
                className="h-64 w-80"
                src={elt.urlToImage}
                alt={"Image related to: " + elt.description}
              />
              <section className="flex flex-col p-6 bg-slate-700">
                <h3 className="text-2xl p-1">{elt.title}</h3>
                <p className="text-xs p-1">
                  Von <strong>{removeAuthorPrefix(elt.author)}</strong>
                  <span>auf {elt.source.name}</span>
                </p>
                <p className="text-ml p-1">
                  {elt.description} <a href={elt.url}>[ Read more.. ]</a>
                </p>
              </section>
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
};

export default FetchData;
