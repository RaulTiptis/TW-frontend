import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherComponent } from './teacher.component';

describe('TeacherComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TeacherComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TeacherComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'checkin'`, () => {
    const fixture = TestBed.createComponent(TeacherComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('checkin');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TeacherComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('checkin app is running!');
  });
});
