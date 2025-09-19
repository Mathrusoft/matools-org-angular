import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { mergeApplicationConfig } from "@angular/core";
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, mergeApplicationConfig(appConfig))