import React, { Component } from 'react';

import '../Main.module.css';
import './Proposals.module.css';

import usersImg from '../../assets/users.svg';
import transmissionImg from '../../assets/transmission.svg';
import suitcaseImg from '../../assets/suitcase.svg';
import temperatureImg from '../../assets/ice-crystal.svg';
import carDoorImg from '../../assets/car-door.svg';
import energyImg from '../../assets/bold.svg';


class Proposals extends Component {
    // eslint-disable-next-line class-methods-use-this
    mth() {
        //
    }

    render() {
        return (
            <div className="Search__Container Proposal__Container">
                <h1 className="Search__Title Search__Title_Padding">Proposals</h1>

                <div className="Proposal__Card">
                    <p className="Proposal__Title">
                        Renault Clio
                        <span className="Proposal__Title_Small"> or similiar</span>
                    </p>
                    <div className="Proposal__Underline" />

                    <div className="Proposal__CardGrid">
                        <img className="Proposal__Image" alt="img" src="https://img00.deviantart.net/3940/i/2017/225/9/1/mercedes_car_on_a_transparent_background__by_prussiaart-dbjwmg9.png" />
                        <div>
                            <p className="Proposal__CardTitle">Mileage Unlimited</p>
                            <p className="Proposal__CardSubtitle">Minimum Age 18 years</p>
                            <div className="Proposal__CardInnerGrid">
                                <div>
                                    <img className="Proposal__Icons" src={usersImg} alt="users" />
                                    <p className="Proposal__IconsValue">5</p>
                                </div>
                                <div>
                                    <img className="Proposal__Icons" src={transmissionImg} alt="transmission" />
                                    <p className="Proposal__IconsValue">5</p>
                                </div>
                                <div>
                                    <img className="Proposal__Icons" src={suitcaseImg} alt="suitcase" />
                                    <p className="Proposal__IconsValue">5</p>
                                </div>
                                <div>
                                    <img className="Proposal__Icons" src={temperatureImg} alt="temperature" />
                                    <p className="Proposal__IconsValue">5</p>
                                </div>
                                <div>
                                    <img className="Proposal__Icons" src={carDoorImg} alt="car door" />
                                    <p className="Proposal__IconsValue">5</p>
                                </div>
                                <div>
                                    <img className="Proposal__Icons" src={energyImg} alt="car door" />
                                    <p className="Proposal__IconsValue">5</p>
                                </div>
                            </div>
                            <p className="Proposal__MoreDetails">More Details ></p>
                        </div>
                    </div>
                    <button type="button" className="Button button__Proposals">BOOK</button>


                    {/* More Details section */}
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

                            {/* RENTAL */}
                            <div>
                                <p className="More__DetailsContent">Rental</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">rentalProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">rentalPrice-dynamic</p>
                            </div>

                            {/* Delivery */}
                            <div>
                                <p className="More__DetailsContent">Delivery</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">deliveryProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">deliveryPrice-dynamic</p>
                            </div>

                            {/* Extras */}
                            <div>
                                <p className="More__DetailsContent">Extras</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">extrasProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">extrasPrice-dynamic</p>
                            </div>

                            {/* Petrol Refill */}
                            <div>
                                <p className="More__DetailsContent">Petrol Refill</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">Petrol RefillProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">Petrol RefillPrice-dynamic</p>
                            </div>

                            {/* Interior Cleaning */}
                            <div>
                                <p className="More__DetailsContent">Interior Cleaning</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">Interior CleaningProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">Interior CleaningPrice-dynamic</p>
                            </div>

                            {/* Parking */}
                            <div>
                                <p className="More__DetailsContent">Parking</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">ParkingProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">ParkingPrice-dynamic</p>
                            </div>

                            {/* Insurance */}
                            <div>
                                <p className="More__DetailsContent">Insurance</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">InsuranceProvider-dynamic</p>
                            </div>
                            <div>
                                <p className="More__DetailsContent">InsurancePrice-dynamic</p>
                            </div>

                            {/* Insurance */}
                            <div />
                            <div>
                                <p className="More__DetailsTitle">Total</p>
                            </div>
                            <div>
                                <div className="More__DetailsLine" />
                                <p className="More__DetailsContent">TotalPrice-dynamic</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Proposals;
