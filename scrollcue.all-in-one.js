(function() {
  'use strict';
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `
  .scrollcue{visibility:visible;opacity:1;transition:transform 0.4s ease,opacity 0.4s ease;}.scrollcue.is-inactive{visibility:hidden;opacity:0;will-change:transform,opacity;}.scrollcue.cue-in{visibility:visible;animation-fill-mode:both;}.scrollcue.fade-in.is-inactive{opacity:0;}.scrollcue.fade-in.cue-in{animation-name:fadeIn;}@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}.scrollcue.slide-up.is-inactive{transform:translateY(40px);opacity:0;}.scrollcue.slide-up.cue-in{animation-name:slideUp;}@keyframes slideUp{from{transform:translateY(40px);opacity:0;}to{transform:translateY(0);opacity:1;}}.scrollcue.slide-down.is-inactive{transform:translateY(-40px);opacity:0;}.scrollcue.slide-down.cue-in{animation-name:slideDown;}@keyframes slideDown{from{transform:translateY(-40px);opacity:0;}to{transform:translateY(0);opacity:1;}}.scrollcue.slide-left.is-inactive{transform:translateX(40px);opacity:0;}.scrollcue.slide-left.cue-in{animation-name:slideLeft;}@keyframes slideLeft{from{transform:translateX(40px);opacity:0;}to{transform:translateX(0);opacity:1;}}.scrollcue.slide-right.is-inactive{transform:translateX(-40px);opacity:0;}.scrollcue.slide-right.cue-in{animation-name:slideRight;}@keyframes slideRight{from{transform:translateX(-40px);opacity:0;}to{transform:translateX(0);opacity:1;}}.scrollcue.zoom-in.is-inactive{transform:scale(0.9);opacity:0;}.scrollcue.zoom-in.cue-in{animation-name:zoomIn;}@keyframes zoomIn{from{transform:scale(0.9);opacity:0;}to{transform:scale(1);opacity:1;}}.scrollcue.zoom-out.is-inactive{transform:scale(1.1);opacity:0;}.scrollcue.zoom-out.cue-in{animation-name:zoomOut;}@keyframes zoomOut{from{transform:scale(1.1);opacity:0;}to{transform:scale(1);opacity:1;}}.scrollcue.rotate-in.is-inactive{transform:rotate(-15deg) scale(0.9);opacity:0;}.scrollcue.rotate-in.cue-in{animation-name:rotateIn;}@keyframes rotateIn{from{transform:rotate(-15deg) scale(0.9);opacity:0;}to{transform:rotate(0) scale(1);opacity:1;}}.scrollcue.flip-in.is-inactive{transform:perspective(400px) rotateY(90deg);opacity:0;}.scrollcue.flip-in.cue-in{animation-name:flipIn;}@keyframes flipIn{from{transform:perspective(400px) rotateY(90deg);opacity:0;}to{transform:perspective(400px) rotateY(0deg);opacity:1;}}
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
      
      // Setup initial state
      this.elements.forEach(element => {
        element.classList.add('is-inactive');
      });

      this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      });

      this.elements.forEach(element => {
        this.observer.observe(element);
      });

      this.initialized = true;
    }    onIntersection(entries) {
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
      element.style.animationTimingFunction = this.options.easing;
      
      setTimeout(() => {
        element.classList.remove('is-inactive');
        element.classList.add('cue-in', animationType);
      }, 10);
    }

    showAllElements() {
      const elements = document.querySelectorAll('.scrollcue');
      elements.forEach(element => {
        element.classList.remove('is-inactive');
        element.style.opacity = 1;
        element.style.transform = 'none';      });
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
      });
      
      this.initialized = false;
    }  }

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
