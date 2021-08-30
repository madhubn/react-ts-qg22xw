import * as React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

interface AppProps {}

interface AppPState {
  rowData: [];
  columns: any;
}

class AgGridMedals extends React.Component<AppProps, AppPState> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      columns: []
    };
  }

  componentDidMount() {
    this.setState({
      columns: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' }
      ]
    });
    const apiUrl =
      'https://www.ag-grid.com/example-assets/olympic-winners.json';
    fetch(apiUrl)
      .then(response => response.json())
      .then((rowData: any) => {
        console.log('This is your data', rowData);
        this.setState({
          rowData: rowData
        });
      });
  }

  onBtSortAthlete = evt => {
    const defaultState = { sort: null };
    this.setState({
      columns: [
        { ...defaultState, field: 'athlete', sort: 'asc' },
        { ...defaultState, field: 'age' },
        { ...defaultState, field: 'country' },
        { ...defaultState, field: 'sport' },
        { ...defaultState, field: 'year' },
        { ...defaultState, field: 'date' },
        { ...defaultState, field: 'gold' },
        { ...defaultState, field: 'silver' },
        { ...defaultState, field: 'bronze' },
        { ...defaultState, field: 'total' }
      ]
    });
  };

  render() {
    // overrides the default using a multiple column types
    const dType = ['dateColumn', 'nonEditableColumn'];
    // a default column definition with properties that get applied to every column
    const defaultColDef = {
      // set every column width
      // make every column editable
      // editable: true,
      // make every column use 'text' filter by default
      // filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
      width: 150,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true
    };

    // if we had column groups, we could provide default group items here
    const defaultColGroupDef = {};
    const sideBarDef = {
      toolPanels: ['columns']
    };

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
        <div>
          <button type="button" onClick={this.onBtSortAthlete}>
            Sort Athlete
          </button>
        </div>

        <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
          <AgGridReact
            defaultColDef={defaultColDef}
            defaultColGroupDef={defaultColGroupDef}
            columnTypes={columnTypes}
            rowData={this.state.rowData}
            sideBar={sideBarDef}
            rowGroupPanelShow="always"
            pivotPanelShow="always"
            applyColumnDefOrder={true}
          >
            {this.state.columns.map(column => (
              <AgGridColumn {...column} field={column.field} />
            ))}
          </AgGridReact>
        </div>
      </div>
    );
  }
}

export default AgGridMedals;
