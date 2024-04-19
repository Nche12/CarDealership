import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingPlatformComponent } from './advertising-platform.component';

describe('AdvertisingPlatformComponent', () => {
  let component: AdvertisingPlatformComponent;
  let fixture: ComponentFixture<AdvertisingPlatformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisingPlatformComponent]
    });
    fixture = TestBed.createComponent(AdvertisingPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
