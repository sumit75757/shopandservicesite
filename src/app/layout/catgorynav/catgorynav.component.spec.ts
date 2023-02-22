import { ComponentFixture, TestBed } from '@angular/core/testing'; import { CatgorynavComponent } from './catgorynav.component'; describe('CatgorynavComponent', () => {
  let component: CatgorynavComponent;
  let fixture: ComponentFixture<CatgorynavComponent>; beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatgorynavComponent]
    })
      .compileComponents(); fixture = TestBed.createComponent(CatgorynavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); it('should create', () => {
    expect(component).toBeTruthy();
  });
});
