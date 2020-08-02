import React from 'react';
import './App.css';
import Universe from './containers/Universe';
import Ship from './components/Ship';

class App extends React.Component {
	state={
		view:"intro"
	}

	startGame=(event)=>{
		event.preventDefault()
		this.setState({view: "universe"})
	}

	renderIntro=()=>{
		return (this.state.view === "intro" ?
			<div className="intro">
			<h1>Welcome to Planet Hack!</h1>
			<p> Greetings, hero! You are the last hope for humanity. Please, stay alive so we can reach for the stars.</p>
			<p> Objectives: maintain resources by flying over planets.</p>
			<p> Controls:</p>
			<p> 'A' key turns your ship 10 degrees to the left.</p>
			<p> 'D' key turns your ship 10 degrees to the right.</p>
			<p> 'W' key propels your ship forward. Hold down w at your own risk!</p>
			<button className="startbutton"onClick={this.startGame}>Start</button>
		</div>: 
		<Universe />
		)
	}
	render(){
		return (
			<div className="App">
				{this.renderIntro()}
			</div>
		);
	}
}

export default App;
