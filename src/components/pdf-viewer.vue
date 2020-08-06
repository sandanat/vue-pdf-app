<template>
  <a :href="pdf">PDF</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import "pdfjs-dist/es5/build/pdf";
import * as pdfApp from "pdfjs-dist/lib/web/app";
import "pdfjs-dist/lib/web/genericcom";
import "pdfjs-dist/lib/web/pdf_print_service";
import "pdfjs-dist/build/pdf.worker.entry";
import "../css/index.css";


@Component
export default class HelloWorld extends Vue {
  @Prop({ required: false }) private pdf!: string | ArrayBuffer;
}
</script>