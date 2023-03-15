import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicebookingComponent } from './servicebooking.component';

describe('ServicebookingComponent', () => {
  let component: ServicebookingComponent;
  let fixture: ComponentFixture<ServicebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicebookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
