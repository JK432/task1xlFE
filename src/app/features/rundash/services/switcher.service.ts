import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SwitcherService {
  private progressSubject = new BehaviorSubject<Map<string, boolean>>(new Map<string, boolean>([
    ['Run Info', false],
    ['Tie-On Info', false],
    ]));

    private pageSubject = new BehaviorSubject<string>('Run Info');
    progress: Map<string, boolean> = new Map<string, boolean>();
    currentPage: string = '';
  constructor(private toastr: ToastrService) {
    this.progressSubject.subscribe((process) => {
      this.progress = process;
    });
  }
    swicthPage(previousPage: string, nextPage: string, inverse: boolean = false) {
      console.log(this.progress)
      console.log(previousPage);
    if (!inverse) {
      if (nextPage == 'Run Info') {
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
