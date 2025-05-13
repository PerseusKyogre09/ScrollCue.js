# ScrollCue.js

A lightweight JavaScript scroll animation library using the Intersection Observer API. ScrollCue.js animates elements when they enter the viewport, with configurable animations, delays, and durations.

## Features

- Dependency-free (no jQuery required)
- Lightweight (<5KB minified)
- Uses modern Intersection Observer API
- Multiple animation types
- Customizable timing and easing
- Simple implementation
- **Works automatically when included** (like particles.js)
- **Can be used directly from CDN - no downloads needed**
- **One-line implementation available (JS + CSS together)**

See all the features here! https://demo-index.tiiny.site

## Installation

### One-Line Implementation (Recommended)

The simplest way to use ScrollCue.js is with the all-in-one version that includes both JS and CSS in a single file:

```html
<!-- From npm -->
<script src="https://cdn.jsdelivr.net/npm/scrollcue.js@latest/scrollcue.all-in-one.min.js"></script>
<!-- Or -->
<script src="https://unpkg.com/scrollcue.js@latest/scrollcue.all-in-one.min.js"></script>
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

### Available Animations

- `fade-in`: Simple fade-in effect
- `slide-up`: Slides up from below
- `slide-down`: Slides down from above
- `slide-left`: Slides in from the right
- `slide-right`: Slides in from the left
- `zoom-in`: Scales up from smaller size
- `zoom-out`: Scales down from larger size
- `rotate-in`: Rotates and fades in
- `flip-in`: Flips in with 3D effect
- `bounce-in`: Bounces in with an elastic effect

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
  once: true
});
myScrollCue.init();
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