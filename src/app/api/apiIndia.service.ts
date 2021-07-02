import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiIndiaService {
    baseUrl = 'https://api.covid19india.org';

    constructor(private http: HttpClient) { }

    fetchData() {
        return this.http.get(this.baseUrl + '/data.json');
    }

    fetchDataByStates() {
        return this.http.get(this.baseUrl + '/data.json');
    }

    fetchDailyData() {
        return this.http.get(this.baseUrl + '/data.json');
    }

    fetchStates() {
        return this.http.get(this.baseUrl + '/data.json');
    }
}