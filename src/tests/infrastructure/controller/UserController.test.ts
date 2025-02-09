import request from 'supertest';
import express from 'express';
import { UserApplicationService } from '../../../application/service/UserApplication';
import { UserController } from '../../../infrastructure/controller/UserController';
import { UserInterfacePortIn } from '../../../domain/port/in/UserInterfacePortIn';
import { UserInterfacePortOut } from '../../../domain/port/out/UserInterfacePortOut';
import { UserRole } from '../../../domain/enum/UserRole';
import { UserDTO } from '../../../application/dto/UserDTO';

jest.mock('../../../application/service/UserApplication');
jest.mock('../../../domain/port/in/UserInterfacePortIn');
jest.mock('../../../domain/port/out/UserInterfacePortOut');

describe('UserController', () => {
  let app: express.Application;
  let mockUserService: jest.Mocked<UserApplicationService>;
  let mockUserPortIn: jest.Mocked<UserInterfacePortIn>;
  let mockUserPortOut: jest.Mocked<UserInterfacePortOut>;

  beforeEach(() => {
    mockUserPortIn = { create: jest.fn(), getById: jest.fn() } as jest.Mocked<UserInterfacePortIn>;
    mockUserPortOut = { save: jest.fn(), getById: jest.fn() } as jest.Mocked<UserInterfacePortOut>;

    mockUserService = new UserApplicationService(mockUserPortIn, mockUserPortOut) as jest.Mocked<UserApplicationService>;

    const userController = new UserController(mockUserService);
    app = express();
    app.use(express.json());
    app.use('/users', userController.getRouter());
  });

  describe('POST /users', () => {
    it('should create and return a user', async () => {
      const userDTO = { 
        id: '1', 
        name: 'John Doe', 
        role: UserRole.CUSTOMER, 
        phone: '1234567890' 
      };
      
      mockUserService.execute.mockResolvedValue(userDTO);
  
      const response = await request(app).post('/users').send(userDTO);
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual(userDTO);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const userDTO = { id: '1', name: 'John Doe', role: UserRole.CUSTOMER, phone: '1234567890' };
      
      mockUserService.findById.mockResolvedValueOnce(userDTO);

      const response = await request(app).get(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(userDTO);
    });

    it('should return an error if user not found', async () => {
        const userId = '1';
      
        mockUserService.findById.mockResolvedValueOnce(null as any);
      
        const response = await request(app).get(`/users/${userId}`);
      
        expect(mockUserService.findById).toHaveBeenCalledWith(userId);
      
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User Not Found');
      });
      
  });
});
