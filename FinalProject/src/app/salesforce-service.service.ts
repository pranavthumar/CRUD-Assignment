// salesforce.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesforceService {
  private apiUrl = 'https://NA212.salesforce.com'; // Replace with your Salesforce instance URL
  private accessToken = '00D8b000002ADgv!ARMAQFJ.oSy.2qDbkXn2pRw7Rw9XYITEG51JqCSTRNGJR_MfCGnfbWwYVTWHGJQhwWpp1FlWhKafoqy_uy6D.iRaCYrF7__B'; // Replace with your actual access token



  updateObjectRecord(selectedSObject: any, recordId: any, updatedData: any) {
    const endpoint = `${this.apiUrl}/services/data/v58.0/sobjects/Account/${recordId}`;
    return this.http.patch(endpoint, updatedData, { headers: this.getHeaders() });
  }
  // getObjectData(selectedSObject: any, selectedFields: string[]) {
  //   throw new Error('Method not implemented.');
  // }
  // getSObjects() {
  //   throw new Error('Method not implemented.');
  // }
  // splice(recordId: string) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
  }
  
   
  setAccessToken(token: string): void {
    this.accessToken = token;
  }
  getAvailableObjects(): Observable<any> {
    const endpoint = `${this.apiUrl}/services/data/v58.0/sobjects`;
    return this.http.get<any>(endpoint, { headers: this.getHeaders() });
  }

  getObjectFields(objectName: string): Observable<any> {
    const endpoint = `${this.apiUrl}/services/data/v58.0/sobjects/${objectName}/describe`;
    return this.http.get<any>(endpoint, { headers: this.getHeaders() })
  }

  getRecords(objectName: string, selectedFields: string[]): Observable<any> {
    const newFields : string[] =JSON.parse(JSON.stringify(selectedFields))
    if(!newFields.includes('Id')){
        newFields.push('Id')
    }

    // const fields = selectedFields.join(',');
    const endpoint =`${this.apiUrl}/services/data/v58.0/query?q=SELECT ${newFields} FROM ${objectName}` 
    // `${this.apiUrl}/services/data/v58.0/query?q=SELECT ${fields} FROM ${objectName}`;
   
    // `${this.apiUrl}/services/data/v58.0/query?q=SELECT ${fields} Id FROM ${objectName}`


    // console.log(endpoint)

    return this.http.get(endpoint, { headers: this.getHeaders() });
  }














  deleteRecord(recordurl: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${recordurl}`;
    console.log(endpoint)
    return this.http.delete(endpoint, { headers: this.getHeaders() });




    // const endpoint = `${this.apiUrl}/services/data/v53.0/sobjects/Account/${recordId}`;
    // return this.http.delete(endpoint, { headers: this.getHeaders() }).pipe(
    //   catchError(error => {
    //     console.error('Error deleting record:', error);
    //     throw error;
    //   })
    // );
    

  }
}

  function updateRecord(recordId: any, string: any, updatedData: any, any: any) {
    throw new Error('Function not implemented.');
  }

function deleteRecord(recordurl: any, string: any) {
  throw new Error('Function not implemented.');
}

