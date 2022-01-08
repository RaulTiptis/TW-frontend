import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentinterComponent } from './studentinter.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('StudentActualComponent', () => {
  let component: StudentinterComponent;
  let fixture: ComponentFixture<StudentinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ StudentinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
