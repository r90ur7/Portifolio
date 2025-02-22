import React, { Component } from 'react';

interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface AppState {  
    forecasts: WeatherForecast[];
    loading: boolean;
}

export default class App extends Component<{}, AppState> {
    static displayName = App.name;

    constructor(props: {}) {
    super(props);
    this.state = { forecasts: [], loading: true };
}

componentDidMount() {
    this.populateWeatherData();
}

static renderForecastsTable(forecasts: WeatherForecast[]) {
    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                <tr key={forecast.date}>
                    <td>{forecast.date}</td>
                    <td>{forecast.temperatureC}</td>
                    <td>{forecast.temperatureF}</td>
                    <td>{forecast.summary}</td>
                </tr>
                )}
            </tbody>
        </table>
        );
    }
render() {
    let contents = this.state.loading
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : App.renderForecastsTable(this.state.forecasts);

    return (
            <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            </div>
        );
    }

    async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data: WeatherForecast[] = await response.json();
    this.setState({ forecasts: data, loading: false });
    }
}
