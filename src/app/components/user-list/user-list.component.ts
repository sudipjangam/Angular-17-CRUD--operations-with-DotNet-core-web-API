import { Component, inject } from '@angular/core';
import { IUserData } from '../../interfaces/User';
import { HttpService } from '../../http.service';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconButton,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  //UserList: Observable<IUserData[]> | undefined;
  UserList: IUserData[] = [];
  httpService = inject(HttpService);
  router = inject(Router);
  toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'Id',
    'FirstName',
    'LastName',
    'email',
    'Regions',
    'Monikers',
    'Modules',
    'Flowtype',
    'Traders',
    'role',
    'action',
  ];
  ngOnInit() {

    this.httpService.getAllUser().subscribe((data) => {
      this.UserList = data;
      console.log(this.UserList);
    });
  }
  // ngOnInit(): void {
  //   this.UserList = this.httpService.getAllUser();
  // }
  editUser(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/user/${id}`);
  }
  DeleteUser(id: number) {
    console.log(id);
    this.httpService.deleteUser(id).subscribe((data) => {
      console.log(data);
      this.toaster.success('User Deleted Successfully');
      this.ngOnInit();
    });
  }
  applyFilter(value: string) {
    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.UserList.filter = value;
  }
}
