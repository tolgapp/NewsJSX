import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FetchData = () => {
  const [news, setNews] = useState([]);

  // **** Funktioniert normal ****
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=apple&sortBy=publishedAt&pageSize=40&language=de&apiKey=1b17cead30934354ae3e637d14a92ba6"
      )
      .then((response) => setNews(response.data.articles));
  }, []);

  // **** >> https://stackoverflow.com/questions/53239925/react-passing-fetched-data-to-another-component

  //  useEffect(() => {
  //   const fetchData = async () => {
  //     if (search) {
  //       const response = await axios.get(`https://newsapi.org/v2/everything?q=${search}&language=de&apiKey=1b17cead30934354ae3e637d14a92ba6`);
  //       setNews(response.data.articles);
  //     } else {
  //       setNews([]);
  //     }
  //   };

  //   fetchData();
  // }, [search]);

 

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
        <>
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
                  Von <strong>{removeAuthorPrefix(elt.author)}</strong>{" "}
                  <span>auf {elt.source.name}</span>
                </p>
                <p className="text-ml p-1">
                  {elt.description} <a href={elt.url}>[Read more..]</a>
                </p>
              </section>
            </div>
          ) : null}
        </>
      ))}
    </>
  );
};

export default FetchData;
