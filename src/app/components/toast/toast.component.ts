import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() showToast: boolean = false;
  @Input() type: 'success' | 'error' | 'warning' = 'success';

  progress = 100;
  duration = 5000;
  private intervalId: any;
  private timeoutId: any;

  ngOnInit() {
    this.startProgress();
    this.timeoutId = setTimeout(() => this.hideToast(), this.duration);
  }

  startProgress() {
    this.intervalId = setInterval(() => {
      this.progress -= (100 / (this.duration / 100));
      if (this.progress <= 0) {
        this.hideToast();
      }
    }, 100);
  }

  hideToast() {
    this.showToast = false;
    clearInterval(this.intervalId);
  }

  getToastClass() {
    switch (this.type) {
      case 'error':
        return 'toast-error';
      case 'success':
        return 'toast-success';
      case 'warning':
        return 'toast-warning';
      default:
        return '';
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
  }
}
