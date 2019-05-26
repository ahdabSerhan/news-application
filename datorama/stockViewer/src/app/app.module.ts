import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables'
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts'; 

import highstock from 'highcharts/modules/stock.src'; 
import exporting from 'highcharts/modules/exporting.src';


import { AppComponent } from './views/app.component';
import {StockService} from './services/stock.http.service'
export function highchartsModules() {
  // apply Highstock Modules to this array
  return [ highstock, exporting ];
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ChartModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [StockService,     { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
