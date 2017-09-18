import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout-default.component.html'
})
export class LayoutDefaultComponent implements OnInit {
  public whithinConhecimento: boolean = false;

  constructor(private router: Router) {

  }

  public disabled: boolean = false;
  public status: { isopen: boolean } = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.whithinConhecimento = !!this.router.url.match(/conhecimento/i);
  }
}
