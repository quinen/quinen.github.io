import React, { Component } from 'react'
import { Icon, Menu as MenuSemantic, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'Accueil' }
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
      <Segment>
      <MenuSemantic pointing color="orange" fixed="top">
        {this.props.items.map((item) => {

          const exact = (typeof item.exact!=='undefined'?item.exact:false);
          const header = (typeof item.header!=='undefined'?item.header:false);

           return (
            <MenuSemantic.Item key={item.name} to={item.to} as={NavLink} exact={exact} header={header}>
              <Icon name={item.icon} circular/>
              {item.name}
           </MenuSemantic.Item>)
        })}
      </MenuSemantic>
      </Segment>
      </div>

        )
    }
}

Menu.defaultProps = {
    items: [
        { name: "Accueil", icon: "home", to: "/", exact: true, header: true },
        { name: "CV", icon: "briefcase", to: "/cv" },
        { name: "Applications", icon: "cubes", to: "/apps" },
        { name: "Liens", icon: "linkify", to: "/links" }
    ]
}

export default Menu;
