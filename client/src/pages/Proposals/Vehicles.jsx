import React, { Component } from 'react';
import truffleContract from 'truffle-contract';
import EscrowContract from '../../contracts/Escrow.json';

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
            showMoreDetails: false,
            showFinalButtons: false,
            accounts: null,
            escrowContract: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { web3 } = this.props;
        try {
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const Contract = truffleContract(EscrowContract);
            Contract.setProvider(web3.currentProvider);
            const escrowContract = await Contract.deployed();

            this.setState({ accounts, escrowContract });
        } catch (error) {
            console.log('Failed to load accounts, or contract. Check console for details.');
            console.log(error);
        }
    }

    // Toggle the visibility
    toggleHidden() {
        const { showMoreDetails } = this.state;
        this.setState({
            showMoreDetails: !showMoreDetails,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    handleSubmit(event) {
        // eslint-disable-next-line react/prop-types
        const { web3, data } = this.props;
        const { accounts, escrowContract } = this.state;
        // TODO: change this to get account from database.
        const dummyAccount = '0x5aeda56215b167893e80b4fe645ba6d5bab767de';
        const amount = web3.utils.toWei(data.price, 'ether');
        try {
            escrowContract.escrow(
                web3.utils.toChecksumAddress(dummyAccount),
                amount,
                { from: accounts[0] },
            ).then(() => {
                // TODO: add subscriptions!
            });
        } catch (error) {
            //
        }
        this.setState({ showFinalButtons: true });
        event.preventDefault();
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { web3, data } = this.props;
        const { showMoreDetails, showFinalButtons } = this.state;
        if (web3 === null) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

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
                            <button
                                type="button"
                                className="Proposal__MoreDetails"
                                onClick={() => this.toggleHidden()}
                            >
                            More Details
                                {' >'}
                            </button>
                        </div>
                        {showFinalButtons === true ? (
                            <div>
                                <button
                                    type="button"
                                    className="Button Proposal__Button_Finish"
                                    onClick={() => this.finishButton()}
                                >
                                FINISH
                                </button>
                                <button
                                    type="button"
                                    className="Button Proposal__Button_Support"
                                >
                                CONTACT SUPPORT
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <input className="Button button__Proposals" value="BOOK" type="submit" />
                </form>
                {showMoreDetails === true ? (
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
