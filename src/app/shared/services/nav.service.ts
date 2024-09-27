import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
// Menu
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  badgeText?: string;
  active?: boolean;
  selected?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  children2?: Menu[];
  Menusub?: boolean;
  target?: boolean;
  menutype?:string
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search = false;

  // Language
  public language = false;

  // Mega Menu
  public megaMenu = false;
  public levelMenu = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen = false;
  active: any;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    // Dashboard
    // {
    //   icon: 'home',
    //   path: '/dashboard/crm',
    //   title: 'Dashboard',
    //   type: 'link',
    // },

    // {
    //   icon: 'task',
    //   path: '/dashboard/hrm',
    //   title: 'Planing Center',
    //   type: 'sublink',
    //   children: [
    //     {
    //       path: '/pages/filemanager',
    //       title: 'Job details',
    //       type: 'link',
    //       active: false,
    //     },

    //     // {
    //     //   path: '/dashboard/personal',
    //     //   title: 'Personal',
    //     //   type: 'link',
    //     //   active: false,
    //     // },
    //   ],
    // },


    {
      icon: 'cube',
      title: 'Home',
      type: 'link',
      path: '/instruction',
      active: false,
      // children: [
      //   {
      //     path: '/instruction',
      //     title: 'Dashboard',
      //     type: 'link',
      //     active: false,
      //   },
      //   {
      //     path: '/asset/list',
      //     title: 'Asset List',
      //     type: 'link',
      //     active: false,
      //   },
      //           {
      //     path: '/asset/add',
      //     title: 'Add Asset',
      //     type: 'link',
      //     active: false,
      //   },
      //           {
      //     path: '/asset/edit',
      //     title: 'Edit Asset',
      //     type: 'link',
      //     active: false,
      //   },

      //   // {
      //   //   path: '/dashboard/personal',
      //   //   title: 'Personal',
      //   //   type: 'link',
      //   //   active: false,
      //   // },
      // ],
    },


  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
