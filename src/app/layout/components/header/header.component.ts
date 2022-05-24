import {ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public isSticky = false;

  @Input() menuData;
  @ViewChild('navbarArea') navbarArea;

  constructor(private router: Router, private ref: ChangeDetectorRef) {
    this.onScroll();
  }

  ngOnInit(): void {
  }

  get menuItems() {
    if (this.menuData) {
      return this.menuData.data.data.navigation_menu[0].menu_items;
    }
    return [];
  }

  isActive(url) {
    if (url) {
      return url[0] === this.router.url;
    }
    return false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.navbarArea) {
      const sticky = this.navbarArea.nativeElement.offsetTop;
      this.isSticky = window.pageYOffset > sticky;
    } else {
      this.isSticky = false;
    }
  }

}
