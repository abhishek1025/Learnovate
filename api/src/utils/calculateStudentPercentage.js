export const calculatePercentage = (answers = [], totalMarks) => {
    let marksScored = 0;

    answers.forEach((answer) => {
        if (answer.selectedAns === answer.correctAns) {
            marksScored =+ 1;
        }
    })

    const percentScored = ((marksScored / totalMarks) * 100).toFixed(2)

    return percentScored;
}