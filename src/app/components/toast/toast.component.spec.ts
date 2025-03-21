import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start progress on initialization', () => {
    jest.useFakeTimers();
    component.ngOnInit();

    expect(component.progress).toBe(100);

    jest.advanceTimersByTime(100);
    expect(component.progress).toBe(98);
  });

  it('should hide the toast after the duration', () => {
    jest.useFakeTimers();
    component.showToast = true;
    component.ngOnInit();

    jest.advanceTimersByTime(component.duration);

    expect(component.showToast).toBe(false);
  });

  it('should apply correct class based on toast type', () => {
    component.message = 'Test message';
    component.showToast = true;
    fixture.detectChanges();

    component.type = 'success';
    fixture.detectChanges();
    let toastElement = fixture.debugElement.query(By.css('.toast-header'));
    expect(toastElement).toBeTruthy();
    expect(toastElement.nativeElement.classList).toContain('toast-success');

    component.type = 'error';
    fixture.detectChanges();
    toastElement = fixture.debugElement.query(By.css('.toast-header'));
    expect(toastElement).toBeTruthy();
    expect(toastElement.nativeElement.classList).toContain('toast-error');

    component.type = 'warning';
    fixture.detectChanges();
    toastElement = fixture.debugElement.query(By.css('.toast-header'));
    expect(toastElement).toBeTruthy();
    expect(toastElement.nativeElement.classList).toContain('toast-warning');
  });

  it('should update the progress correctly', () => {
    jest.useFakeTimers();
    component.ngOnInit();
    const intervalId = component['intervalId'];

    jest.advanceTimersByTime(200);

    expect(component.progress).toBeCloseTo(96);
  });
});
