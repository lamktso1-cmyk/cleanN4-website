/* CLEANNOVA motion: reveal khi cuộn, before/after, thông báo giỏ hàng */
(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) { els.forEach(function(e){e.classList.add('revealed')}); }
  else {
    var io = new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('revealed');io.unobserve(x.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }
  // SMIL (robot né vật cản) tôn trọng reduced motion
  document.querySelectorAll('.sense svg').forEach(function(s){ if(reduce && s.pauseAnimations) s.pauseAnimations(); });
  // Before/after
  document.querySelectorAll('.ba').forEach(function(b){
    var r=b.querySelector('input');
    var set=function(){b.style.setProperty('--pos',r.value+'%')};
    r.addEventListener('input',set); set();
    if(!reduce){ // gợi ý quét một lần khi cuộn tới
      var done=false;
      new IntersectionObserver(function(es,o){ if(es[0].isIntersecting&&!done){done=true;o.disconnect();
        var v=100,t0=performance.now();
        (function f(n){var p=Math.min((n-t0)/1400,1);r.value=Math.round(100-50*(1-Math.pow(1-p,3))*1);set();if(p<1)requestAnimationFrame(f)})(t0);
      }},{threshold:.5}).observe(b);
    }
  });
  // Phản hồi thêm vào giỏ: rung icon giỏ
  var orig = window.addToCart;
  if (typeof orig === 'function') window.addToCart = function(){
    var ok = orig.apply(this, arguments);
    if (ok !== false) document.querySelectorAll('.cart-badge,#cart-badge,[data-cart-badge]').forEach(function(e){e.classList.remove('cart-bump');void e.offsetWidth;e.classList.add('cart-bump')});
    return ok;
  };
})();
