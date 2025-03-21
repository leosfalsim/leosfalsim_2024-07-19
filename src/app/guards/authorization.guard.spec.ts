import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let router: Router;
  let navigateSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthorizationGuard]
    });

    guard = TestBed.inject(AuthorizationGuard);
    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'navigate');
  });

  afterEach(() => {
    localStorage.removeItem('name');
  });

  it('should allow activation if localStorage contains a name', () => {
    localStorage.setItem('name', 'testUser');
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBe(true);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should redirect to home if localStorage does not contain a name', () => {
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });
});
