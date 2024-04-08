import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarsService } from '../Services/CarsInventory/cars.service';
import { ActivatedRoute } from '@angular/router';
import { CarModelService } from '../Services/CarModel/car-model.service';
import { IAdPlatform, ICarModel, IClient } from '../Interface/interface';
import { Observable, map } from 'rxjs';
import { ClientService } from '../Services/Client/client.service';
import { AdPlatformService } from '../Services/AdPlatform/ad-platform.service';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss'],
})
export class AddEditCarComponent implements OnInit {
  public carModels$!: Observable<ICarModel[]>;
  public clients$!: Observable<IClient[]>;
  public adPlatforms$!: Observable<IAdPlatform[]>;
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
    private route: ActivatedRoute,
    private clientService: ClientService,
    private adPlatformService: AdPlatformService
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.queryParams['action'];
    this.getCarModel();
    this.getClients(true);
    this.getAdPlatform(true);
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

  saveInventory() {
    console.log('Form to Save => ', this.carForm.value);
    this.carsService.saveCar(this.carForm.value).subscribe((response) => {
      console.log("Save Response => ", response)
      this.editMode = false;
      this.saveMode = true;
    });
  }

  editInventory() {
    console.log('Edit Form!');
    this.editMode = true;
    this.saveMode = false;
  }
}
