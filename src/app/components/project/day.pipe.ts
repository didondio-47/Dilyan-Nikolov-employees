import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'mapToDaysOfWeek',
})
export class MapToDaysOfWeekPipe implements PipeTransform {
    transform(dayNumber: string): string {
        switch (dayNumber) {
            case '1': return 'Monday';
            case '2': return 'Tuesday';
            case '3': return 'Wensday';
            case '4': return 'Thursday';
            case '5': return 'Friday';
            case '6': return 'Saturday';
            case '7': return 'Sunday';
            default: return '';
        }
    }
}