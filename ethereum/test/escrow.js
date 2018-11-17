const Escrow = artifacts.require('./Escrow.sol');
const EuroCoin = artifacts.require('./EuroCoin.sol');

contract('Escrow', (accounts) => {
    it('create escrow and use it.', async () => {
        const escrowInstance = await Escrow.deployed();
        const euroCoinInstance = await EuroCoin.deployed();
        const accountFrom = accounts[1];
        const accountTo = accounts[2];
        const value = web3.toWei(1, 'ether');

        const previousBalanceFrom = await euroCoinInstance.balanceOf(accountFrom);
        const previousBalanceTo = await euroCoinInstance.balanceOf(accountTo);

        console.log(previousBalanceFrom.toNumber(), previousBalanceTo.toNumber());
        await escrowInstance.escrow(accountTo, value, { from: accountFrom });
        /* assert.equal(await euroCoinInstance.balanceOf(accountFrom),
            previousBalanceFrom - value, 'Values are different (from)!');
        assert.equal(await euroCoinInstance.balanceOf(accountTo),
            previousBalanceTo, 'Values are different (to)!');

        const previousBalanceFromAfter = await euroCoinInstance.balanceOf(accountFrom);
        const previousBalanceToAfter = await euroCoinInstance.balanceOf(accountTo);
        await escrowInstance.finish(accountTo, value, { from: accountFrom });

        assert.equal(await euroCoinInstance.balanceOf(accountFrom),
            previousBalanceFromAfter, 'Values are different (from)!');
        assert.equal(await euroCoinInstance.balanceOf(accountTo),
            previousBalanceToAfter + value, 'Values are different (to)!'); */
    });
});
