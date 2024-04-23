import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map } from 'rxjs';
import { ICarMake } from '../../Interface/interface';
import { CarMakeService } from '../../Services/CarMake/car-make.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-make',
  templateUrl: './car-make.component.html',
  styleUrls: ['./car-make.component.scss'],
})
export class CarMakeComponent implements OnInit, OnDestroy {
  public carMakes$!: Observable<ICarMake[]>;
  public subscriptions: Subscription[] = [];
  public exists$!: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CarMakeComponent>,
    private carMakeService: CarMakeService
  ) {}

  ngOnInit(): void {
    console.log('Car Model => ', this.data);
    this.getCarMakes(false);
    this.addOrEdit(this.data.option);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }
  carMakeForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });

  close(): void {
    this.dialogRef.close();
  }

  addOrEdit(option: string): void {
    if (option == 'edit') {
      this.carMakeForm.setValue({
        id: this.data.carMake.id,
        name: this.data.carMake.name,
      });
    } else if (option == 'add') {
    }
  }

  getCarMakes(refresh: boolean): void {
    this.carMakes$ = this.carMakeService
      .getCarMakes(refresh)
      .pipe(map((info: any) => info.data));
  }

  onNameChange(event: Event): void {
    if (this.data.option == 'add') {
      console.log(event);
      const inputElement = event.target as HTMLInputElement;
      this.exists$ = this.carMakeService.doesNameExist(inputElement.value);
    }
  }

  saveCarMake(): void {
    console.log('Car Make to Save => ', this.carMakeForm.value);
    if (this.data.option == 'add') {
      this.addCarMake();
    } else if (this.data.option == 'edit') {
      this.editCarMake();
    }
  }

  addCarMake(): void {
    let newCarMakeObject = this.carMakeForm.value;
    delete newCarMakeObject.id;
    const addCarMakeSub = this.carMakeService
      .addCarMake(newCarMakeObject)
      .subscribe(
        (response: any) => {
          console.log('Response => ', response);
          this.getCarMakes(true);
          this.dialogRef.close('refresh');
        }
        // , error => {
        //   console.error(error);
        // }
      );

    this.subscriptions.push(addCarMakeSub);
  }

  editCarMake(): void {
    const editCarMakeSub = this.carMakeService
      .updateCarMake(this.carMakeForm.value)
      .subscribe(
        (response: any) => {
          console.log('response => ', response);
          this.getCarMakes(true);
          this.dialogRef.close('refresh');
        }
        // , error => {
        //   console.error(error);
        // }
      );

    this.subscriptions.push(editCarMakeSub);
  }
}
