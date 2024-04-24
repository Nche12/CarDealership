import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../Services/CarsInventory/cars.service';
import { ActivatedRoute } from '@angular/router';
import { CarModelService } from '../Services/CarModel/car-model.service';
import {
  IAdPlatform,
  ICarModel,
  IClient,
  IColour,
} from '../Interface/interface';
import { Observable, Subscription, map } from 'rxjs';
import { ClientService } from '../Services/Client/client.service';
import { AdPlatformService } from '../Services/AdPlatform/ad-platform.service';
import { ColourService } from '../Services/Colour/colour.service';
import { MatDialog } from '@angular/material/dialog';
import { CarModelComponent } from '../dialogs/car-model/car-model.component';
import { ColourComponent } from '../dialogs/colour/colour.component';
import { AdvertisingPlatformComponent } from '../dialogs/advertising-platform/advertising-platform.component';
import { ClientComponent } from '../dialogs/client/client.component';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss'],
})
export class AddEditCarComponent implements OnInit, OnDestroy {
  public carModels$!: Observable<ICarModel[]>;
  public clients$!: Observable<IClient[]>;
  public adPlatforms$!: Observable<IAdPlatform[]>;
  public colours$!: Observable<IColour[]>;

  public editMode: boolean = false;
  public saveMode: boolean = true;

  public carForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    carModelId: new FormControl(
      { value: 0, disabled: this.saveMode },
      Validators.required
    ),
    colourId: new FormControl(
      { value: 0, disabled: this.saveMode },
      Validators.required
    ), //Need to add validation after backend adjustment
    mileage: new FormControl(0),
    comments: new FormControl(''),
    advertisingPlatformId: new FormControl({
      value: null,
      disabled: this.saveMode,
    }),
    broughtDate: new FormControl(null, Validators.required),
    soldDate: new FormControl(null),
    transferedDate: new FormControl(null),
    returnedDate: new FormControl(null),
    resoldDate: new FormControl(null),
    soldAmount: new FormControl(null),
    clientId: new FormControl(
      { value: null, disabled: this.saveMode },
      Validators.required
    ),
    clientAmount: new FormControl(null),
    commissionAmount: new FormControl(null),
    userId: new FormControl(2, Validators.required),
    isSold: new FormControl(false),
  });

  public title: string = '';
  public carId!: number;
  public subscriptions: Subscription[] = [];

  constructor(
    private carsService: CarsService,
    private carModelService: CarModelService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private adPlatformService: AdPlatformService,
    private colourService: ColourService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.queryParams['action'];
    this.carId = this.route.snapshot.queryParams['id'];
    this.addEditOption(this.title, this.carId);
    this.getCarModels(true);
    this.getClients(true);
    this.getAdPlatform(true);
    this.getColours(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }

  getCarModels(refresh: boolean): void {
    this.carModels$ = this.carModelService
      .getCarModels(refresh)
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
    const carsSub = this.carsService.getCar(carId).subscribe((info: any) => {
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
    this.subscriptions.push(carsSub);
  }

  saveInventory() {
    console.log('Form to Save => ', this.carForm.value);
    console.log('Title => ', this.title);
    //Dates need converting
    if (this.title == 'add') {
      //need to let the api ignore the id on the back end
      let newCarObject = this.carForm.value;
      delete newCarObject.id;
      console.log('New Car Object => ', newCarObject);
      const carInventoryAddSub = this.carsService
        .saveCar(newCarObject)
        .subscribe((response: any) => {
          console.log('Save(add) Response => ', response);
          this.disableForm();
        });
      this.subscriptions.push(carInventoryAddSub);
    } else if (this.title == 'edit') {
      const carInventoryEditSub = this.carsService
        .updateCar(this.carForm.value)
        .subscribe((response: any) => {
          console.log('Save(edit) Response => ', response);
          this.disableForm();
        });
      this.subscriptions.push(carInventoryEditSub);
    }
  }

  public enableForm(): void {
    this.editMode = true;
    this.saveMode = false;
    this.carForm.get('carModelId')?.enable();
    this.carForm.get('colourId')?.enable();
    this.carForm.get('advertisingPlatformId')?.enable();
    this.carForm.get('clientId')?.enable();
  }

  public disableForm(): void {
    this.editMode = false;
    this.saveMode = true;
    this.carForm.get('carModelId')?.disable();
    this.carForm.get('colourId')?.disable();
    this.carForm.get('advertisingPlatformId')?.disable();
    this.carForm.get('clientId')?.disable();
  }

  editInventory() {
    console.log('Edit Form!');
    this.enableForm();
  }

  addEditCarModel(option: string, carModel: any): void {
    console.log('Open Car Model Dialog');
    const dialogRef = this.dialog.open(CarModelComponent, {
      disableClose: true,
      panelClass: '_dialog',
      autoFocus: false,
      data: {
        option: option,
        carModel: carModel,
      },
    });

    const carModeldialogSub = dialogRef.afterClosed().subscribe((response) => {
      console.log('Response (Car Model Dialog) => ', response);
      if (response == 'refresh') {
        this.getCarModels(true);
      }
    });

    this.subscriptions.push(carModeldialogSub);
  }

  addEditColour(option: string, colour: any): void {
    console.log('Open colour model');
    const dialogRef = this.dialog.open(ColourComponent, {
      disableClose: true,
      panelClass: '_dialog',
      autoFocus: false,
      data: {
        option: option,
        colour: colour,
      },
    });

    const colourdialogSub = dialogRef.afterClosed().subscribe((response) => {
      console.log('Response (Car Colour Dialog) => ', response);
      if (response == 'refresh') {
        this.getColours(true);
      }
    });

    this.subscriptions.push(colourdialogSub);
  }

  addEditAdPlatform(option: string, adPlatform: any): void {
    console.log('Open Ad Platform ');
    const dialogRef = this.dialog.open(AdvertisingPlatformComponent, {
      disableClose: true,
      panelClass: '_dialog',
      autoFocus: false,
      data: {
        option: option,
        adPlatform: adPlatform,
      },
    });

    const addPlatformdialogSub = dialogRef
      .afterClosed()
      .subscribe((response) => {
        console.log('Response (Ad Platform Dialog) => ', response);
        if (response == 'refresh') {
          this.getAdPlatform(true);
        }
      });

    this.subscriptions.push(addPlatformdialogSub);
  }

  addEditClient(option: string, client: any): void {
    console.log('Open Client Dialog ');
    const dialogRef = this.dialog.open(ClientComponent, {
      disableClose: true,
      panelClass: '_dialogClient',
      autoFocus: false,
      data: {
        option: option,
        client: client,
      },
    });

    const clientdialogSub = dialogRef.afterClosed().subscribe((response) => {
      console.log('Response (Client Dialog) => ', response);
      if (response == 'refresh') {
        this.getClients(true);
      }
    });

    this.subscriptions.push(clientdialogSub);
  }
}
