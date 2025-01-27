<template>
  <div>
    <div 
      class="notification success"
      v-if="showSuccessNotification"
      @click="closeNotification"
    >
      ¡Reporte generado exitosamente!
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th style="text-align: center;">Fecha de creación</th>
            <th style="text-align: right;">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report in reports"
            :key="report.id"
            :class="{'new-report': newReportIds.includes(report.id)}"
          >
            <td>{{ report.title }}</td>
            <td style="text-align: center;">{{ formatDate(report.created_at) }}</td>
            <td style="text-align: right;">
              <a
                v-if="report.report_link"
                :href="report.report_link"
                download
                style="color: inherit; text-decoration: none;"
              >
                <span style="text-decoration: underline;">Descargar</span>
                <span> 📥</span>
              </a>
              <span v-else style="color: #777;">Sin link</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="btn-container">
      <button class="btn-primary" @click="showForm = true">
        Crear reporte
      </button>
    </div>

    <ReportForm v-if="showForm" @close="showForm = false" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ReportForm from '@/components/ReportForm.vue'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

export default {
  name: 'ReportList',
  components: { ReportForm },
  setup() {
    const showForm = ref(false)
    const reports = ref([])
    const newReportIds = ref([])
    const showSuccessNotification = ref(false)

    async function fetchReports() {
      try {
        const response = await apiClient.get('/api/list-reports')
        reports.value = response.data
      } catch (error) {
        console.error('Error al obtener reportes:', error)
      }
    }

    function formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }

    function closeNotification() {
      showSuccessNotification.value = false
    }

    onMounted(() => {
      fetchReports()

      window.Echo.channel('reports')
        .listen('.report.generated', (e) => {
          // e.report es el nuevo reporte
          reports.value.unshift(e.report)
          newReportIds.value.push(e.report.id) 

          showSuccessNotification.value = true

          setTimeout(() => {
            showSuccessNotification.value = false
          }, 5000)
        })
    })

    return {
      showForm,
      reports,
      newReportIds,
      showSuccessNotification,
      formatDate,
      closeNotification
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  margin-top: 1.5rem;
}

.new-report {
  background-color: #b0ebb0; 
}

.notification {
  position: fixed;
  top: 40px;
  right: 20px;
  padding: 14px 20px;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  z-index: 9999;

  &.success {
    background-color: #4caf50; 
  }
}
</style>
