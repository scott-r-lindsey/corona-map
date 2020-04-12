
import React from 'react';
import { withRouter } from 'react-router-dom';
import env from '../env.js';


/*
class GoogleAnalytics extends React.Component {
    componentWillUpdate ({ location, history }) {
        const gtag = window.gtag;

        if (location.pathname === this.props.location.pathname) {
            // don't log identical link clicks (nav links likely)
            return;
        }

        console.log(history.action);
        console.log(typeof(gtag));
        if (history.action === 'PUSH' &&
            typeof(gtag) === 'function') {

            console.log('ga fire?');

            gtag('config', env.GA_ACCOUNT, {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': location.pathname
            });
        }
        console.log('what up ga');
    }

    render () {
        console.log('what up');
        return null;
    }
}

export default withRouter(GoogleAnalytics);
*/
