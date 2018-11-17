import React, { Component } from 'react';

import '../Main.module.css';

class Request extends Component {
    // eslint-disable-next-line class-methods-use-this
    mth() {
        //
    }


    render() {
        return (
            <div>
                <div className="Search__Container Search__Container_HeightRequest">
                    <form className="Search__Form">

                        {/* Option Vehicle Section */}
                        <p className="Search__Title">Vehicle</p>
                        <div className="Search__LabelGrid">
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Body Type</option>
                                </select>
                            </div>
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Make</option>
                                </select>
                            </div>
                            <div>
                                <select className="Search__Label_FullWidth">
                                    <option className="Search__Option_FullWidth">Model</option>
                                </select>
                            </div>
                        </div>

                        {/* Pickup Section */}
                        <p className="Search__Title">Pick Up</p>
                        <div className="Search__PickupGrid">
                            <div>
                                <input className="Search__PickupInput" placeholder="Lisbon" />
                            </div>
                            <div className="Search__PickupDateGrid">
                                <input className="Search__PickupDateItem" placeholder="Address, City" />
                                <input className="Search__PickupDateItem" placeholder="Address, City" />
                            </div>
                        </div>


                        {/* Return Section */}
                        <p className="Search__Title">Return</p>
                        <div className="Search__PickupGrid">
                            <div>
                                <input className="Search__PickupInput" placeholder="Lisbon" />
                            </div>
                            <div className="Search__PickupDateGrid">
                                <input className="Search__PickupDateItem" placeholder="Address, City" />
                                <input className="Search__PickupDateItem" placeholder="Address, City" />
                            </div>
                        </div>

                        {/* Input Extras Section */}
                        <p className="Search__Title">Extras</p>
                        <div>
                            <ul className="Search__ExtrasGrid">
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Child Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Baby Stroller</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Toddler Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Camping Table and Chairs</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Infant Seat</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Wifi Hotspot</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">Chaffeur</div>
                                </li>
                                <li className="Extras__Item">
                                    <input className="Extras__Checkbox" type="checkbox" />
                                    <div className="Extras__Text">GPS</div>
                                </li>
                            </ul>
                        </div>

                        <button type="button" className="Button Button__Publish">REQUEST</button>
                    </form>
                    <div className="Search__BottomPadding" />
                </div>
            </div>
        );
    }
}

export default Request;
