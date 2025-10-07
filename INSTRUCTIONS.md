# ScrollCue.js - Quick Implementation Guide

## Adding to Your HTML File

1. Include the script in the `<head>` or before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/scrollcue.js@latest/scrollcue.all-in-one.min.js"></script>
```

## Basic Usage

1. Add the `scrollcue` class to elements you want to animate
2. Use `data-cue` to specify animation type

```html
<div class="scrollcue" data-cue="fade-in">Text to animate</div>
```

## Available Animations

### Basic Animations
- `fade-in`: Fade in
- `slide-up`: Slide up from below
- `slide-down`: Slide down from above
- `slide-left`: Slide from right
- `slide-right`: Slide from left
- `zoom-in`: Scale up
- `zoom-out`: Scale down
- `rotate-in`: Rotate while fading in
- `flip-in`: 3D flip effect
- `bounce-in`: Bounce in with elastic effect

### Special Effects
- `wave`: Gentle wave-like motion
- `float`: Smooth floating animation
- `wind`: Wind sweeping effect
- `ripple`: Water ripple effect
- `boat-rock`: Boat rocking motion
- `storm`: Storm-like shaking effect
- `breaking-wave`: Wave breaking motion
- `typing`: Type text character by character with optional blinking cursor (GSAP-like typing effect)
- `shake`: Quick shake animation
- `flicker`: Light flickering effect
- `stagger`: Animate children sequentially

### Transform Animations
- `morph`: Dynamic morphing transform
- `morph-circle`: Morph with circular transformation
- `morph-square`: Morph with square transformation
- `skew`: Dynamic skew transformation
- `skew-left`: Skew to the left
- `skew-right`: Skew to the right
- `skew-dynamic`: Dynamic skew with variable angles
- `stretch`: Stretch animation effect
- `stretch-h`: Horizontal stretch
- `stretch-both`: Stretch in both directions
- `stretch-dynamic`: Dynamic stretch with variable scaling

### Typing Animation

The typing animation creates a realistic typewriter effect that reveals text character by character.

**Basic Usage:**

```html
<div class="scrollcue" data-cue="typing">
  This text will be typed out character by character!
</div>
```

**With Blinking Cursor:**

```html
<div class="scrollcue" data-cue="typing" data-cursor="true">
  This types with a realistic blinking cursor!
</div>
```

**Custom Speed:**

```html
<!-- Fast typing (50ms per character) -->
<div class="scrollcue" data-cue="typing" data-typing-speed="50">
  This types very fast!
</div>

<!-- Slow typing (200ms per character) -->
<div class="scrollcue" data-cue="typing" data-typing-speed="200">
  This types slowly...
</div>
```

**Variables:**

- `data-typing-speed`: Milliseconds between each character (default: 100)
- `data-cursor`: Set to "true" to enable blinking cursor (default: false)

**Notes:**

- The container maintains its original size during animation
- Text appears character by character with natural timing
- Cursor (when enabled) moves with the typing progress
- Works with any text content and styling
- Compatible with all ScrollCue timing and delay options

### Advanced Animations (Beta)
⚠️ **Beta Features - May require fixes**

- `fade-split`: **[BETA]** Split fade effect
- `zoom-path`: Advanced zoom with path motion
- `parallax`: **[BETA]** Parallax scrolling effect
- `combo-parallax`: **[BETA]** Combined parallax effects

> **Note:** Beta animations are experimental and may have issues. Use with caution in production.

## Example Effects

### Ocean Effects

```html
<!-- Wave motion -->
<div class="scrollcue" data-cue="wave">
  🌊 Wave animation
</div>

<!-- Boat rocking -->
<div class="scrollcue" data-cue="boat-rock" data-duration="6000">
  ⛵ Rocking boat
</div>

<!-- Water ripple -->
<div class="scrollcue" data-cue="ripple">
  💧 Ripple effect
</div>

<!-- Wind effect -->
<div class="scrollcue" data-cue="wind">
  💨 Wind animation
</div>
```

### Staggered Animation

```html
<div class="scrollcue" data-cue="stagger" data-stagger="100">
  <!-- Each child will animate in sequence -->
  <div>First item (100ms delay)</div>
  <div>Second item (200ms delay)</div>
  <div>Third item (300ms delay)</div>
</div>
```

### Transform Animation Examples

```html
<!-- Morphing effects -->
<div class="scrollcue" data-cue="morph">
  Dynamic morph transformation
</div>

<div class="scrollcue" data-cue="morph-circle">
  🔵 Circular morph effect
</div>

<!-- Skew effects -->
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

### Beta Animations (Use with Caution)

```html
<!-- Split fade effect (Beta) -->
<div class="scrollcue" data-cue="fade-split">
  ⚠️ Split fade animation (Beta)
</div>

<!-- Parallax effects (Beta) -->
<div class="scrollcue" data-cue="parallax" data-duration="2000">
  ⚠️ Parallax effect (Beta)
</div>

<div class="scrollcue" data-cue="combo-parallax">
  ⚠️ Combined parallax (Beta)
</div>

<!-- Advanced path animation -->
<div class="scrollcue" data-cue="zoom-path">
  🛤️ Zoom with path motion
</div>
```

## Custom Timing

Add delay (milliseconds before animation starts):

```html
<div class="scrollcue" data-cue="fade-in" data-delay="500">Delayed fade</div>
```


Set duration (milliseconds animation takes to complete):

```html
<div class="scrollcue" data-cue="slide-up" data-duration="1200">Slow slide up</div>
```

## JavaScript Control

Refresh (detect new elements added dynamically):

```javascript
scrollCue.refresh();
```

Destroy instance:

```javascript
scrollCue.destroy();
```

Custom configuration:

```javascript
const myScrollCue = new ScrollCue({
  threshold: 0.2,       // Visibility threshold (0-1)
  duration: 800,        // Default duration (ms)
  delay: 0,             // Default delay (ms)
  once: true            // Play animations only once
});
myScrollCue.init();
```