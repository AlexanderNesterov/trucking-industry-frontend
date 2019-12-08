import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
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
    MatBottomSheetModule,
    MatAutocompleteModule
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
    MatBottomSheetModule,
    MatAutocompleteModule
  ]
})
export class MaterialAppModule {
}
