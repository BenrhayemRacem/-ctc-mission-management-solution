import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AppComponent } from './app.component';
import { PlanningComponent } from './componnents/planning/planning.component';
import { FormationComponent } from './componnents/formation/formation.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NgZoroModule } from './ng-zoro.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { ButtonComponent } from './shared/button/button.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SignupUserComponent } from './pages/signup-user/signup-user.component';
import { SignupOrganismComponent } from './pages/signup-organism/signup-organism.component';
import { CardComponent } from './shared/card/card.component';
import { SignupInstructorComponent } from './pages/signup-instructor/signup-instructor.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DashboardClientModule } from './pages/dashboard-client/dashboard-client.module';

import { AdminModule } from './admin/admin.module';
import {PlanningModule} from "./planning/planning.module";
import { PresSignupComponent } from './components/pres-signup/pres-signup.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,

        SignupUserComponent,
        SignupOrganismComponent,
SignupInstructorComponent,
        FormationComponent,
        PresSignupComponent,


    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgZoroModule,
    NzLayoutModule,
    NzMenuModule,
    FullCalendarModule,
    BrowserModule,
    HttpClientModule,
    MatSliderModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    NzDatePickerModule,
    DashboardClientModule,
    AdminModule,
    PlanningModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
