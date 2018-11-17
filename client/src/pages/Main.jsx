import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';

import './Main.module.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            storageValue: 0, web3: null,
        };
    }

    async componentDidMount() {
        try {
            const web3 = await getWeb3();
            this.setState({ web3 });
        } catch (error) {
            console.log('Failed to load web3, accounts, or contract. Check console for details.');
            console.log(error);
        }
    }

    render() {
        const { web3, storageValue } = this.state;
        if (!web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div>
                <div className="Search__Container">
                    <form className="Search__Form">

                        {/* Option Service Section */}
                        <p className="Search__Title">Service</p>
                        <select className="Search__Label_FullWidth">
                            <option className="Search__Option_FullWidth">Rental / Delivery / Service</option>
                        </select>

                        {/* Option Vehicle Section */}
                        <p className="Search__Title">Vehicle</p>
                        <div className="Search__LabelGrid">
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Body Type</option>
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

                        {/* Input Search Section */}
                        <p className="Search__Title">Area</p>
                        <input className="Search__Input_FullWidth" placeholder="Address, City" />

                        {/* Input Extras Section */}
                        <p className="Search__Title">Extras</p>
                        <div>
                            <ul className="Search__ExtrasGrid">
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Baby Stroller</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                            </ul>
                        </div>

                        <button type="button" className="Button Button__Publish">PUBLISH</button>
                    </form>
                    <div className="Search__BottomPadding" />
                </div>
            </div>
        );
    }
}

export default Main;
