import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardDto } from '../models/previews.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl: string = 'http://localhost:8080/dashboard';

  constructor(
    private http: HttpClient
  ) { }

  public getDashboard() {
    return this.http.get<DashboardDto>(this.apiUrl);
  }
}
