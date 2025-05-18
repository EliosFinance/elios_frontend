export default function humanizeNumbers(price: number): string {
    let displayPrice;
    if (price >= 1000) {
        displayPrice =
            (price / 1000).toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }) + 'k €';
    } else {
        displayPrice = price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return displayPrice;
}
