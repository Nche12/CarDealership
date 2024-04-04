import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarsService } from '../Services/CarsInventory/cars.service';
import { IInventory } from '../Interface/interface';
import { Observable, map } from 'rxjs';
import {
  Column,
  ColumnChooserService,
  EditSettingsModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [
    { provide: VirtualScrollService, useValue: VirtualScrollService },
    { provide: ColumnChooserService, useValue: ColumnChooserService },
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class InventoryComponent implements OnInit {
  public inventory$!: Observable<IInventory[]>;

  @ViewChild('overviewgrid') public overviewgrid!: GridComponent;
  @ViewChild('template', { static: true }) public ddTemplate: any;
  public filter!: Object;
  public filterSettings!: Object;
  public pageSettings!: PageSettingsModel;
  public editSettings!: EditSettingsModel;
  public toolbarOptions!: ToolbarItems[] | object;
  public toolbar!: ToolbarItems[];
  public selectionOptions!: Object;

  public currencySymbol: string = 'ZAR';
  public filtervalue: string = '';
  public columnChooserOpened: boolean = false;

  constructor(
    private carsService: CarsService,
     private router: Router
     ) {}

  ngOnInit() {
    this.pageSettings = { pageSize: 25 };
    this.filterSettings = { type: 'Menu' };
    this.filter = { type: 'CheckBox' };
    this.editSettings = {
      allowEditing: false,
      allowAdding: false,
      allowDeleting: true,
      mode: 'Normal',
    };
    this.selectionOptions = { persistSelection: true, checkboxOnly: true };
    this.toolbarOptions = [
      'Search',
      { template: this.ddTemplate, align: 'left' },
    ];
    this.getInventory(true);
  }

  getInventory(refresh: boolean): void {
    this.inventory$ = this.carsService
      .getInventory(refresh)
      .pipe(map((info: any) => info.data));
  }

  addInventory(add_edit: string) {
    console.log('add or edit => ', add_edit);
    this.router.navigate(['/add_edit_inventory'], {
      queryParams: { action: add_edit },
    });
  }

  filterTable(option: string) {
    console.log('Filter Option => ', option);
  }

  filterExport(option: string) {
    console.log('Filter Export option => ', option);
  }

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id == 'overviewgrid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'Rental Files Report.pdf',
      };
      this.overviewgrid.pdfExport();
    }

    if (args.item.id == 'overviewgrid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Rental Files Report.xlsx',
      };
      this.overviewgrid.excelExport(excelExportProperties);
    }

    if (args.item.id == 'overviewgrid_add') {
    }
  }

  public onLoad() {
    this.overviewgrid?.element.addEventListener(
      'keydown',
      this.debounce((e: any) => {
        if (e.target?.getAttribute('id')?.indexOf('_searchbar') !== -1) {
          this.overviewgrid?.search((e.target as HTMLInputElement).value);
        }
      }, 250)
    );
    this.overviewgrid.adaptiveDlgTarget = document?.getElementsByClassName(
      'e-mobile-content'
    )[0] as HTMLElement;
  }

  dataBound(args: any) {
    this.overviewgrid.autoFitColumns();
  }

  rowDataBound(e: any) {
    // console.log("Row Data Bound => ", e.data);
  }

  selected(args: any) {}

  deSelected(args: any) {}

  onClick(args: any) {
    console.log('Column Chooser Opened Command =>', this.columnChooserOpened);
    this.overviewgrid.columnChooserModule.openColumnChooser(5, args.y / 3);
    // when the column Chooser is closed, refresh the grid //
    this.columnChooserOpened = true;
    console.log('Column Chooser Opened =>', this.columnChooserOpened);
  }

  onColumnChooserClose() {
    console.log('Column Chooser Closed Command =>');
    if (this.columnChooserOpened) {
      this.overviewgrid.refresh();
    }
    this.columnChooserOpened = false;
  }

  onCreate(args: any) {
    const gridElement = document.getElementById('overviewgrid_toolbarItems');
    if (gridElement) {
      gridElement.style.height = '';
    } else {
      console.error("Element with ID 'overviewgrid_toolbarItems' not found.");
    }

    var element = document.getElementsByClassName('e-search')[0];
    console.log('Element => ', element);
    element.children[0].addEventListener('focus', function () {
      element.classList.remove('e-input-focus');
    });
  }

  public debounce = (func: any, delay: any) => {
    let debounceTimer: any;
    return function (this: any) {
      // Explicitly define the type of 'this'
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  queryCellInfo(args: any) {}

  pdfQueryCellInfo(args: any): void {}

  excelQueryCellInfo(args: any): void {}

  pdfExportComplete(): void {
    // (this.overviewgrid.columns[1] as Column).visible = true;
    this.overviewgrid.hideSpinner();
  }
  excelExportComplete(): void {
    // (this.overviewgrid.columns[1] as Column).visible = true;
    this.overviewgrid.hideSpinner();
  }
}
