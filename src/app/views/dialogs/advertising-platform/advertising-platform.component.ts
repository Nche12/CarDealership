import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdPlatformService } from '../../Services/AdPlatform/ad-platform.service';
import { Observable, Subscription, map } from 'rxjs';
import { IAdPlatform, IFrequency } from '../../Interface/interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyComponent } from '../frequency/frequency.component';
import { NameCheckService } from '../../Services/NameCheck/name-check.service';
import { FrequencyService } from '../../Services/Frequency/frequency.service';

@Component({
  selector: 'app-advertising-platform',
  templateUrl: './advertising-platform.component.html',
  styleUrls: ['./advertising-platform.component.scss']
})
export class AdvertisingPlatformComponent {
  public adPlatforms$!: Observable<IAdPlatform[]>;
  public frequencies$!: Observable<IFrequency[]>;
  public subscriptions: Subscription[] = [];
  public exists$!: Observable<boolean>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdvertisingPlatformComponent>,
    private dialog: MatDialog,
    private adPlatformService: AdPlatformService,
    private nameCheckService: NameCheckService,
    private frequencyService: FrequencyService,
  ) {}

  ngOnInit(): void {
    this.getAdPlatforms(false);
    this.addOrEdit(this.data.option);
    this.getFrequencies(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }

  adPlatformForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    frequencyId: new FormControl(null, Validators.required)
  });

  close(): void {
    this.dialogRef.close();
  }

  addOrEdit(option: string): void {
    if (option == 'edit') {
      this.adPlatformForm.setValue({
        id: this.data.adPlatform.id,
        name: this.data.adPlatform.name,
        frequencyId: this.data.adPlatform.frequencyId
      });
    } else if (option == 'add') {
    }
  }

  getAdPlatforms(refresh: boolean): void {
    this.adPlatforms$ = this.adPlatformService
      .getAdPlatform(refresh)
      .pipe(map((info: any) => info.data));
  }

  onNameChange(event: Event): void {
    if (this.data.option == 'add') {
      console.log(event);
      const inputElement = event.target as HTMLInputElement;
      this.exists$ = this.nameCheckService.doesNameExist(inputElement.value, this.adPlatforms$);
    }
  }

  saveAdPlatform(): void {
    console.log('Car Platform to Save => ', this.adPlatformForm.value);
    if (this.data.option == 'add') {
      this.addAdPlatform();
    } else if (this.data.option == 'edit') {
      this.editAdPlatform();
    }
  }

  addAdPlatform(): void {
    let newAdPlatformObject = this.adPlatformForm.value;
    delete newAdPlatformObject.id;
    const addAdPlatformSub = this.adPlatformService
      .addAdPlatform(newAdPlatformObject)
      .subscribe(
        (response: any) => {
          console.log('Response => ', response);
          this.getAdPlatforms(true);
          this.dialogRef.close('refresh');
        }
        // , error => {
        //   console.error(error);
        // }
      );

    this.subscriptions.push(addAdPlatformSub);
  }

  editAdPlatform(): void {
    const editAdPlatformSub = this.adPlatformService
    .updateAdPlatform(this.adPlatformForm.value)
    .subscribe(
      (response: any) => {
        console.log('response => ', response);
        this.getAdPlatforms(true);
        this.dialogRef.close('refresh');
      }
      // , error => {
      //   console.error(error);
      // }
    );

  this.subscriptions.push(editAdPlatformSub);
  }

  addEditPaymentFrequency(option: string, frequency: any): void {
    console.log('Open Car Make! => ', option);
    const dialogRef = this.dialog.open(FrequencyComponent, {
      disableClose: true,
      panelClass: '_dialog',
      autoFocus: false,
      data: {
        option: option,
        frequency: frequency,
      },
    });

    const carMakeSub = dialogRef.afterClosed().subscribe((res: any) => {
      console.log('Response => ', res);
      if(res == 'refresh') {
        this.getFrequencies(true);
      } else {}
      
    });

    this.subscriptions.push(carMakeSub);
  }

  getFrequencies(refresh: boolean): void {
    this.frequencies$ = this.frequencyService
      .getFrequencies(refresh)
      .pipe(map((info: any) => info.data));
  }

}
