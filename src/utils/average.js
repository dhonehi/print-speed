export default (arr) => {
    if (!arr || !arr?.length) {
        return 0
    }

    return arr.reduce((a, b) => (a + b)) / arr.length
}