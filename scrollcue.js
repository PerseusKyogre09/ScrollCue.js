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
        // duration
        const duration = parseInt(el.dataset.duration || this.options.duration, 10);
        el.style.animationDuration = `${duration}ms`;
        
        // delay
        const delay = parseInt(el.dataset.delay || this.options.delay, 10);
        el.style.animationDelay = `${delay}ms`;
        
        // easing
        el.style.animationTimingFunction = el.dataset.easing || this.options.easing;
        
        // color
        if (el.dataset.color) {
          el.style.color = el.dataset.color;
        }
        
        // intensity
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

      // Setup parallax
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

        const callback = element.dataset.callback;
        if (callback && typeof window[callback] === 'function') {
          window[callback](element);
        }

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

      // Refresh parallax 
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
      this.handleParallax();
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
