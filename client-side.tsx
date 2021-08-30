import * as React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

interface AppProps {}

interface AppPState {
  gripApi: any;
  rowData: [];
  columns: any;
}

class ClientGrid extends React.Component<AppProps, AppPState> {
  constructor(props) {
    super(props);
    this.state = {
      gripApi: '',
      rowData: [],
      columns: []
    };
  }

  onGridReady = params => {
    this.setState({
      gripApi: params
    });
    const apiUrl = 'https://www.ag-grid.com/example-assets/row-data.json';
    fetch(apiUrl)
      .then(response => response.json())
      .then((rowData: any) => {
        console.log('This is your data', rowData);
        params.api.applyTransaction({ add: rowData });
        params.api.paginationGoToPage(10); // set default page
        // this.setState({
        //   rowData: rowData
        // });
      });
  };

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

  createServerSideDatasource = server => {
    return {
      getRows: function(params) {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        var response = server.getData(params.request);
        setTimeout(function() {
          if (response.success) {
            params.success({ rowData: response.rows });
          } else {
            params.fail();
          }
        }, 500);
      }
    };
  };

  createFakeServer = allData => {
    return {
      getData: function(request) {
        var requestedRows = allData.slice();
        return {
          success: true,
          rows: requestedRows
        };
      }
    };
  };

  onChange = event => {
    debugger;
    this.state.gripApi.api.paginationSetPageSize(event.target.value);
  };

  render() {
    // overrides the default using a multiple column types
    const dType = ['dateColumn', 'nonEditableColumn'];
    // a default column definition with properties that get applied to every column
    const defaultColDef = {
      // set every column width
      width: 100,
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: 'agTextColumnFilter'
    };

    // if we had column groups, we could provide default group items here
    const defaultColGroupDef = {};

    // define a column type (you can define as many as you like)
    const columnTypes = {
      nonEditableColumn: { editable: false },
      dateColumn: {
        filter: 'agDateColumnFilter',
        // filterParams: { comparator: myDateComparator },
        suppressMenu: true
      }
    };
    return (
      <div>
        <select onChange={this.onChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <AgGridReact
            defaultColDef={defaultColDef}
            defaultColGroupDef={defaultColGroupDef}
            columnTypes={columnTypes}
            onGridReady={this.onGridReady}
            // rowData={this.state.rowData}
            pagination={true}
            paginationPageSize={10}
            // paginationAutoPageSize={true} // default size based on height of table
          >
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
      </div>
    );
  }
}

export default ClientGrid;
