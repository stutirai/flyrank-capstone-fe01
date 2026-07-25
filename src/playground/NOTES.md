# NOTES.md

## Comparison between my implementation and shadcn/ui

### Dialog

1. My dialog supports opening, closing, Escape key, and basic ARIA attributes.

2. shadcn/ui uses Base UI components that automatically handle accessibility, focus management, and keyboard interactions.

3. shadcn/ui includes built-in overlay, portal, animations, and reusable dialog components, while my implementation is a simple custom dialog.

### Tabs

1. My tabs switch content using React state and support basic keyboard navigation.

2. shadcn/ui provides a more complete implementation with better accessibility support and reusable components.

## What I learned

Building the components manually helped me understand how dialogs, tabs, keyboard navigation, and ARIA attributes work. Reading the shadcn source showed how a production-ready component library handles accessibility and reusability more completely.