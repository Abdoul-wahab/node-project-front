<template>
<div justify="center">
  <a-form layout="vertical" :form="form" @submit="handleSubmit" 
  :style="{ margin: '24px', padding: '24px', background: '#fff', width: '350px',  borderRadius: '10px', }"
  >
    <a-divider orientation="center">
      Créer un compte
    </a-divider>
    <a-alert v-for="(item, index) in errors" :key="index" :message="item[0]" type="error" :description="item[0]" show-icon banner closable />
    <a-form-item 
    :validate-status="nameError() ? 'error' : ''" :help="nameError() || ''">
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: 'Entrez votre Nom!' }] },
        ]"
        placeholder="Nom"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item 
    :validate-status="emailError() ? 'error' : ''" :help="emailError() || ''">
      <a-input
        v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Entrez votre adresse mail!' }] },
        ]"
        placeholder="E-mail"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item 
    :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Entrez votre mot de passe!' }] },
        ]"
        type="password"
        placeholder="Mot de passe"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item 
    :validate-status="confirmPasswordError() ? 'error' : ''" :help="confirmPasswordError() || ''">
      <a-input
        v-decorator="[
          'password_confirmation',
          { rules: [{ required: true, message: 'Entrez le même mot de passe !' }] },
        ]"
        type="password"
        placeholder="confirmez votre mot de passe"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5}">
      <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
        Créer mon compte
      </a-button>
    </a-form-item>
    <router-link to="/login" class="nav-text">
      <a-button type="link">
        Déjà un compte ? Se Connecter
      </a-button>
     </router-link>
  </a-form>
</div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: "Register",
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'register' }),
      errors: null,
      message: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    nameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('name') && getFieldError('name');
    },

    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('email') && getFieldError('email');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },

    confirmPasswordError() {
      const { getFieldError, isFieldTouched } = this.form;
      this.form.validateFields((err, values) => {
        if (!err) {
          return values.password != values.password_confirmation
        }else{
          return isFieldTouched('password_confirmation') && getFieldError('password_confirmation')
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          
          this.$store.dispatch('register', values)
          .then(() => this.$router.push('/'))
          .catch(err => {
            console.log(err)
          })

          //console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>