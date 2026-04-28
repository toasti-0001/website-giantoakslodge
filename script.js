const roomCards = [...document.querySelectorAll("[data-room-type]")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const versionButtons = [...document.querySelectorAll("[data-version]")];

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  versionButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.version === theme);
  });
};

versionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.version);
  });
});

setTheme("rustic");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));

    roomCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.roomType === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => observer.observe(item));
