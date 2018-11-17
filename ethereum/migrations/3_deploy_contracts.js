const EuroCoin = artifacts.require('./EuroCoin.sol');

module.exports = function (deployer, network, accounts) {
    deployer.deploy(EuroCoin, accounts);
};
