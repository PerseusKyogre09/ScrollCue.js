(function() {
  'use strict';

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
