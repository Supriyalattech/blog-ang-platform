import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
  }

  emailVal: any = '';
  passwordVal: any = '';
  confirmPasswordVal: any = '';

  submitForm(formValues: any) {
    this.userService.signIn(formValues).subscribe((response:any) => {

      console.log(response,'heyyyyyyyyyyy')
      if(response.message === 'success'){
        let token = response.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', response.data.id);
        Swal.fire({
          icon: "success",
          text: "You logged in successfully!",
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
