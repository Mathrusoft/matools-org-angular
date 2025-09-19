import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { ActionBarComponent } from "./header/action-bar/action-bar.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    ActionBarComponent,
    RouterOutlet,
    RouterLink,
    QRCodeModule
]
    
})
export class AppModule {}