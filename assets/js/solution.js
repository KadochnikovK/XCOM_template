document.addEventListener("DOMContentLoaded", function () {
    const solutionQuestions = document.querySelectorAll(".solution-item__question");

    solutionQuestions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.closest(".solution-item").querySelector(".solution-item__answer");
            const isActive = this.classList.contains("active");


            solutionQuestions.forEach((q) => {
                q.classList.remove("active");
                const otherAnswer = q.closest(".solution-item").querySelector(".solution-item__answer");
                if (otherAnswer) otherAnswer.classList.remove("active");
            });

       
            if (!isActive) {
                this.classList.add("active");
                answer.classList.add("active");
            }
        });
    });
});