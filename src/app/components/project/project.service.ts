import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Weather = {
    day: string;
    temperature: string;
    wind: string;
    lastModified: Date
}

export type MyWeatherData = {
    temperature: string;
    wind: string;
    description: string;
    forecast: Weather[];
}

@Injectable({
    providedIn: 'root',
})
export class DataService {
    // private apiUrl = 'http://goweather.xyz/weather/Berlin';

    constructor(private http: HttpClient) { }

    /**
     * @param page Page number to request
     */
    public getData(city: string = 'Berlin'): Observable<MyWeatherData> {
        // const params = new HttpParams().set('page', page.toString());

        return this.http.get<MyWeatherData>(`http://goweather.xyz/weather/${city}`);
    }
}
