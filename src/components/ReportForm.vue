<template>
  <div class="modal-backdrop" @click="closeOnBackdropClick">
    <div class="modal-content form-modal" @click.stop>
      <h2 class="modal-title">Reporte por fecha de nacimiento</h2>
      <p class="modal-subtitle">
        Ingresa los siguientes datos para generar tu reporte
      </p>

      <div class="form-group">
        <label for="reportDescription" class="form-label"
          >Descripción del reporte</label
        >
        <input
          id="reportDescription"
          type="text"
          v-model="reportDescription"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Fecha de nacimiento</label>
        <div class="date-row">
          <div class="date-col" style="margin-right: 20px;">
            <label for="startDate" class="date-label">Inicio</label>
            <input
              id="startDate"
              type="date"
              v-model="startDate"
              class="form-input"
            />
          </div>
          <div class="date-col">
            <label for="endDate" class="date-label">Fin</label>
            <input
              id="endDate"
              type="date"
              v-model="endDate"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <div class="modal-buttons">
        <button
          class="btn-primary"
          :disabled="!allFieldsFilled"
          @click="createReport"
        >
          Generar reporte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

export default {
  name: 'ReportForm',
  setup(props, { emit }) {
    const reportDescription = ref('')
    const startDate = ref('')
    const endDate = ref('')

    const allFieldsFilled = computed(() => {
      return (
        reportDescription.value.trim() !== '' &&
        startDate.value !== '' &&
        endDate.value !== ''
      )
    })

    async function createReport() {
      if (!allFieldsFilled.value) return

      try {
        await apiClient.post('/api/generate-report', {
          title: reportDescription.value,
          start_date: startDate.value,
          end_date: endDate.value
        })
        
        emit('close')
      } catch (error) {
        console.error('Error al generar reporte:', error)
      }
    }

    function closeOnBackdropClick() {
      emit('close')
    }

    return {
      reportDescription,
      startDate,
      endDate,
      allFieldsFilled,
      createReport,
      closeOnBackdropClick
    }
  }
}
</script>


<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content.form-modal {
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 480px;
  max-width: 90%;
}

.modal-title {
  margin: 0 0 0.5rem;
  text-align: center;
  font-weight: 800;
  font-size: 22px;
}

.modal-subtitle {
  margin: 0 0 1.5rem;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-right: 25px;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.date-row {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.date-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.date-label {
  margin-bottom: 0.3rem;
  font-weight: 500;
  font-size: 0.85rem;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-primary {
  padding: 12px 40px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 400;
  transition: background-color 0.2s ease;
  background-color: #ccc;
  color: #181818;
  box-shadow: 0px 4px 4px 0px #00000040;
}
.btn-primary:enabled {
  background-color: #ffc107;
}
.btn-primary:enabled:hover {
  background-color: #e6ac08;
}
.btn-primary:disabled {
  cursor: not-allowed;
}
.btn-primary:disabled:hover {
  background-color: #bbb;
}
</style>
