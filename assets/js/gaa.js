const menuToggle = document.getElementById("menu-toggle");
const megaMenuIcons = document.getElementById("mega-menu-icons");

menuToggle.addEventListener("mouseenter", () => {
      megaMenuIcons.style.display = "block";
});

menuToggle.addEventListener("mouseleave", () => {
      megaMenuIcons.style.display = "none";
});

megaMenuIcons.addEventListener("mouseenter", () => {
      megaMenuIcons.style.display = "block";
});

megaMenuIcons.addEventListener("mouseleave", () => {
      megaMenuIcons.style.display = "none";
});
