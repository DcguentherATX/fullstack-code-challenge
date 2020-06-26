export default function convertToDollars(num) {
    let dollars = '';

    if (num === 0) {
        return 'N/A'
    }
    while (num > 0) {
        dollars += '$';
        num --;
    }
    return dollars;
}
