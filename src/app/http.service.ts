import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUserData } from './interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://localhost:7208';
  http = inject(HttpClient);
  constructor() {}
  getAllUser() {
    return this.http.get<IUserData[]>(this.apiUrl + '/api/User');
  }
  createUser(data: IUserData) {
    return this.http.post(this.apiUrl + '/api/User', data);
  }
  getUser(id: number) {
    return this.http.get<IUserData>(this.apiUrl + '/api/User/' + id);
  }
  updateUser(id: number, data: IUserData) {
    return this.http.put(this.apiUrl + '/api/User/' + id, data);
  }
  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + '/api/User/' + id);
  }
  getMonikersdata(){
    return this.http.get(this.apiUrl + '/api/User/monikers')
  }
}
