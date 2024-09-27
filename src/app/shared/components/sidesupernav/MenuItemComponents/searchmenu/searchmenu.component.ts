import { Component,ElementRef,Renderer2} from '@angular/core';
import { NavService,Menu } from '../../../../services/nav.service';


interface Item {
  id: number;
  name: string;
  type: string;
  title: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-searchmenu',
  standalone: true,
  templateUrl: './searchmenu.component.html',
  styleUrl: './searchmenu.component.scss'
})
export class SearchmenuComponent {
  cartItemCount: number = 5;
  public text!: string;
  public SearchResultEmpty: boolean = false;
  public menuItems!: Menu[];
  public items!: Menu[];
  isCartEmpty: boolean = false;
  isNotifyEmpty: boolean = false;
  constructor(public navServices: NavService,
    private elementRef: ElementRef, private renderer: Renderer2){}
  Search(searchText: string) {
    if (!searchText) return this.menuItems = [];
    // items array which stores the elements
    const items: Item[] = [];
    // Converting the text to lower case by using toLowerCase() and trim() used to remove the spaces from starting and ending
    searchText = searchText.toLowerCase().trim();
    this.items.filter((menuItems: Menu) => {
      // checking whether menuItems having title property, if there was no title property it will return
      if (!menuItems?.title) return false;
      //  checking wheteher menuitems type is text or string and checking the titles of menuitems
      if (menuItems.type === 'link' && menuItems.title.toLowerCase().includes(searchText)) {
        // Converting the menuitems title to lowercase and checking whether title is starting with same text of searchText
        if (menuItems.title.toLowerCase().startsWith(searchText)) { // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(menuItems))
          // If both are matching then the code is pushed to items array
          items.push(menuItems as Item);
        }
      }
      //  checking whether the menuItems having children property or not if there was no children the return
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems: Menu) => {
        if (!subItems?.title) return false;
        if (subItems.type === 'link' && subItems.title.toLowerCase().includes(searchText)) {
          if (subItems.title.toLowerCase().startsWith(searchText)) {         // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subItems))
            items.push(subItems as Item);
          }

        }
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems: Menu) => {
          if (subSubItems.title?.toLowerCase().includes(searchText)) {
            if (subSubItems.title.toLowerCase().startsWith(searchText)) { // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subSubItems))
              items.push(subSubItems as Item);

            }
          }
        });
        return true;
      });
      return this.menuItems = items;
    });
    // Used to show the No search result found box if the length of the items is 0
    if (!items.length) {
      this.SearchResultEmpty = true;
    }
    else {
      this.SearchResultEmpty = false;
    }
    return true;
  }


  clearSearch() {
    this.text = '';
    this.menuItems = [];
    this.SearchResultEmpty = false;
    return this.text, this.menuItems;
  }

  removeRow(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();


    }
    this.cartItemCount--;
    this.isCartEmpty = this.cartItemCount === 0;
  }
  removeTags(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();


    }
  }
}
