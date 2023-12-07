import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPortfolioPageComponent } from './edit-portfolio-page.component';

describe('EditPortfolioPageComponent', () => {
  let component: EditPortfolioPageComponent;
  let fixture: ComponentFixture<EditPortfolioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPortfolioPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
