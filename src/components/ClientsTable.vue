<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountEdit, mdiTrashCan, mdiEye, mdiBallot } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from  '@/components/Field.vue'
import Control from '@/components/Control.vue'

const props = defineProps({
  checkable: Boolean,
  fields: Array
})

const store = useStore()

const darkMode = computed(() => store.state.darkMode)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])


const itemsPaginated = computed(
  () => props.fields.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(props.fields.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []
  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}

//Jobs
const jobs = [{ id: 1, label: 'Dosen' }, { id: 2, label: 'Mahasiswa' }]

//Update DPT handler
const updateForm = reactive({
	name: '',
	username: '',
	password: '',
	job: jobs[0]
})

//Fill data automatic
const btnUpdate = data => {
	//Trigger modal
	isModalActive.value = true

	//Fill form
	updateForm.name = data.fullname
	updateForm.username = data.username
	updateForm.password = data.password
	updateForm.job = jobs.filter(j => j.label === data.job_name)[0].id
	//alert(JSON.stringify())
	//alert(JSON.stringify(jobs.filter(j => j.label === data.job_name)[0]))
}

</script>

<template>

<!-- Update Modal -->
  <modal-box
    v-model="isModalActive"
    title="Update Data Pemilih"
    has-cancel
  >
    <Field label="Nama">
      <Control
        v-model="updateForm.name"
        placeholder="Ubah nama DPT"
        :icon="mdiAccountEdit" />
    </Field>

    <Field label="Username">
      <Control
       v-model="updateForm.username"
       placeholder="Ubah username DPT"
       :icon="mdiAccountEdit" 
       class="mb-6"/>
    </Field>

    <Field label="Password">
      <Control 
        v-model="updateForm.password"
        placeholder="Ubah password DPT"
        :icon="mdiEye"
        class="mb-6"/>
    </Field>

    <Field label="Job">
      <Control
       v-model="updateForm.job"
       :options="jobs"
       :icon="mdiAccountEdit"/>
    </Field>
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Hapus data pemilih"
    button="danger"
    has-cancel
  >
    <p>Anda akan menghapus data secara <b>permanen</b></p>
  </modal-box>

  <div
    v-if="checkedRows.length"
    class="bg-gray-50 p-3 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>
<!-- End of Modal -->

<!-- Table -->
  <table>
    <thead>
      <tr>
         <th>Name</th>
         <th>Username</th>
         <th>Password</th>
         <th>Job</th>
         <th>Status</th>
         <th>Timestamp</th>
         <th>Edited</th>
         <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in itemsPaginated"
        :key="item.username"
      >
        <td data-label="Name">
          {{ item.fullname }}
        </td>
        <td data-label="Username">
          {{ item.username }}
        </td>
        <td data-label="Password">
          {{ item.password }}
        </td>
        <td data-label="Job">
          {{ item.job_name }}
        </td>
        <td data-label="Status">
          {{ item.status_vote > 0 ? 'sudah' : 'belum'}}
        </td>
        <td data-label="Timestamp">
          <small
            class="text-gray-500 dark:text-gray-400"
            :title="item.timestamp"
          >{{ new Date(item.time_stamp).toLocaleString('id') }}</small>
        </td>
        <td data-label="Edited">
          <small
            class="text-gray-500 dark:text-gray-400"
            :title="item.lastModified"
          >{{ new Date(item.lastModified).toLocaleString('id') }}</small>
        </td>
        <td data-label="actions" class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="success"
              :icon="mdiAccountEdit"
              small
              @click="btnUpdate(item)"
            />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
