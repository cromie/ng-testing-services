import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService],
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return a token', (doneFn) => {
    //Arrange
    const mockData: Auth = {
      access_token: '1213',
    };
    const email = 'c_rhis@outlook.com';
    const password = '1234';
    //Act
    authService.login(email, password).subscribe((data) => {
      //Assert
      expect(data).toEqual(mockData);
      doneFn();
    });

    //http cofig
    const url = `${environment.API_URL}/api/v1/auth/login`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
  });

  it('should call saveToken', (doneFn) => {
    //Arrange
    const mockData: Auth = {
      access_token: '1213',
    };
    const email = 'c_rhis@outlook.com';
    const password = '1234';
    spyOn(tokenService, 'saveToken').and.callThrough();
    //Act
    authService.login(email, password).subscribe((data) => {
      //Assert
      expect(data).toEqual(mockData);
      expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
      expect(tokenService.saveToken).toHaveBeenCalledOnceWith('1213');
      doneFn();
    });

    //http cofig
    const url = `${environment.API_URL}/api/v1/auth/login`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
  });
});
