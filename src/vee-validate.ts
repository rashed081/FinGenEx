import type { createApp } from 'vue';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// Install VeeValidate components globally
export function setupVeeValidate(app: ReturnType<typeof createApp>) {
  app.component('Form', Form);
  app.component('Field', Field);
  app.component('ErrorMessage', ErrorMessage);

  // Register rules
  defineRule('required', required);
  defineRule('email', email);

  // Configure VeeValidate
  configure({
    generateMessage: localize({}),
    validateOnInput: true,
  });
}
export {Field, Form, ErrorMessage, defineRule, configure}