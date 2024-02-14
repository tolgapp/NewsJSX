import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const FetchData = () => {

    const [news, setNews] = useState([]);
    
    useEffect(() => {
        const getNewsData = () => {
            axios
            .get(
                "https://newsapi.org/v2/everything?q=apple&language=de&apiKey=1b17cead30934354ae3e637d14a92ba6"
                )
                .then((response) => {setNews(response.data.articles);
        })
        .catch((error) => console.log(error));
    };
    getNewsData();
  }, [setNews]);


  return (
    <div>
      <h2>User List</h2>
      <ul>
        {news.map((elt) => (
          <li key={uuidv4}>{elt.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
