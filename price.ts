export function priceForHours(v:{price4h:number|null;price12h:number;price24h:number|null},hours:number){if(hours<=4&&v.price4h)return v.price4h;if(hours<=12)return v.price12h;return v.price24h??v.price12h}
export const rupiah=(n:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)
