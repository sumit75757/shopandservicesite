import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotterbottomComponent } from './fotterbottom.component';

describe('FotterbottomComponent', () => {
  let component: FotterbottomComponent;
  let fixture: ComponentFixture<FotterbottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotterbottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotterbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
