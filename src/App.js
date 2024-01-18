import iconMoon from "./images/icon-moon.svg";
import iconSun from "./images/icon-sun.svg";
import iconSearch from "./images/icon-search.svg";
import iconLocation from "./images/icon-location.svg";
import iconWebsite from "./images/icon-website.svg";
import iconTwitter from "./images/icon-twitter.svg";
import iconCompany from "./images/icon-company.svg";
import { useState, useEffect } from "react";
import { format } from "date-fns";
// const url = "https://api.github.com/users/mojombo";

const App = () => {
  // Form
  const [form, setForm] = useState("");

  // Api
  const [url, setUrl] = useState("https://api.github.com/users/octocat");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [created, setCreated] = useState("");
  const [bio, setBio] = useState("");
  const [repos, setRepos] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [company, setCompany] = useState("");

  // No results
  const [noResults, setNoResults] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search Github username...");

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const textDark = document.querySelector(".theme-wrapper h5");
    const moonIcon = document.querySelector(".theme-wrapper img");
    const body = document.querySelector("body");
    const headerH2 = document.querySelector(".header-container h2");
    const input = document.querySelector("form input");
    const article = document.querySelector(".info-container");
    const name = document.querySelector(".main-info div h3");
    const joined = document.querySelector(".main-info div p:last-of-type");
    const bio = document.querySelector(".bio");
    const statisticInfo = document.querySelector(".statistic-info");
    const headingsH5 = document.querySelector(".statistic-info div h5");

    if (darkMode === false) {
      textDark.textContent = "Dark";
      textDark.style.color = "#4b6a9b";
      body.style.backgroundColor = "#f6f8ff";
      moonIcon.src = iconMoon;
      headerH2.style.color = "#222731";
      input.style.backgroundColor = "#fefefe";
      input.style.color = "#768fb3";
      input.style.boxShadow = "0px 5px 15px #a5abc0";
      article.style.boxShadow = "0px 5px 15px #a5abc0";
      article.style.backgroundColor = "#fefefe";
      name.style.color = "#222731";
      joined.style.color = "#8c9ab1";
      bio.style.color = "#6580a9";
      statisticInfo.style.backgroundColor = "#f6f8ff";
      headingsH5.style.color = "#6580a9";
    } else {
      textDark.textContent = "Light";
      textDark.style.color = "#f2f3f4";
      body.style.backgroundColor = "#141d2f";
      moonIcon.src = iconSun;
      headerH2.style.color = "#f2f3f4";
      input.style.backgroundColor = "#1e2a47";
      input.style.color = "#fefefe";
      input.style.boxShadow = "none";
      article.style.boxShadow = "none";
      article.style.backgroundColor = "#1e2a47";
      name.style.color = "#fefefe";
      joined.style.color = "#fefefe";
      bio.style.color = "#fefefe";
      statisticInfo.style.backgroundColor = "#141d2f";
      headingsH5.style.color = "#fefefe";
    }

    setDarkMode(!darkMode);
  };

  // Form function
  const formSubmit = (event) => {
    event.preventDefault();
    const apiUrl = `https://api.github.com/users/${form}`;
    setUrl(apiUrl);
    // setForm("");
  };

  // Api function
  const getUser = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      setImage(data.avatar_url);
      setName(data.name);
      setLogin(data.login);
      setCreated(format(new Date(data.created_at), "dd MMM yyyy"));
      setBio(data.bio);
      setRepos(data.public_repos);
      setFollowers(data.followers);
      setFollowing(data.following);
      setLocation(data.location);
      setWebsite(data.blog);
      setTwitter(data.twitter_username);
      setCompany(data.company);
      setNoResults(false);
      setPlaceholder("Search Github username...");
    } catch (error) {
      console.error("Error getting data from API", error);
      setNoResults(true);
      setPlaceholder("");

      setImage("");
      setName("");
      setLogin("");
      setCreated("");
      setBio("");
      setRepos("");
      setFollowers("");
      setFollowing("");
      setLocation("");
      setWebsite("");
      setTwitter("");
      setCompany("");
    }
  };

  useEffect(() => {
    if (url) {
      getUser(url);
      setForm("");
    }
  }, [url]);

  return (
    <section className="card-wrapper">
      <div className="header-container">
        <h2>devfinder</h2>
        <div className="theme-wrapper" onClick={toggleDarkMode}>
          <h5>Dark</h5>
          <img src={iconMoon} alt="" />
        </div>
      </div>

      <form onSubmit={formSubmit}>
        <img src={iconSearch} alt="" />
        <input
          type="text"
          placeholder={placeholder}
          value={form}
          onChange={(event) => setForm(event.target.value)}
        />
        {noResults && <p>No results</p>}
        <button type="submit">Search</button>
      </form>

      <article className="info-container">
        <section className="basic-info">
          <div className="main-info">
            <img src={image} alt="" />
            <div>
              <h3>{name}</h3>
              <p>{"@" + login}</p>
              <p>{"Joined " + created}</p>
            </div>
          </div>
          <p className="bio">
            {bio ||
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
          </p>
        </section>

        <section className="statistic-info">
          <div>
            <h5>Repos</h5>
            <p>{repos || "0"}</p>
          </div>
          <div>
            <h5>Followers</h5>
            <p>{followers || "0"}</p>
          </div>
          <div>
            <h5>Following</h5>
            <p>{following || "0"}</p>
          </div>
        </section>

        <section className="contact-info">
          <div>
            <img src={iconLocation} alt="" />
            <p>{location || "Not available"}</p>
          </div>
          <div>
            <img src={iconWebsite} alt="" />
            <p>
              <a href={website}>{website || "Not available"}</a>{" "}
            </p>
          </div>
          <div>
            <img src={iconTwitter} alt="" />
            <p>{twitter || "Not available"}</p>
          </div>
          <div>
            <img src={iconCompany} alt="" />
            <p>{company || "Not available"}</p>
          </div>
        </section>
      </article>
    </section>
  );
};

export default App;
