import React, { Component } from 'react';
import request from 'request';
import getWeb3 from '../utils/getWeb3';
// eslint-disable-next-line
import Checkbox from '../components/Checkbox';


import './Main.module.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            web3: null,
            bodyType: undefined,
            vehicleBodyType: 'select',
            vehicleMake: 'select',
            vehicleModel: 'select',
            vehicleMakes: [],
            vehicleModels: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.selectedCheckboxes = new Set();
    }

    async componentDidMount() {
        try {
            const web3 = await getWeb3();

            this.setState({
                web3,
            });
        } catch (error) {
            console.log('Failed to load web3, accounts, or contract. Check console for details.');
            console.log(error);
        }

        request('http://localhost:3001/vehicle-body-options',
            (error, response) => {
                const x = JSON.parse(response.body);
                this.setState({ bodyType: x });
                console.log(response.body);
            });

        request('http://localhost:3001/vehicle-extras-options',
            (error, response) => {
                const x = JSON.parse(response.body);
                this.setState({ extras: x });
                console.log(response.body);
            });
    }

    handleChange(event) {
        const { vehicleBodyType } = this.state;
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === 'vehicleBodyType') {
            request.post({
                url: 'http://localhost:3001/search-vehicles',
                form: { type: event.target.value },
            },
            (err, httpResponse, body) => {
                if (httpResponse.statusCode === 200) {
                    const jsonObject = JSON.parse(body);
                    const elements = jsonObject.length;
                    const makes = [];
                    for (let e = 0; e < elements; e += 1) {
                        makes.push(jsonObject[e].make);
                    }
                    this.setState({ vehicleMakes: makes });
                }
            });
        } else if (event.target.name === 'vehicleMake') {
            request.post({
                url: 'http://localhost:3001/search-vehicles',
                form: {
                    type: vehicleBodyType,
                    make: event.target.value,
                },
            },
            (err, httpResponse, body) => {
                if (httpResponse.statusCode === 200) {
                    const jsonObject = JSON.parse(body);
                    const elements = jsonObject.length;
                    const models = [];
                    console.log(jsonObject);
                    for (let e = 0; e < elements; e += 1) {
                        models.push(jsonObject[e].model);
                    }
                    this.setState({ vehicleModels: models });
                }
            });
        }
    }

    handleSubmit(event) {
        const { vehicleBodyType } = this.state;
        console.log(`A name was submitted: ${vehicleBodyType}`);

        // eslint-disable-next-line no-restricted-syntax
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }

        event.preventDefault();
    }

    // eslint-disable-next-line class-methods-use-this
    toggleCheckbox(label, selected) {
        if (selected.has(label)) {
            selected.delete(label);
        } else {
            selected.add(label);
        }
    }

    render() {
        const {
            web3,
            vehicleBodyType,
            bodyType,
            extras,
            vehicleMake,
            vehicleMakes,
            vehicleModel,
            vehicleModels,
        } = this.state;

        let bodyTypeOptions = '';
        let extraOptions = '';
        let vehicleMakeOptions = '';
        let vehicleModelsOptions = '';

        if (bodyType !== undefined) {
            bodyTypeOptions = bodyType.map(x => <option value={x.id}>{x.description}</option>);
        }

        if (extras !== undefined) {
            extraOptions = extras.map(x => (
                <li key={x.id} className="Extras__Item">
                    <Checkbox
                        label={x.description}
                        selected={this.selectedCheckboxes}
                        handleCheckboxChange={this.toggleCheckbox}
                        key={x.description}
                    />
                </li>
            ));
        }

        if (vehicleMakes.length > 0) {
            vehicleMakeOptions = vehicleMakes.map(e => <option>{e}</option>);
        }

        if (vehicleModels.length > 0) {
            vehicleModelsOptions = vehicleModels.map(e => <option>{e}</option>);
        }

        if (!web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div>
                <div className="Search__Container">
                    <form className="Search__Form" onSubmit={this.handleSubmit}>

                        {/* Option Service Section */}
                        <p className="Search__Title">Service</p>
                        <select className="Search__Label_FullWidth">
                            <option className="Search__Option_FullWidth">Mobility</option>
                        </select>

                        {/* Option Vehicle Section */}
                        <p className="Search__Title">Vehicle</p>
                        <div className="Search__LabelGrid">
                            <div>
                                <select
                                    className="Search__Label_FullWidth"
                                    name="vehicleBodyType"
                                    value={vehicleBodyType}
                                    onChange={this.handleChange}
                                >
                                    <option value="select" className="Search__Option_FullWidth">Body Type</option>
                                    {bodyTypeOptions}
                                </select>
                            </div>
                            <div>
                                <select
                                    className="Search__Label_FullWidth"
                                    name="vehicleMake"
                                    value={vehicleMake}
                                    onChange={this.handleChange}
                                >
                                    <option className="Search__Option_FullWidth">Make</option>
                                    {vehicleMakeOptions}
                                </select>
                            </div>
                            <div>
                                <select
                                    className="Search__Label_FullWidth"
                                    name="vehicleModel"
                                    value={vehicleModel}
                                    onChange={this.handleChange}
                                >
                                    <option className="Search__Option_FullWidth">Model</option>
                                    {vehicleModelsOptions}
                                </select>
                            </div>
                        </div>

                        {/* Input Search Section */}
                        <p className="Search__Title">Area</p>
                        <div>
                            <input className="Search__Input_FullWidth" placeholder="Address, City" />
                        </div>


                        {/* Input Extras Section */}
                        <p className="Search__Title">Extras</p>
                        <div>
                            <ul className="Search__ExtrasGrid">
                                {extraOptions}
                            </ul>
                        </div>

                        <input type="submit" className="Button Button__Publish" value="PUBLISH" />
                        {/* <button type="button" className="Button
                     Button__Publish">PUBLISH</button> */}
                    </form>
                    <div className="Search__BottomPadding" />
                </div>
            </div>
        );
    }
}

export default Main;
