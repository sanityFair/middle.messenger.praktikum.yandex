export const lowerCaseFirstLetter = (inputString: string) => {
    return inputString[0].toLowerCase() + inputString.slice(1);
};

export const stringToPascalCase = (inputValue: string) => {
    return inputValue
        .split(/[\s]+/)
        .map((word) => {
            return capitilizeFirstLetter(word).split(/[-]+/).join('');
        })
        .join('');
};

export const capitilizeFirstLetter = (inputString: string) => {
    return inputString[0].toUpperCase() + inputString.slice(1);
};
