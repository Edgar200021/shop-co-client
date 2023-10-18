export function generateRandomNumber(min: number, max: number) {
  return Math.round(min + Math.random() * (max + 1 - min))
}

export function generateColor(r: number, g:number, b: number) {
  return `rgb(${r}, ${g}, ${b})`
}
