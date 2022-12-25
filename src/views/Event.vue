<script setup>
import { ref, reactive, onMounted } from 'vue'
import { mdiContentSaveMoveOutline, mdiInformation } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import CardWidget from '@/components/CardWidget.vue'
import http from '@/helper/http.js'
import ajax from '@/helper/ajax'

const titleStack = ref(['Admin', 'Kelola Acara'])

//Form handler
const form = reactive({
	start: '',
	end: '',
	title: '',
	passcode: ''
})

//Get API Handler
const eventStartAt = ref('')
const eventFinishAt = ref('')
const passcode = ref('passcode')

const getEvent = async () => {
   try {
      let res = await ajax.get('/admin/event')
      res = res?.data?.results
      eventStartAt.value = new Date(res.start).toLocaleString('id')
      eventFinishAt.value = new Date(res.end).toLocaleString('id')
      passcode.value = res.passcode
   } catch(err) {
      if (err?.response) alert(err.response.data.results)
   }
}

onMounted(() => {
   getEvent()
})

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')

//Update
const btnUpdate = async () => {
   try {
      const res = await ajax.put('/admin/event', form)
      if (res?.data?.status) {
         textNotif.value = 'Action success'
         getEvent()
      } 
   } catch(err) {
      if (err?.response) textNotif.value = 'Action fail : ' + err.response?.data?.results
   }
   showNotif.value = true
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola Kegiatan Evoting Anda</hero-bar>
  <main-section>
     <Notification v-on:close="showNotif = false" :icon="mdiInformation" color="info" v-if="showNotif">
        {{ textNotif }}
     </Notification>
     <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardWidget
        color="text-green-500"
        :text="eventStartAt"
        label="Acara dimulai pada"/>
        
        <CardWidget
        color="text-red-500"
        :text="eventFinishAt"
        label="Acara berakhir pada"/>
        
        <CardWidget
        color="text-green-500"
        :text="passcode"
        label="Passcode"/>
     </div>
     
  <card-component
      class="mb-6"
    >
       <Field label="Atur waktu dan tanggal">
          <Control
            v-model="form.start"
            class="mb-6"
            type="datetime"
            placeholder="Tanggal dan waktu acara dimulai" />
      </Field>
      <Field>
         <Control
            v-model="form.end"
            type="datetime"
            value="2021-12-25 T09:00"
            placeholder="Tanggal dan waktu acara berakhir"/>
      </Field>
      
      <Field label="Atur tema kegiatan anda">
         <Control
            v-model="form.title"
            type="textarea"
            placeholder="Tema kegiatan akan muncul pada aplikasi evote pemilih"/>
      </Field>
      
      <Field label="Atur passcode">
         <Control
            v-model="form.passcode"
            type="text"
            placeholder="Tentukan passcode pada kegiatan anda"/>
      </Field>

       <JbButtons type="justify-start lg:justify-end">
         <JbButton 
           @click="btnUpdate"
           label="Submit"
           :icon="mdiContentSaveMoveOutline"
           color="info" />
       </JbButtons>
    </card-component>
  </main-section>
</template>
