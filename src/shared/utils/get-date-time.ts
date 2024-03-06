export const getDateTime = (
    time: string,
    options?: Intl.DateTimeFormatOptions,
): string => {
    if (!time) return '–';

    const date = new Date(time);
    const formatDate = Intl.DateTimeFormat('ru-RU', options).format(date);

    return formatDate;
};
