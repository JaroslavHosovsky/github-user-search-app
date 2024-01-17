import iconMoon from "./images/icon-moon.svg";
import { useState, useEffect } from "react";
// const url = "https://api.github.com/users/mojombo";

const App = () => {
  // Form
  const [form, setForm] = useState("");

  // Api
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  // Form function
  const formSubmit = (event) => {
    event.preventDefault();
    const apiUrl = `https://api.github.com/users/${form}`;
    setUrl(apiUrl);
    setForm("");
  };

  // Api function
  const getUser = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      // setName(data[0]?.altSpellings[1]);
      setImage(data.avatar_url);
      // setPeople((data[0]?.population / 1000000).toFixed(2));
    } catch (error) {
      console.error("Chyba při získávání dat z API", error);
    }
  };

  useEffect(() => {
    if (url) {
      getUser(url);
    }
  }, [url]);

  return (
    <section className="card-wrapper">
      <div className="header-container">
        <h2>devfinder</h2>
        <div className="theme-wrapper">
          <h5>Dark</h5>
          <img src={iconMoon} alt="" />
        </div>
      </div>

      <form onSubmit={formSubmit}>
        <img src="" alt="" />
        <input
          type="text"
          placeholder="Search Github username..."
          value={form}
          onChange={(event) => setForm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default App;
