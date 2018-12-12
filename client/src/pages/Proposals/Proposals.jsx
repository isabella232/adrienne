import React, { Component } from 'react';
import request from 'request';
import url from 'url';
import getWeb3 from '../../utils/getWeb3';

import '../Main.module.css';
import './Proposals.module.css';
import Vehicle from './Vehicles';


// eslint-disable-next-line react/no-multi-comp
class Proposals extends Component {
    constructor() {
        super();
        this.state = {
            web3: null,
            carsResult: [],
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

        // eslint-disable-next-line no-undef
        const parts = url.parse(window.location.href, true);
        const { type, make, model } = parts.query;

        request.post({
            url: 'http://localhost:3001/search-vehicles',
            form: {
                type, make, model,
            },
        }, (err, httpResponse, body) => {
            if (httpResponse.statusCode === 200) {
                const jsonObject = JSON.parse(body);
                const elements = jsonObject.length;
                const carsResult = [];
                for (let e = 0; e < elements; e += 1) {
                    carsResult.push(jsonObject[e]);
                }
                this.setState({ carsResult });
            }
        });
    }

    render() {
        const {
            carsResult,
            web3,
        } = this.state;
        return (
            <div className="Search__Container Proposal__Container">
                <h1 className="Search__Title Search__Title_Padding">Proposals</h1>
                {carsResult.map(car => <Vehicle key={car.id} data={car} web3={web3} />)}
            </div>
        );
    }
}

export default Proposals;
