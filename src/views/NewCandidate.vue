<script setup>
import { ref, reactive } from 'vue'
import { mdiContentSaveMoveOutline, mdiInformation, mdiAccountEdit } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import FilePicker from '@/components/FilePicker.vue'
import ajax from '@/helper/ajax'

const titleStack = ref(['Admin', 'Tambah Paslon'])

//Form handler
const form = reactive({
	chairman_name: '',
	chairman_image: {},
	vice_chairman_name: '',
	vice_chairman_image: {},
	candidate_number: ''	
})

const resetForm = () => {
  form.candidate_number = ''
  form.chairman_name = ''
  form.vice_chairman_name = ''
  form.chairman_image = {}
  form.vice_chairman_image = {}

}

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref()

//Insert handler
const submit = async () => {
  try {
    const formData = new FormData()
    
    formData.append('candidate_number', form.candidate_number)
    formData.append('chairman_name', form.chairman_name)
    formData.append('vice_chairman_name', form.vice_chairman_name)
    formData.append('chairman_image', form.chairman_image)
    formData.append('vice_chairman_image', form.vice_chairman_image)
    
    const res = await ajax.post('/admin/candidate/', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE'
      }
    })
    // status.true
    if ( res?.data?.status ) {
      showNotif.value = true
      textNotif.value = res?.data?.results
      colorNotif.value = 'info'
    }
    // reset form
    resetForm()

  } catch(err) {
    if (err?.response) {
      textNotif.value = err?.response?.data?.results?.name
      showNotif.value = true
      colorNotif.value = 'warning'
    }
  }
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tambah Pasangan Calon Baru</hero-bar>
  <main-section>
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
      <Field label="Nomor urut pasangan">
        <Control
          v-model="form.candidate_number"
          class="mb-6"
          type="number"
          placeholder="Masukkan nomor urut pasangan calon" />
      </Field>
            
      <Field label="Calon Ketua Umum">
        <Control
          v-model="form.chairman_name"
          class="mb-6"
          placeholder="Nama lengkap calon" />
      </Field>

      <Field label="Foto Calon Ketua Umum">
        <FilePicker 
          :icon="mdiAccountEdit"
          @update:modelValue="file => form.chairman_image = file"
          name="chairman_image"
          class="mb-6">
        </FilePicker>
      </Field>

      <Field label="Calon Wakil Ketua Umum">
        <Control
          v-model="form.vice_chairman_name"
          class="mb-6"
          placeholder="Nama lengkap calon" />
      </Field>

      <Field label="Foto Calon Ketua Umum">
        <FilePicker 
          :icon="mdiAccountEdit"
          @update:modelValue="file => form.vice_chairman_image = file"
          name="chairman_image"
          class="mb-6">
        </FilePicker>
      </Field>

      <JbButtons type="justify-start lg:justify-end">
        <JbButton 
          label="Submit"
          @click="submit()"
          :icon="mdiContentSaveMoveOutline"
          color="info" />
      </JbButtons>
    </card-component>
  </main-section>
</template>
