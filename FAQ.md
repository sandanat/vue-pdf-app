- [Can I interract with Mozilla's pdfjs library outside the event handlers of pdf viewer?](#can-i-interract-with-mozilla's-pdfjs-library-outside-the-event-handlers-of-pdf-viewer)
- [Can I use pdf viewer in a dialog?](#can-i-use-pdf-viewer-in-a-dialog)

Still have a question? Create an issue!

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
