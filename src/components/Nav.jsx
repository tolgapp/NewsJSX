import newsLight from "/images/news-light.png";

const Nav = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Works!')
  };

  return (
    <nav className="nav flex sticky bg-black top-0 w-full border justify-between p-4">
      <div className="flex place-items-center">
      <img className="size-10" src={newsLight} alt="News icon" />
      <h1 className="pl-2">NewsJSX</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-80 p-2 rounded-lg text-black"
          type="text"
          placeholder="Tesla? ChatGPT? .. search everything"
        />
        <input
          type="submit"
          value="Search"
          className="p-2 ml-1 bg-white rounded-lg text-black"
          onSubmit={(e) => e.target.value}
        />
      </form>
    </nav>
  );
};



export default Nav;