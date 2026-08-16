/* Code to You Tech — landing interactions (vanilla JS) */
(function () {
  "use strict";

  /* ano no rodapé */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* nav sticky + botão voltar ao topo */
  var nav = document.getElementById("nav");
  var scrollUp = document.getElementById("scrollUp");
  function onScroll() {
    var s = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("sticky", s > 20);
    if (scrollUp) scrollUp.classList.toggle("show", s > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (scrollUp) scrollUp.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* menu mobile */
  var menuBtn = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = menu.classList.toggle("active");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("active");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* reveal ao rolar */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* efeito de digitação no terminal do hero */
  var typing = document.getElementById("typing");
  if (typing && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var phrases = [
      "automatizar seu atendimento",
      "criar seu sistema sob medida",
      "integrar suas ferramentas",
      "colocar IA pra trabalhar por você",
      "otimizar seu e-commerce"
    ];
    var pi = 0, ci = 0, deleting = false;
    function tick() {
      var word = phrases[pi];
      typing.textContent = word.substring(0, ci);
      if (!deleting) {
        if (ci < word.length) { ci++; setTimeout(tick, 60); }
        else { deleting = true; setTimeout(tick, 1600); }
      } else {
        if (ci > 0) { ci--; setTimeout(tick, 30); }
        else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 300); }
      }
    }
    setTimeout(tick, 3000);
  }

  /* formulário WhatsApp */
  var submit = document.getElementById("submit");
  if (submit) {
    submit.addEventListener("click", function (e) {
      e.preventDefault();
      var telefone = "5571984056623";
      var cliente = (document.getElementById("cliente") || {}).value || "";
      var mensagem = (document.getElementById("mensagem") || {}).value || "";
      var resp = document.getElementById("respuesta");

      if (resp) { resp.classList.remove("fail", "send"); }
      if (!mensagem.trim()) {
        if (resp) { resp.classList.add("fail"); resp.textContent = "Escreva sua mensagem antes de enviar."; }
        return;
      }
      var texto =
        "Olá, Code to You!%0A" +
        "*Nome:* " + encodeURIComponent(cliente || "(não informado)") + "%0A" +
        "*Mensagem:* " + encodeURIComponent(mensagem);
      var url = "https://wa.me/" + telefone + "?text=" + texto;

      if (resp) { resp.classList.add("send"); resp.textContent = "Abrindo o WhatsApp... te respondo em breve!"; }
      window.open(url, "_blank");
    });
  }
})();
