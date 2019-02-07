import React, { Component } from 'react';
import './App.css';
import * as service from './services/auth';
import * as testService from './services/test';

class App extends Component {
  state = {
    user: null,
    loginInfo: {
      username: '',
      password: ''
    },
    signupInfo: {
      username: '',
      password: '',
      email: '',
      sex: true,
    }
  };

  componentDidMount() {
    testService.getData().then((user)=>this.setState({user: user.username}));
  }

  handleLogin = async() => {
    const auth = await service.login(this.state.loginInfo);
    if (auth) {
      console.log('login!' + auth.msg);
    } else {
      alert('잘못된 계정');
    }
  }

  handlerChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={this.state.loginInfo.username}
            onChange={this.handlerChange}
            name="username"
          >
          </input>
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={this.state.loginInfo.password}
            onChange={this.handlerChange}
            name="password"
          >
          </input>
        </div>
        <div>
          <button
            type="button"
            onClick={this.handleLogin}
          >Login</button>
        </div>
        <div>
          {this.state.user? <h1>{`Hello ${this.state.user}`}</h1> : <h1>Loading.. please wait!</h1>}
        </div>
      </div>
    );
  }
}

export default App;
