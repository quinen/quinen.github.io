import React, { Component } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'


var ReactMarkdown = require('react-markdown');

var input = require('../../README.md');

const Home = () => <div>
<br/>
<Header icon textAlign="center" as="h1" inverted>
		 <Icon name='home' circular inverted color="blue"/>
		 <Header.Content>
		 	Accueil
		 	<Header.Subheader>
		 		Plus connue comme etant la page vide qui ne sert a rien ... ou presque 
		 	</Header.Subheader>
		 	
		 </Header.Content>

		
	</Header>

	
		<ReactMarkdown source={input} />


</div>

export default Home;
