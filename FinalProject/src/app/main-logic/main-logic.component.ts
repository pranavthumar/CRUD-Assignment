import { Component } from '@angular/core';
import { SalesforceService } from '../salesforce-service.service';
import { Observable, catchError, map } from 'rxjs';

@Component({
  selector: 'app-main-logic',
  templateUrl: './main-logic.component.html',
  styleUrl: './main-logic.component.css'
})
export class MainLogicComponent {




  salesforceObjects: string[] = [];
  selectedObject: string = '';
  objectFields: any[] = [];
  flag = 1;
  selectedFields: string[] = [];
  records: any[] = [];
  editedRecord: any = {};
  editMode: boolean;
  apiUrl: any;
  http: any;
  collection: any;
  fields: any;
  fieldhash: { [fieldName: string]: boolean } = {};
  sObjects: any;
  selectedSObject: any;
  update_select: boolean;
  recordId: any;
  selectedrecord: {};

  constructor(private salesforceService: SalesforceService) { }

  ngOnInit() {
    this.salesforceService.getAvailableObjects().subscribe((objects) => {
      this.salesforceObjects = objects.sobjects.map((sobject) => sobject.name);
    });
  }






  // getSObjects(): void {
  //   this.salesforceService.getSObjects().subscribe((data) => {
  //     this.sObjects = data.sobjects.map((sobject) => sobject.name);
  //   });
  // }

  getFields(): void {
    console.log(this.selectedObject)
    if (this.selectedObject) {
      this.salesforceService
        .getObjectFields(this.selectedObject)
        .subscribe((data) => {

          // CREATED A MAP FOR GETTING THE VALUES THAT CAN BE EDITED OR NOT (UPDATEABLE = TRUE ---> EDIT HO SAKTA HAI)
          this.fields = data.fields.map((field: any) => field.name);
          data.fields.forEach((field: any) => {
            this.fieldhash[field.name] = field.updateable;
          });
        });
    }
  }

  



  //   updateRecord(record: any): void {
  //     this.update_select=!this.update_select
  //     // console.log(this.records)
  //     // this.salesforceService
  //     //   .updateObjectRecord(this.selectedSObject, recordId, updatedData)
  //     //   .subscribe((data) => {
  //     //     console.log('Record updated successfully:', data);
  //     //     // Refresh data after updating
  //     //     this.fetchData();
  //     //   });
  //     this.recordId=record['Id']
  //     // console.log(this.recordId)
  //     this.selectedrecord = Object.keys(record).reduce((result, fieldName) => {
  //       if (this.fieldhash[fieldName]) {
  //         result[fieldName] = record[fieldName];
  //       }
  //       return result;
  //     }, {});
  //     console.log(this.selectedrecord)
  // }














  onObjectSelect() {
    if (this.selectedObject) {
      this.salesforceService
        .getObjectFields(this.selectedObject)
        .subscribe((data) => {
          this.objectFields = data.fields.map((field: any) => field.name);
          data.fields.forEach((field: any) => {
            this.fieldhash[field.name] = field.updateable;
          });
        });
    }
  }

  // onFieldSelect(field: string) {
  //   if (!this.selectedFields.includes(field)) {
  //     this.selectedFields.push(field);
  //   }
  // }

  fetchData() {
    if (this.selectedFields.length > 0) {
      this.salesforceService.getRecords(this.selectedObject, this.selectedFields).subscribe(data => {
        this.records = data.records;
      });
    }
  }

  editRecord(record: any) {
    console.log(record);
    // this.editedRecord = { ...record };
    this.update_select = !this.update_select
    // console.log(this.records)
    // this.salesforceService
    //   .updateObjectRecord(this.selectedSObject, recordId, updatedData)
    //   .subscribe((data) => {
    //     console.log('Record updated successfully:', data);
    //     // Refresh data after updating
    //     this.fetchData();
    //   });
    this.recordId = record['Id']
    console.log(this.recordId)
    this.selectedrecord = Object.keys(record).reduce((result, fieldName) => {
      console.log(fieldName)
      if (this.fieldhash[fieldName]) {
        result[fieldName] = record[fieldName];
      }
      return result;
    }, {});
    console.log(this.selectedrecord)
  }

  //OLD CODE
  // updateRecord() {
  //   const recordId = this.editedRecord.Id;
  //   this.salesforceService.updateRecord(recordId, this.editedRecord).subscribe(() => {
  //     // Reload data after update
  //     this.fetchData();
  //     this.editedRecord = {};
  //     this.editMode = false;
  //   });
  // }

  //NEW CODE
  updateRecord(record: any): void {
    console.log(this.recordId)
    this.salesforceService.updateObjectRecord(this.selectedSObject, this.recordId, record).subscribe((data) => {
      alert('Record updated successfully:');
      // Refresh data after updating
      this.fetchData();
    });
    this.update_select = !this.update_select
  }












  deleteRecord(recordurl: string) {
    console.log("Data is Deleted SuccessFully !");
    this.salesforceService.deleteRecord(recordurl).subscribe(() => {
      // Reload data after delete
      this.fetchData();
      this.editedRecord = {};
      this.editMode = false;
    });

  }


  // salesforce.service.ts

  // deleteRecord(recordId: string): Observable<any> {
  //   const endpoint = `${this.apiUrl}/services/data/v53.0/sobjects/Account/${recordId}`;
  //   return this.http.delete(endpoint, { headers: this.getHeaders() }).pipe(
  //     catchError(error => {
  //       console.error('Error deleting record:', error);
  //       throw error; // Re-throw the error to propagate it to the component
  //     })
  //   );
  // }
  //   getHeaders() {
  //     throw new Error('Method not implemented.');
  //   }



}























