import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarsService } from '../Services/CarsInventory/cars.service';
import { ActivatedRoute } from '@angular/router';
import { CarModelService } from '../Services/CarModel/car-model.service';
import { ICarModel } from '../Interface/interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss'],
})
export class AddEditCarComponent implements OnInit {

  public carModels$! : Observable<ICarModel[]>;
  public carForm: FormGroup = new FormGroup({
    carModelId: new FormControl(0),
    colour: new FormControl(''),
    mileage: new FormControl(0),
    comments: new FormControl(''),
    advertisingPlatformId: new FormControl(0),
    broughtDate: new FormControl(''),
    soldDate: new FormControl(''),
    transferedDate: new FormControl(''),
    returnedDate: new FormControl(''),
    resoldDate: new FormControl(''),
    soldAmount: new FormControl(0),
    clientId: new FormControl(0),
    clientAmount: new FormControl(0),
    commissionAmount: new FormControl(0),
    userId: new FormControl(0),
    isSold: new FormControl(false),
  });

  public editMode: boolean = false;
  public saveMode: boolean = true;

  public title: string = '';

  constructor(
    private carsService: CarsService,
    private carModelService: CarModelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.queryParams['action'];
    this.getCarModel();
  }

  getCarModel() {
    this.carModels$ =  this.carModelService.getCarModel().pipe(
      map((info: any )=> info.data)
    );
  }

  saveInventory() {
    console.log('Form to Save => ', this.carForm.value);
    this.editMode = false;
    this.saveMode = true;
  }

  editInventory() {
    console.log('Edit Form!');
    this.editMode = true;
    this.saveMode = false;
  }


}
