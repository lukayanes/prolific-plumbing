// Year
var yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// Reveal on scroll
(function(){
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length){
    els.forEach(function(e){ e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function(e){ io.observe(e); });
})();

// Mobile menu
(function(){
  var burger = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  var close = document.getElementById('mobileClose');
  if (!burger || !menu) return;
  function open(){ menu.classList.add('open'); }
  function shut(){ menu.classList.remove('open'); }
  burger.addEventListener('click', open);
  if (close) close.addEventListener('click', shut);
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', shut); });
})();

// Quote form -> worker
(function(){
  var forms = document.querySelectorAll('.quote-form');
  forms.forEach(function(form){
    var card = form.closest('.form-card');
    var thanks = card ? card.querySelector('.quote-thanks') : null;
    var submitting = false;
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      if (submitting) return;
      submitting = true;
      try{
        var res = await fetch(form.action, { method: form.method, body: new FormData(form) });
        if (res.ok){
          form.style.display = 'none';
          if (thanks) thanks.style.display = 'block';
        } else { submitting = false; alert('Something went wrong. Please try again or call us.'); }
      } catch(err){ submitting = false; alert('Network error. Please try again.'); }
    });
  });
})();

// FAQ accordion
(function(){
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.closest('.faq-item');
      var a = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      a.style.maxHeight = open ? (a.scrollHeight + 'px') : '0';
    });
  });
})();

// Rising bubbles — livelier while scrolling
(function(){
  var b = document.getElementById('bubbles');
  if (!b) return;
  var t;
  window.addEventListener('scroll', function(){
    b.classList.add('active');
    clearTimeout(t);
    t = setTimeout(function(){ b.classList.remove('active'); }, 900);
  }, { passive: true });
})();
