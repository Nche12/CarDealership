import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarsService } from '../Services/CarsInventory/cars.service';
import { ActivatedRoute } from '@angular/router';
import { CarModelService } from '../Services/CarModel/car-model.service';
import {
  IAdPlatform,
  ICarModel,
  IClient,
  IColour,
} from '../Interface/interface';
import { Observable, map } from 'rxjs';
import { ClientService } from '../Services/Client/client.service';
import { AdPlatformService } from '../Services/AdPlatform/ad-platform.service';
import { ColourService } from '../Services/Colour/colour.service';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss'],
})
export class AddEditCarComponent implements OnInit {
  public carModels$!: Observable<ICarModel[]>;
  public clients$!: Observable<IClient[]>;
  public adPlatforms$!: Observable<IAdPlatform[]>;
  public colours$!: Observable<IColour[]>;
  public carForm: FormGroup = new FormGroup({
    // id: new FormControl(null),
    carModelId: new FormControl(0),
    colour: new FormControl(''),
    mileage: new FormControl(0),
    comments: new FormControl(''),
    advertisingPlatformId: new FormControl(null),
    broughtDate: new FormControl(null),
    soldDate: new FormControl(null),
    transferedDate: new FormControl(null),
    returnedDate: new FormControl(null),
    resoldDate: new FormControl(null),
    soldAmount: new FormControl(null),
    clientId: new FormControl(null),
    clientAmount: new FormControl(null),
    commissionAmount: new FormControl(null),
    userId: new FormControl(2),
    isSold: new FormControl(false),
  });
  

  public editMode: boolean = false;
  public saveMode: boolean = true;

  public title: string = '';
  public carId!: number;

  constructor(
    private carsService: CarsService,
    private carModelService: CarModelService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private adPlatformService: AdPlatformService,
    private colourService: ColourService
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.queryParams['action'];
    this.carId = this.route.snapshot.queryParams['id'];
    this.addEditOption(this.title, this.carId);
    this.getCarModel();
    this.getClients(true);
    this.getAdPlatform(true);
    this.getColours(true);
  }

  getCarModel(): void {
    this.carModels$ = this.carModelService
      .getCarModel()
      .pipe(map((info: any) => info.data));
  }

  getClients(refresh: boolean): void {
    this.clients$ = this.clientService
      .getClients(refresh)
      .pipe(map((info: any) => info.data));
  }

  getAdPlatform(refresh: boolean): void {
    this.adPlatforms$ = this.adPlatformService
      .getAdPlatform(refresh)
      .pipe(map((info: any) => info.data));
  }

  getColours(refresh: boolean): void {
    this.colours$ = this.colourService
      .getColours(refresh)
      .pipe(map((info: any) => info.data));
  }

  addEditOption(option: string, carId: number): void {
    if (option == 'edit') {
      this.getCar(carId);
    }
  }

  getCar(carId: number): void {
    this.carsService.getCar(carId).subscribe((info: any) => {
      this.carForm.setValue({
        id: info.data.id,
        carModelId: info.data.carModelId,
        colour: info.data.colour,
        mileage: info.data.mileage,
        comments: info.data.comments,
        advertisingPlatformId: info.data.advertisingPlatformId,
        broughtDate: info.data.broughtDate,
        soldDate: info.data.soldDate,
        transferedDate: info.data.transferedDate,
        returnedDate: info.data.returnedDate,
        resoldDate: info.data.resoldDate,
        soldAmount: info.data.soldAmount,
        clientId: info.data.clientId,
        clientAmount: info.data.clientAmount,
        commissionAmount: info.data.commissionAmount,
        userId: info.data.userId,
        isSold: info.data.isSold,
      });
      console.log('Form Value Edit => ', this.carForm.value);
    });
  }

  saveInventory() {
    console.log('Form to Save => ', this.carForm.value);
    console.log('Title => ', this.title);
    if (this.title == 'add') {
      this.carsService
        .saveCar(this.carForm.value)
        .subscribe((response: any) => {
          console.log('Save(add) Response => ', response);
          this.editMode = false;
          this.saveMode = true;
        });
    } else if (this.title == 'edit') {
      this.carsService
        .updateCar(this.carForm.value)
        .subscribe((response: any) => {
          console.log('Save(edit) Response => ', response);
          this.editMode = false;
          this.saveMode = true;
        });
    }
  }

  editInventory() {
    console.log('Edit Form!');
    this.editMode = true;
    this.saveMode = false;
  }
}
