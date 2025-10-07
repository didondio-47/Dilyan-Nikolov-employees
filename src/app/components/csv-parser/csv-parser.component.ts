import { Component, signal } from '@angular/core';
import * as Papa from 'papaparse';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { getOverlappingDaysInIntervals } from 'date-fns';
import { MatButton } from '@angular/material/button';
import { parseStringToDate } from './date-format-helper';

type EmployeeRecord = {
  EmpID: number;
  ProjectID: number;
  DateFrom: Date;
  DateTo: Date;
}

type PairResult = {
  EmpID1: number;
  EmpID2: number;
  ProjectID: number;
  DaysWorked: number;
}

@Component({
  selector: 'app-csv-parser',
  templateUrl: './csv-parser.component.html',
  styleUrls: ['./csv-parser.component.scss'],
  imports: [
    MatColumnDef,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButton,
  ],
})
export class CSVParserComponent {
  protected pairs = signal<PairResult[]>([]);
  protected readonly displayedColumns = ['EmpID1', 'EmpID2', 'ProjectID', 'DaysWorked'];

  protected onFileUpload(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const records: EmployeeRecord[] = result.data.map((row: any) => ({
          EmpID: +row.EmpID,
          ProjectID: +row.ProjectID,
          DateFrom: new Date(row.DateFrom),
          DateTo: row.DateTo && row.DateTo ? new Date(row.DateTo) : new Date(),
        }));
        this.findEmployeePairs(records);
      },
    });
  }

  private findEmployeePairs(records: EmployeeRecord[]): void {
    const foundPairs: PairResult[] = [];
    const projects = new Map<number, EmployeeRecord[]>();
    for (const record of records) {
      if (!projects.has(record.ProjectID)) {
        projects.set(record.ProjectID, []);
      }
      projects.get(record.ProjectID)!.push(record);
    }

    for (const [projectId, employees] of projects.entries()) {
      for (let i = 0; i < employees.length; i++) {
        for (let j = i + 1; j < employees.length; j++) {

          const employee1DateFrom = parseStringToDate(employees[i].DateFrom);
          const employee1DateTo = parseStringToDate(employees[i].DateTo);
          const employee2DateFrom = parseStringToDate(employees[j].DateFrom);
          const employee2DateTo = parseStringToDate(employees[j].DateTo);

          const overlappingDays = getOverlappingDaysInIntervals(
            { start: employee1DateFrom, end: employee1DateTo },
            { start: employee2DateFrom, end: employee2DateTo }
          );
          console.log('overlappingDays', overlappingDays);
          if (overlappingDays > 0) {
            foundPairs.push({
              EmpID1: employees[i].EmpID,
              EmpID2: employees[j].EmpID,
              ProjectID: projectId,
              DaysWorked: overlappingDays,
            });
          }
        }
      }
    }
    this.pairs.set(foundPairs);
  }
}
