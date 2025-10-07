import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export type PlanetsType = {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

@Injectable({
    providedIn: 'root',
})
export class PlanetsService {
    constructor(private http: HttpClient) { }

    public getPlanets(): Observable<PlanetsType[]> {
        return this.http.get<PlanetsType[]>('https://swapi.info/api/planets');
    }
}