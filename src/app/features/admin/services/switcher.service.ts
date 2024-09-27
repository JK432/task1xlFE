import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SwitcherService {
  
  private progressSubject = new BehaviorSubject<Map<string, boolean>>(new Map<string, boolean>([
    ['Job Info', false],
    ['Assign Info', false],
    ['Asset Info', false],
  ]));

  private pageSubject = new BehaviorSubject<string>('Job Info');
  progress: Map<string, boolean> = new Map<string, boolean>();
  currentPage: string = '';

  constructor(private toastr: ToastrService) {
    this.progressSubject.subscribe((process) => {
      this.progress = process;
    });

    this.pageSubject.subscribe((currentPage) => {
      this.currentPage = currentPage;
    })

  }

  swicthPage(previousPage: string, nextPage: string, inverse: boolean = false) {
    if (!inverse) {
      if (nextPage == 'Job Info') {
        this.pageSubject.next(nextPage);

      } else {
        if (this.progress.get(previousPage)) {
          this.pageSubject.next(nextPage);

        } else {
          this.toastr.warning(`Submit ${previousPage} Form first`, 'Warning', { positionClass: 'toast-top-center' });
        }
      }
    } else {
      this.pageSubject.next(nextPage);
    }
  }

  updateProgress(progress: Map<string, boolean>) {
    this.progressSubject.next(progress);
  }

  getPageSubject() {
    return this.pageSubject.asObservable();
  }

  getProgress() {
    return this.progressSubject.asObservable();
  }

}
