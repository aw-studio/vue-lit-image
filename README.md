# vue-lit-image

## what is this?

For normal websites built with blade in Laravel we already have the `<x-lit-image />` as a component to handle all the annoying tasks for images like lazyloading but what if you have the same imageobjects in a vue application and want to use the same magic there? The vue-lit-image has you covered, it also takes the media object in the image property and does all the lazyloading, dynamic image sizing and it even sets the alt and title attributes for you.

## installation

`npm install @aw-studio/vue-lit-image`

## usage

In your app.js require the package and use the component. When using the component you have to specify the conversions according to your settings in the lit.php config file:

```
import LitImage from '@aw-studio/vue-lit-image';

Vue.use(LitImage, {
    conversions: {
        md: 500,
        sm: 300,
        lg: 900,
        xl: 1400,
    },
});
```

Inside your Vue files when you want to use the vue-lit-image, you want to give the prop `image` the media object just like the blade component would:

```
<lit-image :image="image" />
```

You can also style it using the `classes` prop:

```
<lit-image :image="image" classes="w-full" />
```
