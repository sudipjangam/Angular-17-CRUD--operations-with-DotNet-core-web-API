import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../../http.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IUserData } from '../../interfaces/User';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toster = inject(ToastrService);
  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    age: [0, Validators.required],
    phone: ['', Validators.required],
    role: ['', Validators.required],
    salary: [0, Validators.required],
  });
  userId: number = 0;
  isEdit = false;
  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.isEdit = true;
      this.httpService.getUser(this.userId).subscribe((result) => {
        console.log(result);
        this.userForm.patchValue(result);
      });
    }
  }

  onSubmit() {
    console.log(this.userForm.value);
    const User: IUserData = {
      name: this.userForm.value.name!,
      email: this.userForm.value.email!,
      phone: this.userForm.value.phone!,
      age: this.userForm.value.age!,
      role: this.userForm.value.role!,
      salary: this.userForm.value.salary!,
    };
    if (this.isEdit) {
      this.httpService.updateUser(this.userId, User).subscribe((data) => {
        console.log('User updated successfully');
        this.toster.success('User updated successfully');
        this.router.navigateByUrl('/user-list');
      });
    } else {
      this.httpService.createUser(User).subscribe((data) => {
        console.log('User created successfully');
        this.toster.success('User created successfully');
        this.router.navigateByUrl('/user-list');
      });
    }
  }
}
