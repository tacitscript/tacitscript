
export default (min, max) => {
    const difference = max - min + 1;
    const offset = Math.floor(Math.random() * difference);

    return min + offset;
};