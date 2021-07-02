import { Component, OnInit } from '@angular/core';

import { GlobalModel } from '../models/global.model';
//import { ApiService } from '../api/api.service';
import { ApiIndiaService } from '../api/apiIndia.service';

@Component({
  selector: 'app-india-stats',
  templateUrl: './india-stats.component.html',
  styleUrls: ['./india-stats.component.css']
})
export class IndiaStatsComponent implements OnInit {

  status: boolean = true;
  global: boolean;
  country: string;
  states: any[];
  data: GlobalModel;
  dailyData: any[];
  countries: any[];
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp label'
    }
  ];
  lineChartDataDaily: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp label'
    }
  ];
  lineChartLabelsDaily: any[] = [];
  lineChartType = 'line';
  lineChartLabels: any[] = [];
  // lineChartType = 'line';

  barChartType = 'bar';
  barChartLabels: any[] = [
    'Infected', 'Recovered', 'Deaths'
  ];
  barChartData: any[] = [
    { data: [65, 76, 33], label: 'Lable' }
  ];

  constructor(private api: ApiIndiaService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.global = true;
    this.fetchData();
    this.fetchStates();
    this.fetchDailyData();
  }

  fetchData() {
    this.api.fetchData().subscribe((res: any[]) => {
      var count = res['cases_time_series'].length - 1;
      //console.log(count);

      this.data.cases = res['statewise'][0]['confirmed'];
      this.data.todayCases = res['cases_time_series'][count]['dailyconfirmed'];
      console.log(this.data.todayCases);

      this.data.recovered = res['statewise'][0]['recovered'];
      this.data.todayRecovered = res['cases_time_series'][count]['dailyrecovered'];
      console.log(this.data.todayRecovered);
      this.data.deaths = res['statewise'][0]['deaths'];
      this.data.todayDeaths = res['cases_time_series'][count]['dailydeceased'];
      this.data.active = res['statewise'][0]['active'];

      this.data.lastupdate = res['statewise'][0]['lastupdatedtime'];




    });
  }
  fetchStates() {
    this.api.fetchStates().subscribe((res: any[]) => {

      var i = 0;
      var statesCount = res['statewise'].length;
      var states = [];
      //
      while (i < statesCount) {
        states[i] = res['statewise'][i]['state'];
        // console.log(countries[i]);
        i++;

      }

      this.states = states;
      // console.log(this.countries);


    });
  }
  fetchDataByStates(state: string) {
    this.api.fetchDataByStates().subscribe((res: any[]) => {

      var i = 1;
      var statesCount = res['statewise'].length;
      this.status = false;
      while (i < statesCount) {
        if (res['statewise'][i]['state'] == state) {
          // console.log(res['statewise'][i]['statecode']);
          this.data.cases = res['statewise'][i]['confirmed'];
          //this.data.todayCases = res['todayCases'];
          this.data.recovered = res['statewise'][i]['recovered'];
          // this.data.todayRecovered = res['todayRecovered'];
          this.data.deaths = res['statewise'][i]['deaths'];
          //  this.data.todayDeaths = res['todayDeaths'];
          this.data.lastupdate = res['statewise'][i]['lastupdatedtime'];
          //this.data.active = res['active'];
          // this.data.critical = res['critical'];

          this.barChartData = [
            {
              data: [this.data.cases, this.data.recovered, this.data.deaths],
              label: 'People'
            }
          ];

        }
        i++;

      }



    });
  }

  fetchDailyData() {
    this.api.fetchDailyData().subscribe((res: any[]) => {
      var infectedData = [];
      var deaths = [];
      var recovered = [];
      var dailyInfectedData = [];
      var dailyDeaths = [];
      var dailyRecovered = [];

      var i = 150;
      var casesCount = res['cases_time_series'].length;
      //console.log(casesCount);

      var newCases = [];
      // //
      while (i < casesCount) {
        this.lineChartLabels.push(res['cases_time_series'][i]['date']);
        infectedData.push(res['cases_time_series'][i]['totalconfirmed']);
        deaths.push(res['cases_time_series'][i]['totaldeceased']);
        recovered.push(res['cases_time_series'][i]['totalrecovered']);
        dailyInfectedData.push(res['cases_time_series'][i]['dailyconfirmed']);
        dailyDeaths.push(res['cases_time_series'][i]['dailydeceased']);
        dailyRecovered.push(res['cases_time_series'][i]['dailyrecovered']);
        // console.log(countries[i]);
        i++;

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
      this.lineChartDataDaily = [
        {
          data: dailyInfectedData,
          label: 'DailyInfected'
        },
        {
          data: dailyDeaths,
          label: 'DailyDeaths'
        },
        {
          data: dailyRecovered,
          label: 'DailyRecovered'
        },
      ];
    });
  }

  stateChanged(value: string) {
    this.country = value;
    if (value == 'India' || value == 'Total') {
      this.fetchData();
      this.global = true;
    } else {
      this.fetchDataByStates(value);
      this.global = false;
    }
  }

}
