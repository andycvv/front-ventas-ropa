import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Size } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = 'http://localhost:8080/size';

  constructor(
    private http: HttpClient,
  ) {}

  getAll() {
    return this.http.get<Size[]>(this.apiUrl);
  }

  save(size: Size) {
    return this.http.post<void>(this.apiUrl, size)
  }

  getById(id: number) {
    return this.http.get<Size>(this.apiUrl + `/${id}`)
  }
}
