import { Component, OnInit } from '@angular/core';
import { GlobalModel } from '../models/global.model';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-world-stats',
  templateUrl: './world-stats.component.html',
  styleUrls: ['./world-stats.component.css']
})
export class WorldStatsComponent implements OnInit {

  global: boolean;
  country: string;
  data: GlobalModel;
  dailyData: any[];
  countries: any[];
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp label'
    }
  ];
  lineChartType = 'line';
  lineChartLabels: any[] = [];
  barChartType = 'bar';
  barChartLabels: any[] = [
    'Infected', 'Recovered', 'Active Cases', 'Deaths'
  ];
  barChartData: any[] = [
    { data: [65, 76, 33, 57, 74], label: 'Lable' }
  ];

  constructor(private api: ApiService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.global = true;
    this.fetchData();
    this.fetchCountries();
    this.fetchDailyData();
  }

  fetchData() {
    this.api.fetchData().subscribe((res: any[]) => {
      this.data.cases = res['cases'];
      this.data.todayCases = res['todayCases'];
      this.data.recovered = res['recovered'];
      this.data.todayRecovered = res['todayRecovered'];
      this.data.deaths = res['deaths'];
      this.data.todayDeaths = res['todayDeaths'];
      this.data.active = res['active'];
      this.data.critical = res['critical'];
      this.data.lastupdate = res['updated'];
      console.log(this.data.active);

    });
  }
  fetchCountries() {
    this.api.fetchCountries().subscribe((res: any[]) => {
      var countries = res['countries'];
      this.countries = countries.map((name) => name['name']);
      // this.countryChanged(this.countries); 
    });
  }
  fetchDataByCountry(country: string) {
    this.api.fetchDataByCountry(country).subscribe((res: any[]) => {
      this.data.cases = res['cases'];
      this.data.todayCases = res['todayCases'];
      this.data.recovered = res['recovered'];
      this.data.todayRecovered = res['todayRecovered'];
      this.data.deaths = res['deaths'];
      this.data.todayDeaths = res['todayDeaths'];
      this.data.lastupdate = res['updated'];
      this.data.active = res['active'];
      this.data.critical = res['critical'];

      this.barChartData = [
        {
          data: [this.data.cases, this.data.recovered, this.data.active, this.data.deaths],
          label: 'People'
        }
      ];
    });
  }

  fetchDailyData() {
    this.api.fetchDailyData().subscribe((res: any[]) => {
      var infectedData = [];
      var deaths = [];
      var recovered = [];
      for (let date in res['cases']) {

        this.lineChartLabels.push(date);
        infectedData.push(res['cases'][date]);


      }
      for (let date in res['deaths']) {
        //this.lineChartLabels.push(date);
        deaths.push(res['deaths'][date]);
      }
      for (let date in res['recovered']) {
        //this.lineChartLabels.push(date);
        recovered.push(res['recovered'][date]);
      }

      this.lineChartData = [
        {
          data: infectedData,
          label: 'Infected'
        },
        {
          data: deaths,
          label: 'Deaths'
        },
        {
          data: recovered,
          label: 'recovered'
        },

      ];
    });
  }

  countryChanged(value: string) {
    this.country = value;
    if (value == 'global') {
      this.fetchData();
      this.global = true;
    } else {
      this.fetchDataByCountry(value);
      this.global = false;
    }
  }
}
