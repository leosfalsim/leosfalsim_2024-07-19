import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  showMenu = false;

  constructor(private router: Router){}

  ngOnInit() {
    this.userName = localStorage.getItem('name') || '';
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout() {
    localStorage.removeItem('name');
    this.router.navigate(['/home']);
  }
}
