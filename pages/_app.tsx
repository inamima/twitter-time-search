import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app'


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
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

export default App;
