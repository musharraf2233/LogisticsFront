import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-users',
  standalone: false,
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css',
})
export class AddUsersComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  addUser() {
    console.log('test ok :1');

    if (this.userForm.valid) {
      console.log('test ok :2');

      const formValue = this.userForm.value;

      // Wrap role into object like Java expects
      const userPayload = {
        ...formValue,
        role: [{ roleName: formValue.role }],
      };

      this.userService.register(userPayload).subscribe({
        next: () => alert('User added successfully'),
        error: () => alert('Error adding user'),
      });
    }
  }
}
