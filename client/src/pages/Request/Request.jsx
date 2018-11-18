import React, { Component } from 'react';
import request from 'request';

import DatePicker from 'react-datepicker';

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
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }


    componentDidMount() {
        request('http://localhost:3001/vehicle-body-options',
            (error, response, body) => {
                const x = JSON.parse(response.body);
                this.setState({ bodyType: x });
                console.log(response.body);
            });

        request('http://localhost:3001/vehicle-extras-options',
            (error, response, body) => {
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

    render() {
        let bodyTypeOptions = '';
        if (this.state.bodyType !== undefined) {
            bodyTypeOptions = this.state.bodyType.map(x => <option key={x.id}>{x.description}</option>);
        }

        let extraOptions = '';
        if (this.state.extras !== undefined) {
            extraOptions = this.state.extras.map(x => (
                <li key={x.id} className="Extras__Item">
                    <input className="Extras__Checkbox" type="checkbox" />
                    <div className="Extras__Text">{x.description}</div>
                </li>
            ));
        }

        return (
            <div>
                <div className="Search__Container Search__Container_HeightRequest">
                    <form className="Search__Form">

                        {/* Option Vehicle Section */}
                        <p className="Search__Title">Vehicle</p>
                        <div className="Search__LabelGrid">
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Body Type</option>
                                    {bodyTypeOptions}
                                </select>
                            </div>
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Make</option>
                                </select>
                            </div>
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Model</option>
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
                                    selected={this.state.startDate}
                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeStart}
                                />
                                <DatePicker
                                    className="Search__PickupDateItem"
                                    selected={this.state.startDate}
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
                                    selected={this.state.endDate}
                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeEnd}
                                />

                                <DatePicker
                                    className="Search__PickupDateItem"
                                    selected={this.state.endDate}
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

                        <button type="button" className="Button Button__Publish">REQUEST</button>
                    </form>
                    <div className="Search__BottomPadding" />
                </div>
            </div>
        );
    }
}

export default Request;
