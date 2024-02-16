import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FetchData = ({ search }) => {
  const [news, setNews] = useState([]);
  const inputRef = useRef(null);

  // Preload with Apple News
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=apple&sortBy=publishedAt&pageSize=40&language=de&apiKey=1b17cead30934354ae3e637d14a92ba6"
      )
      .then((response) => setNews(response.data.articles));
    localStorage.setItem("data", JSON.stringify(news));
    console.log("Data fetched and stored in local storage:", news);
  }, []);


  

  useEffect(() => {
    const fetchData = async (e) => {
      if (search && (e.key === "Enter" || e.type === "submit")) {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${search}&language=de&apiKey=1b17cead30934354ae3e637d14a92ba6`
        );
        setNews(response.data.articles);
        localStorage.setItem("data", JSON.stringify(news));
      }
    };
  
    // Binden Sie die fetchData-Funktion an das onSubmit-Event oder an das keydown-Event  
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", fetchData);
    }
  
    const formElement = document.querySelector("form");
  
    if (formElement) {
      formElement.addEventListener("submit", fetchData);
    }
  
    // Entfernen Sie die Event-Listener beim Unmounten der Komponente
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
        <section key={uuidv4()}>
          {elt.urlToImage !== null ? (
            <div
              key={uuidv4()}
              className="flex justify-between p-8 h-80 place-items-center text-left w-full rounded-sm"
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
