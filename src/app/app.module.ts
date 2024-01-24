import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/helpers/interceptors/JwtInterceptor';
import { AppCommonModule } from 'src/modules/app-common/app-common.module';
import { Error401Interceptor } from 'src/helpers/interceptors/Error401Interceptor';
import { ErrorInterceptor } from 'src/helpers/interceptors/ErrorInterceptor';
import { HttpClient, HttpClientModule } from '@angular/common/http';  
import {AuthGuard } from 'src/helpers/guards/auth.guard';  

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppCommonModule.forRoot()
  ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Error401Interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





