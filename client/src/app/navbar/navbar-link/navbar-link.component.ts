import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.css']
})
export class NavbarLinkComponent implements OnInit {

  @Input() link: string;
  @Input() text: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
