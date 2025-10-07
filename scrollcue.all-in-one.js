(function() {
  'use strict';
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `
  .scrollcue{visibility:visible;opacity:1;transition:transform 0.4s cubic-bezier(0.25,0.1,0.25,1.0),opacity 0.4s cubic-bezier(0.25,0.1,0.25,1.0);will-change:transform,opacity;}.scrollcue.is-inactive{visibility:hidden;opacity:0;will-change:transform,opacity;backface-visibility:hidden;perspective:1000px;transform-style:preserve-3d;}.scrollcue.cue-in{visibility:visible;animation-fill-mode:both;}:root{--scrollcue-distance-sm:20px;--scrollcue-distance-md:40px;--scrollcue-distance-lg:80px;--scrollcue-scale-sm:0.95;--scrollcue-scale-md:0.9;--scrollcue-scale-lg:0.8;--scrollcue-rotate-sm:5deg;--scrollcue-rotate-md:15deg;--scrollcue-rotate-lg:30deg;}.scrollcue.fade-in.is-inactive{opacity:0;}.scrollcue.fade-in.cue-in{animation-name:fadeIn;}@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}.scrollcue.slide-up.is-inactive{transform:translateY(var(--scrollcue-distance-md));opacity:0;}.scrollcue.slide-up.cue-in{animation-name:slideUp;}@keyframes slideUp{0%{transform:translateY(var(--scrollcue-distance-md));opacity:0;}6%{opacity:0.05;}15%{transform:translateY(var(--scrollcue-distance-sm));}30%{opacity:0.5;}100%{transform:translateY(0);opacity:1;}}.scrollcue.slide-down.is-inactive{transform:translateY(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}.scrollcue.slide-down.cue-in{animation-name:slideDown;}@keyframes slideDown{0%{transform:translateY(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}6%{opacity:0.05;}15%{transform:translateY(calc(-1 * var(--scrollcue-distance-sm)));}30%{opacity:0.5;}100%{transform:translateY(0);opacity:1;}}.scrollcue.slide-left.is-inactive{transform:translateX(var(--scrollcue-distance-md));opacity:0;}.scrollcue.slide-left.cue-in{animation-name:slideLeft;}@keyframes slideLeft{0%{transform:translateX(var(--scrollcue-distance-md));opacity:0;}6%{opacity:0.05;}15%{transform:translateX(var(--scrollcue-distance-sm));}30%{opacity:0.5;}100%{transform:translateX(0);opacity:1;}}.scrollcue.slide-right.is-inactive{transform:translateX(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}.scrollcue.slide-right.cue-in{animation-name:slideRight;}@keyframes slideRight{0%{transform:translateX(calc(-1 * var(--scrollcue-distance-md)));opacity:0;}6%{opacity:0.05;}15%{transform:translateX(calc(-1 * var(--scrollcue-distance-sm)));}30%{opacity:0.5;}100%{transform:translateX(0);opacity:1;}}.scrollcue.zoom-in.is-inactive{transform:scale(var(--scrollcue-scale-md));opacity:0;}.scrollcue.zoom-in.cue-in{animation-name:zoomIn;}@keyframes zoomIn{0%{transform:scale(var(--scrollcue-scale-md));opacity:0;}40%{opacity:0.6;}60%{transform:scale(1.03);}80%{opacity:0.9;transform:scale(0.97);}100%{transform:scale(1);opacity:1;}}.scrollcue.zoom-out.is-inactive{transform:scale(1.1);opacity:0;}.scrollcue.zoom-out.cue-in{animation-name:zoomOut;}@keyframes zoomOut{0%{transform:scale(1.1);opacity:0;}40%{opacity:0.6;}60%{transform:scale(0.97);}80%{opacity:0.9;transform:scale(1.03);}100%{transform:scale(1);opacity:1;}}.scrollcue.rotate-in.is-inactive{transform:rotate(calc(-1 * var(--scrollcue-rotate-md))) scale(var(--scrollcue-scale-md));opacity:0;transform-origin:center;}.scrollcue.rotate-in.cue-in{animation-name:rotateIn;}@keyframes rotateIn{0%{transform:rotate(calc(-1 * var(--scrollcue-rotate-md))) scale(var(--scrollcue-scale-md));opacity:0;}30%{opacity:0.5;}60%{transform:rotate(calc(var(--scrollcue-rotate-sm) * 0.3)) scale(1.02);}80%{opacity:0.9;transform:rotate(calc(-1 * var(--scrollcue-rotate-sm) * 0.1)) scale(0.98);}100%{transform:rotate(0) scale(1);opacity:1;}}.scrollcue.flip-in.is-inactive{transform:perspective(1200px) rotateY(90deg);opacity:0;transform-origin:center;}.scrollcue.flip-in.cue-in{animation-name:flipIn;}@keyframes flipIn{0%{transform:perspective(1200px) rotateY(90deg);opacity:0;}40%{transform:perspective(1200px) rotateY(15deg);opacity:0.7;}60%{transform:perspective(1200px) rotateY(-5deg);}80%{transform:perspective(1200px) rotateY(2deg);opacity:0.9;}100%{transform:perspective(1200px) rotateY(0);opacity:1;}}.scrollcue.flip-x.is-inactive{transform:perspective(1200px) rotateX(90deg);opacity:0;transform-origin:center;}.scrollcue.flip-x.cue-in{animation-name:flipX;}@keyframes flipX{0%{transform:perspective(1200px) rotateX(90deg);opacity:0;}40%{transform:perspective(1200px) rotateX(15deg);opacity:0.7;}60%{transform:perspective(1200px) rotateX(-5deg);}80%{transform:perspective(1200px) rotateX(2deg);opacity:0.9;}100%{transform:perspective(1200px) rotateX(0);opacity:1;}}.scrollcue.bounce-in.is-inactive{transform:scale(0.3);opacity:0;}.scrollcue.bounce-in.cue-in{animation-name:bounceIn;}@keyframes bounceIn{0%{transform:scale(0.3);opacity:0;}15%{transform:scale(0.5);opacity:0.3;}30%{transform:scale(1.1);opacity:0.8;}45%{transform:scale(0.9);opacity:0.9;}70%{transform:scale(1.05);opacity:0.95;}85%{transform:scale(0.98);opacity:0.98;}100%{transform:scale(1);opacity:1;}}.scrollcue.spring.is-inactive{transform:scale(0.7);opacity:0;}.scrollcue.spring.cue-in{animation-name:springIn;}@keyframes springIn{0%{transform:scale(0.7);opacity:0;}20%{transform:scale(1.2);opacity:0.7;}40%{transform:scale(0.85);opacity:0.9;}60%{transform:scale(1.05);opacity:0.95;}75%{transform:scale(0.95);opacity:0.97;}90%{transform:scale(1.02);opacity:0.99;}100%{transform:scale(1);opacity:1;}}.scrollcue.wave.is-inactive{transform:translateY(0);opacity:0;}.scrollcue.wave.cue-in{opacity:1;animation:wave-animation 4s cubic-bezier(0.33,1,0.68,1) infinite;}@keyframes wave-animation{0%{transform:translateY(0) rotate(0deg);}10%{transform:translateY(-4px) rotate(0.5deg);}20%{transform:translateY(-8px) rotate(1deg);}30%{transform:translateY(-4px) rotate(0.25deg);}40%{transform:translateY(0) rotate(-0.25deg);}50%{transform:translateY(4px) rotate(-0.5deg);}60%{transform:translateY(5px) rotate(-0.25deg);}70%{transform:translateY(3px) rotate(0deg);}80%{transform:translateY(-3px) rotate(0.25deg);}90%{transform:translateY(-2px) rotate(0.5deg);}100%{transform:translateY(0) rotate(0deg);}}.scrollcue.float.is-inactive{transform:translateY(0);}.scrollcue.float.cue-in{animation-name:float-animation;animation-duration:4s;animation-iteration-count:infinite;animation-timing-function:cubic-bezier(0.42,0,0.58,1);}@keyframes float-animation{0%{transform:translateY(0px) rotate(0deg);}25%{transform:translateY(-10px) rotate(0.5deg);}50%{transform:translateY(-20px) rotate(1deg);}75%{transform:translateY(-10px) rotate(0.5deg);}100%{transform:translateY(0px) rotate(0deg);}}.scrollcue.flip-3d.is-inactive{transform:perspective(800px) rotateY(60deg) rotateX(-15deg) translateZ(-100px);opacity:0;}.scrollcue.flip-3d.cue-in{animation-name:flip3d;}@keyframes flip3d{0%{transform:perspective(800px) rotateY(60deg) rotateX(-15deg) translateZ(-100px);opacity:0;}40%{opacity:0.7;transform:perspective(800px) rotateY(10deg) rotateX(-5deg) translateZ(-20px);}70%{opacity:0.9;transform:perspective(800px) rotateY(-3deg) rotateX(2deg) translateZ(5px);}100%{transform:perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0);opacity:1;}}.scrollcue-child.is-inactive{opacity:0;transform:translateY(20px);}.scrollcue-child.cue-in{animation-name:staggerFadeIn;}@keyframes staggerFadeIn{0%{opacity:0;transform:translateY(20px);}100%{opacity:1;transform:translateY(0);}}.scrollcue.typing{position:relative;overflow:hidden;}@keyframes blink-caret{0%,50%{opacity:1;}51%,100%{opacity:0;}}.scrollcue.elastic-in.is-inactive{transform:scale(0);opacity:0;}.scrollcue.elastic-in.cue-in{animation-name:elasticIn;}@keyframes elasticIn{0%{transform:scale(0);opacity:0;}25%{transform:scale(1.15);opacity:0.7;}45%{transform:scale(0.85);opacity:0.85;}65%{transform:scale(1.05);opacity:0.95;}85%{transform:scale(0.95);opacity:1;}100%{transform:scale(1);opacity:1;}}.scrollcue[data-progress]{transition:all 0.1s cubic-bezier(0.42,0,0.58,1);}.scrollcue[data-origin]{transform-origin:var(--transform-origin,center);}.scrollcue[data-parallax],.scrollcue[data-speed]{transition:transform 0.1s cubic-bezier(0.42,0,0.58,1);will-change:transform;}.scrollcue.cue-in{transition-timing-function:cubic-bezier(0.33,1,0.68,1);}.scrollcue.flicker.is-inactive{opacity:0;}.scrollcue.flicker.cue-in{animation-name:flickerAnimation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:linear;}@keyframes flickerAnimation{0%{opacity:1;}10%{opacity:0.8;}12%{opacity:0.9;}14%{opacity:0.6;}16%{opacity:0.85;}25%{opacity:0.7;}30%{opacity:1;}50%{opacity:0.9;}60%{opacity:0.8;}70%{opacity:1;}80%{opacity:0.6;}90%{opacity:0.9;}100%{opacity:1;}}.scrollcue.shake.is-inactive{opacity:0;}.scrollcue.shake.cue-in{animation-name:shakeAnimation;animation-duration:0.8s;animation-iteration-count:1;animation-timing-function:cubic-bezier(0.36,0.07,0.19,0.97);}@keyframes shakeAnimation{0%{transform:translateX(0);}10%{transform:translateX(-5px);}20%{transform:translateX(5px);}30%{transform:translateX(-4px);}40%{transform:translateX(4px);}50%{transform:translateX(-3px);}60%{transform:translateX(3px);}70%{transform:translateX(-2px);}80%{transform:translateX(2px);}90%{transform:translateX(-1px);}100%{transform:translateX(0);}}.scrollcue.boat-rock.is-inactive{opacity:0;}.scrollcue.boat-rock.cue-in{animation-name:boatRockAnimation;animation-duration:5s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;transform-origin:bottom center;}@keyframes boatRockAnimation{0%{transform:rotate(0deg);}25%{transform:rotate(5deg);}50%{transform:rotate(0deg);}75%{transform:rotate(-5deg);}100%{transform:rotate(0deg);}}.scrollcue.wind.is-inactive{opacity:0;}.scrollcue.wind.cue-in{animation-name:windAnimation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;}@keyframes windAnimation{0%{transform:translateX(0) skewX(0deg);}25%{transform:translateX(5px) skewX(-2deg);}50%{transform:translateX(10px) skewX(-5deg);}75%{transform:translateX(5px) skewX(-2deg);}100%{transform:translateX(0) skewX(0deg);}}.scrollcue.ripple.is-inactive{opacity:0;}.scrollcue.ripple.cue-in{animation-name:rippleAnimation;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:ease-out;transform-origin:center;}@keyframes rippleAnimation{0%{transform:scale(1);opacity:1;}50%{transform:scale(1.2);opacity:0.5;}100%{transform:scale(1);opacity:1;}}.scrollcue.storm.is-inactive{opacity:0;}.scrollcue.storm.cue-in{animation-name:stormAnimation;animation-duration:1s;animation-iteration-count:infinite;animation-timing-function:linear;}@keyframes stormAnimation{0%{transform:translateX(0) translateY(0);}10%{transform:translateX(-2px) translateY(1px);}20%{transform:translateX(2px) translateY(-1px);}30%{transform:translateX(-1px) translateY(-1px);}40%{transform:translateX(1px) translateY(1px);}50%{transform:translateX(-1px) translateY(-2px);}60%{transform:translateX(1px) translateY(2px);}70%{transform:translateX(-2px) translateY(1px);}80%{transform:translateX(2px) translateY(-1px);}90%{transform:translateX(-1px) translateY(1px);}100%{transform:translateX(0) translateY(0);}}.scrollcue.breaking-wave.is-inactive{opacity:0;}.scrollcue.breaking-wave.cue-in{animation-name:breakingWaveAnimation;animation-duration:4s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;}@keyframes breakingWaveAnimation{0%{transform:translateY(0) rotate(0deg) scaleX(1);}25%{transform:translateY(-5px) rotate(2deg) scaleX(1.1);}50%{transform:translateY(-10px) rotate(-1deg) scaleX(0.9);}75%{transform:translateY(-5px) rotate(1deg) scaleX(1.05);}100%{transform:translateY(0) rotate(0deg) scaleX(1);}}.scrollcue.morph.is-inactive{border-radius:0;transform:scale(0.8);opacity:0;}.scrollcue.morph.cue-in{animation-name:morphAnimation;}@keyframes morphAnimation{0%{border-radius:0;transform:scale(0.8);opacity:0;}50%{border-radius:50%;transform:scale(1.1);opacity:0.7;}100%{border-radius:0;transform:scale(1);opacity:1;}}.scrollcue.morph-circle.is-inactive{border-radius:0;transform:scale(0.8);opacity:0;}.scrollcue.morph-circle.cue-in{animation-name:morphCircleAnimation;}@keyframes morphCircleAnimation{0%{border-radius:0;transform:scale(0.8);opacity:0;}100%{border-radius:50%;transform:scale(1);opacity:1;}}.scrollcue.morph-square.is-inactive{border-radius:50%;transform:scale(0.8);opacity:0;}.scrollcue.morph-square.cue-in{animation-name:morphSquareAnimation;}@keyframes morphSquareAnimation{0%{border-radius:50%;transform:scale(0.8);opacity:0;}100%{border-radius:0;transform:scale(1);opacity:1;}}.scrollcue.skew.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew.cue-in{animation-name:skewAnimation;}@keyframes skewAnimation{0%{transform:skew(0deg);opacity:0;}20%{transform:skew(5deg);opacity:0.5;}40%{transform:skew(-3deg);opacity:0.7;}60%{transform:skew(2deg);opacity:0.85;}80%{transform:skew(-1deg);opacity:0.95;}100%{transform:skew(0deg);opacity:1;}}.scrollcue.skew-left.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew-left.cue-in{animation-name:skewLeftAnimation;}@keyframes skewLeftAnimation{0%{transform:skew(0deg);opacity:0;}50%{transform:skew(10deg);opacity:0.7;}100%{transform:skew(0deg);opacity:1;}}.scrollcue.skew-right.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew-right.cue-in{animation-name:skewRightAnimation;}@keyframes skewRightAnimation{0%{transform:skew(0deg);opacity:0;}50%{transform:skew(-10deg);opacity:0.7;}100%{transform:skew(0deg);opacity:1;}}.scrollcue.skew-dynamic.is-inactive{transform:skew(0deg);opacity:0;}.scrollcue.skew-dynamic.cue-in{animation-name:skewDynamicAnimation;animation-timing-function:cubic-bezier(0.4,0,0.2,1);}@keyframes skewDynamicAnimation{0%{transform:skew(0deg) scale(0.9);opacity:0;}25%{transform:skew(8deg) scale(0.95);opacity:0.5;}50%{transform:skew(-6deg) scale(1.05);opacity:0.75;}75%{transform:skew(4deg) scale(0.98);opacity:0.9;}100%{transform:skew(0deg) scale(1);opacity:1;}}.scrollcue.stretch.is-inactive{transform:scaleY(0.8);opacity:0;}.scrollcue.stretch.cue-in{animation-name:stretchAnimation;transform-origin:center;}@keyframes stretchAnimation{0%{transform:scaleY(0.8);opacity:0;}30%{transform:scaleY(1.1);opacity:0.7;}60%{transform:scaleY(0.95);opacity:0.9;}100%{transform:scaleY(1);opacity:1;}}.scrollcue.stretch-h.is-inactive{transform:scaleX(0.8);opacity:0;}.scrollcue.stretch-h.cue-in{animation-name:stretchHorizontalAnimation;transform-origin:center;}@keyframes stretchHorizontalAnimation{0%{transform:scaleX(0.8);opacity:0;}30%{transform:scaleX(1.1);opacity:0.7;}60%{transform:scaleX(0.95);opacity:0.9;}100%{transform:scaleX(1);opacity:1;}}.scrollcue.stretch-both.is-inactive{transform:scale(0.8);opacity:0;}.scrollcue.stretch-both.cue-in{animation-name:stretchBothAnimation;transform-origin:center;}@keyframes stretchBothAnimation{0%{transform:scale(0.8);opacity:0;}30%{transform:scale(1.1);opacity:0.7;}60%{transform:scale(0.95);opacity:0.9;}100%{transform:scale(1);opacity:1;}}.scrollcue.stretch-dynamic.is-inactive{transform:scale(0.8);opacity:0;}.scrollcue.stretch-dynamic.cue-in{animation-name:stretchDynamicAnimation;transform-origin:center;animation-timing-function:cubic-bezier(0.4,0,0.2,1);}@keyframes stretchDynamicAnimation{0%{transform:scale(0.8) scaleY(0.9);opacity:0;}20%{transform:scale(1.05) scaleY(1.1);opacity:0.5;}40%{transform:scale(0.95) scaleY(1.05);opacity:0.7;}60%{transform:scale(1.02) scaleY(0.98);opacity:0.85;}80%{transform:scale(0.98) scaleY(1.01);opacity:0.95;}100%{transform:scale(1) scaleY(1);opacity:1;}}.scrollcue.zoom-path.is-inactive{opacity:0;transform:translate(-60px,60px) scale(0.8);}.scrollcue.zoom-path.cue-in{animation-name:zoomPathAnimation;}@keyframes zoomPathAnimation{0%{opacity:0;transform:translate(-60px,60px) scale(0.8);}40%{opacity:0.7;transform:translate(20px,-20px) scale(1.08);}70%{opacity:0.9;transform:translate(-10px,10px) scale(0.95);}100%{opacity:1;transform:translate(0,0) scale(1);}}.scrollcue.fade-split{position:relative;overflow:hidden;display:inline-block;}.scrollcue.fade-split .fade-split-left,.scrollcue.fade-split .fade-split-right{display:inline-block;opacity:0;position:relative;transition:transform 0.7s cubic-bezier(0.33,1,0.68,1),opacity 0.7s cubic-bezier(0.33,1,0.68,1);}.scrollcue.fade-split.cue-in .fade-split-left{transform:translateX(0);opacity:1;transition-delay:0.1s;}.scrollcue.fade-split.cue-in .fade-split-right{transform:translateX(0);opacity:1;transition-delay:0.1s;}.scrollcue.fade-split .fade-split-left{transform:translateX(-60%);}.scrollcue.fade-split .fade-split-right{transform:translateX(60%);}
  `;  document.head.appendChild(styleElement);

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
    },
    'typing': {
      css: `
        .scrollcue.typing {
          position: relative;
          overflow: hidden;
        }
        .scrollcue.typing .typing-cursor {
          animation: blink-caret 1s infinite;
          color: currentColor;
          font-size: inherit;
          line-height: inherit;
        }
        @keyframes blink-caret {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `,
      js: true
    }
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
      
      // Handle JavaScript-based animations
      if (animations[animationType] && animations[animationType].js) {
        this.handleJSAnimation(element, animationType);
      }
      
      element.dispatchEvent(new CustomEvent('scrollcue:start', {
        bubbles: true,
        detail: { element }
      }));
    }

    handleJSAnimation(element, animationType) {
      if (animationType === 'typing') {
        this.handleTypingAnimation(element);
      }
    }

    handleTypingAnimation(element) {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typingSpeed || '100', 10); // milliseconds per character
      const showCursor = element.dataset.cursor === 'true';
      
      // Store original content and clear for typing effect
      const originalText = text;
      element.textContent = '';
      
      // Ensure the element maintains its original size
      element.style.width = element.offsetWidth + 'px';
      element.style.overflow = 'hidden';
      
      // Create cursor element if needed
      let cursorElement = null;
      if (showCursor) {
        cursorElement = document.createElement('span');
        cursorElement.textContent = '|';
        cursorElement.className = 'typing-cursor';
        element.appendChild(cursorElement);
      }
      
      let charIndex = 0;
      const typeChar = () => {
        if (charIndex < originalText.length) {
          // Update text content
          const currentText = originalText.substring(0, charIndex + 1);
          if (cursorElement) {
            element.textContent = currentText;
            element.appendChild(cursorElement);
          } else {
            element.textContent = currentText;
          }
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          // Typing complete
          if (cursorElement) {
            element.textContent = originalText;
            element.appendChild(cursorElement);
          } else {
            element.textContent = originalText;
          }
          
          element.dispatchEvent(new CustomEvent('scrollcue:typing-complete', {
            bubbles: true,
            detail: { element }
          }));
        }
      };
      
      // Start typing after a brief delay
      setTimeout(typeChar, 100);
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
