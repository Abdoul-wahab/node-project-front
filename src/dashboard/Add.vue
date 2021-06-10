<template>
    <div justify="center" class="mt-4">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="Name">
                <a-input
                    v-decorator="['name', { rules: [{ required: true, message: 'Entrer a name !' }] }]"
                    placeholder="Name"
                />
            </a-form-item>

            <a-form-item label="Description">
                <a-input
                    v-decorator="[
                    'description',
                    { rules: [{ required: true, message: 'Entrer a description !' }] },
                    ]"
                    placeholder="Description" type="textarea"
                />
            </a-form-item>


            <a-form-item label="Role">
                <a-input
                    v-decorator="[
                    'role',
                    { rules: [{ required: true, message: 'Entrer a role !' }] },
                    ]"
                    placeholder="role"
                />
            </a-form-item>

            <a-form-model-item label="Type">
                <a-select 
                
                v-decorator="[
                    'Type',
                    { rules: [{ required: true, message: 'Entrer a Type !' }] },
                    ]"
                    placeholder="Type">
                    <a-select-option value="Student">
                        Student
                    </a-select-option>
                    <a-select-option value="Work">
                        Work
                    </a-select-option>
                    <a-select-option value="Freelance">
                        Freelance
                    </a-select-option>
                </a-select>
            </a-form-model-item>

            <a-form-model-item label="Start Date">
                <a-date-picker
                    v-decorator="[
                    'startDate',
                    { rules: [{ required: true, message: 'Enter Start Date !' }] },
                    ]"
                    placeholder="Start Date"
                    show-time
                    type="date"
                    style="width: 100%;"
                />
            </a-form-model-item>

            <a-form-model-item label="End Date">
                <a-date-picker
                    v-decorator="[
                    'endDate',
                    { rules: [{ required: true, message: 'Enter End Date !' }] },
                    ]"
                    placeholder="End Date"
                    show-time
                    type="date"
                    style="width: 100%;"
                />
            </a-form-model-item>

            <!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-upload
                    name="file"
                    accept="image/*"
                    list-type="picture"
                    :multiple="false"
                    :customRequest="customRequest"
                    >
                    <a-button> <a-icon type="upload" /> Image </a-button>
                </a-upload>
            </a-form-item> -->
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    Save
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
            this.form.validateFields((err, form) => {
                if (!err) {

                    console.log(form)
                    this.$axios.post('/v1/experience', form)
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
    },
    
}
</script>