import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    baseUrl = 'https://corona.lmao.ninja/v3/covid-19';
    baseUrl1 = 'https://covid19.mathdro.id/api';

    constructor(private http: HttpClient) { }

    fetchData() {
        return this.http.get(this.baseUrl + '/all');
    }

    fetchDataByCountry(country: string) {
        return this.http.get(this.baseUrl + '/countries/' + country);
    }

    fetchDailyData() {
        return this.http.get(this.baseUrl + '/historical/all');
    }

    fetchCountries() {
        return this.http.get(this.baseUrl1 + '/countries');
    }
}