<template>
<div justify="center">
  <a-form layout="vertical" :form="form" @submit="handleSubmit" 
  :style="{ margin: '24px 16px', padding: '24px', background: '#fff', width: '350px',  borderRadius: '10px', }"
  >
    <a-divider orientation="center">
      Connexion
    </a-divider>
    <a-alert
    v-if="error"
      message="Identifiants invalid"
      banner
      closable
    />
    <a-form-item 
    :validate-status="emailError() ? 'error' : ''" :help="emailError() || ''">
      <a-input
        v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Entrez votre adresse mail !' }] },
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
          { rules: [{ required: true, message: 'Entrez votre mot de passe !' }] },
        ]"
        type="password"
        placeholder="Mot de passe"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
        Se Connecter
      </a-button>
    </a-form-item>
     <router-link to="/register" class="nav-text">
      <a-button type="link">
        Pas de compte ? S'inscrire
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
  name: "Login",
  data() {
    return {
      hasErrors,
      error: false,
      form: this.$form.createForm(this, { name: 'login' }),
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
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('email') && getFieldError('email');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-unused-vars
          const { email, password } = values
          console.log(values)
          this.$store.dispatch('login', values)
          .then(() => this.$router.push('/dashboard'))
          .catch(err => {
            this.$message.error('Indentifiants Invalides');
            console.log(err)
          })
        }
      });
    },
  },
};
</script>