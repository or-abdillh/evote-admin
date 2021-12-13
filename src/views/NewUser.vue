<script setup>
import { ref, reactive, computed } from 'vue'
import { mdiAccountGroup, mdiContentSaveMoveOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

const titleStack = ref(['Admin', 'Tambah Pemilih'])

const jobs = [{ id: 0, label: 'Dosen' }, { id: 1, label: 'Mahasiswa' }]

//Form handler
const form = reactive({
	name: '',
	username: '',
	password: '',
	job: jobs[0]
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tambah Pemilih Baru pada DPT</hero-bar>
  <main-section>
  <card-component
      class="mb-6"
    >
      <Field label="Nama">
        <Control
          v-model="form.name"
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
           :options="jobs"
           class="mb-6" />
       </Field>

       <JbButtons type="justify-start lg:justify-end">
         <JbButton 
           label="Submit"
           :icon="mdiContentSaveMoveOutline"
           color="info" />
       </JbButtons>
    </card-component>
  </main-section>
</template>
