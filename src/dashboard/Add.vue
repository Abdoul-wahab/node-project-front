<template>
    <div justify="center" class="mt-4">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="Nom">
                <a-input
                    v-decorator="['name', { rules: [{ required: true, message: 'Un nom est requit !' }] }]"
                    placeholder="Nom"
                />
            </a-form-item>
            <a-form-item label="Description">
                <a-input
                    v-decorator="[
                    'description',
                    { rules: [{ required: true, message: 'Entrez une description !' }] },
                    ]"
                    placeholder="Description"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-upload
                    name="file"
                    accept="image/*"
                    list-type="picture"
                    :multiple="false"
                    :customRequest="customRequest"
                    >
                    <a-button> <a-icon type="upload" /> Image </a-button>
                </a-upload>
                <!-- <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"> -->
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    Enregistrer
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    name: 'Add',
    data(){
        return{
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'Restaurant' }),
            file: null,
            loading: false,
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    const form = new FormData()
                    form.append('name', values.name)
                    form.append('description', values.description)
                    form.append('image', this.file, this.file.name)

                    this.$axios.post('/resaturant/create', form)
                    .then(response => {
                        console.log(response)
                        this.$message.success(`Bien enrégistré !!`);
                        this.$emit('close')
                    })
                    .catch( error => {
                        console.log(error)
                        this.$message.error(`une ereur est survenue !!`);
                    })
                    .finally( () => this.loading = false);
                }
            });
        },
        uploadImage(e){
            console.log(e.target.files[0])
            this.file = e.target.files[0]
        },
        customRequest(info) {
            this.file = info.file
        }
    },
    
}
</script>