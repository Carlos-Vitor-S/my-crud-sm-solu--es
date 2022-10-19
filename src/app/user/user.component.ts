import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { inUser, inUserResponse } from '../interfaces/in-user';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';
import { ModalNewUSerComponent } from '../modal-new-user/modal-new-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  searchText: any;

  public formDataGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    avatar: new FormControl(''),
    email: new FormControl(''),
  });

  public userArray: inUser[] = [];

  public totalPaginas: number = 0;

  public displayedColumns: any[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
  ];

  formDataGroupTest = new FormGroup({
    avatar: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
  });

  public numeroPagina: number = 1;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsersData();

    this.getPlusData();
  }
  //Pegar todos dados da API atraves do get request
  getUsersData() {
    this.userService
      .getUsers(this.numeroPagina)
      .subscribe((dado: inUserResponse) => {
        this.totalPaginas = dado.total_pages;
        dado.data.map((valor) => {
          this.userArray.push(valor);
        });
        console.log(dado);
      });
  }
  //Pegar mais 1 pagina da API
  getPlusData() {
    this.numeroPagina++;
    this.getUsersData();
  }
  //cadastrar novo Usuario
  newUserSubmit() {
    let userData: inUser = Object.assign(
      {} as inUser,
      this.formDataGroup.value
    );
    userData.id = this.userArray.length + 1;
    this.userService.addUser(userData).subscribe(() => {
      this.userArray.push(userData);
    });
  }

  //Deletar usuario
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((response) => {
      this.userArray = this.userArray.filter((index) => {
        return index.id !== Number(id);
      });
    });
  }
  //Abrir Modal para Cadastrar Novo Usuario
  openModal(): void {
    const referenciaDialogo = this.dialog.open(ModalNewUSerComponent, {
      data: { id: this.userArray.length + 1 },
    });
    referenciaDialogo.afterClosed().subscribe((result: inUser) => {
      console.log(result);
      if (result) this.userArray.push(result);
    });
  }

  //Abrir Modal para Editar Usuario
  openModalEdit(user: inUser): void {
    const referenciaDialogo = this.dialog.open(ModalEditUserComponent, {
      data: { array: this.userArray, usuario: user },
      width: '400px',
    });
    referenciaDialogo.afterClosed().subscribe((result: inUser) => {
      if (result) console.log(result);
      this.userArray.map((item) => {
        if ((user.id = result.id)) {
          user.id = result.id;
          user.first_name = result.first_name;
          user.last_name = result.last_name;
          user.email = result.email;
          user.avatar = result.avatar;
        }
      });
      console.log(user);
      console.log(result);
    });
  }
}
