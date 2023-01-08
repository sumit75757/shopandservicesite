import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcatComponent } from './newcat.component';

describe('NewcatComponent', () => {
  let component: NewcatComponent;
  let fixture: ComponentFixture<NewcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
