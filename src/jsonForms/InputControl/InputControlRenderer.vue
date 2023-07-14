<template>
  <k-input
      :id="control.id + '-input'"
      :value="control.data"
      :disabled="!control.enabled"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from '@progress/kendo-vue-inputs';
import { Button } from '@progress/kendo-vue-buttons';
import { rendererProps, useJsonFormsControl, RendererProps } from '../config/jsonforms';
import { ControlElement } from '@jsonforms/core';
export default defineComponent({
  name: 'InputControlRenderer',
  components: {
    'k-input': Input,
    'k-button': Button
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return (
      useJsonFormsControl(props),
      (target:any) => target.value || undefined
    );
  }
})
</script>