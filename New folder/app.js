const APIkey = "a401cd603ee800caa57e2a96c2193dbe";
const imgs = ["./img/sun.png", "./img/cloud.png"];

class App extends React.Component {
  state = {
    value: "London",
    date: "",
    city: "",
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
    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=metric&appid=${APIkey}`;

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
        </form>
        <header>
          <h1>
            {this.state.error
              ? "Sorry we couldn't find your location"
              : this.state.city}
          </h1>
        </header>
        <main>{infoList}</main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
