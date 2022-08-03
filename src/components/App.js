import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';
import './App.css';

const APIkey = '097e1f723196a807aa37a032b697916b'
class App extends Component {

  state = {
    value: "",
    date: "",
    city: "",
    sunrise:"",
    sunset: "",
    temp: "",
    wind: "",
    pressure: "",
    error: false
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

componentDidUpdate(prevProps, prevState) {
  console.log("zmaina");
  if(this.state.value.length == 0) return
  if(prevState !== this.state.value)
  {
    const API = 
    `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

    fetch(API)
    .then(response => {
      if(response.ok) {
        return response
      }
      throw Error("Nie udało się")
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString()
      this.setState(prevState => ({
        error: false,
        date: time,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: prevState.value
      }))
    })
    .catch(error => {
      console.log(error)
      this.setState(prevState => ({
        error: true,
        city: prevState.value
      }))
    })
  }
}

  render() {
    return (
     <div className="App">
        <Form 
          value={this.state.value} 
          change = {this.handleInputChange} 
        />
        <Result weather = {this.state}/>
     </div>
   );
  }
}

export default App;
