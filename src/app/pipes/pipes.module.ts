import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyPipe } from "./pretty.pipe";
import { FlattenPipe } from './flatten.pipe';



@NgModule({
  declarations: [
    PrettyPipe,
    FlattenPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrettyPipe,
    FlattenPipe
  ]
})
export class PipesModule { }
