import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { IColour } from '../../Interface/interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColourService } from '../../Services/Colour/colour.service';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.scss'],
})
export class ColourComponent implements OnInit, OnDestroy {
  public colours$!: Observable<IColour[]>;
  public subscriptions: Subscription[] = [];
  public exists$!: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColourComponent>,
    private colourService: ColourService
  ) {}

  ngOnInit(): void {
    this.getColours(false);
    this.addOrEdit(this.data.option);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }

  colourForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });

  close(): void {
    this.dialogRef.close();
  }

  addOrEdit(option: string): void {
    if (option == 'edit') {
      this.colourForm.setValue({
        id: this.data.colour.id,
        name: this.data.colour.name,
      });
    } else if (option == 'add') {
    }
  }

  getColours(refresh: boolean): void {
    this.colours$ = this.colourService
      .getColours(refresh)
      .pipe(map((info: any) => info.data));
  }

  onNameChange(event: Event): void {
    if (this.data.option == 'add') {
      console.log(event);
      const inputElement = event.target as HTMLInputElement;
      this.exists$ = this.colourService.doesNameExist(inputElement.value);
    }
  }

  saveColour(): void {
    console.log('Car Colour to Save => ', this.colourForm.value);
    if (this.data.option == 'add') {
      this.addColour();
    } else if (this.data.option == 'edit') {
      this.editColour();
    }
  }

  addColour(): void {
    let newColourObject = this.colourForm.value;
    delete newColourObject.id;
    const addColourSub = this.colourService
      .addColour(newColourObject)
      .subscribe(
        (response: any) => {
          console.log('Response => ', response);
          this.getColours(true);
          this.dialogRef.close('refresh');
        }
        // , error => {
        //   console.error(error);
        // }
      );

    this.subscriptions.push(addColourSub);
  }

  editColour(): void {
    const editColourSub = this.colourService
    .updateColour(this.colourForm.value)
    .subscribe(
      (response: any) => {
        console.log('response => ', response);
        this.getColours(true);
        this.dialogRef.close('refresh');
      }
      // , error => {
      //   console.error(error);
      // }
    );

  this.subscriptions.push(editColourSub);
  }

}
