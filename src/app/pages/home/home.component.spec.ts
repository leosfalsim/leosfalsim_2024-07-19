import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';

class RouterStub {
  navigate(path: string[]): void {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: RouterStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: Location, useClass: SpyLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as unknown as RouterStub;

    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to /dashboard if login is present in localStorage', () => {
  //   localStorage.setItem('login', 'true');
  //   const navigateSpy = jest.spyOn(router, 'navigate');
  //   component.ngOnInit();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  // });

  // it('should not navigate if login is not present in localStorage', () => {
  //   localStorage.removeItem('login');
  //   const navigateSpy = jest.spyOn(router, 'navigate');
  //   component.ngOnInit();
  //   expect(navigateSpy).not.toHaveBeenCalled();
  // });
});
