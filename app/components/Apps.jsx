import React, { Component } from 'react'
import { Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react'
import { HashRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';

import Fraction from "./Fraction.jsx";


class AppsMenu extends Component {
    constructor() {
        super()
        this.state = { activeItem: 'Web' };
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (

            <Menu pointing secondary vertical inverted>
        {this.props.items.map((item) => {
           return <Menu.Item key={item.name} {...item} as={NavLink} />
        })}
      </Menu>

        )
    }
}

AppsMenu.defaultProps = {
    items: [
        { name: "Fractionné sur Tapis", icon: "trophy", to: "/fraction", exact: true },
        { name: "Gestion de stock", icon: "database", to: "/stock" },
    ]
}

const Apps = () => <div>
    <HashRouter basename="/apps">
    <div>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column width={3}>        
                    <AppsMenu/>
                </Grid.Column>
                <Grid.Column width={13}> 
                    <Switch>
                        <Redirect exact from="/" to="/fraction"/>
                        <Route path="/fraction" component={Fraction}/> 
                        <Route path="/stock"/> 
                        <Route render = {
                        ({ location }) => {
                            return <div>{location.pathname} not found</div>
                        }
                    }
                    />

                    </Switch>        
                </Grid.Column>
            </Grid.Row>
        </Grid>

           
        </div>
    </HashRouter>   
</div>

export default Apps;
