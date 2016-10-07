export default () => {
    let sizes = ['B', 'kB', 'MB', 'GB', 'TB'];

    let floatRound = (number, places) => {
        //noinspection JSCheckFunctionSignatures,ES6ModulesDependencies
        return +(Math.round(number + "e+" + places)  + "e-" + places);
    };

    return (input, decimals) => {
        for (let i = 0; i < sizes.length; i++) {
            if (input < 1024) {
                return floatRound(input, decimals) + sizes[i];
            } else if (i < sizes.length - 1) {
                input /= 1024;
            }
        }
        return input + 'TB';
    };
};