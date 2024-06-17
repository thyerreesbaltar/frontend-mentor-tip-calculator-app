import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-result-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './result-view.component.html',
  styleUrl: './result-view.component.scss',
})
export class ResultViewComponent implements OnInit{
  @Input() public result!: Signal<{ tip: string; amount: string }>;
  @Output() public resetForm = new EventEmitter<boolean>();

  public reset = signal(false)

  ngOnInit(): void {

    if (this.checkResetIsClean()) {
      this.reset.set(false);
    }
  }

  get classButton() {
    const buttonActive = this.checkResetIsClean() ? '' : 'active';
    return `hover ${buttonActive}`
  }

  public checkResetIsClean() {
    return this.result().tip === "$0.00" && this.result().amount === "$0.00";
  }

  public emitResetEvent() {
    this.reset.set(true)
    return this.resetForm.emit(this.reset())
  }

}
