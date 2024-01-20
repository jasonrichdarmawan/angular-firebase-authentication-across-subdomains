import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoginPage } from './account-login.page';

describe('AccountLoginPage', () => {
  let component: AccountLoginPage;
  let fixture: ComponentFixture<AccountLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLoginPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
