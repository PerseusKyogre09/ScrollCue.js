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

- `fade-in`: Fade in
- `slide-up`: Slide up from below
- `slide-down`: Slide down from above
- `slide-left`: Slide from right
- `slide-right`: Slide from left
- `zoom-in`: Scale up
- `zoom-out`: Scale down
- `rotate-in`: Rotate while fading in
- `flip-in`: 3D flip effect

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