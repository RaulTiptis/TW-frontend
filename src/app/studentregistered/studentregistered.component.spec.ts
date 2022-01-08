import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentregisteredComponent } from './studentregistered.component';

describe('StudentregisteredComponent', () => {
  let component: StudentregisteredComponent;
  let fixture: ComponentFixture<StudentregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentregisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
