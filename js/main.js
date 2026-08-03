
// Footer year
const y=document.getElementById("y");
if(y) y.textContent = new Date().getFullYear();

// Mobile menu
const btn=document.querySelector(".menu");
const mobile=document.getElementById("mobileNav");
if(btn && mobile){
  btn.addEventListener("click", ()=>{
    const open = !mobile.hasAttribute("hidden");
    if(open){
      mobile.setAttribute("hidden","");
      btn.setAttribute("aria-expanded","false");
    }else{
      mobile.removeAttribute("hidden");
      btn.setAttribute("aria-expanded","true");
    }
  });

  // Close menu when clicking a link
  mobile.addEventListener("click", (e)=>{
    const a = e.target.closest("a");
    if(!a) return;
    mobile.setAttribute("hidden","");
    btn.setAttribute("aria-expanded","false");
  });
}


// Mobile Services dropdown (touch devices only)
(() => {
  const dd = document.querySelector(".nav-dropdown");
  if (!dd) return;

  const btn = dd.querySelector(".nav-dropbtn");
  const menu = dd.querySelector(".nav-dropmenu");
  if (!btn || !menu) return;

  // only enable click-open on touch devices (mobile)
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!isTouch) return; // desktop stays hover-based

  const close = () => {
    dd.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const open = dd.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // clicks inside menu shouldn't close immediately
  menu.addEventListener("click", (e) => e.stopPropagation());

  // close when tapping outside
  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) close();
  });

  // close on ESC (nice-to-have)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

<script>
(() => {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const thanks = document.getElementById("quoteThanks");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.style.display = "none";
        if (thanks) thanks.style.display = "block";
      } else {
        alert("Something went wrong. Please try again or call us.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  });
})();
</script>

