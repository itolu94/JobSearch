import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import axios from 'axios';
import stateCities from 'state-cities';
import us from 'us';

export default class SearchForm extends Component {
    constructor() {
        super();
        this.fillStates = this.fillStates.bind(this);
        this.fillStates = this.fillStates.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        hashHistory.push('/listings')
    }

    fillStates() {
        let states = us.states
        return Object.keys(us.states).map((state) => {
            return <option key={states[state].name} value={states[state].name}/>
        })
    }

    fillCities() {
        if (this.props.state) {
            let cities = stateCities.getCities(this.props.state);
            if (cities && cities.length > 0) {
                return cities.map((city) => {
                    return <option key={city} value={city}/>
                });
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row login">
                    <div className="col m8 offset-m2 center-align">
                        <h3 id='loginHeader'> Start your search today! </h3>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                onChange={(event) => this.props.handleDescriptionChange(event.target.value)}
                                type="text"
                                name="title"
                                value={this.props.job}
                                required
                                placeholder='Job Title, Keyword, Description'
                            />
                            <input
                                onChange={(e) => this.props.handleStateChange(e.target.value)}
                                list='states'
                                name='states'
                                placeholder='State'
                                value={this.props.state}
                            >
                                <datalist id='states'>
                                    {this.fillStates()}
                                    <option value='Invalid State'/>
                                </datalist>
                            </input>
                            <input
                                onChange={(e) => this.props.handleCityChange(e.target.value)}
                                list='cities'
                                name='cities'
                                placeholder='City'
                                value={this.props.city}
                            >
                                <datalist id='cities'>
                                    {this.fillCities()}
                                </datalist>
                            </input>
                            <select
                                id='website'
                                value={this.props.website}
                                onChange={(e) => this.props.handleWebsiteChange(e.target.value)}
                            >
                                <option value='Dice'> Dice</option>
                                <option value='CyberCoders'> CyberCoders</option>
                                <option value='ZipRecruiter'> ZipRecruiter</option>
                            </select>
                            <input className='login-buttons' type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

