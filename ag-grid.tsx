import * as React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

interface AppProps {}

interface AppPState {
  rowData: [];
}

class AgGrid extends React.Component<AppProps, AppPState> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: []
    };
  }

  componentDidMount() {
    const apiUrl = 'https://www.ag-grid.com/example-assets/row-data.json';
    fetch(apiUrl)
      .then(response => response.json())
      .then((rowData: any) => {
        console.log('This is your data', rowData);
        this.setState({
          rowData: rowData
        });
      });
  }

  render() {
    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={this.state.rowData}>
          <AgGridColumn
            field="make"
            headerName="Make"
            sortable={true}
            filter={true}
          />
          <AgGridColumn
            field="model"
            headerName="Model 1"
            sortable={true}
            filter={true}
          />
          <AgGridColumn
            field="price"
            headerName="Price 1"
            sortable={true}
            filter={true}
          />
        </AgGridReact>
      </div>
    );
  }
}

export default AgGrid;
