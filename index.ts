import { Locale } from "./locale";

export class Calendar {
  public constructor(private _year: number, private _lang: string = "en") {}

  private static readonly _monthInAYear: number = 12;
  private static readonly _countDayInAMonth = {
    exceptFebruary: {
      min: 30,
      max: 31,
    },
    februaryOnLeapYear: {
      min: 28,
      max: 29,
    },
  };
  private static readonly _listDayCount: Array<number> = new Array(
    this._monthInAYear,
  )
    .fill(this._countDayInAMonth.exceptFebruary.max).map(
      (dayCount: number, index: number) => {
        const isOddMonth = index % 2 === 1;
        if (isOddMonth) return dayCount;
        return index === Locale.en.February
          ? this.prototype.isLeapYear()
            ? this._countDayInAMonth.februaryOnLeapYear.max
            : this._countDayInAMonth.februaryOnLeapYear.min
          : this._countDayInAMonth.exceptFebruary.min;
      },
    );

  /**
   * check wether given year is a leap year
   */
  public isLeapYear(): boolean {
    return this._year % 4 === 0;
  }
  public getCalendar(
    months: Array<string> | string = Object.keys(
      Locale.en,
    ) as Array<keyof typeof Locale.en>,
  ) {
    const result = {};
    // january : [
    //   {
    //     tanggal: 10,
    //     dayName: 'monday'
    //   }
    // ]
    if (!Array.isArray(months)) {
      return;
    }

    Array.from(new Set(months)).forEach((month, index: number) => {
      const dateTime = new Date(
        this._year,
        new Locale("en").getMonthId(month),
      );
      const [weekday, dayName] = new Intl.DateTimeFormat(this._lang, {
        weekday: "long",
        day: "numeric",
      })
        .formatToParts(dateTime).filter((
          key: Intl.DateTimeFormatPart,
        ) => key.type !== "literal").map((key) => key.value);

      Object.defineProperty(result, months[index], {
        value: [{ dayName, weekday }],
      });
    });

    return result;
  }
}
