const Layout = (props) => {
  let weatherImg = "";
  let infoList = null;

  if (props.state.flag === "forcast") {
    infoList = props.state.list.map((item) => {
      if (item.weather[0].main === "Clouds") {
        weatherImg = <img src="./img/cloud.png" />;
      } else if (item.weather[0].main === "Clear") {
        weatherImg = <img src="./img/sun.png" />;
      } else if (item.weather[0].main === "Rain") {
        weatherImg = <img src="./img/rain3.png" />;
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
  }

  return (
    <main>
      <h1>{props.state.error ? "Sorry invalid location" : props.state.city}</h1>
      {infoList ? (
        infoList
      ) : (
        <div className="current">
          <p className="temperature">
            {props.state.temp}
            {props.state.temp ? <span>&#176;C</span> : null}
          </p>
          <p className="date">{props.state.date}</p>

          <p className="weather">{props.state.weather}</p>
        </div>
      )}
    </main>
  );
};
