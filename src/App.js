import iconMoon from "./images/icon-moon.svg";
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
        <div className="theme-wrapper">
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
          <p>
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
