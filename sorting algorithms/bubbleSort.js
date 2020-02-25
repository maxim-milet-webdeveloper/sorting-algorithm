let arr = Array(5555).fill().map(() => Math.round(Math.random() * 500));

let sortedArr = arr.sort();

bubbleSort(arr);


function bubbleSort(arr) {
    let lengthArr = arr.length;
    for (let j in arr) {
        for (let i = 0; i < lengthArr; i++) {
            if (arr[i] >= arr[i + 1]) {
                swap(arr, i, i + 1)
            }
            if (i + 1 === lengthArr) {
                lengthArr--;
            }
        }
    }
}

function swap(arr, index1, index2) {
    const indexFirst = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = indexFirst;
}

console.log(arr === sortedArr)