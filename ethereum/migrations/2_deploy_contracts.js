const ServiceStorage = artifacts.require('./ServiceStorage.sol');

module.exports = function (deployer) {
    deployer.deploy(ServiceStorage);
};
