(function() {
  'use strict';
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `
  .scrollcue{visibility:visible;opacity:1;transition:transform 0.4s ease,opacity 0.4s ease;}.scrollcue.is-inactive{visibility:hidden;opacity:0;will-change:transform,opacity;}.scrollcue.cue-in{visibility:visible;animation-fill-mode:both;}.scrollcue.fade-in.is-inactive{opacity:0;}.scrollcue.fade-in.cue-in{animation-name:fadeIn;}@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}.scrollcue.slide-up.is-inactive{transform:translateY(40px);opacity:0;}.scrollcue.slide-up.cue-in{animation-name:slideUp;}@keyframes slideUp{from{transform:translateY(40px);opacity:0;}to{transform:translateY(0);opacity:1;}}.scrollcue.slide-down.is-inactive{transform:translateY(-40px);opacity:0;}.scrollcue.slide-down.cue-in{animation-name:slideDown;}@keyframes slideDown{from{transform:translateY(-40px);opacity:0;}to{transform:translateY(0);opacity:1;}}.scrollcue.slide-left.is-inactive{transform:translateX(40px);opacity:0;}.scrollcue.slide-left.cue-in{animation-name:slideLeft;}@keyframes slideLeft{from{transform:translateX(40px);opacity:0;}to{transform:translateX(0);opacity:1;}}.scrollcue.slide-right.is-inactive{transform:translateX(-40px);opacity:0;}.scrollcue.slide-right.cue-in{animation-name:slideRight;}@keyframes slideRight{from{transform:translateX(-40px);opacity:0;}to{transform:translateX(0);opacity:1;}}.scrollcue.zoom-in.is-inactive{transform:scale(0.9);opacity:0;}.scrollcue.zoom-in.cue-in{animation-name:zoomIn;}@keyframes zoomIn{from{transform:scale(0.9);opacity:0;}to{transform:scale(1);opacity:1;}}.scrollcue.zoom-out.is-inactive{transform:scale(1.1);opacity:0;}.scrollcue.zoom-out.cue-in{animation-name:zoomOut;}@keyframes zoomOut{from{transform:scale(1.1);opacity:0;}to{transform:scale(1);opacity:1;}}.scrollcue.rotate-in.is-inactive{transform:rotate(-15deg) scale(0.9);opacity:0;}.scrollcue.rotate-in.cue-in{animation-name:rotateIn;}@keyframes rotateIn{from{transform:rotate(-15deg) scale(0.9);opacity:0;}to{transform:rotate(0) scale(1);opacity:1;}}.scrollcue.flip-in.is-inactive{transform:perspective(400px) rotateY(90deg);opacity:0;}.scrollcue.flip-in.cue-in{animation-name:flipIn;}@keyframes flipIn{from{transform:perspective(400px) rotateY(90deg);opacity:0;}to{transform:perspective(400px) rotateY(0deg);opacity:1;}}.scrollcue.bounce-in.is-inactive{transform:scale(0.3);opacity:0;}.scrollcue.bounce-in.cue-in{animation-name:bounceIn;}@keyframes bounceIn{0%{transform:scale(0.3);opacity:0;}50%{transform:scale(1.1);opacity:0.8;}70%{transform:scale(0.9);opacity:0.9;}100%{transform:scale(1);opacity:1;}}.scrollcue.wave.is-inactive{transform:translateY(0);opacity:0;}.scrollcue.wave.cue-in{opacity:1;animation:wave-animation 4s ease-in-out infinite;}@keyframes wave-animation{0%{transform:translateY(0);}20%{transform:translateY(-8px) rotate(0.5deg);}40%{transform:translateY(0) rotate(-0.25deg);}60%{transform:translateY(5px) rotate(0.5deg);}80%{transform:translateY(-3px) rotate(-0.25deg);}100%{transform:translateY(0);}}.scrollcue.float.is-inactive{transform:translateY(0);}.scrollcue.float.cue-in{animation-name:float-animation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;}@keyframes float-animation{0%{transform:translateY(0px);}50%{transform:translateY(-20px);}100%{transform:translateY(0px);}}.scrollcue.rain.is-inactive{position:relative;overflow:hidden;}.scrollcue.rain.cue-in::before{content:"";position:absolute;top:-100%;left:0;width:100%;height:200%;background:linear-gradient(to bottom,transparent 0%,rgba(255,255,255,0.3) 40%,rgba(255,255,255,0.3) 50%,transparent 100%);background-size:10px 20px;animation:rain-animation 1s linear infinite;}@keyframes rain-animation{0%{transform:translateY(0);}100%{transform:translateY(20px);}}.scrollcue.typing.is-inactive{width:0;white-space:nowrap;overflow:hidden;border-right:2px solid;}.scrollcue.typing.cue-in{animation:typing-animation 3.5s steps(40,end) forwards,blink-caret 0.75s step-end infinite;}@keyframes typing-animation{0%{width:0}100%{width:100%}}@keyframes blink-caret{from,to{border-color:transparent}50%{border-color:currentColor}}.scrollcue.shake.is-inactive{transform:translateX(0);}.scrollcue.shake.cue-in{animation:shake-animation 0.82s cubic-bezier(.36,.07,.19,.97) forwards;}@keyframes shake-animation{10%,90%{transform:translateX(-1px);}20%,80%{transform:translateX(2px);}30%,50%,70%{transform:translateX(-4px);}40%,60%{transform:translateX(4px);}}.scrollcue.flicker.is-inactive{opacity:0;transform:scale(1);filter:brightness(1);}.scrollcue.flicker.cue-in{animation:flicker-animation 3s infinite alternate;transform-origin:center center;}@keyframes flicker-animation{0%,100%{opacity:1;filter:brightness(1) contrast(1);transform:scale(1) rotate(0deg);}10%{opacity:0.8;filter:brightness(1.2) contrast(1.2);transform:scale(1.05) rotate(1deg);}15%{opacity:0.3;filter:brightness(0.9) contrast(0.8);transform:scale(0.97) rotate(-1deg);}20%{opacity:0.9;filter:brightness(1.3) contrast(1.4);transform:scale(1.08) rotate(2deg);}25%{opacity:0.6;filter:brightness(0.8) contrast(0.9);transform:scale(0.95) rotate(-2deg);}30%{opacity:1;filter:brightness(1.1) contrast(1.1);transform:scale(1.03) rotate(0deg);}50%{opacity:0.4;filter:brightness(0.7) contrast(0.7);transform:scale(0.98) rotate(-1deg);}55%{opacity:0.9;filter:brightness(1.4) contrast(1.3);transform:scale(1.06) rotate(1deg);}70%{opacity:1;filter:brightness(1.2) contrast(1.2);transform:scale(1.04) rotate(-0.5deg);}85%{opacity:0.7;filter:brightness(0.9) contrast(0.8);transform:scale(0.96) rotate(0.5deg);}}.scrollcue.boat-rock.is-inactive{transform-origin:center bottom;opacity:0;}.scrollcue.boat-rock.cue-in{opacity:1;animation:boat-rock-animation 6s cubic-bezier(0.445,0.05,0.55,0.95) infinite;}@keyframes boat-rock-animation{0%{transform:rotate(0);}15%{transform:rotate(3deg) translateY(-2px);}30%{transform:rotate(-1deg) translateY(1px);}45%{transform:rotate(2deg) translateY(-1px);}60%{transform:rotate(-2deg) translateY(2px);}75%{transform:rotate(1deg) translateY(-1px);}90%{transform:rotate(-0.5deg) translateY(1px);}100%{transform:rotate(0) translateY(0);}}.scrollcue.ripple.is-inactive{position:relative;overflow:hidden;}.scrollcue.ripple.cue-in::after{content:'';position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;background:rgba(255,255,255,0.4);transform:translate(-50%,-50%);animation:ripple-animation 2s ease-out infinite;}@keyframes ripple-animation{0%{width:0;height:0;opacity:1;}100%{width:200%;height:200%;opacity:0;}}.scrollcue.wind.is-inactive{overflow:hidden;position:relative;}.scrollcue.wind.cue-in::before{content:"";position:absolute;top:0;left:-100%;width:200%;height:100%;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.2) 50%,transparent 100%);animation:wind-animation 3s ease-in-out infinite;}@keyframes wind-animation{0%{transform:translateX(0);}100%{transform:translateX(100%);}}.scrollcue.storm.is-inactive{transform:scale(0.95);opacity:0;}.scrollcue.storm.cue-in{animation:storm-shake 0.5s ease-in-out infinite alternate;opacity:1;}@keyframes storm-shake{0%{transform:translateX(-3px) rotate(-1deg) scale(1);}100%{transform:translateX(3px) rotate(1deg) scale(0.98);}}.scrollcue.breaking-wave.is-inactive{transform:translateY(20px) scale(0.95);opacity:0;}.scrollcue.breaking-wave.cue-in{animation:wave-motion 3s ease-in-out infinite;opacity:1;}@keyframes wave-motion{0%{transform:translateY(0) rotate(0);}25%{transform:translateY(-10px) rotate(2deg);}50%{transform:translateY(0) rotate(0);}75%{transform:translateY(-5px) rotate(-1deg);}100%{transform:translateY(0) rotate(0);}}.scrollcue.sequential.is-inactive > *{opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease;}.scrollcue.sequential.cue-in > *{opacity:1;transform:translateY(0);}.scrollcue.sequential.cue-in > *:nth-child(1){transition-delay:0.1s;}.scrollcue.sequential.cue-in > *:nth-child(2){transition-delay:0.2s;}.scrollcue.sequential.cue-in > *:nth-child(3){transition-delay:0.3s;}.scrollcue.sequential.cue-in > *:nth-child(4){transition-delay:0.4s;}.scrollcue.sequential.cue-in > *:nth-child(5){transition-delay:0.5s;}.scrollcue.sequential.cue-in > *:nth-child(6){transition-delay:0.6s;}.scrollcue.sequential.cue-in > *:nth-child(7){transition-delay:0.7s;}.scrollcue.sequential.cue-in > *:nth-child(8){transition-delay:0.8s;}.scrollcue.sequential.cue-in > *:nth-child(9){transition-delay:0.9s;}.scrollcue.sequential.cue-in > *:nth-child(10){transition-delay:1.0s;}
  `;  document.head.appendChild(styleElement);

  const defaults = {
    rootMargin: '0px',
    threshold: 0.2,
    duration: 800,
    delay: 0,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    once: true,
  };

  class ScrollCue {
    constructor(options = {}) {
      this.options = Object.assign({}, defaults, options);
      this.elements = [];
      this.observer = null;
      this.initialized = false;
      this.isParallaxEnabled = false;
    }

    init() {
      if (this.initialized) return;
      
      // If IntersectionObserver is supported or not
      if (!('IntersectionObserver' in window)) {
        console.warn('ScrollCue.js: IntersectionObserver is not supported in this browser.');
        this.showAllElements();
        return;
      }

      this.elements = Array.from(document.querySelectorAll('.scrollcue'));
      
      // Process custom attributes
      this.elements.forEach(el => {
        // Custom duration
        const duration = parseInt(el.dataset.duration || this.options.duration, 10);
        el.style.animationDuration = `${duration}ms`;
        
        // Custom delay
        const delay = parseInt(el.dataset.delay || this.options.delay, 10);
        el.style.animationDelay = `${delay}ms`;
        
        // Custom easing
        el.style.animationTimingFunction = el.dataset.easing || this.options.easing;
        
        // Custom color
        if (el.dataset.color) {
          el.style.color = el.dataset.color;
        }
        
        // Custom intensity
        const intensity = parseFloat(el.dataset.intensity);
        if (!isNaN(intensity)) {
          const type = el.dataset.cue;
          switch (type) {
            case 'fade-up':
            case 'fade-down':
              el.style.transform = `translateY(${type === 'fade-up' ? intensity : -intensity}px)`;
              break;
            case 'fade-left':
            case 'fade-right':
              el.style.transform = `translateX(${type === 'fade-left' ? intensity : -intensity}px)`;
              break;
            case 'zoom-in':
              el.style.transform = `scale(${1 - intensity/100})`;
              break;
            case 'zoom-out':
              el.style.transform = `scale(${1 + intensity/100})`;
              break;
            case 'rotate':
              el.style.transform = `rotate(${-intensity}deg)`;
              break;
            case 'blur':
              el.style.filter = `blur(${intensity}px)`;
              break;
          }
        }

        el.classList.add('is-inactive');
      });

      this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      });

      this.elements.forEach(element => {
        this.observer.observe(element);
      });

      // Setup parallax if needed
      this.setupParallax();

      this.initialized = true;
    }

    onIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          
          if (this.options.once) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.options.once) {
          entry.target.classList.remove('cue-in');
          entry.target.classList.add('is-inactive');
        }
      });
    }

    animateElement(element) {
      const animationType = element.dataset.cue || 'fade-in';
      const delay = parseInt(element.dataset.delay || this.options.delay, 10);
      const duration = parseInt(element.dataset.duration || this.options.duration, 10);
      
      element.style.animationDuration = `${duration}ms`;
      element.style.animationDelay = `${delay}ms`;
      element.style.animationTimingFunction = element.dataset.easing || this.options.easing;
      
      setTimeout(() => {
        element.classList.remove('is-inactive');
        element.classList.add('cue-in', animationType);

        // Trigger callback if defined
        const callback = element.dataset.callback;
        if (callback && typeof window[callback] === 'function') {
          window[callback](element);
        }

        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('scrollcue:visible', {
          bubbles: true,
          detail: { element }
        }));
      }, 10);
    }

    showAllElements() {
      const elements = document.querySelectorAll('.scrollcue');
      elements.forEach(element => {
        element.classList.remove('is-inactive');
        element.style.opacity = 1;
        element.style.transform = 'none';
      });
    }

    refresh() {
      if (!this.observer) return;
      
      this.observer.disconnect();
      
      this.elements = Array.from(document.querySelectorAll('.scrollcue'));
      
      this.elements.forEach(element => {
        if (!element.classList.contains('cue-in')) {
          element.classList.add('is-inactive');
          this.observer.observe(element);
        }
      });

      // Refresh parallax if enabled
      if (this.isParallaxEnabled) {
        this.setupParallax();
      }
    }

    destroy() {
      if (!this.observer) return;
      
      this.observer.disconnect();
      this.observer = null;
      
      this.elements.forEach(element => {
        element.classList.remove('cue-in', 'is-inactive');
        element.style.animationDuration = '';
        element.style.animationDelay = '';
        element.style.animationTimingFunction = '';
        element.style.transform = '';
      });

      // Remove parallax event listeners
      if (this.isParallaxEnabled) {
        window.removeEventListener('scroll', this.handleParallax);
        window.removeEventListener('resize', this.handleParallax);
        this.isParallaxEnabled = false;
      }
      
      this.initialized = false;
    }

    setupParallax() {
      const parallaxElements = this.elements.filter(el => el.dataset.parallax !== undefined);
      
      if (parallaxElements.length === 0) return;
      
      this.isParallaxEnabled = true;
      this.handleParallax = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(el => {
          if (!el.classList.contains('cue-in')) return;
          
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + scrollTop;
          const elementHeight = rect.height;
          
          // Calculate the percentage of the element in view
          const viewportBottom = scrollTop + windowHeight;
          const percentage = (viewportBottom - offsetTop) / (windowHeight + elementHeight);
          
          if (percentage >= 0 && percentage <= 1) {
            const speed = parseFloat(el.dataset.parallaxSpeed || 0.5);
            const offset = (percentage - 0.5) * speed * 100;
            el.style.transform = `translateY(${offset}px)`;
          }
        });
      };
      
      window.addEventListener('scroll', this.handleParallax, { passive: true });
      window.addEventListener('resize', this.handleParallax, { passive: true });
      this.handleParallax(); // Initial check
    }

    addAnimation(name, css) {
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        .scrollcue.${name}.is-inactive {
          ${css.initial || ''}
        }
        .scrollcue.${name}.cue-in {
          ${css.visible || ''}
          animation-name: ${name}-animation;
        }
        ${css.keyframes ? `
          @keyframes ${name}-animation {
            ${css.keyframes}
          }
        ` : ''}
      `;
      document.head.appendChild(styleEl);
      this.refresh();
    }
  }

  const scrollCue = new ScrollCue();

  const init = () => {
    scrollCue.init();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', () => {
    scrollCue.refresh();
  });

  window.ScrollCue = ScrollCue;
  window.scrollCue = scrollCue;
})();
