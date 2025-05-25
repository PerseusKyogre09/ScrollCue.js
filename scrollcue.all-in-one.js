(function() {
  'use strict';
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `
  .scrollcue{visibility:visible;opacity:1;transition:transform 0.4s cubic-bezier(0.25,0.1,0.25,1.0),opacity 0.4s cubic-bezier(0.25,0.1,0.25,1.0);will-change:transform,opacity;}.scrollcue.is-inactive{visibility:hidden;opacity:0;will-change:transform,opacity;backface-visibility:hidden;perspective:1000px;transform-style:preserve-3d;}.scrollcue.cue-in{visibility:visible;animation-fill-mode:both;}:root{--scrollcue-distance-sm:20px;--scrollcue-distance-md:40px;--scrollcue-distance-lg:80px;--scrollcue-scale-sm:0.95;--scrollcue-scale-md:0.9;--scrollcue-scale-lg:0.8;--scrollcue-rotate-sm:5deg;--scrollcue-rotate-md:15deg;--scrollcue-rotate-lg:30deg;}.scrollcue.fade-in.is-inactive{opacity:0;}.scrollcue.fade-in.cue-in{animation-name:fadeIn;}@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}.scrollcue.slide-up.is-inactive{transform:translateY(var(--scrollcue-distance-md));opacity:0;}.scrollcue.slide-up.cue-in{animation-name:slideUp;}@keyframes slideUp{0%{transform:translateY(var(--scrollcue-distance-md));opacity:0;}6%{opacity:0.05;}15%{transform:translateY(var(--scrollcue-distance-sm));}30%{opacity:0.5;}100%{transform:translateY(0);opacity:1;}}.scrollcue.slide-down.is-inactive{transform:translateY(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}.scrollcue.slide-down.cue-in{animation-name:slideDown;}@keyframes slideDown{0%{transform:translateY(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}6%{opacity:0.05;}15%{transform:translateY(calc(-1 * var(--scrollcue-distance-sm)));}30%{opacity:0.5;}100%{transform:translateY(0);opacity:1;}}.scrollcue.slide-left.is-inactive{transform:translateX(var(--scrollcue-distance-md));opacity:0;}.scrollcue.slide-left.cue-in{animation-name:slideLeft;}@keyframes slideLeft{0%{transform:translateX(var(--scrollcue-distance-md));opacity:0;}6%{opacity:0.05;}15%{transform:translateX(var(--scrollcue-distance-sm));}30%{opacity:0.5;}100%{transform:translateX(0);opacity:1;}}.scrollcue.slide-right.is-inactive{transform:translateX(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}.scrollcue.slide-right.cue-in{animation-name:slideRight;}@keyframes slideRight{0%{transform:translateX(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}6%{opacity:0.05;}15%{transform:translateX(calc(-1 * var(--scrollcue-distance-sm)));}30%{opacity:0.5;}100%{transform:translateX(0);opacity:1;}}.scrollcue.zoom-in.is-inactive{transform:scale(var(--scrollcue-scale-md));opacity:0;}.scrollcue.zoom-in.cue-in{animation-name:zoomIn;}@keyframes zoomIn{0%{transform:scale(var(--scrollcue-scale-md));opacity:0;}40%{opacity:0.6;}60%{transform:scale(1.03);}80%{opacity:0.9;transform:scale(0.97);}100%{transform:scale(1);opacity:1;}}.scrollcue.zoom-out.is-inactive{transform:scale(1.1);opacity:0;}.scrollcue.zoom-out.cue-in{animation-name:zoomOut;}@keyframes zoomOut{0%{transform:scale(1.1);opacity:0;}40%{opacity:0.6;}60%{transform:scale(0.97);}80%{opacity:0.9;transform:scale(1.03);}100%{transform:scale(1);opacity:1;}}.scrollcue.rotate-in.is-inactive{transform:rotate(calc(-1 * var(--scrollcue-rotate-md))) scale(var(--scrollcue-scale-md));opacity:0;transform-origin:center;}.scrollcue.rotate-in.cue-in{animation-name:rotateIn;}@keyframes rotateIn{0%{transform:rotate(calc(-1 * var(--scrollcue-rotate-md))) scale(var(--scrollcue-scale-md));opacity:0;}30%{opacity:0.5;}60%{transform:rotate(calc(var(--scrollcue-rotate-sm) * 0.3)) scale(1.02);}80%{opacity:0.9;transform:rotate(calc(-1 * var(--scrollcue-rotate-sm) * 0.1)) scale(0.98);}100%{transform:rotate(0) scale(1);opacity:1;}}.scrollcue.flip-in.is-inactive{transform:perspective(1200px) rotateY(90deg);opacity:0;transform-origin:center;}.scrollcue.flip-in.cue-in{animation-name:flipIn;}@keyframes flipIn{0%{transform:perspective(1200px) rotateY(90deg);opacity:0;}40%{transform:perspective(1200px) rotateY(15deg);opacity:0.7;}60%{transform:perspective(1200px) rotateY(-5deg);}80%{transform:perspective(1200px) rotateY(2deg);opacity:0.9;}100%{transform:perspective(1200px) rotateY(0);opacity:1;}}.scrollcue.flip-x.is-inactive{transform:perspective(1200px) rotateX(90deg);opacity:0;transform-origin:center;}.scrollcue.flip-x.cue-in{animation-name:flipX;}@keyframes flipX{0%{transform:perspective(1200px) rotateX(90deg);opacity:0;}40%{transform:perspective(1200px) rotateX(15deg);opacity:0.7;}60%{transform:perspective(1200px) rotateX(-5deg);}80%{transform:perspective(1200px) rotateX(2deg);opacity:0.9;}100%{transform:perspective(1200px) rotateX(0);opacity:1;}}.scrollcue.bounce-in.is-inactive{transform:scale(0.3);opacity:0;}.scrollcue.bounce-in.cue-in{animation-name:bounceIn;}@keyframes bounceIn{0%{transform:scale(0.3);opacity:0;}15%{transform:scale(0.5);opacity:0.3;}30%{transform:scale(1.1);opacity:0.8;}45%{transform:scale(0.9);opacity:0.9;}70%{transform:scale(1.05);opacity:0.95;}85%{transform:scale(0.98);opacity:0.98;}100%{transform:scale(1);opacity:1;}}.scrollcue.spring.is-inactive{transform:scale(0.7);opacity:0;}.scrollcue.spring.cue-in{animation-name:springIn;}@keyframes springIn{0%{transform:scale(0.7);opacity:0;}20%{transform:scale(1.2);opacity:0.7;}40%{transform:scale(0.85);opacity:0.9;}60%{transform:scale(1.05);opacity:0.95;}75%{transform:scale(0.95);opacity:0.97;}90%{transform:scale(1.02);opacity:0.99;}100%{transform:scale(1);opacity:1;}}.scrollcue.wave.is-inactive{transform:translateY(0);opacity:0;}.scrollcue.wave.cue-in{opacity:1;animation:wave-animation 4s cubic-bezier(0.33,1,0.68,1) infinite;}@keyframes wave-animation{0%{transform:translateY(0) rotate(0deg);}10%{transform:translateY(-4px) rotate(0.5deg);}20%{transform:translateY(-8px) rotate(1deg);}30%{transform:translateY(-4px) rotate(0.25deg);}40%{transform:translateY(0) rotate(-0.25deg);}50%{transform:translateY(4px) rotate(-0.5deg);}60%{transform:translateY(5px) rotate(-0.25deg);}70%{transform:translateY(3px) rotate(0deg);}80%{transform:translateY(-3px) rotate(0.25deg);}90%{transform:translateY(-2px) rotate(0.5deg);}100%{transform:translateY(0) rotate(0deg);}}.scrollcue.float.is-inactive{transform:translateY(0);}.scrollcue.float.cue-in{animation-name:float-animation;animation-duration:4s;animation-iteration-count:infinite;animation-timing-function:cubic-bezier(0.42,0,0.58,1);}@keyframes float-animation{0%{transform:translateY(0px) rotate(0deg);}25%{transform:translateY(-10px) rotate(0.5deg);}50%{transform:translateY(-20px) rotate(1deg);}75%{transform:translateY(-10px) rotate(0.5deg);}100%{transform:translateY(0px) rotate(0deg);}}.scrollcue.flip-3d.is-inactive{transform:perspective(800px) rotateY(60deg) rotateX(-15deg) translateZ(-100px);opacity:0;}.scrollcue.flip-3d.cue-in{animation-name:flip3d;}@keyframes flip3d{0%{transform:perspective(800px) rotateY(60deg) rotateX(-15deg) translateZ(-100px);opacity:0;}40%{opacity:0.7;transform:perspective(800px) rotateY(10deg) rotateX(-5deg) translateZ(-20px);}70%{opacity:0.9;transform:perspective(800px) rotateY(-3deg) rotateX(2deg) translateZ(5px);}100%{transform:perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0);opacity:1;}}.scrollcue-child.is-inactive{opacity:0;transform:translateY(20px);}.scrollcue-child.cue-in{animation-name:staggerFadeIn;}@keyframes staggerFadeIn{0%{opacity:0;transform:translateY(20px);}100%{opacity:1;transform:translateY(0);}}.scrollcue.typing.is-inactive{width:0;white-space:nowrap;overflow:hidden;border-right:3px solid transparent;}.scrollcue.typing.cue-in{animation:typing-animation 3.5s steps(40,end) forwards,blink-caret 0.75s cubic-bezier(0.645,0.045,0.355,1) infinite;}@keyframes typing-animation{0%{width:0}100%{width:100%}}@keyframes blink-caret{from,to{border-color:transparent}50%{border-color:currentColor}}.scrollcue.elastic-in.is-inactive{transform:scale(0);opacity:0;}.scrollcue.elastic-in.cue-in{animation-name:elasticIn;}@keyframes elasticIn{0%{transform:scale(0);opacity:0;}25%{transform:scale(1.15);opacity:0.7;}45%{transform:scale(0.85);opacity:0.85;}65%{transform:scale(1.05);opacity:0.95;}85%{transform:scale(0.95);opacity:1;}100%{transform:scale(1);opacity:1;}}.scrollcue[data-progress]{transition:all 0.1s cubic-bezier(0.42,0,0.58,1);}.scrollcue[data-origin]{transform-origin:var(--transform-origin,center);}.scrollcue[data-parallax],.scrollcue[data-speed]{transition:transform 0.1s cubic-bezier(0.42,0,0.58,1);will-change:transform;}.scrollcue.cue-in{transition-timing-function:cubic-bezier(0.33,1,0.68,1);}.scrollcue.flicker.is-inactive{opacity:0;}.scrollcue.flicker.cue-in{animation-name:flickerAnimation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:linear;}@keyframes flickerAnimation{0%{opacity:1;}10%{opacity:0.8;}12%{opacity:0.9;}14%{opacity:0.6;}16%{opacity:0.85;}25%{opacity:0.7;}30%{opacity:1;}50%{opacity:0.9;}60%{opacity:0.8;}70%{opacity:1;}80%{opacity:0.6;}90%{opacity:0.9;}100%{opacity:1;}}.scrollcue.shake.is-inactive{opacity:0;}.scrollcue.shake.cue-in{animation-name:shakeAnimation;animation-duration:0.8s;animation-iteration-count:1;animation-timing-function:cubic-bezier(0.36,0.07,0.19,0.97);}@keyframes shakeAnimation{0%{transform:translateX(0);}10%{transform:translateX(-5px);}20%{transform:translateX(5px);}30%{transform:translateX(-4px);}40%{transform:translateX(4px);}50%{transform:translateX(-3px);}60%{transform:translateX(3px);}70%{transform:translateX(-2px);}80%{transform:translateX(2px);}90%{transform:translateX(-1px);}100%{transform:translateX(0);}}.scrollcue.boat-rock.is-inactive{opacity:0;}.scrollcue.boat-rock.cue-in{animation-name:boatRockAnimation;animation-duration:5s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;transform-origin:bottom center;}@keyframes boatRockAnimation{0%{transform:rotate(0deg);}25%{transform:rotate(5deg);}50%{transform:rotate(0deg);}75%{transform:rotate(-5deg);}100%{transform:rotate(0deg);}}.scrollcue.wind.is-inactive{opacity:0;}.scrollcue.wind.cue-in{animation-name:windAnimation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;}@keyframes windAnimation{0%{transform:translateX(0) skewX(0deg);}25%{transform:translateX(5px) skewX(-2deg);}50%{transform:translateX(10px) skewX(-5deg);}75%{transform:translateX(5px) skewX(-2deg);}100%{transform:translateX(0) skewX(0deg);}}.scrollcue.ripple.is-inactive{opacity:0;}.scrollcue.ripple.cue-in{animation-name:rippleAnimation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:ease-out;transform-origin:center;}@keyframes rippleAnimation{0%{transform:scale(1);opacity:1;}50%{transform:scale(1.2);opacity:0.5;}100%{transform:scale(1);opacity:1;}}.scrollcue.storm.is-inactive{opacity:0;}.scrollcue.storm.cue-in{animation-name:stormAnimation;animation-duration:1s;animation-iteration-count:infinite;animation-timing-function:linear;}@keyframes stormAnimation{0%{transform:translateX(0) translateY(0);}10%{transform:translateX(-2px) translateY(1px);}20%{transform:translateX(2px) translateY(-1px);}30%{transform:translateX(-1px) translateY(-1px);}40%{transform:translateX(1px) translateY(1px);}50%{transform:translateX(-1px) translateY(-2px);}60%{transform:translateX(1px) translateY(2px);}70%{transform:translateX(-2px) translateY(1px);}80%{transform:translateX(2px) translateY(-1px);}90%{transform:translateX(-1px) translateY(1px);}100%{transform:translateX(0) translateY(0);}}.scrollcue.breaking-wave.is-inactive{opacity:0;}.scrollcue.breaking-wave.cue-in{animation-name:breakingWaveAnimation;animation-duration:4s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;}@keyframes breakingWaveAnimation{0%{transform:translateY(0) rotate(0deg) scaleX(1);}25%{transform:translateY(-5px) rotate(2deg) scaleX(1.1);}50%{transform:translateY(-10px) rotate(-1deg) scaleX(0.9);}75%{transform:translateY(-5px) rotate(1deg) scaleX(1.05);}100%{transform:translateY(0) rotate(0deg) scaleX(1);}}.scrollcue.morph.is-inactive{border-radius:0;transform:scale(0.8);opacity:0;}.scrollcue.morph.cue-in{animation-name:morphAnimation;}@keyframes morphAnimation{0%{border-radius:0;transform:scale(0.8);opacity:0;}50%{border-radius:50%;transform:scale(1.1);opacity:0.7;}100%{border-radius:0;transform:scale(1);opacity:1;}}.scrollcue.morph-circle.is-inactive{border-radius:0;transform:scale(0.8);opacity:0;}.scrollcue.morph-circle.cue-in{animation-name:morphCircleAnimation;}@keyframes morphCircleAnimation{0%{border-radius:0;transform:scale(0.8);opacity:0;}100%{border-radius:50%;transform:scale(1);opacity:1;}}.scrollcue.morph-square.is-inactive{border-radius:50%;transform:scale(0.8);opacity:0;}.scrollcue.morph-square.cue-in{animation-name:morphSquareAnimation;}@keyframes morphSquareAnimation{0%{border-radius:50%;transform:scale(0.8);opacity:0;}100%{border-radius:0;transform:scale(1);opacity:1;}}.scrollcue.skew.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew.cue-in{animation-name:skewAnimation;}@keyframes skewAnimation{0%{transform:skew(0deg);opacity:0;}20%{transform:skew(5deg);opacity:0.5;}40%{transform:skew(-3deg);opacity:0.7;}60%{transform:skew(2deg);opacity:0.85;}80%{transform:skew(-1deg);opacity:0.95;}100%{transform:skew(0deg);opacity:1;}}.scrollcue.skew-left.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew-left.cue-in{animation-name:skewLeftAnimation;}@keyframes skewLeftAnimation{0%{transform:skew(0deg);opacity:0;}50%{transform:skew(10deg);opacity:0.7;}100%{transform:skew(0deg);opacity:1;}}.scrollcue.skew-right.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew-right.cue-in{animation-name:skewRightAnimation;}@keyframes skewRightAnimation{0%{transform:skew(0deg);opacity:0;}50%{transform:skew(-10deg);opacity:0.7;}100%{transform:skew(0deg);opacity:1;}}.scrollcue.skew-dynamic.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew-dynamic.cue-in{animation-name:skewDynamicAnimation;animation-timing-function:cubic-bezier(0.4,0,0.2,1);}@keyframes skewDynamicAnimation{0%{transform:skew(0deg) scale(0.9);opacity:0;}25%{transform:skew(8deg) scale(0.95);opacity:0.5;}50%{transform:skew(-6deg) scale(1.05);opacity:0.75;}75%{transform:skew(4deg) scale(0.98);opacity:0.9;}100%{transform:skew(0deg) scale(1);opacity:1;}}.scrollcue.stretch.is-inactive{transform:scaleY(0.8);opacity:0;}.scrollcue.stretch.cue-in{animation-name:stretchAnimation;transform-origin:center;}@keyframes stretchAnimation{0%{transform:scaleY(0.8);opacity:0;}30%{transform:scaleY(1.1);opacity:0.7;}60%{transform:scaleY(0.95);opacity:0.9;}100%{transform:scaleY(1);opacity:1;}}.scrollcue.stretch-h.is-inactive{transform:scaleX(0.8);opacity:0;}.scrollcue.stretch-h.cue-in{animation-name:stretchHorizontalAnimation;transform-origin:center;}@keyframes stretchHorizontalAnimation{0%{transform:scaleX(0.8);opacity:0;}30%{transform:scaleX(1.1);opacity:0.7;}60%{transform:scaleX(0.95);opacity:0.9;}100%{transform:scaleX(1);opacity:1;}}.scrollcue.stretch-both.is-inactive{transform:scale(0.8);opacity:0;}.scrollcue.stretch-both.cue-in{animation-name:stretchBothAnimation;transform-origin:center;}@keyframes stretchBothAnimation{0%{transform:scale(0.8);opacity:0;}30%{transform:scale(1.1);opacity:0.7;}60%{transform:scale(0.95);opacity:0.9;}100%{transform:scale(1);opacity:1;}}.scrollcue.stretch-dynamic.is-inactive{transform:scale(0.8);opacity:0;}.scrollcue.stretch-dynamic.cue-in{animation-name:stretchDynamicAnimation;transform-origin:center;animation-timing-function:cubic-bezier(0.4,0,0.2,1);}@keyframes stretchDynamicAnimation{0%{transform:scale(0.8) scaleY(0.9);opacity:0;}20%{transform:scale(1.05) scaleY(1.1);opacity:0.5;}40%{transform:scale(0.95) scaleY(1.05);opacity:0.7;}60%{transform:scale(1.02) scaleY(0.98);opacity:0.85;}80%{transform:scale(0.98) scaleY(1.01);opacity:0.95;}100%{transform:scale(1) scaleY(1);opacity:1;}}.scrollcue.fade-split{position:relative;overflow:hidden;display:inline-block;}.scrollcue.fade-split .fade-split-left,.scrollcue.fade-split .fade-split-right{display:inline-block;opacity:0;position:relative;transition:transform 0.7s cubic-bezier(0.33,1,0.68,1),opacity 0.7s cubic-bezier(0.33,1,0.68,1);}.scrollcue.fade-split.cue-in .fade-split-left{transform:translateX(0);opacity:1;transition-delay:0.1s;}.scrollcue.fade-split.cue-in .fade-split-right{transform:translateX(0);opacity:1;transition-delay:0.1s;}.scrollcue.fade-split .fade-split-left{transform:translateX(-60%);}.scrollcue.fade-split .fade-split-right{transform:translateX(60%);}.scrollcue.zoom-path.is-inactive{opacity:0;transform:translate(-60px,60px) scale(0.8);}.scrollcue.zoom-path.cue-in{animation-name:zoomPathAnimation;}@keyframes zoomPathAnimation{0%{opacity:0;transform:translate(-60px,60px) scale(0.8);}40%{opacity:0.7;transform:translate(20px,-20px) scale(1.08);}70%{opacity:0.9;transform:translate(-10px,10px) scale(0.95);}100%{opacity:1;transform:translate(0,0) scale(1);}}
  `;  document.head.appendChild(styleElement);

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
        // --- BEGIN: Combo support for data-cue="combo" ---
        if (el.dataset.cue === 'combo' && el.dataset.combo) {
          const effects = el.dataset.combo.split(',').map(e => e.trim());
          this.combo(el, effects);
        }
        // --- END: Combo support ---

        // --- BEGIN: Auto-combo for scroll-based effects ---
        const autoComboEffects = [];
        if (el.dataset.parallax !== undefined || el.dataset.speed !== undefined) autoComboEffects.push('parallax');
        if (el.dataset.skewScroll === 'true') autoComboEffects.push('skew');
        if (el.dataset.stretchScroll === 'true') autoComboEffects.push('stretch');
        // Only auto-combo if not already handled by combo above
        if (autoComboEffects.length && !(el.dataset.cue === 'combo' && el.dataset.combo)) {
          this.combo(el, autoComboEffects);
        }
        // --- END: Auto-combo for scroll-based effects ---

        // --- BEGIN: Consistency for fade-split (data-cue and class) ---
        if (el.dataset.cue === 'fade-split' && !el.classList.contains('fade-split')) {
          el.classList.add('fade-split');
        }
        // --- END: Consistency for fade-split ---
        // --- BEGIN: Fade Split content wrapping ---
        if (el.classList.contains('fade-split')) {
          // Only wrap if not already wrapped
          if (!el.querySelector('.fade-split-left') && !el.querySelector('.fade-split-right')) {
            let html = el.innerHTML.trim();
            // Try to split at the middle of the text content
            const text = el.textContent;
            const mid = Math.floor(text.length / 2);
            // Find a space near the middle for a natural split
            let splitIdx = text.indexOf(' ', mid);
            if (splitIdx === -1) splitIdx = mid;
            const left = text.slice(0, splitIdx);
            const right = text.slice(splitIdx);
            el.innerHTML = `<span class="fade-split-left">${left}</span><span class="fade-split-right">${right}</span>`;
          }
        }
        // --- END: Fade Split content wrapping ---
        // --- BEGIN: Consistency for zoom-path (data-cue and class) ---
        if (el.dataset.cue === 'zoom-path' && !el.classList.contains('zoom-path')) {
          el.classList.add('zoom-path');
        }
        // --- END: Consistency for zoom-path ---
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
      
      // Handle stretch animations
      if (animationType.startsWith('stretch')) {
        // Store original transform if not set
        if (!element.dataset.originalTransform) {
          element.dataset.originalTransform = window.getComputedStyle(element).transform;
        }
        
        // Add scroll-based stretch effect if enabled
        if (element.dataset.stretchScroll === 'true') {
          this.setupStretchScroll(element);
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
        
        // Clean up stretch scroll effects
        if (element._stretchScrollCleanup) {
          element._stretchScrollCleanup();
        }
        
        element.classList.remove('cue-in', 'is-inactive');
        element.style.animationDuration = '';
        element.style.animationDelay = '';
        element.style.animationTimingFunction = '';
        element.style.transform = '';
      });
      
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

    setupStretchScroll(element) {
      let lastScrollY = window.scrollY;
      let scrollDirection = 0;
      let scrollSpeed = 0;
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        scrollDirection = Math.sign(delta);
        scrollSpeed = Math.min(Math.abs(delta) * 0.05, 0.2); // Limit maximum stretch
        
        // Apply stretch based on scroll direction and speed
        const stretchAmount = 1 + (scrollDirection * scrollSpeed);
        element.style.transform = `scaleY(${stretchAmount})`;
        
        lastScrollY = currentScrollY;
      };
      
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Store cleanup function
      element._stretchScrollCleanup = () => {
        window.removeEventListener('scroll', handleScroll);
        element.style.transform = element.dataset.originalTransform || '';
      };
    }

    // --- BEGIN: Combo Animation System ---
    /**
     * Apply multiple animations/effects to an element.
     * Usage: scrollCue.combo(element, ['zoom-path', 'parallax', 'skew'], { parallax: 0.3 })
     */
    combo(element, effects = [], options = {}) {
      if (!element) return;
      // Add all effect classes for CSS-based effects
      effects.forEach(effect => {
        if (!element.classList.contains(effect)) {
          element.classList.add(effect);
        }
      });
      // For scroll-based effects, compose transforms
      this._setupComboTransforms(element, effects, options);
    }

    _setupComboTransforms(element, effects, options) {
      // Only set up once
      if (element._comboScrollHandler) return;
      let lastScrollY = window.scrollY;
      // Compose transforms from all scroll-based effects
      const scrollHandler = () => {
        let transforms = [];
        // Parallax
        if (effects.includes('parallax') || element.dataset.parallax !== undefined || element.dataset.speed !== undefined) {
          const speed = parseFloat(options.parallax || element.dataset.speed || element.dataset.parallax || 0.5);
          const rect = element.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;
          const windowMiddle = scrollTop + (windowHeight / 2);
          const offsetTop = rect.top + scrollTop;
          const offsetMiddle = offsetTop + (rect.height / 2);
          const distanceToMiddle = windowMiddle - offsetMiddle;
          transforms.push(`translateY(${distanceToMiddle * speed}px)`);
        }
        // Skew
        if (effects.includes('skew') || element.dataset.skewScroll === 'true') {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          const scrollDirection = Math.sign(delta);
          const scrollSpeed = Math.min(Math.abs(delta) * 0.1, 10);
          const skewAmount = scrollDirection * scrollSpeed;
          transforms.push(`skew(${skewAmount}deg)`);
          lastScrollY = currentScrollY;
        }
        // Stretch
        if (effects.includes('stretch') || element.dataset.stretchScroll === 'true') {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          const scrollDirection = Math.sign(delta);
          const scrollSpeed = Math.min(Math.abs(delta) * 0.05, 0.2);
          const stretchAmount = 1 + (scrollDirection * scrollSpeed);
          transforms.push(`scaleY(${stretchAmount})`);
          lastScrollY = currentScrollY;
        }
        // Compose and apply
        element.style.transform = transforms.join(' ');
      };
      window.addEventListener('scroll', scrollHandler, { passive: true });
      element._comboScrollHandler = scrollHandler;
    }
    // --- END: Combo Animation System ---
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
