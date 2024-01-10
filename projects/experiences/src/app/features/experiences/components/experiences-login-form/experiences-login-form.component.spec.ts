import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesLoginFormComponent } from './experiences-login-form.component';

describe('ExperiencesLoginFormComponent', () => {
  let component: ExperiencesLoginFormComponent;
  let fixture: ComponentFixture<ExperiencesLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
