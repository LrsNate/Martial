export default () => {
    return (input, maxLength) => {
        let newlineIndex = input.indexOf('\n');
        if (newlineIndex < 0 || newlineIndex > maxLength) {
            return input.substring(0, maxLength);
        } else {
            return input.substring(0, newlineIndex);
        }
    };
};