import React, { Component } from 'react';
import { render } from 'react-dom';
import { About } from './About';
import Hello from './Hello';
import CURD from './curd';
import './style.css';
import AgGrid from './ag-grid';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'SIMPLE CURD'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        {/* <About /> */}
        <CURD />
        <AgGrid />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
