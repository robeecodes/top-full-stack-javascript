function fibs(n) {
    const acc = [0, 1];
    for (let i = acc.length; i < n; i++) {
        acc.push(acc[i - 1] + acc[i - 2]);
    }
    return acc.slice(0, n);
}

function fibsRec(n, acc = [0, 1]) {
    if (acc.length >= n) return acc.slice(0, n);
    acc.push(acc[acc.length - 1] + acc[acc.length - 2]);
    return fibsRec(n, acc);
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const halfwayThrough = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, halfwayThrough));
    const right = mergeSort(arr.slice(halfwayThrough));
    return merge(left, right);
}

function merge(left, right) {
    const merged = [];
    let i = 0,
        j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            j++;
        }
    }
    while (i < left.length) {
        merged.push(left[i]);
        i++;
    }
    while (j < right.length) {
        merged.push(right[j]);
        j++;
    }
    return merged;
}

function benchmark(fn, ...args) {
    const benchmarkEl = args[args.length - 1];
    try {
        const start = performance.now();
        const result = fn(...args.slice(0, -1));
        const end = performance.now();
        benchmarkEl.classList.remove("error");
        benchmarkEl.textContent = `Took ${(end - start).toFixed(3)} ms`;
        return result;
    } catch (error) {
        benchmarkEl.classList.add("error");
        if (/stack|recursion|memory/i.test(error.message)) {
            benchmarkEl.textContent = `Error: Possible stack overflow or memory issue.`;
        } else {
            benchmarkEl.textContent = `Error: ${error.message}`;
        }
        return null;
    }
}

// Fib iterative form submit
document.getElementById("fibIterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = parseInt(document.getElementById("fibIterInput").value, 10);
    const outputEl = document.getElementById("fibIterOutput");
    const timeEl = document.getElementById("fibIterTime");
    if (isNaN(n) || n < 1) {
        alert("Please enter a positive integer.");
        return;
    }
    const result = benchmark(fibs, n, timeEl);
    outputEl.textContent = result ? result.join(", ") : "";
});

// Fib recursive form submit
document.getElementById("fibRecForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = parseInt(document.getElementById("fibRecInput").value, 10);
    const outputEl = document.getElementById("fibRecOutput");
    const timeEl = document.getElementById("fibRecTime");
    if (isNaN(n) || n < 1) {
        alert("Please enter a positive integer.");
        return;
    }
    const result = benchmark(fibsRec, n, timeEl);
    outputEl.textContent = result ? result.join(", ") : "";
});

// Merge sort form submit
document.getElementById("mergeSortForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const inputStr = document.getElementById("mergeSortInput").value;
    const arr = inputStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map(Number);

    const outputEl = document.getElementById("mergeSortOutput");
    const timeEl = document.getElementById("mergeSortTime");

    if (arr.some(isNaN)) {
        alert("Please enter a list of valid numbers separated by commas.");
        return;
    }

    const result = benchmark(mergeSort, arr, timeEl);
    outputEl.textContent = result ? result.join(", ") : "";
});