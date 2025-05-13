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
- `typing`: Type text with cursor blink
- `shake`: Quick shake animation
- `flicker`: Light flickering effect
- `sequential`: Animate children sequentially

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

### Sequential Animation

```html
<div class="scrollcue" data-cue="sequential">
  <!-- Each child will animate in sequence -->
  <div>First item (100ms delay)</div>
  <div>Second item (200ms delay)</div>
  <div>Third item (300ms delay)</div>
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