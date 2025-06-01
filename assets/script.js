const swiper = new Swiper(".swiper", {
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("main-form");
  const formItems = form.querySelectorAll(".form__item");

  function clearErrors() {
    formItems.forEach((item) => {
      item.classList.remove("form__item--not-valid");
      const errorElement = item.querySelector(".error-message");
      if (errorElement) {
        errorElement.remove();
      }
    });
  }

  function addError(element, message) {
    const formItem = element.closest(".form__item");
    formItem.classList.add("form__item--not-valid");

    if (!formItem.querySelector(".error-message")) {
      const errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.textContent = message;
      formItem.appendChild(errorElement);
    }
  }

  function validateField(field) {
    const value = field.value.trim();
    const name = field.name;

    if (!value) {
      addError(field, "Это поле обязательно для заполнения");
      return false;
    }

    switch (name) {
      case "taxId":
        if (!/^\d{10,12}$/.test(value)) {
          addError(field, "ИНН должен содержать 10 или 12 цифр");
          return false;
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          addError(field, "Введите корректный email");
          return false;
        }
        break;
      case "phone":
        if (!/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(value)) {
          addError(field, "Введите корректный номер телефона");
          return false;
        }
        break;
      case "revenue":
        if (isNaN(value) || Number(value) < 0) {
          addError(field, "Введите положительное число");
          return false;
        }
        break;
    }

    return true;
  }

  function showModal(title, text, buttonText) {
    
    const modal = document.querySelector('.modal');
    const modalWindow = modal.querySelector('.modal__window');
    const modalHeadline = modal.querySelector('.modal__headline');
    const modalText = modal.querySelector('.modal__text');
    const modalButton = modal.querySelector('.modal__button');
    const modalClose = modal.querySelector('.modal__close');
  
   
    modalHeadline.textContent = title;
    modalText.textContent = text;
    modalButton.textContent = buttonText;
  
  
    modal.style.display = 'flex';
    
    modalWindow.classList.add('animate__fadeInUp');
    modal.classList.add('animate__fadeIn');
 
    function closeModal() {
  
      modalWindow.classList.remove('animate__fadeInUp');
      modalWindow.classList.add('animate__fadeOutDown');
      modal.classList.remove('animate__fadeIn');
      modal.classList.add('animate__fadeOut');
    
      setTimeout(() => {
        modal.style.display = 'none';
        modalWindow.classList.remove('animate__fadeOutDown');
        modal.classList.remove('animate__fadeOut');
        

        modalHeadline.textContent = '';
        modalText.textContent = '';
        modalButton.textContent = '';
      }, 500); 
    }
  

    modalButton.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;
    const fields = form.querySelectorAll("input, textarea");

    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      const formData = {
        company: form.elements.company.value.trim(),
        taxId: form.elements.taxId.value.trim(),
        description: form.elements.description.value.trim(),
        revenue: form.elements.revenue.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim(),
        fullName: form.elements.fullName.value.trim(),
      };

      console.log("Данные формы:", formData);

      showModal("Данные успешно отправлены", "Мы свяжемся с вами в течение 10 минут", "Хорошо");
    }
  });

  form.addEventListener("input", function (e) {
    if (e.target.tagName === "INPUT") {
      const formItem = e.target.closest(".form__item");
      formItem.classList.remove("form__item--not-valid");
      const errorElement = formItem.querySelector(".error-message");
      if (errorElement) {
        errorElement.remove();
      }
    }
  });

  const hamburger = document.querySelector(".header__hamburger");
  const menu = document.querySelector(".header__menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  const menuLinks = document.querySelectorAll(".header__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  const header = document.querySelector('header');
  const main = document.querySelector('main');
  
  if (header && main) {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        main.style.marginTop = `${entry.target.offsetHeight}px`;
      }
    });
  
    resizeObserver.observe(header);
  }

  const currentYear = new Date().getFullYear();
    
   
    const copyrightText = `© 2018–${currentYear} X-Com. Все права защищены.`;
    
    const copyElement = document.getElementById('copy');
    if (copyElement) {
        copyElement.textContent = copyrightText;
    } else {
        console.warn('Элемент с id "copy" не найден на странице');
    }
});


document.addEventListener('DOMContentLoaded', function() {

  const colors = ['#f27028', '#1a7bbf', '#2ecc71', '#9b59b6', '#e74c3c'];
  document.querySelectorAll('.review__avatar').forEach(avatar => {
    if (!avatar.style.backgroundColor) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      avatar.style.backgroundColor = randomColor;
    }
  });


  document.querySelectorAll('.review__toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const review = this.closest('.review');
      const body = review.querySelector('.review__body');
      body.classList.toggle('expanded');
      this.classList.toggle('active');
    });
  });


  document.querySelectorAll('.review__action').forEach(button => {
    button.addEventListener('click', function() {
      const isLike = this.querySelector('.fa-thumbs-up');
      const isDislike = this.querySelector('.fa-thumbs-down');
      
      if (isLike) {
        this.classList.toggle('liked');
        // Здесь добавить запрос для сохранения лайка
      } else if (isDislike) {
        this.classList.toggle('disliked');
        // Здесь добавить запрос для сохранения дизлайка
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const questions = document.querySelectorAll('.faq-item__question');
  
  questions.forEach(question => {
    question.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      
      
      document.querySelectorAll('.faq-item__answer').forEach(ans => {
        if (ans !== answer) {
          ans.classList.remove('active');
          ans.previousElementSibling.classList.remove('active');
        }
      });
      

      this.classList.toggle('active');
      answer.classList.toggle('active');
    });
  });
});