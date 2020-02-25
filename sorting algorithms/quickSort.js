let arr = [1, 2, 6, 3]
const sortedArr = quickSort(arr, 0, arr.length - 1);

function quickSort(origArr) {
    if (origArr.length <= 1) {
        return origArr;
    }
    const left = [],
        right = [],
        newArray = [],
        pivot = origArr.pop();

    for (let i = 0; i < origArr.length; i++) {
        if (origArr[i] <= pivot) {
            left.push(origArr[i]);
        } else {
            right.push(origArr[i]);
        }
    }
    return newArray.concat(quickSort(left), pivot, quickSort(right));
}