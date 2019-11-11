import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const BACK_END = 'https://still-castle-28885.herokuapp.com/';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
    input: '',
    imageURL: '',
    faceBoxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
    }  
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  /**
   * Populates faceBoxes state with face detection box locations
   * 
   * @param response data         data from clarifai api response
   * @return none
   */
  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;

    if (clarifaiFaces != null) {
      let boxes = [];
      for (let region of clarifaiFaces) {
        boxes.push({
          left: (region.region_info.bounding_box.left_col * 100).toString() + '%',
          top: (region.region_info.bounding_box.top_row * 100).toString() + '%',
          right: (100 - (region.region_info.bounding_box.right_col * 100)).toString() + '%',
          bottom: (100 - (region.region_info.bounding_box.bottom_row * 100)).toString() + '%'
        })
      }
      this.setState({faceBoxes: boxes});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  /**
   * Makes call to back-end, clarifai api
   * if image is valid, update entries in db
   * 
   * @param none
   * @return none
   */
  onImageSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch(BACK_END + 'imageurl',
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response !== '[API] Call error.') {
        fetch(BACK_END + 'image',
        {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }));
        })
        .catch(console.log);

        this.calculateFaceLocation(response);
      }
    })
    .catch(err => console.log(err));
  }

  /**
   * Sets route state and resets route state
   * 
   * @param string route
   * @return none
   */
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation routeChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm inputChange={this.onInputChange} imageSubmit={this.onImageSubmit} />
              <FaceRecognition imageURL={this.state.imageURL} faceBoxes={this.state.faceBoxes} />
            </div>
          : (this.state.route === 'signin')
          ? <SignIn loadUser={this.loadUser} routeChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} routeChange={this.onRouteChange} />
          
        }
      </div>
    );
  }
}

export default App;
