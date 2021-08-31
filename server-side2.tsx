import * as React from 'react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { filter } from 'ag-grid-community/dist/lib/utils/array';
import {
  CellValueChangedEvent,
  ColDef,
  GetMainMenuItemsParams,
  GridApi
} from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';

class Page {
  offset = 0;
  pageSize = 4;
}

interface AppProps {}

interface AppPState {
  gripApi: any;
  rowData: [];
  columns: any;
  rowModelType: string;
  offset: number;
  pageSize: number;
  defaultColDef?: ColDef;
}

class ServerGrid2 extends React.Component<AppProps, AppPState> {
  constructor(props) {
    super(props);
    LicenseManager.setLicenseKey(
      'Peace_OTY2OTQ1OTQ1Njk3Mw==7e213e88aef89910e528cf77b5ac1af0'
    );
    this.state = {
      gripApi: '',
      rowData: [],
      columns: [],
      rowModelType: 'serverSide',
      offset: 0,
      pageSize: 4
    };
  }

  componentDidMount() {
    this.setState({
      columns: [
        { field: 'id', filter: 'agTextColumnFilter' },
        { field: 'name', filter: 'agTextColumnFilter' },
        { field: 'color', filter: 'agTextColumnFilter' },
        { field: 'pantone_value', filter: 'agTextColumnFilter' },
        { field: 'year', filter: 'agTextColumnFilter' }
      ],
      rowModelType: 'serverSide',
      offset: 0,
      pageSize: 4,
      defaultColDef: { filter: true, floatingFilter: true }
    });
  }

  datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { startRow, endRow } = params.request;
      const url = 'https://reqres.in/api/products?';
      const url1 = `${url}page=0&per_page=4`;
      // {
      //   method: 'get',
      //   headers: { 'Content-Type': 'application/json; charset=utf-8' }
      // }
      fetch(url1)
        .then(httpResponse => httpResponse.json())
        .then(response => {
          params.successCallback(response.data, response.total);
        })
        .catch(error => {
          console.error(error);
          params.failCallback();
        });
    }
  };

  componentDidUpdate() {
    //
  }

  onGridReady = params => {
    this.setState({
      gripApi: params
    });
    // register datasource with the grid

    params.api.setServerSideDatasource(this.datasource);
    // const apiUrl = 'https://www.ag-grid.com/example-assets/row-data.json';
    // fetch(apiUrl)
    //   .then(response => response.json())
    //   .then((rowData: any) => {
    //     console.log('This is your data', rowData);
    //     // params.api.applyTransaction({ add: rowData });
    //     // params.api.paginationGoToPage(10); // set default page
    //     this.setState({
    //       rowData: rowData
    //     });
    //   });
  };

  // componentDidMount() {

  //   const apiUrl =
  //     'https://www.ag-grid.com/example-assets/olympic-winners.json';
  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then((rowData: any) => {
  //       console.log('This is your data', rowData);
  //       this.setState({
  //         rowData: rowData
  //       });
  //     });
  // }

  onChange = event => {
    debugger;
    this.state.gripApi.api.paginationSetPageSize(event.target.value);
  };

  onFilterChanged = () => {
    debugger;
  };

  render() {
    // overrides the default using a multiple column types
    const dType = ['dateColumn', 'nonEditableColumn'];
    // a default column definition with properties that get applied to every column
    const defaultColDef = {
      // set every column width
      // width: 100,
      // make every column editable
      // editable: true,
      // make every column use 'text' filter by default
      // filter: 'agTextColumnFilter'
      filter: true,
      floatingFilter: true
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
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={this.state.rowData}
            rowModelType={this.state.rowModelType}
            defaultColDef={defaultColDef}
            // defaultColGroupDef={defaultColGroupDef}
            // columnTypes={columnTypes}
            columnDefs={this.state.columns}
            onGridReady={this.onGridReady}
            // rowData={this.state.rowData}
            pagination={true}
            paginationPageSize={this.state.pageSize}
            domLayout="autoHeight"
            onFilterChanged={this.onFilterChanged}
            // paginationAutoPageSize={true} // default size based on height of table
          />
        </div>
      </div>
    );
  }
}

export default ServerGrid2;
