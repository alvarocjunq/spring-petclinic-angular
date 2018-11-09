/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Vet} from './vet';
import {HttpClient} from "@angular/common/http";
import {HandleError, HttpErrorHandler} from "../error.service";
import {catchError} from "rxjs/internal/operators";


@Injectable()
export class VetService {

  entity_url = environment.REST_API_URL + 'vets';

  private handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }

  getVets(): Observable<Vet[]> {
    return this.http.get<Vet[]>(this.entity_url)
      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

  getVetById(vet_id: string): Observable<Vet> {
    return this.http.get<Vet>((this.entity_url + '/' + vet_id))
      .pipe(
        catchError(this.handlerError('getVetById', {} as Vet))
      );
  }

  updateVet(vet_id: string, vet: Vet): Observable<Vet> {
    return this.http.put<Vet>(this.entity_url + '/' + vet_id, vet)
      .pipe(
        catchError(this.handlerError('updateVet', vet))
      );
  }

  addVet(vet: Vet): Observable<Vet> {
    return this.http.post<Vet>(this.entity_url, vet)
      .pipe(
        catchError(this.handlerError('addVet', vet))
      );
  }

  deleteVet(vet_id: string): Observable<number> {
    return this.http.delete<number>(this.entity_url + '/' + vet_id)
      .pipe(
        catchError(this.handlerError('deleteVet', 0))
      );
  }

}
