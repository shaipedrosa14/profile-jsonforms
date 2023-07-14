<template>
  <div id="app">
    <div class="row example-wrapper">
      <div class="col-xs-12 col-sm-6 offset-sm-3 example-col">
        <div class="card">
            <div class="card-block">
              <form class="k-form">
                <fieldset>
                  <legend>CREATE A PROFILE</legend>
                  <div class="mb-3">
                    <json-forms
                      :data="data"
                      :renderers="renderers"
                      :schema="schema"
                      :uischema="uischema"
                      @change="onChange"
                      :Ajv="ajv"
                    />
                  </div>
                </fieldset>
                <br/>
                <k-button :disabled="!isAgeAboveLimit" type="submit" :size="'large'" :theme-color="'primary'">Next</k-button>
              </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Button } from '@progress/kendo-vue-buttons';
import { defineComponent } from "vue";

// imports for jsonForms
import { JsonForms, JsonFormsChangeEvent } from "@jsonforms/vue";
import { schema } from "./jsonForms/schema.ts"
import { uischema } from "./jsonForms/ui-schema.ts"
import { defaultStyles, mergeStyles, vanillaRenderers } from "@jsonforms/vue-vanilla";
import { createAjv } from '@jsonforms/core';
import { default as InputControlRenderer } from './jsonForms/InputControl/InputControlRenderer.vue';
import { default as InputControlTest } from './jsonForms/InputControl/InputControlTester.ts';

// jsonForms configurations
const myStyles = mergeStyles(defaultStyles, { control: { label: "mylabel" } });
const renderers = [
  ...vanillaRenderers,
  // to customized a renderer you need to create your own renderer, and must have its tester
  { tester: InputControlTest, renderer: InputControlRenderer }
];

// added a validation for the email regex validation
const ajv = createAjv();
ajv.addFormat('email', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export default defineComponent({
  name: "App",
  components: {
    JsonForms,
    'k-button': Button
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      data: {
        firstname: "Shaira Mae",
        lastname: "Pedrosa",
        birthday: '2005-07-15',
        email: "s.pedrosa1997@gmail.com",
        age: 0
      },
      schema,
      uischema,
      ajv
    };
  },
  computed: {
    isAgeAboveLimit () {
      let isAgeAbove: boolean = false;
      if (this.data.age > 18) {
        isAgeAbove = true;
      }
      return isAgeAbove;
    }
  },
  methods: {
    async onChange(event: JsonFormsChangeEvent) {
      try {
        console.info("Change happens!", event.data);
        this.data = await event.data;
        this.data.age = this.getAge(); // calculates the age from the birthday. 
      } catch (error) {
        console.log(error)
      }
    },
    getAge() {
      let currentDate: any = new Date();
      let birthDate: any = new Date(this.data.birthday);
      let difference: any = currentDate - birthDate;
      let age: number = Math.floor(difference/31557600000);
      return age;
    }
  },
  provide() {
    return {
      styles: myStyles,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mylabel {
  color: darkslategrey;
}
.vertical-layout {
  margin-left: 10px;
  margin-right: 10px;
}
.myform {
  margin: 0 auto;
}
.text-area {
  min-height: 80px;
}
</style>