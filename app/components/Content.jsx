import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import Cv from './Cv.jsx';
import Apps from './Apps.jsx';

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'home' }
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/cv" component={Cv}/>
        <Route path="/apps" component={Apps}/>
        {/*<Route path="/cv" component={Cv}/>
        <Route path="/apps" component={Apps}/>
        <Route path="/links" component={Links}/>*/}
        <Route render={({location})=>{
          return <div>{location.pathname} not found</div>
        }}/>
      </Switch>
        )
    }
}

export default Content;
