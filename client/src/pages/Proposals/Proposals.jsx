import React, { Component } from 'react';
import request from 'request';
import url from 'url';

import '../Main.module.css';
import './Proposals.module.css';

import usersImg from '../../assets/users.svg';
import transmissionImg from '../../assets/transmission.svg';
import suitcaseImg from '../../assets/suitcase.svg';
import temperatureImg from '../../assets/ice-crystal.svg';
import carDoorImg from '../../assets/car-door.svg';
import energyImg from '../../assets/bold.svg';


class Vehicle extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: false,
            showButtons: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Toggle the visibility
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
        });
    }

    handleSubmit(event) {
        //TODO: send money to escrow
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();

    }
    toggleHiddenButton() {
        this.setState({
            showButtons: !this.state.showButtons,
        });
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { data } = this.props;

        const services = data.services.map(service => (
            <div>
                <div>
                    <p className="More__DetailsContent">{service.serviceType}</p>
                </div>
                <div>
                    <p className="More__DetailsContent">{service.serviceProvider}</p>
                </div>
                <div>
                    <p className="More__DetailsContent">{service.serviceFee}</p>
                </div>
            </div>
        ));

        return (


            <div className="Proposal__Card">
                <p className="Proposal__Title">
                    {data.make}
                    {' '}
                    {data.model}
                </p>
                <div className="Proposal__Underline" />

                <div className="Proposal__CardGrid">
                    <img className="Proposal__Image" alt="img" src={data.picture} />
                    <div>
                        <p className="Proposal__CardTitle">Mileage Unlimited</p>
                        <p className="Proposal__CardSubtitle">Minimum Age 18 years</p>
                        <div className="Proposal__CardInnerGrid">
                            <div>
                                <img className="Proposal__Icons" src={usersImg} alt="users" />
                                <p className="Proposal__IconsValue">{data.doors}</p>
                            </div>
                            <div>
                                <img className="Proposal__Icons" src={transmissionImg} alt="transmission" />
                                <p className="Proposal__IconsValue">{data.driving}</p>
                            </div>
                            <div>
                                <img className="Proposal__Icons" src={suitcaseImg} alt="suitcase" />
                                <p className="Proposal__IconsValue">2</p>
                            </div>
                            <div>
                                <img className="Proposal__Icons" src={temperatureImg} alt="temperature" />
                                <p className="Proposal__IconsValue">Yes</p>
                            </div>
                            <div>
                                <img className="Proposal__Icons" src={carDoorImg} alt="car door" />
                                <p className="Proposal__IconsValue">{data.doors}</p>
                            </div>
                            <div>
                                <img className="Proposal__Icons" src={energyImg} alt="car door" />
                                <p className="Proposal__IconsValue">{data.co2}</p>
                            </div>
                        </div>

                        <p className="Proposal__MoreDetails" onClick={() => this.toggleHidden()}>More Details ></p>
                    </div>
                    { this.state.showButtons === true ? (
                        <div>
                            <button className="Button Proposal__Button_Finish">FINISH</button>
                            <button className="Button Proposal__Button_Support">CONTACT SUPPORT</button>
                        </div>
                    ) : null}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Submit" />
                </form>
                <button type="button" className="Button button__Proposals">BOOK</button>

                <button type="button" className="Button button__Proposals" onClick={() => this.toggleHiddenButton()}>BOOK</button>

                {this.state.isHidden === true ? (
                    // {/* More Details section */}
                    <div className="More__Details">
                        <div className="More__DetailsGrid">
                            <div>
                                <p className="More__DetailsTitle">Service</p>
                            </div>
                            <div>
                                <p className="More__DetailsTitle">Provider</p>
                            </div>
                            <div>
                                <p className="More__DetailsTitle">Cost</p>
                            </div>
                            {services}
                        </div>
                    </div>

                ) : null}
            </div>

        );
    }
}

// eslint-disable-next-line react/no-multi-comp
class Proposals extends Component {
    constructor() {
        super();
        this.state = {
            carsResult: [],
        };
    }

    componentDidMount() {
        // eslint-disable-next-line no-undef
        const parts = url.parse(window.location.href, true);
        const { type, make, model } = parts.query;

        request.post({
            url: 'http://localhost:3001/search-vehicles',
            form: {
                type, make, model,
            },
        },
            (err, httpResponse, body) => {
                if (httpResponse.statusCode === 200) {
                    const jsonObject = JSON.parse(body);
                    const elements = jsonObject.length;
                    const carsResult = [];
                    for (let e = 0; e < elements; e += 1) {
                        carsResult.push(jsonObject[e]);
                    }
                    console.log(carsResult);
                    this.setState({ carsResult });
                }
            });
    }

    render() {
        const { carsResult } = this.state;
        let resultsToShow;
        if (carsResult.length > 0) {
            resultsToShow = (<Vehicle data={carsResult[0]} />);
        }
        return (
            <div className="Search__Container Proposal__Container">
                <h1 className="Search__Title Search__Title_Padding">Proposals</h1>
                {resultsToShow}
            </div>
        );
    }
}

export default Proposals;
