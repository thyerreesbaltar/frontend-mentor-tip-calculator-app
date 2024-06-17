
export const calcTipAmount = ((bill: number, percentage: number, people: number) => {
  return (( bill * percentage ) / 100) / people;
})

export const calcTotal = ((bill: number ,tipAmount: number, people: number) => {
  return ( bill / people ) + tipAmount;
})
