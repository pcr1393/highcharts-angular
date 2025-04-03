import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadialBarChartComponent } from './radial-bar-chart/radial-bar-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

// import { defineCustomElements } from '../../dist/my-app/'

@NgModule({
  declarations: [
    AppComponent,
    RadialBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
 

 }
