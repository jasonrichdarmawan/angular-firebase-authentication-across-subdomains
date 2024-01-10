import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesUserComponent } from './experiences-user.component';

describe('ExperiencesUserComponent', () => {
  let component: ExperiencesUserComponent;
  let fixture: ComponentFixture<ExperiencesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
