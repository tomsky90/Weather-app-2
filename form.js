const APIkey = "a401cd603ee800caa57e2a96c2193dbe";

const Form = (props) => {
  return (
    <>
      <form onSubmit={props.handleSearch}>
        <label forhtml="city-Input">
          <input
            id="city-Input"
            type="text"
            value={props.state.value}
            placeholder="SEARCH FOR A CITY"
            onChange={props.handleInput}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </label>
        <select value={props.state.search} onChange={props.weatherSelect}>
          <option value="">--Select search option--</option>
          <option
            value={`https://api.openweathermap.org/data/2.5/forecast?q=${props.state.value}&units=metric&appid=${APIkey}`}
          >
            24 hour forcast
          </option>
          <option
            value={`https://api.openweathermap.org/data/2.5/weather?q=${props.state.value}&units=metric&APPID=${APIkey}`}
          >
            Current Weather
          </option>
        </select>
      </form>
    </>
  );
};
