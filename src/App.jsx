import axios from 'axios';
import React from 'react';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
    };
    this.getPlanets = this.getPlanets.bind(this);
  }

  componentDidMount() {
    this.getPlanets();
  }

  async getPlanets() {
    let data = await axios
      .get('https://swapi.dev/api/planets/')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(data.data.results);
    this.setState({
      planets: data.data.results,
    });
  }

  render() {
    const { planets } = this.state;
    // console.log(planets);
    return (
      <div className="App">
        <h3>Using ComponentDidMount for initial data render</h3>
        <hr />
        <table className="blueTable">
          <thead>
            <tr>
              <td>Name</td>
              <td>Diameter</td>
              <td>Population</td>
              <td>Gravity</td>
              <td>Created</td>
            </tr>
          </thead>
          <tbody>
            {planets &&
              planets.map((planet) => {
                let dateCreated = new Date(planet.created);
                return (
                  <tr key={planet.url}>
                    <td>{planet.name}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.population}</td>
                    <td>{planet.gravity}</td>
                    <td>
                      {dateCreated.toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
