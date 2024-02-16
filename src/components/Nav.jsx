import newsLight from "/images/news-light.png";

const Nav = ({handleSearch, setSearch}) => {

  return (
    <nav className="nav flex sticky bg-black top-0 w-full border justify-between p-4">
      <div className="flex place-items-center">
        <img className="size-10" src={newsLight} alt="News icon" />
        <h1 className="pl-2">NewsJSX</h1>
      </div>
      <form onSubmit={handleSearch}>
        <input
          className="w-80 p-2 rounded-lg text-black"
          type="text"
          placeholder="Tesla? ChatGPT? .. search everything"
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


