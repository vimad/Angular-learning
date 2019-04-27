import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;
  private frameworkComponents;

  private searchValue;

  constructor(private http:HttpClient){
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150,
        sortingOrder: ['asc','desc']
      },
      {
        headerName: "Age",
        field: "age",
        width: 90,
        sortingOrder: ['asc','desc'],
        cellRenderer: "customizedAgeCell"
      },
      {
        headerName: "Country",
        field: "country",
        width: 120,
        sortingOrder: ['desc', null],
        lockPosition: true,
        suppressNavigable: true
      },
      {
        headerName: "Year",
        field: "year",
        width: 90,
        sortingOrder: ['asc']
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100
      },
      {
        headerName: "Total",
        field: "total",
        width: 100
      }
    ];

    this.frameworkComponents = {
      customizedAgeCell: CustomizedCellComponent
    };
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //let data = [{firstName:"vinod", age:25}];
    this.http.get("https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json")
      .subscribe(
        (data) => {
          params.api.setRowData(data);
        }
      )
  }

  getData(){
    var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
    alert(rowNode.data.athlete);
  }

  quickSearch(){
    this.gridApi.setQuickFilter(this.searchValue);
  }

}
