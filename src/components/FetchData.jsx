import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FetchData = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=apple&language=de&apiKey=1b17cead30934354ae3e637d14a92ba6"
      )
      .then((response) => setNews(response.data.articles));
  }, []);

  return (
    <>
      {news.map((elt) => (
        <>
        {elt.urlToImage != null ? <div
          key={uuidv4()}
          className="flex justify-between p-8 h-80 place-items-center text-left w-full rounded-sm"
        >
          <img
            className="h-52"
            src={elt.urlToImage}
            alt={"Image related to: " + elt.description}
          />
          <section className="flex flex-col p-6 bg-slate-700">
            <h3 className="text-2xl p-1">{elt.title}</h3>
            <p className="text-xs p-1">Von <strong>{elt.author}</strong> <span>auf {elt.source.name}</span></p>
            <p className="text-ml p-1">
              {elt.description} <a href={elt.url}>[Read more..]</a>
            </p>
          </section>
        </div>: null}
        </>
        
      ))}
    </>
  );
};

export default FetchData;
