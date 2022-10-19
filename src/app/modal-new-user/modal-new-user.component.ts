import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { inUser } from '../interfaces/in-user';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.css'],
})
export class ModalNewUSerComponent implements OnInit {
  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<ModalNewUSerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {}

  formModal = new FormGroup({
    avatar: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
  });

  newUserSubmit() {
    let userData: inUser = Object.assign({} as inUser, this.formModal.value);
    this.data;

    userData.id = this.data.id;

    this.userService.addUser(userData).subscribe(() => {
      this.dialogRef.close(userData);
      this.formModal.reset();
    });
  }

  closeModal() {
    this.dialogRef.close();
    this.formModal.reset();
  }
}
