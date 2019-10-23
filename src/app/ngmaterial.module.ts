import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatInputModule, MatButtonModule
  ],
  exports: [MatTableModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class MaterialAppModule { }
