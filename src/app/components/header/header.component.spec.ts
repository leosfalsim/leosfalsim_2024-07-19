import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let localStorageMock: Storage;

  beforeEach(async () => {
    // Mock do localStorage
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    } as unknown as Storage;

    // Definindo o mock do localStorage na janela global
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Configuração do TestBed
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    // Injeção do Router
    router = TestBed.inject(Router);
    // Criação do componente
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // Detecção de mudanças no fixture
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userName from localStorage', () => {
    const userName = 'testUser';
    (localStorageMock.getItem as jest.Mock).mockReturnValue(userName);

    component.ngOnInit();

    expect(component.userName).toBe(userName);
  });

  it('should toggle showMenu', () => {
    component.showMenu = false;

    component.toggleMenu();

    expect(component.showMenu).toBe(true);

    component.toggleMenu();

    expect(component.showMenu).toBe(false);
  });

  it('should remove userName from localStorage and navigate to /home on logout', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const removeItemSpy = jest.spyOn(localStorageMock, 'removeItem');

    component.logout();

    expect(removeItemSpy).toHaveBeenCalledWith('name');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
