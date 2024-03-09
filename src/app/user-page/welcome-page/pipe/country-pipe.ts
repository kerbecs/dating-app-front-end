import {Pipe, PipeTransform} from "@angular/core";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {countryListSelector} from "../../../state/selector/country-list.selector";

@Pipe({
    name: 'country',
    standalone: true
})
export class CountryPipe implements PipeTransform{
    private countryList : {name : string, code : string}[] = [];
    constructor(private store : Store<storeType>) {
        this.store.select(countryListSelector).subscribe(countryList => {
            this.countryList = countryList;
        })
    }
    transform(value: string | undefined): any {
        if(!this.countryList || !value) return '';
        return this.countryList.find(country => country.code == value)?.name;
    }

}
