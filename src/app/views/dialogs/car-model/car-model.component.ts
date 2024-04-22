import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';
import { ICarMake, ICarModel } from '../../Interface/interface';
import { CarMakeService } from '../../Services/CarMake/car-make.service';
import { CarModelService } from '../../Services/CarModel/car-model.service';
import { CarMakeComponent } from '../car-make/car-make.component';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss'],
})
export class CarModelComponent implements OnInit, OnDestroy {
  public carMakes$!: Observable<ICarMake[]>;
  // public carModel$!: Observable<ICarModel>;

  public subscriptions: Subscription[] = [];
  public exists$!: Observable<boolean>;
  public carModels$!: Observable<ICarModel[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CarModelComponent>,
    private dialog: MatDialog,
    private carMakeService: CarMakeService,
    private carModelService: CarModelService
  ) {}

  ngOnInit(): void {
    console.log('Data => ', this.data);
    this.getCarMakes(false);
    this.addOrEdit(this.data.option);
  }

  addOrEdit(option: string): void {
    if (option == 'edit') {
      this.carModelForm.setValue({
        id: this.data.carModel.id,
        name: this.data.carModel.name,
        carMakeId: this.data.carModel.carMakeId,
      });
      console.log('Car Model => ', this.carModelForm.value);
    } else if (option == 'add') {
    }
  }

  onNameChange(event: Event): void {
    if (this.data.option == 'add') {
      console.log(event);
      const inputElement = event.target as HTMLInputElement;
      this.exists$ = this.carModelService.doesNameExist(inputElement.value);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }

  carModelForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    carMakeId: new FormControl(null, Validators.required),
  });

  close(): void {
    this.dialogRef.close();
  }

  getCarMakes(refresh: boolean): void {
    this.carMakes$ = this.carMakeService
      .getCarMakes(refresh)
      .pipe(map((info: any) => info.data));
  }

  // getCarModel(carModelId: number): void {
  //   this.carModel$ = this.carModelService
  //     .getCarModel(carModelId)
  //     .pipe(map((info: any) => info.data));
  // }

  saveCarModel(): void {
    console.log('Car Mode to Save => ', this.carModelForm.value);
    if (this.data.option == 'add') {
      console.log('Add Car Model!');
      this.addCarModel();
    } else if (this.data.option == 'edit') {
      console.log('Car Model Edit');
      this.updateCarModel();
    }
  }

  addCarModel(): void {
    let newCarModelObject = this.carModelForm.value;
    delete newCarModelObject.id;
    const addCarModelSub = this.carModelService
      .addCarModel(newCarModelObject)
      .subscribe(
        (response: any) => {
          console.log('Save (add) response => ', response);
          this.dialogRef.close('refresh');
        }
        //   ,
        // error => {
        //   console.error(error);
        // }
      );
    this.subscriptions.push(addCarModelSub);
    console.log('IT UNSUBSCRIBED??');
  }

  updateCarModel(): void {
    const editCarModelSub = this.carModelService
      .updateCarModel(this.carModelForm.value)
      .subscribe(
        (response: any) => {
          console.log('Car (Edit) response => ', response);
          this.dialogRef.close('refresh');
        }
        // ,
        // error => {
        //   console.error(error);
        // }
      );
    this.subscriptions.push(editCarModelSub);
    console.log('IT UNSUBSCRIBED??');
  }

  getCarModels(refresh: boolean): void {
    this.carModels$ = this.carModelService
      .getCarModels(refresh)
      .pipe(map((info: any) => info.data));
  }

  addEditCarMake(option: string, carMake: any): void {
    console.log('Open Car Make! => ', option);
    const dialogRef = this.dialog.open(CarMakeComponent, {
      disableClose: true,
      panelClass: '_dialog',
      autoFocus: false,
      data: {
        option: option,
        carMake: carMake,
      },
    });

    const carMakeSub = dialogRef.afterClosed().subscribe((res: any) => {
      console.log('Response => ', res);
      this.getCarMakes(true);
    });

    this.subscriptions.push(carMakeSub);
  }

  doesNameExist(): void {}

  cancel(): void {
    console.log('Cancel Car Model!');
  }
}
