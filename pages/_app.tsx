import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default (props: any) => {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Component {...pageProps} />
        </React.Fragment>
    );
}