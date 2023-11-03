import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { SupportComponent } from './views/support/support.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './views/custom-sidenav/custom-sidenav.component';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './views/footer/footer.component';
import { AccumulationChartAllModule, ChartAllModule, ChartModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InventoryComponent,
    AnalyticsComponent,
    SupportComponent,
    CustomSidenavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ChartModule,


    ChartAllModule,
    RangeNavigatorAllModule,
    ButtonModule,
    AccumulationChartAllModule,
    NumericTextBoxModule,
    // DatePickerModule,
    // DropDownListAllModule,
    DashboardLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
