export const getExpForLevel = (level) => {
    return (level * (level - 1)) / 2 * 100;
};