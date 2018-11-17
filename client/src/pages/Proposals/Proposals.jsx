import React, { Component } from 'react';

import '../Main.module.css';
import './Proposals.module.css';


class Proposals extends Component {
    // eslint-disable-next-line class-methods-use-this
    mth() {
        //
    }

    render() {
        return (
            <div className="Search__Container">
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
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Proposals;
