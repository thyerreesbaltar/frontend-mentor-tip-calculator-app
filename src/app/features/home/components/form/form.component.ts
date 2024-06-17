import { ChangeDetectorRef, Component, DoCheck, ElementRef, Input, ViewChild, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

//Component
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective,
    NgClass,
    ErrorMessageComponent,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements DoCheck {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('custom') inputCustom!: ElementRef;

  @Input() tipForm: any;

  public isFocusInput = signal<{
    bill: boolean;
    custom: boolean;
    nbPeople: boolean;
  }>({
    bill: false,
    custom: false,
    nbPeople: false,
  });

  public buttonOptionPercentage = signal<Array<string>>([
    '5',
    '10',
    '15',
    '25',
    '50',
  ]);

  ngDoCheck(): void {
    this.buttonOptionPercentage().find((element) => {
      return element == this.tipForm.get('selectTip').value;
    });

    if (
      this.tipForm.value.selectTip === null ||
      this.buttonOptionPercentage().find(
        (element) => element === this.tipForm.get('selectTip').value
      )
    ) {
      this.#cdr.detectChanges();
      this.inputCustom.nativeElement.value = '';
    }
  }

  public validNumberPeople(formControl: AbstractControl) {
    return (
      formControl?.errors?.['notZero'] &&
      formControl?.touched &&
      formControl?.dirty
    );
  }

  public setSelectTip(value: string) {
    this.tipForm.patchValue({
      selectTip: value,
    });
  }

  public checkPecentageSelected(value: string) {
    return this.tipForm.value.selectTip === value;
  }

  public statusFocusInput(event: any) {
    const id = event.target?.id;

    this.isFocusInput.update((oldValue) => {
      switch (id) {
        case 'bill':
          oldValue.bill = !this.isFocusInput().bill;
          break;
        case 'custom':
          oldValue.custom = !this.isFocusInput().custom;

          break;
        case 'numberpeople':
          oldValue.nbPeople = !this.isFocusInput().nbPeople;
          break;
      }

      return oldValue
    })
  }
}

