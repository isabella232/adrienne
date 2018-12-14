import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';

import getWeb3 from '../../utils/getWeb3';
import Navbar from '../../pages/Navbar/Navbar';


configure({ adapter: new Adapter() });
jest.mock('../../utils/getWeb3');

const web3 = new Web3();
const provider = new FakeProvider();
web3.setProvider(provider);

test('Check navbar and it\'s values', () => {
    const fakeWeb3 = async () => web3;
    getWeb3.mockImplementation(fakeWeb3);
    const component = renderer.create(<Navbar />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
