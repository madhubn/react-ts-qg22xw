import * as React from "react";

export class CURD extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [{
        id: '1',
        title: 'Buy Milk.',
        done: false,
        date: new Date()
      }, {
        id: '2',
        title: 'Meeting with Ali.',
        done: false,
        date: new Date()
      }, {
        id: '3',
        title: 'Tea break.',
        done: false,
        date: new Date()
      }, {
        id: '4',
        title: 'Go for a run.',
        done: false,
        date: new Date()
      }]
    }
  }

  render() {
    return ( 
    <div>
    dddddddddddddd
      <ul>
          {this.state.mockData.map(item => (
            <li>
              {item.title}
             
            </li>
          ))}
        </ul>
    </div>);
  }
}

export default CURD;