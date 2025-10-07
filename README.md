# ScrollCue.js

A lightweight JavaScript scroll animation library using the Intersection Observer API. ScrollCue.js animates elements when they enter the viewport, with configurable animations, delays, and durations. Now with buttery-smooth advanced animations while remaining dependency-free!

## Features

- Dependency-free (no jQuery required)
- Lightweight
- Uses modern Intersection Observer API
- Multiple animation types with buttery-smooth transitions
- Physics-based animations for natural movement
- Advanced easing functions for natural motion
- Staggered animations for groups of elements
- Timeline sequencing for complex animations
- Scroll-linked animations and progress tracking
- Transform origin controls and 3D perspective
- **Works automatically when included** (like particles.js)
- **Can be used directly from CDN - no downloads needed**
- **One-line implementation available (JS + CSS together)**

[See all the features here!](https://perseuskyogre09.github.io/ScrollCue.js/demo/index-cdn.html)

## Installation

### One-Line Implementation (Recommended)

The simplest way to use ScrollCue.js is with the all-in-one version that includes both JS and CSS in a single file:

```html
<!-- From npm -->
<script src="https://cdn.jsdelivr.net/npm/scrollcue.js@latest/scrollcue.all-in-one.js"></script>
<!-- Or -->
<script src="https://unpkg.com/scrollcue.js@latest/scrollcue.all-in-one.js"></script>
```

### Direct Download

Or download the files from this repository and include them in your project:

```html
<script src="path/to/scrollcue.all-in-one.js"></script>
```

That's it! No initialization code needed. ScrollCue.js automatically detects elements with the `scrollcue` class and sets up animations when the page loads.

## Usage

1. Add the `scrollcue` class to any element you want to animate when scrolled into view.
2. Add a `data-cue` attribute to specify the animation type.
3. Optionally add `data-delay` and `data-duration` attributes for timing control.

```html
<div class="scrollcue" data-cue="fade-in">
  This element will fade in when scrolled into view.
</div>

<div class="scrollcue" data-cue="slide-up" data-delay="200" data-duration="1000">
  This element will slide up with a 200ms delay and 1000ms duration.
</div>
```

For advanced configuration and customization options, check out the [instructions](INSTRUCTIONS.md) file.

### Available Animations

#### Basic Animations

- `fade-in`: Simple fade-in effect
- `slide-up`: Slides up from below with physics-based momentum
- `slide-down`: Slides down from above with physics-based momentum
- `slide-left`: Slides in from the right with smooth deceleration
- `slide-right`: Slides in from the left with smooth deceleration
- `zoom-in`: Scales up from smaller size with slight overshoot
- `zoom-out`: Scales down from larger size with spring-like motion
- `rotate-in`: Rotates and fades in with natural damping
- `flip-in`: Flips in with realistic 3D physics
- `bounce-in`: Bounces in with enhanced elastic effect
- `spring`: Spring-physics animation with natural oscillation
- `elastic-in`: Elastic animation with spring-like oscillation
- `flip-3d`: Advanced 3D flip with perspective and rotation

#### Special Effects

- `wave`: Gentle wave-like motion with improved physics
- `float`: Smooth floating animation with subtle rotation
- `wind`: Wind sweeping effect with natural movement
- `ripple`: Water ripple effect with radial expansion
- `boat-rock`: Realistic boat rocking motion
- `storm`: Dynamic storm-like shaking
- `breaking-wave`: Natural wave breaking motion
- `typing`: Type text character by character with optional blinking cursor
- `shake`: Quick shake animation with physics-based damping
- `flicker`: Light flickering effect with brightness
- `stagger`: Animate child elements in sequence with configurable delays

#### Transform Animations

- `morph`: Dynamic morphing transform animation
- `morph-circle`: Morph with circular transformation
- `morph-square`: Morph with square transformation
- `skew`: Dynamic skew transformation
- `skew-left`: Skew transformation to the left
- `skew-right`: Skew transformation to the right
- `skew-dynamic`: Dynamic skew with variable angles
- `stretch`: Stretch animation effect
- `stretch-h`: Horizontal stretch animation
- `stretch-both`: Stretch in both directions
- `stretch-dynamic`: Dynamic stretch with variable scaling

#### Advanced Animations (Beta)

⚠️ **Beta Features - May require fixes and improvements**

- `fade-split`: **[BETA]** Split fade animation effect - may require fixes
- `zoom-path`: Advanced zoom with path-based motion
- `parallax`: **[BETA]** Parallax scrolling effect - may require fixes
- `combo-parallax`: **[BETA]** Combined parallax effects - may require fixes

> **Note:** Beta animations are experimental features that may have known issues or require additional refinement. Use with caution in production environments.

### Example Usage

Basic animations:

```html
<div class="scrollcue" data-cue="fade-in">
  This element will fade in when scrolled into view.
</div>

<div class="scrollcue" data-cue="slide-up" data-delay="200" data-duration="1000">
  This element will slide up with a 200ms delay and 1000ms duration.
</div>
```

Special effects:

```html
<!-- Ocean-themed effects -->
<div class="scrollcue" data-cue="wave">
  Wave motion effect
</div>

<div class="scrollcue" data-cue="boat-rock">
  ⛵ Boat rocking animation
</div>

<div class="scrollcue" data-cue="ripple">
  💧 Ripple effect
</div>

<!-- Stagger animation -->
<div class="scrollcue" data-cue="stagger" data-stagger="100">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</div>
```

Typing animation:

```html
<!-- Basic typing (100ms per character, no cursor) -->
<div class="scrollcue" data-cue="typing">
  This text will be typed out character by character!
</div>

<!-- Fast typing (50ms per character) -->
<div class="scrollcue" data-cue="typing" data-typing-speed="50">
  This types much faster!
</div>

<!-- Slow typing (200ms per character) -->
<div class="scrollcue" data-cue="typing" data-typing-speed="200">
  This types slower...
</div>

<!-- With blinking cursor -->
<div class="scrollcue" data-cue="typing" data-cursor="true">
  This types with a realistic blinking cursor!
</div>

<!-- Custom speed with cursor -->
<div class="scrollcue" data-cue="typing" data-typing-speed="75" data-cursor="true">
  Perfect speed with cursor effect!
</div>
```

**Typing Animation Variables:**

- `data-typing-speed`: Milliseconds between each character (default: 100)
- `data-cursor`: Set to "true" to show blinking cursor (default: no cursor)

Transform animations:

```html
<!-- Morphing effects -->
<div class="scrollcue" data-cue="morph">
  Dynamic morph transformation
</div>

<div class="scrollcue" data-cue="morph-circle">
  🔵 Circular morph effect
</div>

<!-- Skew transformations -->
<div class="scrollcue" data-cue="skew-left">
  ↙️ Left skew animation
</div>

<div class="scrollcue" data-cue="skew-dynamic" data-duration="1500">
  🔄 Dynamic skew effect
</div>

<!-- Stretch effects -->
<div class="scrollcue" data-cue="stretch-h">
  ↔️ Horizontal stretch
</div>

<div class="scrollcue" data-cue="stretch-both">
  📏 Stretch in both directions
</div>
```

Beta animations (use with caution):

```html
<!-- Advanced path animation -->
<div class="scrollcue" data-cue="zoom-path">
  🛤️ Zoom with path motion
</div>

<!-- Beta features - may require fixes -->
<div class="scrollcue" data-cue="fade-split">
  ⚠️ Split fade animation (Beta)
</div>

<div class="scrollcue" data-cue="parallax" data-duration="2000">
  ⚠️ Parallax effect (Beta)
</div>

<div class="scrollcue" data-cue="combo-parallax">
  ⚠️ Combined parallax (Beta)
</div>
```

### JavaScript API

ScrollCue.js initializes automatically when included - no manual initialization required. However, you can control it with JavaScript if needed:

```javascript
// Access the global instance
window.scrollCue

// Manual refresh to detect new elements
scrollCue.refresh();

// Destroy instance
scrollCue.destroy();

// Create a new instance with custom options
const myScrollCue = new ScrollCue({
  rootMargin: '0px',
  threshold: 0.2,
  duration: 800,
  delay: 0,
  easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
  once: true,
  useRAF: true,       // Use requestAnimationFrame for smoother animations
  stagger: 150        // Default stagger delay for child elements
});
myScrollCue.init();

// Advanced Timeline functionality
const timeline = scrollCue.timeline()
  .add('#first-element', {cue: 'fade-in', delay: 0})
  .add('#second-element', {cue: 'slide-up', position: '+=200'})
  .add('#third-element', {cue: 'zoom-in', position: '<'});

timeline.play();

// Create staggered animations
scrollCue.sequence('#container')
  .add('.item', {cue: 'fade-in', stagger: 100})
  .play();

// Register custom easing functions
scrollCue.registerEasing('customBounce', 'cubic-bezier(0.175, 0.885, 0.32, 1.275)');

// Create scroll-linked animations
scrollCue.scrollTween('.parallax-element', {
  start: 'top bottom',  // When element top reaches bottom of viewport
  end: 'bottom top',    // When element bottom reaches top of viewport
  properties: {
    y: {from: 0, to: -100, unit: 'px'},
    opacity: {from: 0, to: 1},
    scale: {from: 0.8, to: 1}
  }
});

// Add custom animations
scrollCue.addAnimation('custom-animation', {
  initial: 'transform: rotate(45deg); opacity: 0;',
  visible: 'transform: rotate(0); opacity: 1;',
  keyframes: `
    0% { transform: rotate(45deg); opacity: 0; }
    100% { transform: rotate(0); opacity: 1; }
  `
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| rootMargin | String | '0px' | Margin around the root. See Intersection Observer API. |
| threshold | Number | 0.2 | Percentage of element visibility needed to trigger animation. |
| duration | Number | 800 | Default animation duration in milliseconds. |
| delay | Number | 0 | Default delay before animation starts in milliseconds. |
| easing | String | 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' | CSS timing function for animations. |
| once | Boolean | true | Whether to animate elements only once or every time they enter the viewport. |
| useRAF | Boolean | true | Whether to use requestAnimationFrame for smoother animations. |
| stagger | Number | 0 | Default stagger delay for child elements in milliseconds. |
| ease | String | 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' | Alias for easing (compatible naming). |

## Browser Support

ScrollCue.js works in all modern browsers that support the Intersection Observer API (Chrome, Firefox, Safari, Edge). A fallback is provided for older browsers, which will simply display all elements without animation.

## License

MIT License

## Contributing

If you're interested in contributing to ScrollCue.js, please check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

**Important:** Don't edit the all-in-one files directly. Make changes to the separate `scrollcue.js` and `scrollcue.css` files, then generate the combined version as described in the contributing guide.

Star this repository if you found it helpful! It'd help me a lot.

### Contributors ✨

<a href="https://github.com/PerseusKyogre09/ScrollCue.js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PerseusKyogre09/ScrollCue.js" />
</a>
