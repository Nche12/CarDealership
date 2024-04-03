import { NgModule } from '@angular/core';
import {
  ColumnChooserService,
  ExcelExportService,
  FilterService,
  GridModule,
  GridAllModule,
  GroupService,
  PageService,
  PdfExportService,
  SearchService,
  SortService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';
// import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  NumericTextBoxAllModule,
  NumericTextBoxModule,
} from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
// import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
// import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
// import { DialogModule } from '@syncfusion/ej2-angular-popups';
// import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';

const modules = [
  ColumnChooserService,
  ExcelExportService,
  FilterService,
  GridModule,
  GridAllModule,
  GroupService,
  PageService,
  PdfExportService,
  SearchService,
  SortService,
  ToolbarService,
  //   DropDownListModule,
  //   DropDownListAllModule,
  NumericTextBoxAllModule,
  NumericTextBoxModule,
  ButtonModule,
  CheckBoxModule,
  //   DropDownButtonModule, SplitButtonModule, ProgressButtonModule,
  //   DialogModule,
  //   ToolbarModule,
  DatePickerModule,
  DatePickerAllModule,
];

@NgModule({
  declarations: [],
//   imports: [...modules],
//   exports: [...modules]
})
export class NgSyncfusionModule {}
