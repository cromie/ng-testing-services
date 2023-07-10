import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { ProductsService } from './product.service';
import { TokenService } from './token.service';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    productService = TestBed.inject(ProductsService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      spyOn(tokenService, 'getToken').and.returnValue('123');
      //Act
      productService.getAllSimple().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
    });
  });

  describe('tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list with taxes', (doneFn) => {
      //Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //19
        },
        {
          ...generateOneProduct(),
          price: 200, //38
        },
        {
          ...generateOneProduct(),
          price: 0, //19
        },
        {
          ...generateOneProduct(),
          price: -200, //38
        },
      ];

      //Act
      productService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit: 10 and offset: 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      productService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('tests for create', () => {
    it('should return a new product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'blagh fhg',
        categoryId: 13,
      };
      //Act
      productService.create({ ...dto }).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('tests for update', () => {
    it('should update a product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Update new Product tairol',
        categoryId: 13,
      };
      //Act
      productService.update('13', { ...dto }).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products/${dto.categoryId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
    });
  });

  describe('tests for delete', () => {
    it('should delete a product', (doneFn) => {
      //Arrange
      const mockData = true;
      const productId = '13';
      //Act
      productService.delete(productId).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });

  describe('tests for getOne', () => {
    it('should return a product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const productId = '13';
      //Act
      productService.getOne('13').subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });
  });

  describe('tests for getOne', () => {
    it('should return 404 message', (doneFn) => {
      //Arrange
      const productId = '13';
      const mssgError = '404 mssg';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: mssgError,
      };
      //Act
      productService.getOne('13').subscribe({
        error: (error) => {
          //Assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });

      //http cofig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mssgError, mockError);
    });
  });
});
