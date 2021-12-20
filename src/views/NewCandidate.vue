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

const titleStack = ref(['Admin', 'Tambah Paslon'])


//Form handler
const form = reactive({
	chairmanName: '',
	chairmanImage: '',
	viceChairmanName: '',
	viceChairmanImage: '',
	candidateNumber: ''	
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tambah Pasangan Calon Baru</hero-bar>
  <main-section>
  <card-component
      class="mb-6"
    >
    <Field label="Nomor urut pasangan">
       <Control
         v-model="form.candidateNumber"
         class="mb-6"
         type="number"
         placeholder="Masukkan nomor urut pasangan calon" />
     </Field>
          
      <Field label="Calon Ketua Umum">
        <Control
          v-model="form.chairmanName"
          class="mb-6"
          placeholder="Nama lengkap calon" />
      </Field>

      <Field label="Foto Calon Ketua Umum">
        <Control
          v-model="form.chairmanImage"
          class="mb-6"
          placeholder="Link upload foto calon" />
      </Field>

      <Field label="Calon Wakil Ketua Umum">
        <Control
          v-model="form.viceChairmanName"
          class="mb-6"
          placeholder="Nama lengkap calon" />
      </Field>

      <Field label="Foto Calon Wakil Ketua Umum">
        <Control
          v-model="form.viceChairmanImage"
          class="mb-6"
          placeholder="Link upload foto calon" />
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
