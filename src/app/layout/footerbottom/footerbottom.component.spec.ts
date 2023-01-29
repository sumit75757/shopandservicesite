import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterbottomComponent } from './footerbottom.component';

describe('FooterbottomComponent', () => {
  let component: FooterbottomComponent;
  let fixture: ComponentFixture<FooterbottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterbottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
