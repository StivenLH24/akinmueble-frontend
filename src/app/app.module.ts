import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/pag-master/header/header.component';
import { FooterComponent } from './public/pag-master/footer/footer.component';
import { LateralMenuComponent } from './public/pag-master/lateral-menu/lateral-menu.component';
import { PathNotFoundComponent } from './public/error/path-not-found/path-not-found.component';
import { ServerErrorComponent } from './public/error/server-error/server-error.component';
import { RegisterFormComponent } from './modules/security/register-form/register-form.component';
import { HomeComponent } from './public/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LateralMenuComponent,
    PathNotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
