import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatStepperModule, MatTab,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule
  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class MaterialAppModule {
}
