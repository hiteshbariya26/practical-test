import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../models/Server';

@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor(private http: HttpClient) { }

getServers() {
  return this.http.get<Server>('assets/data/data.json');
}

}






