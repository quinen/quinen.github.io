import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class AppMenu extends Component {
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
      <Menu inverted >
        {this.props.items.map((item) => {
           return <Menu.Item key={item.name} {...item} as={NavLink} />
        })}
      </Menu>
    )
  }
}

AppMenu.defaultProps = {
  items: [{
      name: "Accueil",
      icon: "home",
      to: "/",
      exact: true
    },
    { name: "CV", icon: "briefcase", to: "/cv" },
    { name: "Applications", icon: "cubes", to: "/apps" },
    { name: "Liens", icon: "linkify", to: "/links" }
  ]
}

export default AppMenu;
