import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMakeComponent } from './car-make.component';

describe('CarMakeComponent', () => {
  let component: CarMakeComponent;
  let fixture: ComponentFixture<CarMakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarMakeComponent]
    });
    fixture = TestBed.createComponent(CarMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
