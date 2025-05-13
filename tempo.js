/**
 * ScrollMagic.js - A lightweight, customizable scroll animation library
 * Inspired by "The Boat" interactive story
 * Version 1.0.0
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports
    module.exports = factory();
  } else {
    // Browser globals
    root.ScrollMagic = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Create the necessary styles
  const createStyles = () => {
    if (document.getElementById('scroll-magic-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'scroll-magic-styles';
    styleEl.textContent = `
      [data-scroll] {
        opacity: 0;
        transition-property: transform, opacity;
        transition-timing-function: ease;
      }
      [data-scroll].visible {
        opacity: 1;
      }
      [data-scroll="fade-up"] {
        transform: translateY(50px);
      }
      [data-scroll="fade-up"].visible {
        transform: translateY(0);
      }
      [data-scroll="fade-down"] {
        transform: translateY(-50px);
      }
      [data-scroll="fade-down"].visible {
        transform: translateY(0);
      }
      [data-scroll="fade-left"] {
        transform: translateX(50px);
      }
      [data-scroll="fade-left"].visible {
        transform: translateX(0);
      }
      [data-scroll="fade-right"] {
        transform: translateX(-50px);
      }
      [data-scroll="fade-right"].visible {
        transform: translateX(0);
      }
      [data-scroll="zoom-in"] {
        transform: scale(0.8);
      }
      [data-scroll="zoom-in"].visible {
        transform: scale(1);
      }
      [data-scroll="zoom-out"] {
        transform: scale(1.2);
      }
      [data-scroll="zoom-out"].visible {
        transform: scale(1);
      }
      [data-scroll="rotate"] {
        transform: rotate(-15deg);
      }
      [data-scroll="rotate"].visible {
        transform: rotate(0);
      }
      [data-scroll="blur"] {
        filter: blur(10px);
      }
      [data-scroll="blur"].visible {
        filter: blur(0);
      }
      [data-scroll="wave"] {
        animation-duration: 3s;
        animation-iteration-count: infinite;
      }
      [data-scroll="wave"].visible {
        animation-name: wave-animation;
      }
      @keyframes wave-animation {
        0% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(10px); }
        100% { transform: translateY(0); }
      }
      [data-scroll="float"] {
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
      [data-scroll="float"].visible {
        animation-name: float-animation;
      }
      @keyframes float-animation {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      [data-scroll="rain"] {
        position: relative;
        overflow: hidden;
      }
      [data-scroll="rain"].visible::before {
        content: "";
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 200%;
        background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
        background-size: 10px 20px;
        animation: rain-animation 1s linear infinite;
      }
      @keyframes rain-animation {
        0% { transform: translateY(0); }
        100% { transform: translateY(20px); }
      }
      [data-scroll="parallax"] {
        transform: translateY(0);
        transition-property: transform;
        will-change: transform;
      }
      [data-scroll="typing"] {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        border-right: 2px solid;
      }
      [data-scroll="typing"].visible {
        animation: typing-animation 3.5s steps(40, end) forwards,
                   blink-caret 0.75s step-end infinite;
      }
      @keyframes typing-animation {
        0% { width: 0 }
        100% { width: 100% }
      }
      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: currentColor }
      }
      [data-scroll="shake"] {
        transform: translateX(0);
      }
      [data-scroll="shake"].visible {
        animation: shake-animation 0.82s cubic-bezier(.36,.07,.19,.97) both;
      }
      @keyframes shake-animation {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-4px); }
        40%, 60% { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(styleEl);
  };

  class ScrollMagic {
    constructor(options = {}) {
      this.options = {
        offset: options.offset || 0.2, // 20% of viewport height
        threshold: options.threshold || 0.1,
        root: options.root || null,
        once: options.once !== undefined ? options.once : true,
        ...options,
      };
      
      this.elements = [];
      this.observers = {};
      this.initialized = false;
      
      // Create required styles
      createStyles();
    }

    /**
     * Initialize the scroll animations
     */
    init() {
      if (this.initialized) return;
      
      this.elements = Array.from(document.querySelectorAll('[data-scroll]'));
      
      // Process custom attributes
      this.elements.forEach(el => {
        // Custom duration
        const duration = el.getAttribute('data-scroll-duration');
        if (duration) {
          el.style.transitionDuration = `${duration}ms`;
        }
        
        // Custom delay
        const delay = el.getAttribute('data-scroll-delay');
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }
        
        // Custom easing
        const easing = el.getAttribute('data-scroll-easing');
        if (easing) {
          el.style.transitionTimingFunction = easing;
        }
        
        // Custom color
        const color = el.getAttribute('data-scroll-color');
        if (color) {
          el.style.color = color;
        }
        
        // Custom animation speed
        const speed = el.getAttribute('data-scroll-speed');
        if (speed) {
          el.style.animationDuration = `${speed}s`;
        }
        
        // Custom intensity
        const intensity = el.getAttribute('data-scroll-intensity');
        if (intensity) {
          const type = el.getAttribute('data-scroll');
          const intensityValue = parseFloat(intensity);
          
          switch (type) {
            case 'fade-up':
            case 'fade-down':
              el.style.transform = `translateY(${type === 'fade-up' ? intensityValue : -intensityValue}px)`;
              break;
            case 'fade-left':
            case 'fade-right':
              el.style.transform = `translateX(${type === 'fade-left' ? intensityValue : -intensityValue}px)`;
              break;
            case 'zoom-in':
              el.style.transform = `scale(${1 - intensityValue/100})`;
              break;
            case 'zoom-out':
              el.style.transform = `scale(${1 + intensityValue/100})`;
              break;
            case 'rotate':
              el.style.transform = `rotate(${-intensityValue}deg)`;
              break;
            case 'blur':
              el.style.filter = `blur(${intensityValue}px)`;
              break;
          }
        }
      });
      
      // Create observers for different offsets
      this.setupObservers();
      
      // Handle initial state for elements already in view
      this.elements.forEach(el => {
        if (this.isInViewport(el)) {
          this.animateElement(el);
        }
      });
      
      // Setup parallax effects
      this.setupParallax();
      
      this.initialized = true;
    }
    
    /**
     * Setup Intersection Observers
     */
    setupObservers() {
      // Create a default observer
      const defaultOptions = {
        root: this.options.root,
        rootMargin: `0px 0px -${this.options.offset * 100}% 0px`,
        threshold: this.options.threshold
      };
      
      this.observers['default'] = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            
            // Unobserve if once is true
            if (this.options.once || entry.target.getAttribute('data-scroll-once') === 'true') {
              this.observers['default'].unobserve(entry.target);
            }
          } else if (!this.options.once && entry.target.getAttribute('data-scroll-once') !== 'true') {
            entry.target.classList.remove('visible');
          }
        });
      }, defaultOptions);
      
      // Observe all elements with the default observer
      this.elements.forEach(el => {
        // Check for custom offset
        const customOffset = el.getAttribute('data-scroll-offset');
        
        if (customOffset) {
          const offset = parseFloat(customOffset);
          const key = `offset-${offset}`;
          
          // Create a new observer for this offset if it doesn't exist
          if (!this.observers[key]) {
            const options = {
              root: this.options.root,
              rootMargin: `0px 0px -${offset}% 0px`,
              threshold: this.options.threshold
            };
            
            this.observers[key] = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  this.animateElement(entry.target);
                  
                  // Unobserve if once is true
                  if (this.options.once || entry.target.getAttribute('data-scroll-once') === 'true') {
                    this.observers[key].unobserve(entry.target);
                  }
                } else if (!this.options.once && entry.target.getAttribute('data-scroll-once') !== 'true') {
                  entry.target.classList.remove('visible');
                }
              });
            }, options);
          }
          
          this.observers[key].observe(el);
        } else {
          this.observers['default'].observe(el);
        }
      });
    }
    
    /**
     * Setup parallax effect for elements
     */
    setupParallax() {
      const parallaxElements = this.elements.filter(el => el.getAttribute('data-scroll') === 'parallax');
      
      if (parallaxElements.length === 0) return;
      
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(el => {
          if (!el.classList.contains('visible')) return;
          
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + scrollTop;
          const elementHeight = rect.height;
          
          // Calculate the percentage of the element in view
          const viewportBottom = scrollTop + windowHeight;
          const percentage = (viewportBottom - offsetTop) / (windowHeight + elementHeight);
          
          if (percentage >= 0 && percentage <= 1) {
            const speed = parseFloat(el.getAttribute('data-scroll-speed') || 0.5);
            const offset = (percentage - 0.5) * speed * 100;
            el.style.transform = `translateY(${offset}px)`;
          }
        });
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }
    
    /**
     * Check if an element is in the viewport
     */
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const offset = this.options.offset * windowHeight;
      
      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (windowHeight - offset) &&
        rect.left <= window.innerWidth
      );
    }
    
    /**
     * Animate an element
     */
    animateElement(el) {
      if (el.classList.contains('visible')) return;
      
      // Add visible class to trigger animations
      requestAnimationFrame(() => {
        el.classList.add('visible');
        
        // Trigger a callback if defined
        const callback = el.getAttribute('data-scroll-callback');
        if (callback && typeof window[callback] === 'function') {
          window[callback](el);
        }
        
        // Dispatch a custom event
        el.dispatchEvent(new CustomEvent('scrollmagic:visible', {
          bubbles: true,
          detail: { element: el }
        }));
      });
    }
    
    /**
     * Refresh the animations
     */
    refresh() {
      // Reset and reinitialize
      this.destroy();
      this.init();
    }
    
    /**
     * Destroy the instance and cleanup
     */
    destroy() {
      // Disconnect all observers
      Object.values(this.observers).forEach(observer => {
        observer.disconnect();
      });
      
      this.observers = {};
      this.initialized = false;
      
      // Remove scroll and resize listeners
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
    
    /**
     * Add custom animation
     */
    addAnimation(name, css) {
      const styleEl = document.getElementById('scroll-magic-styles');
      if (!styleEl) return;
      
      // Create class selectors for the new animation
      const baseStyle = `
        [data-scroll="${name}"] {
          ${css.initial || ''}
        }
        [data-scroll="${name}"].visible {
          ${css.visible || ''}
        }
      `;
      
      // Add keyframes if provided
      let keyframes = '';
      if (css.keyframes) {
        keyframes = `
          @keyframes ${name}-animation {
            ${css.keyframes}
          }
        `;
      }
      
      // Append the new styles
      styleEl.textContent += baseStyle + keyframes;
      
      // Refresh to apply to existing elements
      this.refresh();
    }
  }

  return ScrollMagic;
}));