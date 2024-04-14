export function sidebarResponsive() {
  document.querySelector(".menu").addEventListener("click", function () {
    var sidebar = document.querySelector(".sidebar");
    var btnNavigation = document.querySelectorAll(".btn-navigation");

    btnNavigation.forEach((btn) => btn.classList.toggle("btn-display"));

    sidebar.classList.toggle("sidebar-width");
  });
}
