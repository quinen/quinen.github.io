import React, { Component } from 'react';

import { HashRouter } from 'react-router-dom';

import AppMenu from './AppMenu.jsx';
import AppContent from './AppContent.jsx';

class App extends Component {
  render() {
    return <HashRouter>
    <div>
    	<AppMenu/>
    	<AppContent/>
    	</div>
    </HashRouter>;
  }
}

export default App;
