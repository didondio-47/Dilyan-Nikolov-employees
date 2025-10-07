import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export type PlanetsDetails = {
    name: string;
    height: string;
    mass: string;
}

@Injectable({
    providedIn: 'root',
})
export class PlanetDetailsService {
    constructor(private http: HttpClient) { }

    public getPlanets(url: string): Observable<PlanetsDetails> {
        return this.http.get<PlanetsDetails>(url);
    }
}