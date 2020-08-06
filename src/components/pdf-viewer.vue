<template>
  <a :href="pdf">PDF</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import "@/pdfjs-dist/es5/build/pdf";
import * as pdfApp from "@/pdfjs-dist/lib/web/app";
import { AppOptions } from "@/pdfjs-dist/lib/web/app_options";
import "@/pdfjs-dist/lib/web/genericcom";
import "@/pdfjs-dist/lib/web/pdf_print_service";
import "@/pdfjs-dist/build/pdf.worker.entry";
import "../css/index.css";

if (AppOptions) {
  AppOptions.set("defaultUrl", null);
  AppOptions.set("locale", "ru");
}

@Component
export default class HelloWorld extends Vue {
  @Prop({ required: false }) private pdf!: string | ArrayBuffer;
}
</script>