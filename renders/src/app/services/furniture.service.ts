import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FurnitureType } from '../shared/model/furniture-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  backendUrl = environment.backendUrl;
  private furnitures: Array<FurnitureType> = [];

  constructor(private http: HttpClient) {}

  searchFurniture(
    queryString: string,
    limit: number = 6,
    page: number = 0
  ): Observable<FurnitureType[]> {
    return this.http.get<FurnitureType[]>(
      `${this.backendUrl}/api/v1/furniture?searchString=${queryString}&limit=${limit}&page=${page}`
    );
  }

  getFurnitures() {}
}
