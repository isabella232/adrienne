pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
* Save Services
*/
contract ServiceStorage {
    using SafeMath for uint256;

    struct Location {
        bytes32 city;
        bytes32 street;
    }
    // please, don't change the order
    enum ServiceType { Rental, Delivery, Extras }

    struct Service {
        address account;
        ServiceType serviceType;
        Location location;
        bytes32 offChainLocation;
    }
    Service[] services;
    uint256 private totalServices;

    /**
    * _serviceType - type of service
    * _city - city where the service will be available
    * _street - street where the service will be available
    * _offChainLocation - address to off-chain database
    */
    function createService(
        ServiceType _serviceType,
        bytes32 _city,
        bytes32 _street,
        bytes32 _offChainLocation) public {

        address _account = msg.sender;
        services.push(
            Service(_account, _serviceType, Location(_city, _street), _offChainLocation));
        totalServices = totalServices.add(1);
    }

    /**
    * _serviceType - type of service
    * _city - city where the service is available
    * _street - street where the service is available
    * return - _offChainLocation - address to off-chain database
    */
    function findService(
        ServiceType _serviceType,
        bytes32 _city,
        bytes32 _street,
        uint256 _startingPoint)
        public view returns(address, bytes32, uint256) {

        for (uint256 e = _startingPoint; e < totalServices; e++) {
            Service storage service = services[e];
            if (service.serviceType == _serviceType
            && service.location.city == _city
            && service.location.street == _street) {
                return(service.account, service.offChainLocation, e + 1);
            }
        }
        return(0x0, "", 0);
    }
}
