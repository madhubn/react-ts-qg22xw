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

   delete = (a, b) => {
    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== a) {
          return item;
        }
      })
    });
    
  }

   onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: [...this.state.mockData, {
        id: Date.now(),
        title: event.target.item.value,
        done: false,
        date: new Date()
      }]
    });

    event.target.item.value = '';
  }


  
  edit = (id, title, event) => {
    console.log(id, title);
    this.setState({
      edit: true,
      id: id,
      title: title
    });
  }

  onUpdateHandle = (e: React.FormEvent<HTMLFormElement>): void =>{
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }

        return item;
      })
    });
  }


    renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle}>
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} />
        <button className="update-add-item">Update</button>
      </form>
    }
    }
  renderAddForm() {
    if (!this.state.edit) {
      return  <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="text" name="item" className="item" />
          <button className="btn-add-item">Add</button>
        </form>
    }
    }

  render() {
    return ( 
    <div>
       {this.renderEditForm()}
       {this.renderAddForm()}

         
      <ul>
          {this.state.mockData.map(item => (
            <li>
              {item.title}
              <button onClick={(ev) => this.delete(item.id, ev)}>Delete</button>
              <button onClick={(ev) => this.edit(item.id, item.title, ev)}>Edit</button>
              <button>Complete</button>
            </li>
          ))}
        </ul>
    </div>);
  }
}

export default CURD;