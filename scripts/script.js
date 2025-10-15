document.getElementById("year").textContent = new Date().getFullYear();

/* mobile menu */
const menuBtn = document.getElementById("menuBtn");
const navPanel = document.getElementById("navPanel");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
  navPanel.classList.add("show");
  menuOverlay.style.display = "block";
  menuOverlay.setAttribute("aria-hidden", "false");
  menuBtn.innerHTML = '<i class="fa fa-times"></i>';
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  navPanel.classList.remove("show");
  menuOverlay.style.display = "none";
  menuOverlay.setAttribute("aria-hidden", "true");
  menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", () => {
  if (navPanel.classList.contains("show")) closeMenu();
  else openMenu();
});
// close
menuOverlay.addEventListener("click", closeMenu);
// close
navPanel.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", closeMenu);
});
//  close desktop links
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    if (window.innerWidth < 900) closeMenu();
  });
});

/* revel */
const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("inview");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* scroll anime */

(function makeStripInfinite() {
  const track = document.getElementById("scrollTrack");
  if (!track) return;
  const items = Array.from(track.children);
  let totalWidth = track.scrollWidth;
  items.forEach((i) => track.appendChild(i.cloneNode(true)));
})();

/* FAQ */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const ans = item.querySelector(".faq-a");

    const icon = item.querySelector(".faq-q i");
    if (ans.style.display === "block") {
      ans.style.display = "none";

      icon.classList.replace("fa-minus", "fa-plus");
    } else {
      ans.style.display = "block";
      icon.classList.replace("fa-plus", "fa-minus");
    }
  });
});

/* counters */
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const el = en.target;
        const to = parseInt(el.dataset.target || "0", 10);
        let val = 0;
        const dur = 1200;
        const step = Math.max(1, Math.floor(to / (dur / 16)));
        const t = setInterval(() => {
          val += step;
          if (val >= to) {
            el.textContent = to ;
            clearInterval(t);
          } else el.textContent = val ;
        }, 16);
        obs.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);
counters.forEach((c) => counterObserver.observe(c));

/*  form  */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector(".form-btn");
    btn.disabled = true;
    btn.textContent = "Sending...";
    setTimeout(() => {
      btn.textContent = "Sent ✓";
      this.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Send Enquiry";
      }, 1400);
    }, 900);
  });
}

/* click to top */
document
  .getElementById("toTop")
  .addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

/* internal links */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* close mobile nav */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});
// loader

let loader = document.getElementsByClassName("loder")[0];
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(loderFunc, 150);
  function loderFunc() {
    loader.style.display = "none";
  }
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzjpxtzw73vkb2xBsrXyirToPsiC18y3ML27Q6wxuhd5kvWPj4gTyHZvKKaAdZDGOBkPA/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(alert("Thanks for contacting us , we'll contact you soon !"))
      .catch(error => console.error('Error!', error.message))
  })
