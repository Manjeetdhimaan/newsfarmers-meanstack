import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackdropComponent } from "./backdrop/backdrop.component";
import { BackToTopComponent } from "./back-to-top/back-to-top.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { LoadingComponent } from "./loading";
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations:[
        BackdropComponent,
        BackToTopComponent,
        SpinnerComponent,
        LoadingComponent,
        LoaderComponent
    ],
    
imports:[
    CommonModule,
],
exports: [
    BackdropComponent,
    BackToTopComponent,
    SpinnerComponent,
    LoadingComponent,
    LoaderComponent
]
})
export class UIComponentsModule{}