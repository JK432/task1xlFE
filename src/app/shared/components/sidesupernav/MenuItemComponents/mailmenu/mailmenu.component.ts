import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import React from 'react';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-mailmenu',
  standalone: true,
  imports: [NgxEditorModule, CommonModule, SimplebarAngularModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './mailmenu.component.html',
  styleUrl: './mailmenu.component.scss'
})
export class MailmenuComponent {
  constructor(private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {

  }
  isNotifyEmpty: boolean = this.breakpointObserver.isMatched(Breakpoints.Handset);
  toggleNotifyEmpty() {
    this.isNotifyEmpty = !this.isNotifyEmpty;
  }
}
