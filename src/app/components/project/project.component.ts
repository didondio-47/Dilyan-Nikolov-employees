import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppProjectForm } from '../project-form/project-form.component';
import { MatTableModule } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { DataService, MyWeatherData, Weather } from './project.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MapToDaysOfWeekPipe } from './day.pipe';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: true,
  providers: [DataService, HttpClient],
  imports: [MatTableModule, HttpClientModule, MapToDaysOfWeekPipe, DatePipe],
})
export class AppProject {
  public displayedColumns: string[] = ['day', 'temperature', 'wind', 'lastModified']
  public recipies: Observable<any | null>
  private service = inject(DataService);


  constructor(public dialog: MatDialog) {
    this.recipies = this.service.getData().pipe(
      map(
        (forecastData: MyWeatherData) =>
          forecastData.forecast.map((entry: Weather) => {
            return { ...entry, lastModified: new Date() };
          })

      ),
    );
    this.recipies.subscribe(
      (res: any) => console.log(res)
    )
  }

  public openForm(): void {
    AppProjectForm.open(this.dialog, 'hello');
  }
}
