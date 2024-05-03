export const getArrSlider = (start, end, number) => {
    const limitNum = start > end ? number : end;
    let output = [];
    for (let i = start; i <= limitNum; i++) {
        output.push(i);
    }
    if (start > end) {
        for (let i = 0; i <= end; i++) {
            output.push(i);
        }
    }
    return output;
};
// 0 1 2
// 1 2 3
// 2 3 4
// 3 4 5
// 4 5 0
// 5 0 1
// 0 1 2
//number = 5

