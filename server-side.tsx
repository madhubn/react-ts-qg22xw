import * as React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

interface AppProps {}

interface AppPState {
  rowData: [];
}

class ServerGrid extends React.Component<AppProps, AppPState> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: []
    };
  }

  onGridReady = params => {
    const apiUrl = 'https://www.ag-grid.com/example-assets/row-data.json';
    fetch(apiUrl)
      .then(response => response.json())
      .then((rowData: any) => {
        console.log('This is your data', rowData);
        updateData(rowData);
        // this.setState({
        //   rowData: rowData
        // });
      });

    const updateData = data => {
      var fakeServer = this.createFakeServer(data);
      var datasource = this.createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };
  };

  createServerSideDatasource = server => {
    return {
      getRows: function(params) {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        var response = server.getData(params.request);
        setTimeout(function() {
          if (response.success) {
            debugger;
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
      <div style={{ width: '100%', height: '100%' }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%'
          }}
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 100
            }}
            rowModelType={'serverSide'}
            onGridReady={this.onGridReady}
          >
            <AgGridColumn field="athlete" minWidth={220} />
            <AgGridColumn field="country" minWidth={200} />
            <AgGridColumn field="year" />
            <AgGridColumn field="sport" minWidth={200} />
            <AgGridColumn field="gold" />
            <AgGridColumn field="silver" />
            <AgGridColumn field="bronze" />
          </AgGridReact>
        </div>
      </div>
    );
  }
}

export default ServerGrid;
