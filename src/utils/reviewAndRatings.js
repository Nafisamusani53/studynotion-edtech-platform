export const avgRatings = (reviewAndRatings) => {
    if (reviewAndRatings?.length > 0) {

        const sum = reviewAndRatings?.reduce((acc, doc) => acc + doc?.rating)
        return sum / reviewAndRatings?.length;
    }
    else {
        return 0;
    }
}