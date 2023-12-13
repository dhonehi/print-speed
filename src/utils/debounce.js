export default function (f, timeout) {
    let timeoutId

    return (args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(f, timeout, args)
    }
}