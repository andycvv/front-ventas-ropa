import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'http://localhost:8080/color';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Color[]>(this.apiUrl);
  }

  save(color: Color) {
    return this.http.post<Color>(this.apiUrl, color);
  }

  getById(id: number) {
    return this.http.get<Color>(`${this.apiUrl}/${id}`);
  }
}
