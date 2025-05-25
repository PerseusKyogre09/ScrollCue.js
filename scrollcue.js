(function() {
  'use strict';

  // Animation definitions - all animations are defined here
  const animations = {
    'fade-in': {
      css: `
        .scrollcue.fade-in.is-inactive { opacity: 0; }
        .scrollcue.fade-in.cue-in { animation-name: fadeIn; }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `
    },
    'fade-up': {
      css: `
        .scrollcue.fade-up.is-inactive { 
          opacity: 0;
          transform: translateY(20px);
        }
        .scrollcue.fade-up.cue-in { animation-name: fadeUp; }
        @keyframes fadeUp {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `
    },
    'slide-up': {
      css: `
        .scrollcue.slide-up.is-inactive { 
          transform: translateY(100px);
          opacity: 0;
        }
        .scrollcue.slide-up.cue-in { animation-name: slideUp; }
        @keyframes slideUp {
          0% { 
            transform: translateY(100px);
            opacity: 0;
          }
          100% { 
            transform: translateY(0);
            opacity: 1;
          }
        }
      `
    },
    'bounce-in': {
      css: `
        .scrollcue.bounce-in.is-inactive {
          transform: scale(0.3);
          opacity: 0;
        }
        .scrollcue.bounce-in.cue-in { animation-name: bounceIn; }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
      `
    },
    'fade-split': {
      css: `
        .scrollcue.fade-split {
          position: relative;
          overflow: hidden;
        }
        .scrollcue.fade-split .split-left,
        .scrollcue.fade-split .split-right {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scrollcue.fade-split .split-left {
          left: 0;
          justify-content: flex-end;
        }
        .scrollcue.fade-split .split-right {
          right: 0;
          justify-content: flex-start;
        }
        .scrollcue.fade-split.is-inactive .split-left {
          transform: translateX(-100%);
          opacity: 0;
        }
        .scrollcue.fade-split.is-inactive .split-right {
          transform: translateX(100%);
          opacity: 0;
        }
        .scrollcue.fade-split.cue-in .split-left {
          animation: fadeSplitLeft 1s forwards;
        }
        .scrollcue.fade-split.cue-in .split-right {
          animation: fadeSplitRight 1s forwards;
        }
        @keyframes fadeSplitLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeSplitRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `
    }
    // Add more animations here...
  };

  // Default options
  const defaults = {
    rootMargin: '0px',
    threshold: 0.2,
    duration: 800,
    delay: 0,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    once: true,
    useRAF: true
  };

  class ScrollCue {
    constructor(options = {}) {
      this.options = Object.assign({}, defaults, options);
      this.elements = [];
      this.observer = null;
      this.initialized = false;
      this.usedAnimations = new Set();
    }

    init() {
      if (this.initialized) return;
      
      // Find all elements with scrollcue class
      const elements = document.querySelectorAll('.scrollcue');
      
      // Collect used animations
      elements.forEach(element => {
        const animType = element.dataset.cue || 'fade-in';
        this.usedAnimations.add(animType);
        
        // Special handling for fade-split
        if (animType === 'fade-split') {
          const content = element.innerHTML;
          element.innerHTML = `
            <div class="split-left">${content}</div>
            <div class="split-right">${content}</div>
          `;
        }
      });

      // Inject only used animations
      this.injectAnimations();

      // Initialize Intersection Observer
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          rootMargin: this.options.rootMargin,
          threshold: this.options.threshold
        }
      );

      // Add elements
      elements.forEach(element => {
        this.addElement(element);
      });

      this.initialized = true;
      return this;
    }

    injectAnimations() {
      // Create style element
      const styleEl = document.createElement('style');
      
      // Add only used animations
      const css = Array.from(this.usedAnimations)
        .map(anim => animations[anim]?.css)
        .filter(Boolean)
        .join('\n');
      
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }

    addElement(element) {
      if (!element.classList.contains('scrollcue')) {
        element.classList.add('scrollcue');
      }
      
      if (!element.classList.contains('is-inactive')) {
        element.classList.add('is-inactive');
      }
      
      this.elements.push(element);
      this.observer.observe(element);
      return this;
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          if (this.options.once) {
            this.observer.unobserve(entry.target);
          }
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
      
      if (this.options.useRAF) {
        requestAnimationFrame(() => {
          this.startElementAnimation(element, animationType);
        });
      } else {
        setTimeout(() => {
          this.startElementAnimation(element, animationType);
        }, 10);
      }
    }

    startElementAnimation(element, animationType) {
      element.classList.remove('is-inactive');
      element.classList.add('cue-in', animationType);
      
      element.dispatchEvent(new CustomEvent('scrollcue:start', {
        bubbles: true,
        detail: { element }
      }));
    }

    refresh() {
      if (!this.initialized) return this;
      
      this.elements.forEach(element => {
        this.observer.unobserve(element);
      });
      
      this.elements = [];
      this.init();
      
      return this;
    }

    destroy() {
      if (!this.initialized) return;
      
      this.elements.forEach(element => {
        this.observer.unobserve(element);
      });
      
      this.elements = [];
      this.observer.disconnect();
      this.initialized = false;
    }
  }

  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollCue;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() { return ScrollCue; });
  } else {
    window.ScrollCue = ScrollCue;
  }

  // Auto-initialize by default unless explicitly disabled
  if (!document.currentScript?.hasAttribute('data-no-auto-init')) {
    new ScrollCue().init();
  }
})();
