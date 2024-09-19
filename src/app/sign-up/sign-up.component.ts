import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
  }

  nameVal:any = '';
  emailVal: any = '';
  passwordVal: any = '';
  confirmPasswordVal: any = '';
  roleVal:any = 'reader';

  submitForm(formValues: any) {
    this.userService.signUp(formValues).subscribe((response:any) => {
      if(response.message === 'success'){
        let token = response.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', response.data.id);
        Swal.fire({
          icon: "success",
          text: "Sign Up successfully!",
          showConfirmButton: true,
        });
        setTimeout(() => {
          location.href="/home";
        }, 2000);

      }else{
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: true,
        });
      }
    })
    
  }
}
