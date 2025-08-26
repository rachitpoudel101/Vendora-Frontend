<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />
      <main class="flex-1 flex items-center justify-center px-6 py-10">
        <div class="bg-white p-8 rounded shadow w-full max-w-lg text-center">
          <h2 class="text-3xl font-bold mb-4 text-blue-700">Stocks</h2>
          <!-- Create Stock Button -->
          <div class="flex justify-end mb-4">
            <button
              class="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full shadow hover:scale-105 transition-transform flex items-center gap-2"
              @click="showCreateModal = true"
            >
              <span class="material-icons text-lg">add_box</span>
              <span>Create Stock</span>
            </button>
          </div>
          <!-- Stocks Table UI -->
          <div class="overflow-x-auto mt-2">
            <table class="min-w-full border border-gray-200 rounded">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 border-b text-left">SN</th>
                  <th class="px-4 py-2 border-b text-left">Product Name</th>
                  <th class="px-4 py-2 border-b text-left">Category Name</th>
                  <th class="px-4 py-2 border-b text-left">Stocks</th>
                  <th class="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in sampleStocks" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-4 py-2 border-b">{{ idx + 1 }}</td>
                  <td class="px-4 py-2 border-b">{{ item.productName }}</td>
                  <td class="px-4 py-2 border-b">{{ item.categoryName }}</td>
                  <td class="px-4 py-2 border-b">{{ item.stocks }}</td>
                  <td class="px-4 py-2 border-b">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      @click="openViewModal(item.id)">View</button>
                    <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm ml-2"
                      @click="openEditModal(item.id)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Modals -->
          <Modal
            v-if="showViewModal"
            :show="showViewModal"
            width="400px"
            height="260px"
            customClass="stock-modal"
            @close="showViewModal = false"
          >
            <h3 class="text-xl font-bold mb-4 text-blue-700">View Stock</h3>
            <div class="mb-2 text-left">
              <div><span class="font-semibold">Product Name:</span> {{ selectedStock?.productName }}</div>
              <div><span class="font-semibold">Category:</span> {{ selectedStock?.categoryName }}</div>
              <div><span class="font-semibold">Stocks:</span> {{ selectedStock?.stocks }}</div>
            </div>
            <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded" @click="showViewModal = false">Close</button>
          </Modal>
          <Modal
            v-if="showEditModal"
            :show="showEditModal"
            width="400px"
            height="340px"
            customClass="stock-modal"
            @close="showEditModal = false"
          >
            <h3 class="text-xl font-bold mb-4 text-blue-700">Edit Stock</h3>
            <form @submit.prevent="showEditModal = false" class="flex flex-col gap-3">
              <input v-model="editForm.productName" type="text" placeholder="Product Name" class="border rounded px-3 py-2" />
              <input v-model="editForm.categoryName" type="text" placeholder="Category Name" class="border rounded px-3 py-2" />
              <input v-model="editForm.stocks" type="number" placeholder="Stocks" class="border rounded px-3 py-2" />
              <div class="flex justify-end gap-2 mt-4">
                <button type="button" class="px-4 py-2 bg-gray-200 rounded" @click="showEditModal = false">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
              </div>
            </form>
          </Modal>
          <Modal
            v-if="showCreateModal"
            :show="showCreateModal"
            width="400px"
            height="420px"
            customClass="stock-modal"
            @close="showCreateModal = false"
          >
            <h3 class="text-xl font-bold mb-4 text-blue-700">Create Stock</h3>
            <form @submit.prevent="showCreateModal = false" class="flex flex-col gap-3">
              <input v-model="createForm.productName" type="text" placeholder="Product Name" class="border rounded px-3 py-2" />
              <input v-model="createForm.categoryName" type="text" placeholder="Category Name" class="border rounded px-3 py-2" />
              <input v-model.number="createForm.cp" type="number" placeholder="Cost Price (cp)" class="border rounded px-3 py-2" />
              <input v-model.number="createForm.margin" type="number" placeholder="Margin" class="border rounded px-3 py-2" />
              <input v-model.number="createForm.stocks" type="number" placeholder="Stocks" class="border rounded px-3 py-2" />
              <div class="flex items-center gap-2">
                <span class="font-semibold">Selling Price (sp):</span>
                <span class="text-blue-700 font-bold">{{ sellingPrice }}</span>
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <button type="button" class="px-4 py-2 bg-gray-200 rounded" @click="showCreateModal = false">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
              </div>
            </form>
          </Modal>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
onMounted(async () => {
  if (!auth.user) {
    await auth.self()
  }
})
const sampleStocks = [
  { id: 1, productName: 'Pen', categoryName: 'Stationery', stocks: 120 },
  { id: 2, productName: 'Notebook', categoryName: 'Stationery', stocks: 80 },
  { id: 3, productName: 'Marker', categoryName: 'Stationery', stocks: 45 }
]
const showViewModal = ref(false)
const showEditModal = ref(false)
const showCreateModal = ref(false)
const selectedStockId = ref(null)
const selectedStock = ref(null)
const editForm = ref({ productName: '', categoryName: '', stocks: 0 })
const createForm = ref({
  productName: '',
  categoryName: '',
  cp: 0,
  margin: 0,
  stocks: 0
})
const sellingPrice = computed(() => {
  const cp = Number(createForm.value.cp) || 0
  const margin = Number(createForm.value.margin) || 0
  return cp + margin
})

function openViewModal(id) {
  selectedStockId.value = id
  selectedStock.value = sampleStocks.find(s => s.id === id)
  showViewModal.value = true
}
function openEditModal(id) {
  selectedStockId.value = id
  const stock = sampleStocks.find(s => s.id === id)
  editForm.value = { ...stock }
  showEditModal.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(60, 60, 120, 0.15);
  backdrop-filter: blur(2px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.stock-modal {
  border: 2px solid #3b82f6;
  box-shadow: 0 0 24px 0 rgba(59, 130, 246, 0.15);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
  /* Add any other custom styles you want for stock modals */
}
</style>