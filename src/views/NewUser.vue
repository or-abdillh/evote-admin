<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountGroup, mdiContentSaveMoveOutline, mdiInformation } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import ModalBox from '@/components/ModalBox.vue'
import Notification from '@/components/Notification.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import FilePickerVue from '@/components/FilePicker.vue'
import ajax from '@/helper/ajax'

const titleStack = ref(['Admin', 'Tambah Pemilih'])
const isModalActive = ref(false)

const genders = ['male', 'female']

//Form handler
const form = reactive({
	fullname: '',
	username: '',
	password: '',
	job: '',
	gender: ''
})

const submit = async () => {
  try {
    const res = await ajax.post('/admin/user', form, {
      headers: {
          token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE'
        }
    })
    showNotif.value = true
    textNotif.value = res?.data?.results
    colorNotif.value = 'info'
  } catch(err) {
    if (err?.response) {
      textNotif.value = err.response?.data
      showNotif.value = true
      colorNotif.value = 'warning'
    }
  }
}

const emits = defineEmits(['upload:file'])

// Excel uploader
let excel = ref(null)

const exportExcel = file => excel.value = file

const uploadPercent = ref(0)

const progressEvent = progressEvent => {
  uploadPercent.value = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  )
}

const uploadExcel = async () => {
  isModalActive.value = true
  // upload to server
  const formData = new FormData()

  formData.append('excel', excel.value)

  try {
    await ajax.post('/admin/user/excel', formData, { 
      headers: { 
        'Content-Type': 'multipart/form-data',
        token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE',
      },
      onUploadProgress: progressEvent
    })
    showNotif.value = true
    textNotif.value = 'Success export data from excel'
    colorNotif.value = 'info'
  } catch(err) {
    if (err?.response) {
      textNotif.value = err.response?.data?.results?.name
      showNotif.value = true
      colorNotif.value = 'warning'
    }
  }
}

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref()

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tambah Pemilih Baru pada DPT</hero-bar>
  <main-section>
    <!-- export excel -->
    <section class="mb-6">
      <Field class="mb-0 flex gap-1">
        <FilePickerVue class="mb-0"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @update:modelValue="exportExcel"
          label="Export from excel"></FilePickerVue>
          <JbButtons type="justify-start lg:justify-start">
              <JbButton 
                @click="uploadExcel"
                :icon="mdiContentSaveMoveOutline"
                class="mb-0"
                color="success" />
          </JbButtons>
      </Field>
    </section>

   <Notification 
      v-on:close="showNotif = false"
      v-if="showNotif"
      :color="colorNotif"
      :icon="mdiInformation">
        {{ textNotif }}
   </Notification>
  <card-component
      class="mb-6"
    >
      <Field label="Nama">
        <Control
          v-model="form.fullname"
          class="mb-6"
          placeholder="Nama lengkap pemilih" />
      </Field>

      <Field label="Username">
        <Control 
          v-model="form.username"
          class="mb-6"
          placeholder="Username pemilih" />
       </Field>

       <Field label="Password">
         <Control 
           v-model="form.password"
           class="mb-6"
           placeholder="Password pemilih" />
       </Field>

       <Field label="Job">
        <Control 
           v-model="form.job"
           class="mb-6"
           placeholder="Pekerjaan pemilih" />
       </Field>
       
       <Field label="Gender">
         <Control
           v-model="form.gender"
           :options="genders"
           class="mb-6" />
       </Field>

       <JbButtons type="justify-start lg:justify-end">
         <JbButton 
           label="Submit"
           @click="submit"
           :icon="mdiContentSaveMoveOutline"
           color="info" />
       </JbButtons>
    </card-component>
  </main-section>
</template>
