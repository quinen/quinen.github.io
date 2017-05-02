import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'

import Menu from './Menu.jsx';
import Content from './Content.jsx';

class App extends Component {
    render() {
        return (
            <HashRouter>
    		<div>
    			<Menu/>
    			<Segment inverted>  
    				<Content/>
    			</Segment>
			</div>
    	</HashRouter>
        );
    }
}

export default App;
