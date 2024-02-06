const slider = () => {
  const buttons = document.querySelectorAll(".slide-button");
  const list = document.querySelector(".video-list");
  const scrollbar = document.querySelector(".slider-scrollbar");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const maxScrollLeft = list.scrollWidth - list.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const delteX = e.clientX - startX;
      const newThumbPosition = thumbPosition + delteX;
      const maxThumbPosition =
        scrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

      const bounderPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (bounderPosition / maxThumbPosition) * maxScrollLeft;
      list.scrollLeft = scrollPosition;
      scrollbarThumb.style.left = `${bounderPosition}px`;
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseMove);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev" ? -1 : 1;
      const scrollAmount = list.clientWidth * direction;
      list.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleButtons = () => {
    buttons[0].style.display = list.scrollLeft <= 0 ? "none" : "block";
    buttons[1].style.display =
      list.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  const updataScroll = () => {
    const scrollPosition = list.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (scrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  list.addEventListener("scroll", () => {
    handleButtons();
    updataScroll();
  });
};

window.addEventListener("load", slider);
