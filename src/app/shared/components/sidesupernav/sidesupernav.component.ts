import { Component, ViewChild, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
import { CallendermenuComponent } from './MenuItemComponents/callendermenu/callendermenu.component';
import { MailmenuComponent } from './MenuItemComponents/mailmenu/mailmenu.component';
import { NotificationmenuComponent } from './MenuItemComponents/notificationmenu/notificationmenu.component';
import { QuickappmenuComponent } from './MenuItemComponents/quickappmenu/quickappmenu.component';
import { SearchmenuComponent } from './MenuItemComponents/searchmenu/searchmenu.component';

@Component({
  selector: 'app-sidesupernav',
  templateUrl: './sidesupernav.component.html',
  styleUrls: ['./sidesupernav.component.scss']
})
export class SidesupernavComponent {
  display: boolean = false;
  action: string = "";
  content: string = "";
  tittle:string="";
  @ViewChild('contentdiv', { read: ViewContainerRef }) container!: ViewContainerRef;


  constructor(private el: ElementRef, private renderer: Renderer2) { }
  toggle(action: string) {
    if (this.action == action) {
      this.display = !this.display;
    } else {
      if (this.action == "") {
        this.display = !this.display;
      } if (this.action != '' && this.action != action && this.display == false) { this.display = true }
      this.action = action
    }
    if (this.display == true) {
    } else {
    }

    this.tittle = action
  }

  showComponent(action: string) {
    if (action == 'Logs') {
      this.toggle("Logs",)
      if (this.display) {
        console.log(this.container)
        this.container.clear();
        this.container.createComponent(CallendermenuComponent)
      }

    }
    if (action == 'Mail') {
      console.log(this.container)
      this.toggle("Mail",)
      this.container.clear();
      this.container.createComponent(MailmenuComponent)
    }

    if (action == 'Quick Apps') {
      console.log(this.container)
      this.toggle("Quick Apps",)
      this.container.clear();
      this.container.createComponent(QuickappmenuComponent)
    }

    if (action == 'Notification') {
      console.log(this.container)
      this.toggle("Notification",)
      this.container.clear();
      this.container.createComponent(NotificationmenuComponent)
    }

    // if (action == 'menu5') {
    //   console.log(this.container)
    //   this.toggle("menu2",)
    //   this.container.clear();
    //   this.container.createComponent(SearchmenuComponent)
    // }
    console.log("jsd")

  }
}
