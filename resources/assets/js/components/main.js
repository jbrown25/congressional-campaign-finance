import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './header';
import Body from './body';
import Footer from './footer';

class Main extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Body />
                    <Footer />
                </div>
            </Router>                   
        );
    }
}


if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
