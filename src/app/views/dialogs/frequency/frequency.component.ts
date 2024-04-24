import { Component, Inject } from '@angular/core';
import { IFrequency } from '../../Interface/interface';
import { Observable, Subscription, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FrequencyService } from '../../Services/Frequency/frequency.service';
import { NameCheckService } from '../../Services/NameCheck/name-check.service';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent {
  public frequencies$!: Observable<IFrequency[]>;
  public subscriptions: Subscription[] = [];
  public exists$!: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FrequencyComponent>,
    private frequencyService: FrequencyService,
    private nameCheckService: NameCheckService
  ) {}

  ngOnInit(): void {
    this.getFrequencies(false);
    this.addOrEdit(this.data.option);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }

  frequencyForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });

  close(): void {
    this.dialogRef.close();
  }

  addOrEdit(option: string): void {
    if (option == 'edit') {
      this.frequencyForm.setValue({
        id: this.data.frequency.id,
        name: this.data.frequency.name,
      });
    } else if (option == 'add') {
    }
  }

  getFrequencies(refresh: boolean): void {
    this.frequencies$ = this.frequencyService
      .getFrequencies(refresh)
      .pipe(map((info: any) => info.data));
  }

  onNameChange(event: Event): void {
    if (this.data.option == 'add') {
      console.log(event);
      const inputElement = event.target as HTMLInputElement;
      this.exists$ = this.nameCheckService.doesNameExist(inputElement.value, this.frequencies$);
    }
  }

  saveFrequency(): void {
    console.log('Car Frequency to Save => ', this.frequencyForm.value);
    if (this.data.option == 'add') {
      this.addFrequency();
    } else if (this.data.option == 'edit') {
      this.editFrequency();
    }
  }

  addFrequency(): void {
    let newFrequencyObject = this.frequencyForm.value;
    delete newFrequencyObject.id;
    const addFrequencySub = this.frequencyService
      .addFrequency(newFrequencyObject)
      .subscribe(
        (response: any) => {
          console.log('Response => ', response);
          this.getFrequencies(true);
          this.dialogRef.close('refresh');
        }
        // , error => {
        //   console.error(error);
        // }
      );
    this.subscriptions.push(addFrequencySub);
  }

  editFrequency(): void {
    const editFrequencySub = this.frequencyService
    .updateFrequency(this.frequencyForm.value)
    .subscribe(
      (response: any) => {
        console.log('response => ', response);
        this.getFrequencies(true);
        this.dialogRef.close('refresh');
      }
      // , error => {
      //   console.error(error);
      // }
    );

  this.subscriptions.push(editFrequencySub);
  }

}
