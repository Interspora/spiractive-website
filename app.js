// SPIRACTIVE Trading Intelligence — storefront behaviour. No external requests are made by this file.
(function () {
  "use strict";

  // ---- CONFIGURE AT LAUNCH -------------------------------------------------
  // TODO(Floyd): paste your three Stripe Payment Links here. Buttons stay inert until you do.
  var PAYMENT_LINKS = {
    "reality-check": "",        // $199 — Strategy Reality Check
    "robustness-audit": "",     // $349 — Robustness Audit
    "full-quant-validation": "" // $599 — Full Quant Validation
  };
  // TODO(Floyd): intake inbox used by the email fallback until a form endpoint exists.
  var INTAKE_EMAIL = "hello@spiractive.example";
  // --------------------------------------------------------------------------

  // mobile nav
  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  // payment buttons: wire real Stripe links when configured; otherwise explain, don't fake it
  var note = document.getElementById("paymentNote");
  document.querySelectorAll(".btn-pay").forEach(function (btn) {
    var tier = btn.getAttribute("data-tier");
    var link = PAYMENT_LINKS[tier];
    if (link) {
      btn.href = link;
      btn.target = "_blank";
      btn.rel = "noopener";
    } else {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (note) {
          note.textContent = "Checkout activates at launch — the Stripe payment link for this tier has not been connected yet. " +
            "You can still submit the intake form below and we will invoice you.";
          note.style.color = "#b91c1c";
        }
        var intake = document.getElementById("intake");
        if (intake) intake.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  // intake form: POST to configured endpoint, else fall back to a pre-filled email draft
  var form = document.getElementById("intakeForm");
  if (!form) return;
  var formNote = document.getElementById("formNote");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var endpoint = form.getAttribute("data-form-endpoint") || "";

    var lines = [];
    data.forEach(function (value, key) {
      if (key === "objective") return;
      lines.push(key.replace(/_/g, " ") + ": " + value);
    });
    var objectives = data.getAll("objective").join(", ");
    lines.push("testing objectives: " + objectives);
    var body = lines.join("\n");

    if (endpoint) {
      fetch(endpoint, { method: "POST", body: data })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          form.reset();
          formNote.textContent = "Received. We reply within one business day with next steps and your payment confirmation.";
          formNote.className = "form-note ok";
        })
        .catch(function () {
          formNote.textContent = "Submission failed — please email this brief to " + INTAKE_EMAIL + " instead.";
          formNote.className = "form-note err";
        });
    } else {
      var subject = "Strategy intake — " + (data.get("strategy_name") || "unnamed");
      window.location.href = "mailto:" + INTAKE_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      formNote.textContent = "No intake endpoint is connected yet, so your email app opened with the brief pre-filled — just press send.";
      formNote.className = "form-note ok";
    }
  });
})();
