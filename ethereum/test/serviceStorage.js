const ServiceStorage = artifacts.require('./ServiceStorage.sol');

contract('ServiceStorage', (accounts) => {
    it('create service and find it.', async () => {
        const serviceStorageInstance = await ServiceStorage.deployed();

        const serviceType = 1;
        const city = 'Lisbon';
        const street = 'sao lazaro';
        const offChainLocation = '6d738qoweimvnjthewqio';

        await serviceStorageInstance.createService(
            serviceType,
            city,
            street,
            offChainLocation, { from: accounts[0] },
        );

        const serviceOffLocation = await serviceStorageInstance.findService(
            serviceType,
            city,
            street,
        );

        assert.equal(web3.toUtf8(serviceOffLocation), offChainLocation, 'Locations dont match.');
    });
});
