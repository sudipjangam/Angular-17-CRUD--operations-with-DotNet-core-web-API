import { Component, OnInit, inject, viewChild } from '@angular/core';
import { IUserData } from '../../interfaces/User';
import { HttpService } from '../../http.service';
import { Observable, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, FormsModule } from '@angular/forms';

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
    MatCardModule,MatPaginatorModule,FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit{
  //filterValue = new FormControl(''); // Define filterValue as a FormControl
  UserData: Observable<IUserData[]> ;
  UserList:IUserData[] =[];
  //UserList$:Observable<IUserData[]> =of([]);
  //UserList: IUserData[] = [];
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
  constructor(private service: HttpService) {

     this.UserData = this.service.getAllUser();

    // this.service.getAllUser().subscribe((data) => {
    //   this.UserList = data;
    //   // this.UserList.paginator = this.pagination;
    // });


  }

  ngOnInit() {

    this.UserData.subscribe((data) => {
      this.UserList = data;
      console.log("User List", this.UserList);
    })
    // this.httpService.getAllUser().subscribe((data) => {
    //   this.UserList = data;
    //   console.log(this.UserList);
    // });
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
  //  applyFilter(event: Event) {
  //   debugger
  //   // value = value.trim(); // Remove whitespace
  //   // value = value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   // this.dataSource.filter = value;
  // }
   applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.UserList = this.UserList.filter(user => {
      const lowerCaseFilterValue = filterValue.trim().toLowerCase();
      return user.firstName.toLowerCase().includes(lowerCaseFilterValue) ||
             user.lastName.toLowerCase().includes(lowerCaseFilterValue) ||
             user.email.toLowerCase().includes(lowerCaseFilterValue);
    });
  }
}
