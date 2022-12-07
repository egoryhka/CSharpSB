const month = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

export const getStringDate = (stringDate: string) => {
    const date = new Date(stringDate);
    return `${date.getDay() + 1} ${month[date.getMonth()]} ${date.getFullYear()}`
}
