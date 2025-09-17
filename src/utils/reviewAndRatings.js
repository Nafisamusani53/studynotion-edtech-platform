export const avgRatings = (reviewAndRatings) => {
    if (reviewAndRatings?.length > 0) {

        const sum = reviewAndRatings?.reduce((acc, ele) => acc + (ele?.rating || 0), 0) || 0;
        return sum / reviewAndRatings?.length;
    }
    else {
        return 0;
    }
}