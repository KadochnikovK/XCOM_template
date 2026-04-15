document.addEventListener("DOMContentLoaded", function () {
    const solutionQuestions = document.querySelectorAll(".solution-item:not(.solution-item--open) .solution-item__question");

    solutionQuestions.forEach((question) => {
        question.addEventListener("click", function () {
            console.log('click')
            const answer = this.closest(".solution-item:not(.solution-item--open)").querySelector(".solution-item__answer");
            const isActive = this.classList.contains("active");


            solutionQuestions.forEach((q) => {
                q.classList.remove("active");
                const otherAnswer = q.closest(".solution-item:not(.solution-item--open)").querySelector(".solution-item__answer");
                if (otherAnswer) otherAnswer.classList.remove("active");
            });

       
            if (!isActive) {
                this.classList.add("active");
                answer.classList.add("active");
            }
        });
    });
});