import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/withRedux'
import { Provider } from 'react-redux'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import getPageContext from '../lib/getPageContext'
import { JssProvider, jss } from 'react-jss'


class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider  registry={this.pageContext.sheetsRegistry}
                      jss={jss}
                      generateClassName={this.pageContext.generateClassName}>
          
          {/* MuiThemeProvider makes the theme available down the React tree thanks to React context. */}
          <MuiThemeProvider theme={this.pageContext.theme} 
                            sheetsManager={this.pageContext.sheetsManager}>
            
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {/* Pass redux provider */}
            <Provider store={reduxStore}>
            
              {/* Pass pageContext to the _document though the renderPage enhancer
              to render collected styles on server side. */}
              <Component pageContext={this.pageContext} {...pageProps} />
              
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp)