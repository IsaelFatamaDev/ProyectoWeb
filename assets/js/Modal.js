document.addEventListener("DOMContentLoaded", function () {
      const cookieBox = document.querySelector(".wrapper");
      const acceptBtn = document.querySelector("#cerrar");

      acceptBtn.onclick = () => {
            cookieBox.classList.add("hide");
      }

      const openModal = document.querySelector('.hero__cta');
      const modal = document.querySelector('.modal');
      const closeModal = document.querySelector('.modal__close');

      openModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('modal--show');
      });

      closeModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('modal--show');
      });
});
