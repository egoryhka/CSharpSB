const millisecondsInDay = 1000 * 60 * 60 * 24;

export function formatDayName(date1: Date, date2: Date) {
    // @ts-ignore
    const daysBefore = Math.trunc((date1 - date2) / millisecondsInDay);
    const lastSymbol = daysBefore.toString().slice(-1);
    if (lastSymbol === "1") {
        return `${daysBefore} день`
    } else if (lastSymbol === "2" || lastSymbol === "3" || lastSymbol === "4") {
        return `${daysBefore} дня`
    } else {
        return `${daysBefore} дней`
    }
}
