import { Component } from '@angular/core';
@Component({
  selector: 'app-notificationmenu',
  standalone: true,
  imports: [],
  templateUrl: './notificationmenu.component.html',
  styleUrl: './notificationmenu.component.scss'
})
export class NotificationmenuComponent {
  notificationCount: number = 5;
  isNotifyEmpty: boolean = false;

  removeNotify(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();


    }
    this.notificationCount--;
    this.isNotifyEmpty = this.notificationCount === 0;
  }

  handleCardClick(event: MouseEvent) {
    // Prevent the click event from propagating to the container
    event.stopPropagation();
  }

}
