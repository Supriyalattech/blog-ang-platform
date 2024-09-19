import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activeRoute: string = '';
  isLoggedIn:Boolean = false;

  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      const segments = url.split('/');
      this.activeRouteName = segments.filter(segment => segment)[0] || 'home';
    });
  }

  activeRouteName:String = 'home';
  routerName(name:String){

    if(name == 'sign_out'){
      localStorage.clear();
      location.href = '/';
    }else{
      this.activeRouteName = name;
    }
  }

 
}
