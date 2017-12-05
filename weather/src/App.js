import React, { Component } from 'react';
import './App.css';
// import { Switch, Route } from "react-router-dom";
// import SingleCity from "../src/components/singleCity";
// // import FeedFrame from "../src/common/feedFrame";
// import Search from "../src/common/search";
import { fetchData } from "./services/fetchData";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import MyMapComponent from "./components/googleMap";

const style = { 
  height: "250px"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      cityData: null,
      cityCord: ""
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }
  // this.searchClick = this.searchClick.bind(this);

  componentDidMount() {
    fetchData.getData("forecast", "Belgrade", (response) => {

      this.setState({
        cityData: response.data.list,
        cityCord: response.data.city.coord
      })

    })

  }

  handleChange(event) {
    const searchString = event.target.value;
    this.setState({
      searchTerm: searchString
    })

  }

  searchClick() {
    fetchData.getData("forecast", this.state.searchTerm, response => {
      this.setState({

        cityData: response.data.list,
        cityCord: response.data.city.coord
      });
    });
  }

  render() {
    if (this.state.cityData == null) {
      return <p>loading...</p>
    }
    const temperatureHourlie = [];
    this.state.cityData.map((hour) => {
      temperatureHourlie.push(hour.main.temp)

    })


    const humidityHourlie = [];
    this.state.cityData.map((hum) => {
      humidityHourlie.push(hum.main.humidity)
    })



    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 id="title">Weather Search</h1>
          </div>

        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." onChange={this.handleChange} value={this.state.searchTerm} ></input>
            </div>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary" onClick={this.searchClick}>Search</button>
          </div>

        </div>

        <div className="row" id="table">
          <div className="col-md-4 text-center text-center text-center">
            City
          </div>
          <div className="col-md-4 text-center ">
            Temperature
          </div>
          <div className="col-md-4 text-center">
            Humidity
          </div>

        </div>
        <hr></hr>
        {/* Start of the graphic section */}
        <div className="row">
          <div className="col-md 4 extra">
            <div id="map">

              <MyMapComponent cityCord={this.state.cityCord}
                isMarkerShown={true}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `200px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </div>
          <div className="col-md 4 extra">
            <Sparklines data={temperatureHourlie}>
              <SparklinesLine style={style} />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
          </div>
          <div className="col-md 4 extra">
            <Sparklines data={humidityHourlie}>
              <SparklinesLine />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
