import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//Components
import { FormComponent } from '../../components/form/form.component';
import { ResultViewComponent } from '../../components/result-view/result-view.component';

//Utils
import {
  calcTipAmount,
  calcTotal,
} from '../../../../shared/utils/calculation.utils';
import { formatCurrencyUSA } from '../../../../shared/utils/formart-currency.utils';
import { notZero } from '../../../../shared/validators/not-zero.validators';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormComponent, ResultViewComponent, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public tipForm: FormGroup = this._formBuilder.group({
    bill: ['', [Validators.required]],
    selectTip: ['', [Validators.required]],
    nbPeople: ['', [Validators.required, notZero]],
  });

  public result = signal<{ tip: string; amount: string }>({
    tip: '$0.00',
    amount: '$0.00',
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.tipForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        
        const { bill, selectTip, nbPeople } = this.tipForm.value;

        const valueResults = this.calcResults(
          bill,
          Number(selectTip),
          nbPeople
        );

        this.formatResult(valueResults);
      }
    });
  }

  public calcResults(bill: number, selectTip: number, nbPeople: number) {
    const tipAmount: number = calcTipAmount(bill, selectTip, nbPeople);
    const total: number = calcTotal(bill, tipAmount, nbPeople);

    return {
      tipAmount,
      total,
    };
  }

  public formatResult(valueResults: { tipAmount: number; total: number }) {
    let tip: any = Number(valueResults.tipAmount.toFixed(3).slice(0, -1)); //evitará o arredondamente que ocorre na função formatCurrencyUSA
    let total: string = formatCurrencyUSA(valueResults.total);

    tip = formatCurrencyUSA(tip);

    this.result.update((value) => {
      value.amount = total;
      value.tip = tip;
      return value;
    });
  }

  public resetForm(reset: boolean) {
    if (reset) {
      this.result.set({
        tip: '$0.00',
        amount: '$0.00',
      });

      this.tipForm.reset();
    }
  }
}
