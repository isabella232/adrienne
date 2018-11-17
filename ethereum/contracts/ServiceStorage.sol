pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract ServiceStorage {
    using SafeMath for uint256;

    struct Location {
        bytes32 city;
        bytes32 street;
    }
    enum ServiceType { Rental, Extras, Delivery }

    struct Service {
        ServiceType serviceType;
        Location location;
        bytes32 offChainLocation;
    }
    Service[] services;
    uint256 private totalServices;

    function createService(
        ServiceType _serviceType,
        bytes32 _city,
        bytes32 _street,
        bytes32 _offChainLocation) public {

        services.push(Service(_serviceType, Location(_city, _street), _offChainLocation));
        totalServices = totalServices.add(1);
    }

    function findService(
        ServiceType _serviceType,
        bytes32 _city,
        bytes32 _street) public view returns(bytes32) {

        for (uint256 e = 0; e < totalServices; e++) {
            Service storage service = services[e];
            if (service.serviceType == _serviceType && service.location.city == _city && service.location.street == _street) {
                return(service.offChainLocation);
            }
        }
        return "";
    }
}
