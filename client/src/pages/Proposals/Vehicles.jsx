import React, { Component } from 'react';
import request from 'request';
import url from 'url';
import getWeb3 from '../../utils/getWeb3';

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

    /**
     * transfer from user to escrow
     * @param {string} toAccount the account address
     * @param {integer} amount amount of coins to transfer
     */
    async proceedEscrow(toAccount, amount) {
        const { web3, accounts, escrowContract } = this.state;
        try {
            await escrowContract.escrow(toAccount, amount, { from: accounts[0] });
            const paymentFilter = web3.eth.filter('latest');
            paymentFilter.watch((error, log) => {
                if (error) {
                    console.log('An error ocurred!');
                } else {
                    console.log('In Escrow!');
                }
                console.log(log);
                paymentFilter.stopWatching();
            });
        } catch (error) {
            //
        }
    }

    /**
     * transfer from escrow to final user
     * @param {string} toAccount the account address
     * @param {integer} amount amount of coins to transfer
     */
    async finishEscrow(toAccount, amount) {
        const { web3, accounts, escrowContract } = this.state;
        try {
            await escrowContract.finish(toAccount, amount, { from: accounts[0] });
            const paymentFilter = web3.eth.filter('latest');
            paymentFilter.watch((error, log) => {
                if (error) {
                    console.log('An error ocurred!');
                } else {
                    console.log('In Escrow!');
                }
                console.log(log);
                paymentFilter.stopWatching();
            });
        } catch (error) {
            //
        }
    }

    // Toggle the visibility
    toggleHidden() {
        const { isHidden } = this.state;
        this.setState({
            isHidden: !isHidden,
        });
    }

    async finishButton() {
        const { accounts } = this.state;
        // eslint-disable-next-line react/prop-types
        const { data } = this.props;
        const priceToPay = data.price;
        const dummyAccount = '0x5aeda56215b167893e80b4fe645ba6d5bab767de';
        await this.finishEscrow(dummyAccount, priceToPay, { from: accounts[0] });
    }

    async bookButton() {
        const { accounts } = this.state;
        // eslint-disable-next-line react/prop-types
        const { data } = this.props;
        const priceToPay = data.price;
        const dummyAccount = '0x5aeda56215b167893e80b4fe645ba6d5bab767de';
        await this.proceedEscrow(dummyAccount, priceToPay, { from: accounts[0] });
        this.setState({ showButtons: true });
    }

    async handleSubmit(event) {
        const { showButtons } = this.state;
        const { web3, accounts, escrowContract } = this.props;
        if (showButtons === false) {
            const { data } = this.props;
            console.log('3');
            const priceToPay = data.price;
            const dummyAccount = '0x5aeda56215b167893e80b4fe645ba6d5bab767de';


            console.log(escrowContract);
            try {
                //await escrowContract.escrow(dummyAccount, priceToPay, { from: accounts[0] });
                /*const paymentFilter = web3.eth.filter('latest');
                paymentFilter.watch((error, log) => {
                    if (error) {
                        console.log('An error ocurred!');
                    } else {
                        console.log('In Escrow!');
                    }
                    console.log(log);
                    paymentFilter.stopWatching();
                });*/
            } catch (error) {
                //
            }

            //await this.proceedEscrow(dummyAccount, priceToPay, { from: accounts[0] });
            //this.setState({ showButtons: true });
            /**
             * console.log('1');
            console.log('2');
            // eslint-disable-next-line react/prop-types
            console.log('4');
             */
        }
        console.log(event.target);
        event.preventDefault();
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { web3 } = this.props;
        if (web3 === null) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

        // eslint-disable-next-line react/prop-types
        const { data } = this.props;

        const services = data.services.map(service => (
            <div className="More__DetailsGrid">
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
                <form onSubmit={this.handleSubmit}>
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
                        {this.state.showButtons === true ? (
                            <div>
                                <button className="Button Proposal__Button_Finish" onClick={() => this.finishButton()}>FINISH</button>
                                <button className="Button Proposal__Button_Support">CONTACT SUPPORT</button>
                            </div>
                        ) : null}
                    </div>
                    <input className="Button button__Proposals" value="BOOK" type="submit" />
                </form>


                {this.state.isHidden === true ? (
                    // {/* More Details section */}
                    <div className="More__Details">
                        <div className="More__DetailsGrid">
                            <p className="More__DetailsTitle inline">Service</p>
                            <p className="More__DetailsTitle inline">Provider</p>
                            <p className="More__DetailsTitle inline">Cost</p>
                        </div>

                        <div>{services}</div>

                    </div>

                ) : null}
            </div>

        );
    }
}

export default Vehicle;
