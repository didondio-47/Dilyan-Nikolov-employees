import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSelectModule } from '@angular/material/select';
import { PlanetsService, PlanetsType } from "./planet.servie";
import { map, Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { PlanetDetailsService } from "./planet-details.service";

@Component({
    selector: 'app-star-wars',
    templateUrl: './star-wars-table.component.html',
    styleUrls: ['./star-wars-table.component.scss'],
    standalone: true,
    providers: [PlanetsService, PlanetDetailsService, HttpClient],
    imports: [MatSelectModule, AsyncPipe, HttpClientModule],
})
export class StarWarsTable {
    public planets$: Observable<PlanetsType[]>;
    // public planetOptions$: Observable<string[]>;

    constructor(private planetsService: PlanetsService) {
        this.planets$ = planetsService.getPlanets().pipe(
            map(
                (res: PlanetsType[]) => res
            )
        )

        this.planets$.subscribe(
            (res: any) => console.log(res)
        )

        // this.planetOptions$ = this.planets$.pipe(
        //     map(
        //         (planetData: PlanetsType[]) => planetData.map((planet: PlanetsType) => planet.name)
        //     )
        // )

    }

    public showPlanetDetails(planet: PlanetsType): void {
        //    const planetObj: PlanetsType = planets.find((planet: PlanetsType) => planet.name === planetName);


    }
}