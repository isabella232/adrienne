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
                            <p>More Details ></p>
                        </div>
                    </div>
                    <button type="button" className="Button button__Proposals">BOOK</button>
                </div>

            </div>
        );
    }
}

export default Proposals;
