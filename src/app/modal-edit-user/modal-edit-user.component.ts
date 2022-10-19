import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { inUser } from '../interfaces/in-user';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.css'],
})
export class ModalEditUserComponent implements OnInit {
  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<ModalEditUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { array: inUser[]; usuario: inUser; id: number }
  ) {}
  formModalEdit = new FormGroup({
    id: new FormControl(null),
    avatar: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnInit(): void {}

  editUserSubmit() {
    let userData: inUser = Object.assign(
      {} as inUser,
      this.formModalEdit.value
    );

    userData.id = this.data.usuario.id;

    this.dialogRef.close(userData);

    this.userService.updateUser(userData).subscribe(() => {
      userData = this.data.usuario;
    });

    //console.log(userData);
    this.formModalEdit.reset();
  }

  closeModal() {
    this.dialogRef.close();
    //this.formModalEdit.reset();
  }
}
