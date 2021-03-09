
class App extends React.Component {
  state = {
    flag: false,
    value: "London",
    search: false,
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

  handleWeatherSelect = (e) => {
    this.setState({
      search: e.target.value,
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
            flag: "forcast",
            date: todaydate,
            city: this.state.value,
            list: data.list.slice(0, 6),
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
            flag: false,
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
            flag: "current",
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
            flag: false,
          });
        });
    } else {
      alert("choose one option");
    }
  };

  render() {
    return (
      <div className="wrapper">
        <Form
          state={this.state}
          value={this.state.value}
          handleSearch={this.handleSearch}
          handleInput={this.handleInput}
          search={this.state.search}
          weatherSelect={this.handleWeatherSelect}
        />

        <Layout state={this.state} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// git remote add origin https://github.com/tomsky90/Weather-app-2.git
// git branch -M main
// git push -u origin main
