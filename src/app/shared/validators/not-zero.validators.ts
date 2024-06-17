import { AbstractControl } from "@angular/forms";

export function notZero(control: AbstractControl){
  const value: number = Number(control.value)
  
  if(value !== 0){
    return null;
  }

  return {
    notZero: true
  }
}
