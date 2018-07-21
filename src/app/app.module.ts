import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { ComponentComponent } from './component/component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormtestComponent } from './formtest/formtest.component';
@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    FormtestComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
