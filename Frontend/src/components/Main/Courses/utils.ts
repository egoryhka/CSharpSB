export const month = 1000 * 60 * 60 * 24 * 30;
export const day = 1000 * 60 * 60 * 24;
export const dateAfterMonthConst = new Date(Date.now() + month);
export const backgroundColors = ['rgba(255, 0, 0, .5)', 'rgba(0, 255, 0, .5)', 'rgba(255, 255, 0, .5)', 'rgba(255,123,0,0.5)', 'rgba(0,255,255,0.5)', 'rgba(0,0,255,0.5)', 'rgba(255,0,255,0.5)', 'rgba(119,207,67,0.5105392498796393)', 'rgba(176,81,186,0.5105392498796393)', 'rgba(190,56,119,0.5105392498796393)'];
export const getBGColors = (count: number) => {
    const colors = [...backgroundColors.sort(() => 0.5 - Math.random())];
    colors.length = count;
    return colors;
}
