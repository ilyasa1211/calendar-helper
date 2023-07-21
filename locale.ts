export enum en {
  "January" = 0,
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}
export class Locale {
  public static readonly en = en;
  constructor(private _lang: "en" = "en") {}

  public getMonthId(month: string): number {
    return Locale[this._lang][month];
  }
}
