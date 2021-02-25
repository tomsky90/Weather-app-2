const APIkey = "a401cd603ee800caa57e2a96c2193dbe";
const imgs = ["./img/sun.png", "./img/cloud.png"];

class App extends React.Component {
  state = {
    flag: false,
    search: false,
    value: "London",
    date: "",
    city: "",
    temp: "",
    weather: "",
    list: [],
    error: false,
  };

  handleInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault(e);
    const API = this.state.search;
    if (
      this.state.search ===
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=metric&appid=${APIkey}`
    ) {
      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało sie");
        })
        .then((response) => response.json())
        .then((data) => {
          const todaydate = new Date().toLocaleString().slice(0, 10);
          this.setState({
            date: todaydate,
            city: this.state.value,
            list: data.list.slice(0, 14),
            error: false,
            value: "",
            flag: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: true,
            value: "",
            date: "",
            city: "",
            list: [],
          });
        });
    } else if (
      this.state.search ===
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&APPID=${APIkey}`
    ) {
      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało sie");
        })
        .then((response) => response.json())
        .then((data) => {
          const todaydate = new Date().toLocaleString().slice(0, 10);
          const temperature = (data.main.temp * 1).toFixed(1);
          this.setState({
            date: todaydate,
            city: this.state.value,
            temp: temperature,
            weather: data.weather[0].description,
            error: false,
            value: "",
            flag: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: true,
            value: "",
            date: "",
            city: "",
            temp: "",
            weather: "",
          });
        });
    } else {
      alert("choose one option");
    }
  };
  handleWeatherSelect = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  render() {
    let weatherImg = "";
    const infoList = this.state.list.map((item) => {
      if (item.weather[0].main === "Clouds") {
        weatherImg = <img src="./img/cloud.png" />;
      } else if (item.weather[0].main === "Clear") {
        weatherImg = <img src="./img/sun.png" />;
      }
      return (
        <div key={item.dt} className="houerly-forcast">
          <p className="date">{item.dt_txt}</p>
          <p className="temperature">
            {(item.main.temp * 1).toFixed(1)}{" "}
            {item.main.temp ? <span>&#176;C</span> : null}
          </p>
          <p className="weather">{item.weather[0].description}</p>
          {weatherImg}
        </div>
      );
    });
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSearch}>
          <label forhtml="city-Input">
            <input
              id="city-Input"
              type="text"
              value={this.state.value}
              placeholder="SEARCH FOR A CITY"
              onChange={this.handleInput}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </label>
          <select value={this.state.search} onChange={this.handleWeatherSelect}>
            <option value="">--Select search option--</option>
            <option
              value={`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=metric&appid=${APIkey}`}
            >
              3 hour forcast
            </option>
            <option
              value={`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&APPID=${APIkey}`}
            >
              Current Weather
            </option>
          </select>
        </form>
        <header>
          <h1>
            {this.state.error
              ? "Sorry we couldn't find your location"
              : this.state.city}
          </h1>
        </header>
        <main>
          {this.state.flag ? (
            <div>
              <header>
                {/* <h1>{this.state.city && this.state.city}</h1> */}
              </header>
              <main className="current">
                <p className="temperature">
                  {this.state.temp}{" "}
                  {this.state.temp ? <span>&#176;C</span> : null}
                </p>
                <p className="date">{this.state.date}</p>

                <p className="weather">{this.state.weather}</p>
              </main>
            </div>
          ) : (
            infoList
          )}
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
