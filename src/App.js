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
  const [url, setUrl] = useState("");
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
      // setPeople((data[0]?.population / 1000000).toFixed(2));
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
        <img src={iconSearch} alt="" />
        <input
          type="text"
          placeholder="Search Github username..."
          value={form}
          onChange={(event) => setForm(event.target.value)}
        />
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
            {bio +
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem repellendus in et perferendis."}
          </p>
        </section>

        <section className="statistic-info">
          <div>
            <h5>Repos</h5>
            <p>{repos}</p>
          </div>
          <div>
            <h5>Followers</h5>
            <p>{followers}</p>
          </div>
          <div>
            <h5>Following</h5>
            <p>{following}</p>
          </div>
        </section>

        <section className="contact-info">
          <div>
            <img src={iconLocation} alt="" />
            <p>{location}</p>
          </div>
          <div>
            <img src={iconWebsite} alt="" />
            <p>{website}</p>
          </div>
          <div>
            <img src={iconTwitter} alt="" />
            <p>{twitter}</p>
          </div>
          <div>
            <img src={iconCompany} alt="" />
            <p>{company}</p>
          </div>
        </section>
      </article>
    </section>
  );
};

export default App;
