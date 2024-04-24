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
import { HttpClientModule } from '@angular/common/http';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { NgMaterialModule } from './views/ng-material/ng-material.module';
import { NgSyncfusionModule } from './views/ng-syncfusion/ng-syncfusion.module';
import { AddEditCarComponent } from './views/add-edit-car/add-edit-car.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarModelComponent } from './views/dialogs/car-model/car-model.component';
import { CarMakeComponent } from './views/dialogs/car-make/car-make.component';
import { ColourComponent } from './views/dialogs/colour/colour.component';
import { ClientComponent } from './views/dialogs/client/client.component';
import { AdvertisingPlatformComponent } from './views/dialogs/advertising-platform/advertising-platform.component';
import { FrequencyComponent } from './views/dialogs/frequency/frequency.component';
import { SortPipe } from './views/Pipes/Sort/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InventoryComponent,
    AnalyticsComponent,
    SupportComponent,
    CustomSidenavComponent,
    FooterComponent,
    AddEditCarComponent,
    CarModelComponent,
    CarMakeComponent,
    ColourComponent,
    ClientComponent,
    AdvertisingPlatformComponent,
    FrequencyComponent,
    SortPipe
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
    HttpClientModule,


    ChartAllModule,
    RangeNavigatorAllModule,
    ButtonModule,
    AccumulationChartAllModule,
    NumericTextBoxModule,
    // DatePickerModule,
    // DropDownListAllModule,
    DashboardLayoutModule,
    NgMaterialModule,
    // NgSyncfusionModule,

    GridAllModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
