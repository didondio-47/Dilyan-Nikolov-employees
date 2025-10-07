import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

type ProjectFormData = {
    myData: any;
}

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss',
    standalone: true,
    imports: [MatLabel, MatFormField, MatInput, FormsModule, ReactiveFormsModule],
})
export class AppProjectForm {
    public form = new FormGroup({
        name: new FormControl<string | null>(null),
    });

    constructor(
        public dialog: MatDialogRef<AppProjectForm>,
        @Inject(MAT_DIALOG_DATA) public data: ProjectFormData
    ) { }

    public static open(
        dialog: MatDialog,
        myData: any,
    ): MatDialogRef<AppProjectForm> {
        return dialog.open<AppProjectForm, ProjectFormData>(AppProjectForm, {
            data: { myData },
        });
    }
}
