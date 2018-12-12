import React, { Component } from 'react';
import truffleContract from 'truffle-contract';
import EuroCoinContract from '../../contracts/EuroCoin.json';
import getWeb3 from '../../utils/getWeb3';

import './Navbar.module.css';

import Logo from '../../assets/AdrienneLogo.png';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            balance: 0,
        };
    }

    async componentDidMount() {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const Contract = truffleContract(EuroCoinContract);
            Contract.setProvider(web3.currentProvider);
            const instance = await Contract.deployed();

            const balance = web3.utils.fromWei(await instance.balanceOf(accounts[0]));
            this.setState({
                balance,
            });
        } catch (error) {
            console.log('Failed to load web3, accounts, or contract. Check console for details.');
            console.log(error);
        }
    }

    render() {
        const { balance } = this.state;
        return (
            <div className="Navbar">
                <div className="Navbar__Flex">
                    <div className="Navbar__Logo">
                        <img className="Navbar__Logo" src={Logo} alt="logo" />
                    </div>
                    <div>
                        <p className="Navbar__Title inline">Balance: </p>
                        <p className="Navbar__Title inline">
                            {balance}
                            {' '}
                            EUROS
                        </p>
                        <p className="Navbar__Title inline">Hello Alberto</p>
                        <div className="inline">
                            <img className="Navbar__Avatar" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Navbar;
