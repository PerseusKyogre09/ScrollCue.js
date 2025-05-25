(function() {
  'use strict';

  // Enhanced default options with advanced settings
  const defaults = {
    rootMargin: '0px',
    threshold: 0.2,
    duration: 800,
    delay: 0,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    once: true,
    useRAF: true, // Use requestAnimationFrame for smoother animations
    stagger: 0,   // Default stagger delay for child elements
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', // Alias for easing for compatible naming
  };

  // Enhanced easing functions inspired by advanced animation libraries
  const easingFunctions = {
    // Standard easings
    linear: 'linear',
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    easeIn: 'cubic-bezier(0.42, 0, 1.0, 1.0)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1.0)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1.0)',
    
    // Elastic
    easeInElastic: 'cubic-bezier(0.5, 0.25, 0.75, -0.25)',
    easeOutElastic: 'cubic-bezier(0.25, 1.5, 0.5, 1.0)',
    easeInOutElastic: 'cubic-bezier(0.5, -0.25, 0.5, 1.25)',
    
    // Back
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    
    // Bounce
    easeInBounce: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    easeOutBounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOutBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  };

  class ScrollCue {
    constructor(options = {}) {
      this.options = Object.assign({}, defaults, options);
      this.elements = [];
      this.observer = null;
      this.initialized = false;
      this.isParallaxEnabled = false;
      this.rafId = null;
      this.animations = [];
      this.timelines = [];
      this.customEasings = Object.assign({}, easingFunctions);
      this.onScrollHandlers = [];
    }

    init() {
      if (this.initialized) return;
      
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
        
        // easing - use enhanced easing functions
        const easing = el.dataset.easing || el.dataset.ease || this.options.easing;
        el.style.animationTimingFunction = this.getEasingValue(easing);
        
        // transform origin
        if (el.dataset.origin) {
          el.style.transformOrigin = el.dataset.origin;
        }
        
        // color
        if (el.dataset.color) {
          el.style.color = el.dataset.color;
        }
        
        // intensity with improved physics
        const intensity = parseFloat(el.dataset.intensity);
        if (!isNaN(intensity)) {
          const type = el.dataset.cue;
          const multiplier = intensity / 100;
          
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
              el.style.transform = `scale(${Math.max(0.1, 1 - multiplier)})`;
              break;
            case 'zoom-out':
              el.style.transform = `scale(${1 + multiplier})`;
              break;
            case 'rotate':
              el.style.transform = `rotate(${-intensity}deg)`;
              break;
            case 'blur':
              el.style.filter = `blur(${intensity}px)`;
              break;
            case 'flip-x':
              el.style.transform = `perspective(400px) rotateX(${intensity}deg)`;
              break;
            case 'flip-y':
              el.style.transform = `perspective(400px) rotateY(${intensity}deg)`;
              break;
          }
        }

        // Process staggered children for sequential animations
        if (el.dataset.cue === 'stagger' || el.dataset.stagger) {
          const children = Array.from(el.children);
          const staggerDelay = parseInt(el.dataset.stagger || this.options.stagger, 10);
          const childAnimation = el.dataset.childCue || 'fade-in';
          
          children.forEach((child, index) => {
            child.classList.add('scrollcue-child');
            child.dataset.cue = child.dataset.cue || childAnimation;
            child.dataset.delay = (parseInt(child.dataset.delay || 0, 10) + (index * staggerDelay));
            child.classList.add('is-inactive');
          });
        }

        el.classList.add('is-inactive');
        
        // Store initial state for FLIP animations
        if (el.dataset.flip === 'true') {
          el._initialRect = el.getBoundingClientRect();
        }
      });

      this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      });

      this.elements.forEach(element => {
        this.observer.observe(element);
      });

      // Setup enhanced parallax
      this.setupParallax();
      
      // Setup scroll progress tracking
      this.setupScrollProgress();
      
      // Setup advanced scrollTrigger functionality
      this.setupScrollTriggers();

      this.initialized = true;
    }

    onIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          
          // Handle staggered children when parent becomes visible
          if (entry.target.dataset.cue === 'stagger' || entry.target.dataset.stagger) {
            this.handleStaggeredChildren(entry.target);
          }
          
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
      
      // Prepare animation
      element.style.animationDuration = `${duration}ms`;
      element.style.animationDelay = `${delay}ms`;
      element.style.animationTimingFunction = this.getEasingValue(element.dataset.easing || element.dataset.ease || this.options.easing);
      
      // Handle morph animations
      if (animationType.startsWith('morph')) {
        // Store original border radius if not set
        if (!element.dataset.originalBorderRadius) {
          element.dataset.originalBorderRadius = window.getComputedStyle(element).borderRadius;
        }
        
        // Store original transform if not set
        if (!element.dataset.originalTransform) {
          element.dataset.originalTransform = window.getComputedStyle(element).transform;
        }
      }
      
      // Handle skew animations
      if (animationType.startsWith('skew')) {
        // Store original transform if not set
        if (!element.dataset.originalTransform) {
          element.dataset.originalTransform = window.getComputedStyle(element).transform;
        }
        
        // Add scroll-based skew effect if enabled
        if (element.dataset.skewScroll === 'true') {
          this.setupSkewScroll(element);
        }
      }
      
      // FLIP animation prep
      let flipAnimation = null;
      if (element.dataset.flip === 'true' && element._initialRect) {
        flipAnimation = this.prepareFlipAnimation(element);
      }
      
      // Use RAF for smoother animation start
      if (this.options.useRAF) {
        requestAnimationFrame(() => {
          this.startElementAnimation(element, animationType, flipAnimation);
        });
      } else {
        setTimeout(() => {
          this.startElementAnimation(element, animationType, flipAnimation);
        }, 10);
      }
      
      // Register animation for timeline functionality
      const animation = {
        element,
        startTime: Date.now() + delay,
        duration,
        onComplete: () => {
          // Dispatch animation complete event
          element.dispatchEvent(new CustomEvent('scrollcue:complete', {
            bubbles: true,
            detail: { element }
          }));
          
          // Execute callback function if defined
          const completeCallback = element.dataset.onComplete;
          if (completeCallback && typeof window[completeCallback] === 'function') {
            window[completeCallback](element);
          }
        }
      };
      
      this.animations.push(animation);
      
      // Set timeout to trigger completion callback
      setTimeout(() => {
        const index = this.animations.findIndex(anim => anim.element === element);
        if (index !== -1) {
          this.animations[index].onComplete();
          this.animations.splice(index, 1);
        }
      }, delay + duration);
    }

    startElementAnimation(element, animationType, flipAnimation) {
      // Apply FLIP animation if prepared
      if (flipAnimation) {
        Object.assign(element.style, flipAnimation.initial);
        
        // Use RAF for smooth FLIP transition
        requestAnimationFrame(() => {
          // Apply the transition
          element.style.transition = `transform ${element.style.animationDuration} ${element.style.animationTimingFunction}`;
          Object.assign(element.style, flipAnimation.final);
        });
      }
      
      // Apply animation classes
      element.classList.remove('is-inactive');
      element.classList.add('cue-in', animationType);
      
      // Dispatch start event
      element.dispatchEvent(new CustomEvent('scrollcue:start', {
        bubbles: true,
        detail: { element }
      }));
      
      // Execute callback function if defined
      const callback = element.dataset.onStart || element.dataset.callback;
      if (callback && typeof window[callback] === 'function') {
        window[callback](element);
      }
    }

    handleStaggeredChildren(parent) {
      const children = Array.from(parent.querySelectorAll('.scrollcue-child'));
      const baseDelay = parseInt(parent.dataset.delay || 0, 10);
      const staggerDelay = parseInt(parent.dataset.stagger || this.options.stagger, 10);
      
      children.forEach((child, index) => {
        const delay = baseDelay + (index * staggerDelay);
        
        setTimeout(() => {
          this.animateElement(child);
        }, delay);
      });
    }

    prepareFlipAnimation(element) {
      // Get current position
      const currentRect = element.getBoundingClientRect();
      const initialRect = element._initialRect;
      
      // Calculate differences
      const deltaX = initialRect.left - currentRect.left;
      const deltaY = initialRect.top - currentRect.top;
      const deltaW = initialRect.width / currentRect.width;
      const deltaH = initialRect.height / currentRect.height;
      
      // Return initial and final state transforms
      return {
        initial: {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`,
          transformOrigin: element.dataset.origin || 'top left'
        },
        final: {
          transform: 'translate(0, 0) scale(1, 1)'
        }
      };
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
      
      // Refresh scroll triggers
      this.setupScrollTriggers();
    }

    destroy() {
      if (!this.observer) return;
      
      this.observer.disconnect();
      this.observer = null;
      
      this.elements.forEach(element => {
        // Clean up skew scroll effects
        if (element._skewScrollCleanup) {
          element._skewScrollCleanup();
        }
        
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
      
      // Clean up animations
      this.animations = [];
      this.timelines = [];
      
      // Remove scroll progress listeners
      window.removeEventListener('scroll', this.updateScrollProgress);
      
      // Cancel RAF if active
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      
      // Remove scroll trigger handlers
      this.onScrollHandlers.forEach(handler => {
        window.removeEventListener('scroll', handler);
      });
      this.onScrollHandlers = [];
      
      this.initialized = false;
    }

    setupParallax() {
      const parallaxElements = this.elements.filter(el => 
        el.dataset.parallax !== undefined || el.dataset.speed !== undefined
      );
      
      if (parallaxElements.length === 0) return;
      
      this.isParallaxEnabled = true;
      
      // Improved parallax with inertia and smoother transitions
      this.handleParallax = () => {
        if (!this.rafId) {
          this.rafId = requestAnimationFrame(() => {
            this.applyParallaxEffects(parallaxElements);
            this.rafId = null;
          });
        }
      };
      
      window.addEventListener('scroll', this.handleParallax, { passive: true });
      window.addEventListener('resize', this.handleParallax, { passive: true });
      this.handleParallax();
    }
    
    applyParallaxEffects(elements) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const windowMiddle = scrollTop + (windowHeight / 2);
      
      elements.forEach(el => {
        if (!el.classList.contains('cue-in') && this.options.once) return;
        
        const rect = el.getBoundingClientRect();
        const offsetTop = rect.top + scrollTop;
        const offsetMiddle = offsetTop + (rect.height / 2);
        
        // Distance from element middle to window middle
        const distanceToMiddle = windowMiddle - offsetMiddle;
        const speedFactor = parseFloat(el.dataset.speed || el.dataset.parallax || 0.5);
        
        // More advanced parallax calculations
        let transform = '';
        
        // Handle different parallax types
        const parallaxType = el.dataset.parallaxType || 'y';
        
        switch (parallaxType) {
          case 'y':
            // Vertical parallax
            const yOffset = distanceToMiddle * speedFactor;
            transform = `translateY(${yOffset}px)`;
            break;
            
          case 'x':
            // Horizontal parallax
            const windowWidth = window.innerWidth;
            const windowCenter = windowWidth / 2;
            const rectCenter = rect.left + (rect.width / 2);
            const distanceX = (rectCenter - windowCenter) * speedFactor * -0.1;
            transform = `translateX(${distanceX}px)`;
            break;
            
          case 'rotate':
            // Rotation parallax
            const rotation = distanceToMiddle * speedFactor * 0.02;
            transform = `rotate(${rotation}deg)`;
            break;
            
          case 'scale':
            // Scale parallax
            const viewportPosition = 1 - (Math.abs(distanceToMiddle) / (windowHeight * 0.8));
            const scale = 1 + (Math.max(0, Math.min(1, viewportPosition)) - 0.5) * speedFactor * 0.2;
            transform = `scale(${scale})`;
            break;
            
          case '3d':
            // 3D parallax effect
            const yMove = distanceToMiddle * speedFactor;
            const xMove = (rect.left - (windowWidth / 2)) * speedFactor * -0.05;
            const rotateX = distanceToMiddle * 0.01 * speedFactor;
            transform = `perspective(1000px) translateY(${yMove}px) translateX(${xMove}px) rotateX(${rotateX}deg)`;
            break;
        }
        
        // Apply with smooth transition for buttery animations
        el.style.transform = transform;
      });
    }

    setupScrollProgress() {
      // Add scroll progress tracking
      this.updateScrollProgress = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        
        // Dispatch scroll progress event for other components to use
        window.dispatchEvent(new CustomEvent('scrollcue:progress', {
          detail: { progress }
        }));
        
        // Find elements with data-progress attribute
        document.querySelectorAll('[data-progress]').forEach(el => {
          if (el.dataset.progressProperty) {
            // Custom progress property (width, height, opacity, etc.)
            const prop = el.dataset.progressProperty;
            const min = parseFloat(el.dataset.progressMin || 0);
            const max = parseFloat(el.dataset.progressMax || 1);
            const value = min + (progress * (max - min));
            
            if (prop === 'transform') {
              const transformType = el.dataset.progressTransform || 'translateX';
              const unit = el.dataset.progressUnit || '%';
              el.style.transform = `${transformType}(${value}${unit})`;
            } else {
              el.style[prop] = `${value}${el.dataset.progressUnit || ''}`;
            }
          } else {
            // Default: update a CSS variable
            el.style.setProperty('--scroll-progress', progress);
          }
        });
      };
      
      window.addEventListener('scroll', this.updateScrollProgress, { passive: true });
      this.updateScrollProgress(); // Initial call
    }
    
    setupScrollTriggers() {
      // Advanced scroll triggers
      document.querySelectorAll('[data-scroll-trigger]').forEach(el => {
        const triggerPosition = el.dataset.triggerPosition || 'center';
        const triggerAction = el.dataset.triggerAction || 'play';
        
        const scrollHandler = () => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          let triggerPoint;
          switch (triggerPosition) {
            case 'top': triggerPoint = rect.top; break;
            case 'center': triggerPoint = rect.top + (rect.height / 2); break;
            case 'bottom': triggerPoint = rect.bottom; break;
            default: triggerPoint = rect.top + (rect.height / 2);
          }
          
          const triggered = triggerPoint < windowHeight * 0.8;
          
          if (triggered) {
            switch (triggerAction) {
              case 'play':
                if (!el.classList.contains('cue-in')) {
                  this.animateElement(el);
                }
                break;
              case 'toggle-class':
                const className = el.dataset.triggerClass || 'active';
                el.classList.toggle(className, triggered);
                break;
              case 'callback':
                const callback = el.dataset.triggerCallback;
                if (callback && typeof window[callback] === 'function') {
                  window[callback](el, triggered);
                }
                break;
            }
          }
        };
        
        this.onScrollHandlers.push(scrollHandler);
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler(); // Initial check
      });
    }

    // Timeline implementation for more advanced animation control
    timeline(options = {}) {
      const timeline = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        elements: [],
        options: Object.assign({}, this.options, options),
        paused: true,
        currentTime: 0,
        
        add: (selector, animOptions = {}) => {
          const elements = typeof selector === 'string' 
            ? Array.from(document.querySelectorAll(selector))
            : [selector];
          
          elements.forEach(element => {
            this.timeline.elements.push({
              element,
              options: Object.assign({}, this.timeline.options, animOptions),
              position: animOptions.position || '+=0'
            });
          });
          
          return timeline;
        },
        
        play: () => {
          this.playTimeline(timeline);
          return timeline;
        },
        
        pause: () => {
          timeline.paused = true;
          return timeline;
        },
        
        restart: () => {
          timeline.currentTime = 0;
          this.playTimeline(timeline);
          return timeline;
        }
      };
      
      this.timelines.push(timeline);
      return timeline;
    }
    
    playTimeline(timeline) {
      timeline.paused = false;
      
      const start = Date.now() - timeline.currentTime;
      
      let lastElementEnd = 0;
      
      timeline.elements.forEach((item, index) => {
        const { element, options, position } = item;
        
        // Calculate delay based on position
        let delay = 0;
        
        if (position.startsWith('+=')) {
          delay = lastElementEnd + parseInt(position.substr(2), 10);
        } else if (position.startsWith('-=')) {
          delay = Math.max(0, lastElementEnd - parseInt(position.substr(2), 10));
        } else if (position === '>') {
          // Start after previous animation begins
          delay = index > 0 ? timeline.elements[index - 1].delay : 0;
        } else if (position === '<') {
          // Start at the same time as previous animation
          delay = index > 0 ? timeline.elements[index - 1].delay : 0;
        } else {
          // Absolute time
          delay = parseInt(position, 10);
        }
        
        item.delay = delay;
        
        // Set the end time of this animation for reference
        lastElementEnd = delay + (options.duration || this.options.duration);
        
        // Setup element animation
        element.dataset.cue = options.cue || 'fade-in';
        element.style.animationDuration = `${options.duration || this.options.duration}ms`;
        element.style.animationDelay = `${delay}ms`;
        element.style.animationTimingFunction = this.getEasingValue(options.easing || this.options.easing);
        
        // Add inactive class if not already present
        if (!element.classList.contains('is-inactive')) {
          element.classList.add('is-inactive');
        }
        
        // Start the animation
        setTimeout(() => {
          if (!timeline.paused) {
            this.startElementAnimation(element, element.dataset.cue);
          }
        }, delay);
      });
    }

    // Register custom easing function
    registerEasing(name, value) {
      this.customEasings[name] = value;
      return this;
    }
    
    getEasingValue(name) {
      return this.customEasings[name] || name;
    }

    // Add custom animation
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
      return this;
    }
    
    sequence(selector, options = {}) {
      const container = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
      
      if (!container) return null;
      
      const sequence = {
        container,
        elements: [],
        options: Object.assign({}, this.options, options),
        
        add: (childSelector, animOptions = {}) => {
          const children = container.querySelectorAll(childSelector);
          
          Array.from(children).forEach((child, index) => {
            const delay = animOptions.delay || 0;
            const stagger = animOptions.stagger || this.options.stagger;
            
            child.classList.add('scrollcue');
            child.dataset.cue = animOptions.cue || 'fade-in';
            child.dataset.delay = delay + (index * stagger);
            child.dataset.duration = animOptions.duration || this.options.duration;
            child.dataset.easing = animOptions.easing || this.options.easing;
            
            sequence.elements.push(child);
          });
          
          return sequence;
        },
        
        play: () => {
          sequence.elements.forEach(element => {
            this.animateElement(element);
          });
          return sequence;
        }
      };
      
      return sequence;
    }
    
    // Scroll-linked animation
    scrollTween(selector, options = {}) {
      const elements = typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : [selector];
        
      const defaults = {
        start: 'top bottom', // element top crosses bottom of viewport
        end: 'bottom top',   // element bottom crosses top of viewport
        scrub: false,        // whether to tie animation progress directly to scroll position
        markers: false,      // show markers for debugging (dev only)
        properties: {}       // css properties to animate
      };
      
      const config = Object.assign({}, defaults, options);
      
      Array.from(elements).forEach(element => {
        // Add markers if requested (development feature)
        if (config.markers) {
          this.addScrollMarkers(element, config);
        }
        
        const startPos = this.parseScrollPosition(config.start, element);
        const endPos = this.parseScrollPosition(config.end, element);
        
        // Setup the scroll handler
        const scrollHandler = () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          
          // Calculate progress
          const progress = Math.max(0, Math.min(1, 
            (scrollY - startPos) / (endPos - startPos)
          ));
          
          this.applyScrollTweenProperties(element, config.properties, progress);
        };
        
        this.onScrollHandlers.push(scrollHandler);
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler();
      });
      
      return this;
    }
    
    parseScrollPosition(position, element) {
      const [elementPos, viewportPos] = position.split(' ');
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const rect = element.getBoundingClientRect();
      const winHeight = window.innerHeight;
      
      let pos = 0;
      
      if (elementPos.startsWith('+=')) {
        return scrollY + parseInt(elementPos.substr(2), 10);
      } else if (elementPos.startsWith('-=')) {
        return scrollY - parseInt(elementPos.substr(2), 10);
      }
      
      // Element position
      const elemY = scrollY + rect.top;
      switch (elementPos) {
        case 'top': pos = elemY; break;
        case 'center': pos = elemY + (rect.height / 2); break;
        case 'bottom': pos = elemY + rect.height; break;
        default: pos = elemY;
      }
      
      // Viewport position
      if (viewportPos) {
        switch (viewportPos) {
          case 'top': break;
          case 'center': pos -= winHeight / 2; break;
          case 'bottom': pos -= winHeight; break;
        }
      }
      
      return pos;
    }
    
    applyScrollTweenProperties(element, properties, progress) {
      let transform = '';
      
      Object.entries(properties).forEach(([prop, values]) => {
        const from = values.from || 0;
        const to = values.to || 1;
        const value = from + (progress * (to - from));
        const unit = values.unit || '';
        
        if (['x', 'y', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY'].includes(prop)) {
          switch (prop) {
            case 'x': transform += ` translateX(${value}${unit})`; break;
            case 'y': transform += ` translateY(${value}${unit})`; break;
            case 'rotate':
            case 'rotateZ': transform += ` rotate(${value}${unit})`; break;
            case 'rotateX': transform += ` rotateX(${value}${unit})`; break;
            case 'rotateY': transform += ` rotateY(${value}${unit})`; break;
            case 'scale': transform += ` scale(${value})`; break;
            case 'scaleX': transform += ` scaleX(${value})`; break;
            case 'scaleY': transform += ` scaleY(${value})`; break;
          }
        } else {
          element.style[prop] = `${value}${unit}`;
        }
      });
      
      if (transform) {
        element.style.transform = transform;
      }
    }
    
    addScrollMarkers(element, config) {
      const marker = document.createElement('div');
      marker.style.position = 'fixed';
      marker.style.right = '0';
      marker.style.background = 'rgba(255, 0, 0, 0.5)';
      marker.style.color = 'white';
      marker.style.fontSize = '12px';
      marker.style.padding = '2px 5px';
      marker.style.zIndex = '9999';
      marker.style.pointerEvents = 'none';
      
      const startMarker = marker.cloneNode();
      startMarker.textContent = 'Start: ' + config.start;
      startMarker.style.top = (this.parseScrollPosition(config.start, element) / document.documentElement.scrollHeight * 100) + '%';
      
      const endMarker = marker.cloneNode();
      endMarker.textContent = 'End: ' + config.end;
      endMarker.style.top = (this.parseScrollPosition(config.end, element) / document.documentElement.scrollHeight * 100) + '%';
      
      document.body.appendChild(startMarker);
      document.body.appendChild(endMarker);
    }

    setupSkewScroll(element) {
      let lastScrollY = window.scrollY;
      let scrollDirection = 0;
      let scrollSpeed = 0;
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        scrollDirection = Math.sign(delta);
        scrollSpeed = Math.min(Math.abs(delta) * 0.1, 10); // Limit maximum skew
        
        // Apply skew based on scroll direction and speed
        const skewAmount = scrollDirection * scrollSpeed;
        element.style.transform = `skew(${skewAmount}deg)`;
        
        lastScrollY = currentScrollY;
      };
      
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Store cleanup function
      element._skewScrollCleanup = () => {
        window.removeEventListener('scroll', handleScroll);
        element.style.transform = element.dataset.originalTransform || '';
      };
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
