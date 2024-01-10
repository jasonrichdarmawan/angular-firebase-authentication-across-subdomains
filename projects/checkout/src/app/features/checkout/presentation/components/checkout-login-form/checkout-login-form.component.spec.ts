import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLoginFormComponent } from './checkout-login-form.component';

describe('CheckoutLoginFormComponent', () => {
  let component: CheckoutLoginFormComponent;
  let fixture: ComponentFixture<CheckoutLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
