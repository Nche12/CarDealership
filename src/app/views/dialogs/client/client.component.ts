import { Component, Inject } from '@angular/core';
import { NameCheckService } from '../../Services/NameCheck/name-check.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../Services/Client/client.service';
import { IAdPlatform, IClient } from '../../Interface/interface';
import { Observable, Subscription, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdPlatformService } from '../../Services/AdPlatform/ad-platform.service';
import { AdvertisingPlatformComponent } from '../advertising-platform/advertising-platform.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  public clients$!: Observable<IClient[]>;
  public subscriptions: Subscription[] = [];
  public exists$!: Observable<boolean>;
  public adPlatforms$!: Observable<IAdPlatform[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ClientComponent>,
    private dialog: MatDialog,
    private clientService: ClientService,
    private nameCheckService: NameCheckService,
    private adPlatformService: AdPlatformService,
  ) {}

  ngOnInit(): void {
    console.log('Client => ', this.data);
    this.getClients(false);
    this.addOrEdit(this.data.option);
    this.getAdPlatform(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }
  clientForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    idNumber: new FormControl(''),
    pnoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    advertisingPlatformId: new FormControl(0, Validators.required),
  });

  close(): void {
    this.dialogRef.close();
  }

  addOrEdit(option: string): void {
    if (option == 'edit') {
      this.clientForm.setValue({
        id: this.data.client.id,
        name: this.data.client.name,
        surname: this.data.client.surname,
        idNumber: this.data.client.idNumber,
        pnoneNumber: this.data.client.pnoneNumber,
        email: this.data.client.email,
        advertisingPlatformId: this.data.client.advertisingPlatformId,
      });
    } else if (option == 'add') {
    }
  }

  getClients(refresh: boolean): void {
    this.clients$ = this.clientService
      .getClients(refresh)
      .pipe(map((info: any) => info.data));
  }

  onNameChange(event: Event): void {
    if (this.data.option == 'add') {
      console.log(event);
      const inputElement = event.target as HTMLInputElement;
      this.exists$ = this.nameCheckService.doesNameExist(
        inputElement.value,
        this.clients$
      );
    }
  }

  saveClient(): void {
    console.log('Client to Save => ', this.clientForm.value);
    if (this.data.option == 'add') {
      console.log('Add Client!');
      this.addClient();
    } else if (this.data.option == 'edit') {
      console.log('Client Edit');
      this.editClient();
    }
  }

  addClient(): void {
    let newClientObject = this.clientForm.value;
    delete newClientObject.id;
    const addClientSub = this.clientService
      .addClient(newClientObject)
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
    this.subscriptions.push(addClientSub);
    console.log('IT UNSUBSCRIBED??');
  }

  editClient(): void {
    const editClientSub = this.clientService
      .updateClient(this.clientForm.value)
      .subscribe(
        (response: any) => {
          console.log('Client (Edit) response => ', response);
          this.dialogRef.close('refresh');
        }
        // ,
        // error => {
        //   console.error(error);
        // }
      );
    this.subscriptions.push(editClientSub);
    console.log('IT UNSUBSCRIBED??');
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

  getAdPlatform(refresh: boolean): void {
    this.adPlatforms$ = this.adPlatformService
      .getAdPlatform(refresh)
      .pipe(map((info: any) => info.data));
  }

}
