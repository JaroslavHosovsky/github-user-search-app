import iconMoon from "./images/icon-moon.svg";
import iconSun from "./images/icon-sun.svg";
import iconSearch from "./images/icon-search.svg";
import iconLocation from "./images/icon-location.svg";
import iconWebsite from "./images/icon-website.svg";
import iconTwitter from "./images/icon-twitter.svg";
import iconCompany from "./images/icon-company.svg";
import { useState, useEffect } from "react";
import { format } from "date-fns";

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
    const divTheme = document.querySelector(".header-container div");
    const body = document.querySelector("body");
    const headerH2 = document.querySelector(".header-container h2");
    const input = document.querySelector("form input");
    const article = document.querySelector(".info-container");
    const name = document.querySelector(".main-info div h3");
    const joined = document.querySelector(".main-info div p:last-of-type");
    const bio = document.querySelector(".bio");
    const statisticInfo = document.querySelector(".statistic-info");
    const headingsH5 = document.querySelectorAll(".statistic-info div h5");
    const images = document.querySelectorAll(".contact-info-img");
    const paragraphs = document.querySelectorAll(".contact-info div p");
    const anchorTag = document.querySelector(".contact-info div p a");
    const numberStats = document.querySelectorAll(".statistic-info div p");

    if (darkMode === false) {
      divTheme.classList.remove("theme-wrapper-dark");
      divTheme.classList.add("theme-wrapper");
      if (divTheme.classList.contains("theme-wrapper")) {
        const textLight = document.querySelector(".theme-wrapper h5");
        const moonIcon = document.querySelector(".theme-wrapper img");
        textLight.textContent = "Dark";
        moonIcon.src = iconMoon;
      }

      body.style.backgroundColor = "#f6f8ff";
      headerH2.style.color = "#222731";
      input.style.backgroundColor = "#fefefe";
      input.style.color = "#768fb3";
      input.style.boxShadow = "0px 5px 15px #a5abc0";
      input.classList.remove("input-dark");
      input.classList.add("input-light");

      article.style.boxShadow = "0px 5px 15px #a5abc0";
      article.style.backgroundColor = "#fefefe";
      name.style.color = "#222731";
      joined.style.color = "#8c9ab1";
      bio.style.color = "#6580a9";
      statisticInfo.style.backgroundColor = "#f6f8ff";
      anchorTag.style.color = "#4b6a9b";

      headingsH5.forEach((heading) => {
        heading.style.color = "#6580a9";
      });

      numberStats.forEach((number) => {
        number.style.color = "#2c3543";
      });

      images.forEach((image) => {
        image.style.filter = "none";
      });

      paragraphs.forEach((paragraph) => {
        paragraph.style.color = "#4b6a9b";
      });
    } else {
      divTheme.classList.remove("theme-wrapper");
      divTheme.classList.add("theme-wrapper-dark");
      if (divTheme.classList.contains("theme-wrapper-dark")) {
        const textLight = document.querySelector(".theme-wrapper-dark h5");
        const sunIcon = document.querySelector(".theme-wrapper-dark img");
        textLight.textContent = "Light";
        sunIcon.src = iconSun;
      }
      body.style.backgroundColor = "#141d2f";
      headerH2.style.color = "#f2f3f4";
      input.style.backgroundColor = "#1e2a47";
      input.style.color = "#fefefe";
      input.style.boxShadow = "none";
      input.classList.remove("input-light");
      input.classList.add("input-dark");

      article.style.boxShadow = "none";
      article.style.backgroundColor = "#1e2a47";
      name.style.color = "#fefefe";
      joined.style.color = "#fefefe";
      bio.style.color = "#fefefe";
      statisticInfo.style.backgroundColor = "#141d2f";
      anchorTag.style.color = "#fefefe";

      headingsH5.forEach((heading) => {
        heading.style.color = "#fefefe";
      });

      numberStats.forEach((number) => {
        number.style.color = "#fefefe";
      });

      images.forEach((image) => {
        image.style.filter =
          "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%) hue-rotate(82deg) brightness(109%) contrast(99%)";
      });

      paragraphs.forEach((paragraph) => {
        paragraph.style.color = "#fefefe";
      });
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
          className="input-light"
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
          <p className="bio">{bio || "This profile has no bio"}</p>
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
          <div className="media-divider">
            <div className="center-content">
              <img
                src={iconLocation}
                className="contact-info-img location"
                alt=""
              />
              <p>{location || "Not available"}</p>
            </div>
            <div>
              <img src={iconWebsite} className="contact-info-img" alt="" />
              <p>
                <a href={website}>{website || "Not available"}</a>{" "}
              </p>
            </div>
          </div>

          <div className="media-divider">
            <div>
              <img src={iconTwitter} className="contact-info-img" alt="" />
              <p>{twitter || "Not available"}</p>
            </div>
            <div>
              <img src={iconCompany} className="contact-info-img" alt="" />
              <p>{company || "Not available"}</p>
            </div>
          </div>
        </section>
      </article>
    </section>
  );
};

export default App;
