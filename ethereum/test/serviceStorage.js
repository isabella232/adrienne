const ServiceStorage = artifacts.require('./ServiceStorage.sol');

contract('ServiceStorage', (accounts) => {
    it('create service and find it.', async () => {
        const serviceStorageInstance = await ServiceStorage.deployed();

        const serviceTypeOne = 1;
        const serviceTypeTwo = 2;
        const city = 'Lisbon';
        const street = 'sao lazaro';
        const offChainLocationOne = '6d738qoweimvnjthewqio';
        const offChainLocationTwo = '73u6ernfd84oeirhewqio';

        await serviceStorageInstance.createService(
            serviceTypeOne,
            city,
            street,
            offChainLocationOne, { from: accounts[0] },
        );
        await serviceStorageInstance.createService(
            serviceTypeTwo,
            city,
            street,
            offChainLocationTwo, { from: accounts[1] },
        );

        const serviceResultOne = await serviceStorageInstance.findService(
            serviceTypeOne,
            city,
            street,
            0,
        );
        assert.equal(web3.toUtf8(serviceResultOne[1]), offChainLocationOne, 'Locations dont match.');
        assert.equal(serviceResultOne[0], accounts[0], 'Locations dont match.');


        const serviceResultTwo = await serviceStorageInstance.findService(
            serviceTypeTwo,
            city,
            street,
            serviceResultOne[2],
        );
        assert.equal(web3.toUtf8(serviceResultTwo[1]), offChainLocationTwo, 'Locations dont match.');
        assert.equal(serviceResultTwo[0], accounts[1], 'Locations dont match.');
    });
});
