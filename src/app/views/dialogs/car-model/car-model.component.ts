import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map } from 'rxjs';
import { ICarMake, ICarModel } from '../../Interface/interface';
import { CarMakeService } from '../../Services/CarMake/car-make.service';
import { CarModelService } from '../../Services/CarModel/car-model.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss'],
})
export class CarModelComponent implements OnInit, OnDestroy {
  public carMakes$!: Observable<ICarMake[]>;
  public carModel$!: Observable<ICarModel>;

  public subscriptions: Subscription[] = [];
  public nameExists: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CarModelComponent>,
    private carMakeService: CarMakeService,
    private carModelService: CarModelService
  ) {}

  ngOnInit(): void {
    console.log('Data => ', this.data);
    this.getCarMakes(false);
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

  getCarModel(carModelId: number): void {
    this.carModel$ = this.carModelService
      .getCarModel(carModelId)
      .pipe(map((info: any) => info.data));
  }

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
      .subscribe((response: any) => {
        console.log('Save (add) response => ', response);
        this.dialogRef.close('refresh');
      });
    this.subscriptions.push(addCarModelSub);
    console.log('IT UNSUBSCRIBED??');
  }

  updateCarModel(): void {
    const editCarModelSub = this.carModelService
      .updateCarModel(this.carModelForm.value)
      .subscribe((response: any) => {
        console.log('Car (Edit) response => ', response);
        this.dialogRef.close('refresh');
      });
    this.subscriptions.push(editCarModelSub);
    console.log('IT UNSUBSCRIBED??');
  }

  addEditCarMake(option: string): void {
    console.log('Open Car Make!');
  }

  doesNameExist(): void {
    
  }

  cancel(): void {
    console.log('Cancel Car Model!');
  }
}
