import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'

import {AgGridModule} from 'ag-grid-angular/main';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component'

@NgModule({
  declarations: [
    AppComponent,
    CustomizedCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    CustomizedCellComponent
  ]
})
export class AppModule { }
