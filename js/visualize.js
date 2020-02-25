let arr;
let speed = 50;
let sort = false;
let size = 125;

const lineContainer = document.querySelector('#code-lines > div.lines.card')

const height = lineContainer.clientHeight - 64;

changeArr(125);

document.querySelector('.range-slider__range.size').addEventListener('input', async (e) => {
    sort = false;
    changeArr(parseInt(e.target.value));
})

document.querySelector('.range-slider#speed input').addEventListener('input', (e) => {
    speed = e.target.value;
    if (document.querySelector('#algorithms li.algorithm.active').textContent !== 'bubble sort') {
        document.querySelectorAll('#code-lines > div.lines.card .line').forEach(el => {
            el.style.transitionDuration = `${
                -0.001818 * speed + 0.2018 - 0.01
            }s`
        })
    } else {
        document.querySelectorAll('#code-lines > div.lines.card .line').forEach(el => {
            el.style.transitionDuration = `0s`
        })
    }
})

document.getElementById('button-sort').addEventListener('click', (e) => {
    sort = true;
    if (document.querySelector('#algorithms li.algorithm.active').id === 'quick-sort') {
        quickSort(arr, 0, arr.length - 1);
    } else if (document.querySelector('#algorithms li.algorithm.active').id === 'bubble-sort') {
        document.querySelectorAll('#code-lines > div.lines.card .line').forEach(el => {
            el.style.transitionDuration = `0s`
        })

        bubbleSort(arr);
    }
})

function changeArr(length) {
    arr = Array(length).fill().map(() => Math.round(Math.random() * height) + 1);
    let arrDom = [...arr]
    arrDom = arrDom.map((elem) => {
        return `<div class="line" style="height:${elem}px; transition-duration:${
            -0.004545 * speed + 0.5045
        }s; backgroundColor: #ddd;"></div>`
    }).join('')
    lineContainer.innerHTML = arrDom;
}

async function quickSort(arr, startIndex, endIndex) {
    if (startIndex === endIndex && sort) {
        return;
    }
    const pivotIndex = medianOfThree(arr, startIndex, endIndex, speed);
    const response = await partition(arr, startIndex, endIndex, pivotIndex, speed);
    if (response) {
        await sleep(-0.08081 * speed + 10.08);
        quickSort(arr, response.startIndex1, response.endIndex1, speed);
        quickSort(arr, response.startIndex2, response.endIndex2, speed);
    } else {
        return;
    }
}

async function partition(arr, startIndex, endIndex, pivotIndex) {
    if (sort) {
        await swap(arr, pivotIndex, endIndex);
        document.querySelectorAll('#code-lines .lines div')[endIndex].style.backgroundColor = '#173f5f';
    }
    let searchRightIndex = true,
        searchLeftIndex = true;
    if (startIndex + 1 === endIndex) {
        document.querySelectorAll('#code-lines .lines div')[endIndex].style.backgroundColor = '#ddd';
        return
    }
    for (let i = startIndex; i <= endIndex && searchLeftIndex && sort; i++) {
        if (arr[i] > arr[endIndex]) {
            searchRightIndex = true;
            for (let j = endIndex - 1; j >= startIndex && searchRightIndex && sort; j--) {
                if (arr[j] <= arr[endIndex] && i < j) {
                    await swap(arr, i, j);
                    searchRightIndex = false;
                } else if (arr[j] <= arr[endIndex] && i > j) {
                    await swap(arr, i, endIndex);
                    document.querySelectorAll('#code-lines .lines div')[i].style.backgroundColor = '#ddd';
                    searchLeftIndex = false;
                    return ({
                        startIndex1: startIndex,
                        endIndex1: i,
                        startIndex2: i + 1,
                        endIndex2: endIndex
                    })
                }
            }
        } else if (i === endIndex) {
            document.querySelectorAll('#code-lines .lines div')[i].style.backgroundColor = '#ddd';
            return ({
                startIndex1: startIndex,
                endIndex1: endIndex - 1,
                startIndex2: 0,
                endIndex2: 0
            })
        }
    }
}

function medianOfThree(arr, startIndex, endIndex) {
    const midIndex = Math.round((startIndex + endIndex) / 2);
    arr[startIndex] > arr[midIndex] ? swap(arr, startIndex, midIndex) : null;
    arr[midIndex] > arr[endIndex] ? swap(arr, endIndex, midIndex) : null;
    arr[startIndex] > arr[endIndex] ? swap(arr, startIndex, endIndex) : null;
    arr[startIndex] > arr[midIndex] ? swap(arr, startIndex, midIndex) : null;
    return midIndex;
}

async function bubbleSort(arr) {
    let lengthArr = arr.length;
    for (let j = 0; j < arr.length && sort; j++) {
        for (let i = 0; i < lengthArr && sort; i++) {
            if (arr[i] >= arr[i + 1]) {
                await swapBubble(arr, i, i + 1);
            }
            if (i + 1 === lengthArr) {
                lengthArr--;
            }
        }
    }
}

async function swap(arr, index1, index2) {
    if (sort) {
        const indexFirst = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = indexFirst;
        const a = document.querySelectorAll('#code-lines .lines div')[index1];
        const b = document.querySelectorAll('#code-lines .lines div')[index2];
        if (a !== b) {
            a.style.backgroundColor = '#ed553b';
            b.style.backgroundColor = '#ed553b';
            const aHeight = a.style.height
            a.style.height = b.style.height
            b.style.height = aHeight;
            await sleep(-0.004545 * speed + 0.5045 + -0.9091 * speed + 100.9)
            a.style.backgroundColor = '#ddd';
            b.style.backgroundColor = '#ddd';
        }
        return
    }
}

async function swapBubble(arr, index1, index2) {
    if (sort) {
        const indexFirst = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = indexFirst;
        const a = document.querySelectorAll('#code-lines .lines div')[index1];
        const b = document.querySelectorAll('#code-lines .lines div')[index2];
        if (a !== b) {
            a.style.backgroundColor = '#ed553b';
            b.style.backgroundColor = '#ed553b';
            const aHeight = a.style.height
            a.style.height = b.style.height
            b.style.height = aHeight;
            await sleep((-0.001818 * speed + 0.2018) * 100)
            a.style.backgroundColor = '#ddd';
            b.style.backgroundColor = '#ddd';
        }
        return
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}