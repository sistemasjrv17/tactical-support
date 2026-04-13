(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-main");
  var year = document.getElementById("year");
  var contactForm = document.querySelector(".contact-form");
  var contactResponse = document.querySelector(".contact-form-response");
  var mobileBreakpoint = window.matchMedia("(max-width: 900px)");

  function setMenuState(isOpen) {
    document.body.classList.toggle("nav-open", isOpen);
    if (toggle) {
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  function closeMenu() {
    setMenuState(false);
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "main-nav");
    nav.setAttribute("id", "main-nav");

    toggle.addEventListener("click", function () {
      setMenuState(!document.body.classList.contains("nav-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    var onBreakpointChange = function (event) {
      if (!event.matches) {
        closeMenu();
      }
    };

    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener("change", onBreakpointChange);
    } else if (mobileBreakpoint.addListener) {
      mobileBreakpoint.addListener(onBreakpointChange);
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      var formData = new FormData(contactForm);
      var asunto = (formData.get("asunto") || "").toString().trim();
      var nombre = (formData.get("nombre") || "").toString().trim();
      var email = (formData.get("email") || "").toString().trim();
      var telefono = (formData.get("telefono") || "").toString().trim();
      var empresa = (formData.get("empresa") || "").toString().trim();
      var mensaje = (formData.get("mensaje") || "").toString().trim();

      var asuntoMap = {
        cotizacion: "Cotizacion de servicios",
        soporte: "Soporte y seguimiento",
        alianza: "Alianzas comerciales",
        otro: "Consulta general",
      };

      var asuntoLabel = asuntoMap[asunto] || "Consulta general";
      var subject = "Contacto Tactical Support - " + asuntoLabel;
      var bodyLines = [
        "Hola, me gustaria solicitar informacion.",
        "",
        "Asunto: " + asuntoLabel,
        "Nombre: " + (nombre || "No especificado"),
        "Correo: " + (email || "No especificado"),
        "Telefono: " + (telefono || "No especificado"),
        "Empresa: " + (empresa || "No especificada"),
        "",
        "Mensaje:",
        mensaje || "Sin mensaje",
      ];
      var body = bodyLines.join("\r\n");

      var mailtoUrl =
        "mailto:info@tacticalsupport.com.mx?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      if (contactResponse) {
        contactResponse.textContent = "Abriendo tu cliente de correo...";
        contactResponse.classList.remove("is-error");
        contactResponse.classList.add("is-success");
      }

      window.location.href = mailtoUrl;
      contactForm.reset();
    });
  }
})();
