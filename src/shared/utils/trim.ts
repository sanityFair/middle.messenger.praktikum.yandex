export const trim = (str: string, chars = '\\s') => {
    const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
    return str.replace(regex, '');
};
