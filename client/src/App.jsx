/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
// eslint-disable-next-line import/no-named-as-default
import Request from './pages/Request/Request';
import Proposals from './pages/Proposals/Proposals';
import Navbar from './pages/Navbar/Navbar';


export default function renderApp() {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Navbar />
                <Route path="/" exact component={Main} />
                <Route path="/request" component={Request} />
                <Route path="/proposals" component={Proposals} />
            </div>
        </BrowserRouter>, document.getElementById('root'),
    );
}
