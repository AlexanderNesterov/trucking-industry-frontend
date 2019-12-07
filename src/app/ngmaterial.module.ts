import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatBottomSheetModule,
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatStepperModule,
  MatTableModule, MatTabsModule, MatToolbarModule
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
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatBottomSheetModule
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
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatBottomSheetModule
  ]
})
export class MaterialAppModule {
}
