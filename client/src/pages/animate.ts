export const calcValues = (currentSceneHeight:number, values:any, currentYOffset:number) => {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = currentSceneHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;

        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
            rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollStart) {
            rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
            rv = values[1];
        }
    } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
}
