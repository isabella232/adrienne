import React, { Component } from 'react';
import request from 'request';

import DatePicker from 'react-datepicker';
// eslint-disable-next-line
import Checkbox from '../../components/Checkbox';

import 'react-datepicker/dist/react-datepicker.css';

import '../Main.module.css';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyType: undefined,
            extras: undefined,
            startDate: new Date(),
            endDate: new Date(),
            vehicleBodyType: 'select',
            vehicleMake: 'select',
            vehicleModel: 'select',
            vehicleMakes: [],
            vehicleModels: [],
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);


        this.selectedCheckboxes = new Set();
    }


    componentDidMount() {
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

    handleChangeStart(date) {
        this.setState({
            startDate: date,
        });
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    handleSubmit(event) {
        // eslint-disable-next-line no-undef
        window.location = 'http://localhost:3000/proposals?type=2&make=toyota&model=prius';
        event.preventDefault();
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
                    console.log(body);
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

    handleSubmit2(event) {
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
            bodyType,
            extras,
            startDate,
            endDate,
            vehicleMake,
            vehicleMakes,
            vehicleModel,
            vehicleModels,
            vehicleBodyType,
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

        return (
            <div>
                <div className="Search__Container Search__Container_HeightRequest">
                    <form className="Search__Form" onSubmit={this.handleSubmit2}>

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

                        {/* Pickup Section */}
                        <p className="Search__Title">Pick Up</p>
                        <div className="Search__PickupGrid">
                            <div>
                                <input className="Search__PickupInput" placeholder="Lisbon" />
                            </div>
                            <div className="Search__PickupDateGrid">
                                <DatePicker
                                    className="Search__PickupDateItem"
                                    selected={startDate}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={this.handleChangeStart}
                                />
                                <DatePicker
                                    className="Search__PickupDateItem"
                                    selected={startDate}
                                    onChange={this.handleChangeStart}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />
                            </div>
                        </div>


                        {/* Return Section */}
                        <p className="Search__Title">Return</p>
                        <div className="Search__PickupGrid">
                            <div>
                                <input className="Search__PickupInput" placeholder="Lisbon" />
                            </div>
                            <div className="Search__PickupDateGrid">
                                <DatePicker
                                    className="Search__PickupDateItem"
                                    selected={endDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={this.handleChangeEnd}
                                />

                                <DatePicker
                                    className="Search__PickupDateItem"
                                    selected={endDate}
                                    onChange={this.handleChangeEnd}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />
                            </div>

                        </div>

                        {/* Input Extras Section */}
                        <p className="Search__Title">Extras</p>
                        <div>
                            <ul className="Search__ExtrasGrid">
                                {extraOptions}
                            </ul>
                        </div>

                        <input
                            type="submit"
                            className="Button Button__Publish"
                            value="REQUEST"
                        />
                        {/* <button type="button" className="
                    Button Button__Publish">REQUEST</button> */}
                    </form>
                    <div className="Search__BottomPadding" />
                </div>
            </div>
        );
    }
}

export default Request;
