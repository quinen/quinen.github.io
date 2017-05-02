import React, { Component } from 'react'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react'
import { HashRouter, NavLink } from 'react-router-dom';

class CvMenu extends Component {
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

CvMenu.defaultProps = {
    items: [
        { name: "Web", icon: "globe", to: "/", exact: true, header: true },
        { name: "PDF", icon: "file pdf outline", to: "/pdf" },
    ]
}

const Cv = () => <div>
	<HashRouter basename="/cv">
		<CvMenu/>
	</HashRouter>	
</div>

export default Cv;
