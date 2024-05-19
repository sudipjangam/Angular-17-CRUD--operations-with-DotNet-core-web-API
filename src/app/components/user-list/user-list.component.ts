import { Component, inject } from '@angular/core';
import { IUserData } from '../../interfaces/User';
import { HttpService } from '../../http.service';
import { Observable} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconButton,MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  UserList: IUserData[] = [];
  httpService = inject(HttpService);
  router = inject(Router);
  toaster = inject(ToastrService)
  displayedColumns: string[] = ['Id', 'name', 'email', 'age','phone','role','salary','action'];
  ngOnInit() {
    this.httpService.getAllUser().subscribe((data) => {
      this.UserList = data;
      console.log(this.UserList);
    });
  }
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
}
