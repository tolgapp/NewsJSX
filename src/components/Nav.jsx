import newsLight from "/images/news-light.png";
import { useSearchFetch } from "../context/Search";
import { useEffect, useRef } from "react";

const Nav = () => {

  const inputRef = useRef(null);
  const { setSearch } = useSearchFetch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="nav flex sticky bg-slate-900 top-0 w-full justify-between p-8">
      <div className="flex place-items-center">
        <img className="size-10" src={newsLight} alt="News icon" />
        <h1 className="pl-2 font-mono">NewsJSX</h1>
      </div>
      <form onSubmit={handleSearch}>
        <input
          ref={inputRef}
          className="w-80 p-2 rounded-lg text-black"
          type="text"
          placeholder="Tesla? ChatGPT? .. everything!"
          onInput={(e) => setSearch(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
          className="p-2 ml-1 bg-white rounded-lg text-black"
        />
      </form>
    </nav>
  );
};


export default Nav;