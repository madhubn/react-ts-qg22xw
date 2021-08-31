import * as React from 'react';

class ButtonCellRenders extends React.Component {
  constructor(props) {
    super(props);
  }

  btnClickedHandler = () => {};
  render() {
    return <button onClick={this.btnClickedHandler}>Click Me!</button>;
  }
}

export default ButtonCellRenders;
