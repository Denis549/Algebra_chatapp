import React, { Component } from 'react';
import './App.css';
import Messages from "./Components/Messages";
import Input from "./Components/Input";
import randomColor from "./helpers/randomColor";
import randomName from "./helpers/randomName";

class Home extends Component {
  render() {
    return (
      <div className="main">
        <div className="home">
          <h1>Welcome to My Chat App</h1>
          <div className="button-container">
            <button onClick={this.props.onEnter} className='enter'>Enter</button>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
    entered: false,
  }

  onEnter = () => {
    this.initializeChat();
    this.setState({ entered: true });
  }

  initializeChat() {
    this.drone = new window.Scaledrone("TBhm4VC3vkDMOlcN", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    const { entered } = this.state;

    if (!entered) {
      return <Home onEnter={this.onEnter} />;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
}

export default App;
