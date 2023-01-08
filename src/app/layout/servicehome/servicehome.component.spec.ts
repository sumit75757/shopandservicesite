import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicehomeComponent } from './servicehome.component';

describe('ServicehomeComponent', () => {
  let component: ServicehomeComponent;
  let fixture: ComponentFixture<ServicehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicehomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
