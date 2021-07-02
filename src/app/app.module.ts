import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { CountUpModule } from 'ngx-countup';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WorldStatsComponent } from './world-stats/world-stats.component';
import { IndiaStatsComponent } from './india-stats/india-stats.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'CovidIndia', pathMatch: 'full' },
  { path: 'CovidWorld', component: WorldStatsComponent },
  { path: 'CovidIndia', component: IndiaStatsComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WorldStatsComponent,
    IndiaStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    CountUpModule,
    RouterModule.forRoot(appRoutes)
  ],
  // exports:[
  //   RouterModule,
  // ]
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
