- [Can I use two pdf viewers on a page?](#can-i-use-two-pdf-viewers-on-a-page)
- [Can I interract with Mozilla's pdfjs library outside the event handlers of pdf viewer?](#can-i-interract-with-mozilla's-pdfjs-library-outside-the-event-handlers-of-pdf-viewer)
- [Can I use pdf viewer in a dialog?](#can-i-use-pdf-viewer-in-a-dialog)
- [Can I set a default page scale when a pdf document is opening?](#can-i-set-a-default-page-scale-when-a-pdf-document-is-opening)
- [Can I programmatically jump to the certain page when a pdf document is opening?](#can-i-programmatically-jump-to-the-certain-page-when-a-pdf-document-is-opening)

Still have a question? Create an issue!

# Can I use two pdf viewers on a page?

It is impossible. The package repeats the structure of Mozilla's pdf viewer and internally it uses elements IDs to bind functionality. When two pdf viewers are used elements with equal IDs are created. That means that only the first pdf viewer can be operable.

# Can I interract with Mozilla's pdfjs library outside the event handlers of pdf viewer?

Yes. You can bind pdfjs lib to parent data through `v-on:after-created` event. Make it non-reactive as it is a huge object:

```vue
<vue-pdf-app @after-created="afterCreatedHandler"></vue-pdf-app>

<script>
export default {
  data() {},
  methods: {
    afterCreatedHandler(pdfApp) {
      // this.pdfApp is non-reactive because it is not in data
      // for typescript use class { pdfApp?: unknown }
      this.pdfApp = pdfApp;
    }
  }
};
</script>
```

# Can I use pdf viewer in a dialog?

It is possible in most cases. In case of troubles try to add `v-if` to pdf viewer:

```vue
<vue-pdf-app v-if="isDialogVisible"></vue-pdf-app>
```

# Can I set a default page scale when a pdf document is opening?

```vue
<vue-pdf-app @pages-rendered="pagesRenderedHandler"></vue-pdf-app>

<script>
export default {
  methods: {
    pagesRenderedHandler(pdfApp) {
      setTimeout(() => {
        pdfApp.pdfViewer.currentScaleValue = 1; // 100%;
        // pdfApp.pdfViewer.currentScaleValue = 0.2 // 20%;
        // pdfApp.pdfViewer.currentScaleValue = "page-actual"
        // pdfApp.pdfViewer.currentScaleValue = "page-width"
        // pdfApp.pdfViewer.currentScaleValue = "page-height"
        // pdfApp.pdfViewer.currentScaleValue = "page-fit"
        // pdfApp.pdfViewer.currentScaleValue = "auto"
      });
    }
  }
};
</script>
```

# Can I programmatically jump to the certain page when a pdf document is opening?

```vue
<vue-pdf-app @pages-rendered="pagesRenderedHandler"></vue-pdf-app>

<script>
export default {
  methods: {
    pagesRenderedHandler(pdfApp) {
      setTimeout(() => {
        pdfApp.page = pageNumber;
      });
    }
  }
};
</script>
```
