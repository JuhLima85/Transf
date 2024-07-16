import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  displayMenu:boolean = false
  isMouseOverMenu:boolean = false
  itemsMenu:any[] = []
  constructor(public navbarService:NavbarService) { }
  panelOpenState = false;
  
  ngOnInit(): void {
    this.itemsMenu = this.navbarService.getItensMenuLateral()
  } 

}
