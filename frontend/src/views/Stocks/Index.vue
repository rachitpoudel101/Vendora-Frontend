<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 flex flex-col"
  >
    <Navbar />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 flex justify-center px-6 mt-5">
        <div
          class="bg-white p-10 rounded-2xl shadow-xl w-full text-center border border-blue-100 mt-0"
        >
          <h2
            class="float-left text-4xl font-extrabold mb-2 text-black-500 tracking-tight drop-shadow"
          >
            Stocks
          </h2>
          <!-- Create Stock & Category Buttons -->
          <div class="flex justify-end mb-6 gap-4">
            <button
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
              @click="showCreateModal = true"
            >
              <span class="material-icons text-lg">add_circle</span>
              <span>Create Stock</span>
            </button>
            <button
              class="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
              @click="showCreateCategoryModal = true"
            >
              <span class="material-icons text-lg">category</span>
              <span>Create Category</span>
            </button>
          </div>
          <!-- Stocks Table UI -->
          <!-- Stocks Table UI -->
          <div class="mt-2">
            <table
              class="min-w-full border border-gray-200 rounded-xl shadow-sm bg-white"
            >
              <thead class="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th
                    class="px-4 py-3 border-b text-center font-semibold text-black-100 text-lg"
                  >
                    SN
                  </th>
                  <th
                    class="px-4 py-3 border-b text-center font-semibold text-black-100 text-lg"
                  >
                    Product Name
                  </th>
                  <th
                    class="px-4 py-3 border-b text-center font-semibold text-black-100 text-lg"
                  >
                    Category Name
                  </th>
                  <th
                    class="px-4 py-3 border-b text-center font-semibold text-black-100 text-lg"
                  >
                    Stocks
                  </th>
                  <th
                    class="px-4 py-3 border-b text-center font-semibold text-black-100 text-lg"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in paginatedStocks"
                  :key="item.id"
                  class="hover:bg-blue-50 transition-colors"
                >
                  <td class="px-4 py-3 text-center border-b">
                    {{ (currentPage - 1) * itemsPerPage + idx + 1 }}
                  </td>
                  <td class="px-4 py-3 border-b text-center font-medium text-blue-900">
                    {{ item.name }}
                  </td>
                  <td class="px-4 py-3 border-b text-center font-medium text-green-700">
                    {{ item.category_name }}
                  </td>
                  <td
                    class="px-4 py-3 text-center border-b font-semibold text-purple-700"
                  >
                    {{ item.stock }}
                  </td>
                  <td class="py-3 px-4 flex justify-center relative">
                    <!-- Wrapper with relative -->
                    <div class="relative">
                      <!-- Three-dot button -->
                      <button
                        @click.stop="
                          dropdownOpen === item.id
                            ? (dropdownOpen = null)
                            : (dropdownOpen = item.id)
                        "
                        class="text-gray-700 hover:text-gray-900 focus:outline-none text-xl font-bold px-2 py-1"
                      >
                        ⋮
                      </button>
                      <!-- Dropdown menu -->
                      <div
                        v-if="dropdownOpen === item.id"
                        class="absolute right-0 mt-2 w-20 bg-white border rounded-md shadow-md z-50"
                      >
                        <ul class="flex flex-col text-sm text-gray-700">
                          <li>
                            <button
                              class="w-full text-left px-3 py-2 hover:bg-gray-100"
                              @click="
                                openViewModal(item.id);
                                dropdownOpen = null;
                              "
                            >
                              View
                            </button>
                          </li>
                          <li>
                            <button
                              class="w-full text-left px-3 py-2 hover:bg-gray-100"
                              @click="
                                openEditModal(item.id);
                                dropdownOpen = null;
                              "
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              class="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                              @click="deleteProducts(item.id)"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="loading">
                  <td
                    colspan="5"
                    class="text-center py-6 text-blue-600 font-semibold animate-pulse"
                  >
                    Loading...
                  </td>
                </tr>
                <tr v-if="error">
                  <td
                    colspan="5"
                    class="text-center py-6 text-red-500 font-semibold"
                  >
                    {{ error }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Add loading/error notification below the table -->
            <div v-if="loading" class="text-center py-6 text-blue-600 font-semibold animate-pulse">
              Loading...
            </div>
            <div v-if="error" class="text-center py-6 text-red-500 font-semibold">
              {{ error }}
            </div>
            <!-- Pagination Controls -->
            <div class="flex justify-between items-center mt-4">
              <button
                class="px-3 py-1 bg-gray-200 rounded shadow hover:bg-gray-300"
                @click="prevPage"
                :disabled="currentPage === 1"
              >
                Prev
              </button>

              <div class="flex gap-2">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1 rounded shadow',
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300',
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button
                class="px-3 py-1 bg-gray-200 rounded shadow hover:bg-gray-300"
                @click="nextPage"
                :disabled="currentPage === totalPages"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Modals -->
          <transition name="modal-fade">
            <div
              v-if="showViewModal"
              class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
              @click.self="showViewModal = false"
            >
              <Modal
                :show="showViewModal"
                customClass="stock-modal"
                @close="showViewModal = false"
              >
                <h3 class="text-2xl font-bold mb-4 text-blue-700">View Stock</h3>
                <div class="mb-2 text-left space-y-2">
                  <div>
                    <span class="font-semibold">Product Name:</span>
                    <span class="text-blue-900">{{ selectedStock?.name }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">Category:</span>
                    <span class="text-green-700">{{ selectedStock?.category_name }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">Stocks:</span>
                    <span class="text-purple-700">{{ selectedStock?.stock }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">Cost Price:</span>
                    <span class="text-gray-700">{{ selectedStock?.cost_price }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">Margin:</span>
                    <span class="text-gray-700">{{ selectedStock?.margin }}</span>
                  </div>
                </div>
                <button
                  class="mt-6 px-5 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all"
                  @click="showViewModal = false"
                >
                  Close
                </button>
              </Modal>
            </div>
          </transition>
          <transition name="modal-fade">
            <div
              v-if="showEditModal"
              class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
              @click.self="showEditModal = false"
            >
              <Modal
                :show="showEditModal"
                customClass="stock-modal"
                @close="showEditModal = false"
              >
                <h3 class="text-3xl font-bold mb-1 text-blue-700">Edit Stock</h3>
                <form @submit.prevent="handleEdit" class="flex flex-col gap-2">
                  <input
                    v-model="editForm.name"
                    type="text"
                    placeholder="Product Name"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    v-model="editForm.category"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>Select Category</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
                  <input
                    v-model="editForm.cost_price"
                    type="number"
                    placeholder="Cost Price"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    v-model="editForm.margin"
                    type="number"
                    placeholder="Margin"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    v-model="editForm.stock"
                    type="number"
                    placeholder="Stocks"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div class="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      class="px-4 py-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition-all"
                      @click="showEditModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </transition>
          <transition name="modal-fade">
            <div
              v-if="showCreateModal"
              class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
              @click.self="showCreateModal = false"
            >
              <Modal
                :show="showCreateModal"
                customClass="stock-modal"
                @close="showCreateModal = false"
              >
                <h3 class="text-2xl font-bold mb-4 text-blue-700">Create Stock</h3>
                <form @submit.prevent="handleCreate" class="flex flex-col gap-4">
                  <input
                    v-model="createForm.name"
                    type="text"
                    placeholder="Product Name"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    v-model="createForm.category"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>Select Category</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
                  <input
                    v-model.number="createForm.cost_price"
                    type="number"
                    min="0"
                    placeholder="Cost Price (cp)"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    v-model.number="createForm.margin"
                    type="number"
                    placeholder="Margin"
                    min="0"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    v-model.number="createForm.stock"
                    type="number"
                    placeholder="Stocks"
                    min="0"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div class="flex items-center gap-2">
                    <span class="font-semibold">Selling Price (sp):</span>
                    <span class="text-blue-700 font-bold">{{ sellingPrice }}</span>
                  </div>
                  <div class="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      class="px-4 py-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition-all"
                      @click="showCreateModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </transition>
          <transition name="modal-fade">
            <div
              v-if="showCreateCategoryModal"
              class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
              @click.self="showCreateCategoryModal = false"
            >
              <Modal
                :show="showCreateCategoryModal"
                customClass="stock-modal"
                @close="showCreateCategoryModal = false"
              >
                <h3 class="text-2xl font-bold mb-4 text-green-700">Create Category</h3>
                <form @submit.prevent="handleCreateCategory" class="flex flex-col gap-4">
                  <input
                    v-model="createCategoryForm.name"
                    type="text"
                    placeholder="Category Name"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    v-model="createCategoryForm.description"
                    type="text"
                    placeholder="Description"
                    class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div class="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      class="px-4 py-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition-all"
                      @click="showCreateCategoryModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition-all"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import Modal from "@/components/Modal.vue";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toast-notification";
import {
  fetchProduct,
  createProduct,
  updateProduct,
  fetchCategory,
  createCatyregory,
  deleteProduct,
} from "@/stores/InventoryAPI";
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(stocks.value.length / itemsPerPage.value));

const paginatedStocks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return stocks.value.slice(start, start + itemsPerPage.value);
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
const auth = useAuthStore();
const $toast = useToast();
const stocks = ref([]);
const categories = ref([]);
const loading = ref(false);
const error = ref("");
const dropdownOpen = ref(null);
const showViewModal = ref(false);
const showEditModal = ref(false);
const showCreateModal = ref(false);
const showCreateCategoryModal = ref(false);
const selectedStockId = ref(null);
const selectedStock = ref(null);
const editForm = ref({
  name: "",
  category: "",
  cost_price: null,
  margin: null,
  stock: null,
});
const createForm = ref({
  name: "",
  category: "",
  cost_price: null,
  margin: null,
  stock: null,
});
const createCategoryForm = ref({
  name: "",
  description: "",
});
const sellingPrice = computed(() => {
  const cp = Number(createForm.value.cost_price) || 0;
  const margin = Number(createForm.value.margin) || 0;
  return cp + margin;
});

async function loadStocks() {
  loading.value = true;
  try {
    const data = await fetchProduct();
    stocks.value = Array.isArray(data) ? data : [];
  } catch (e) {
    $toast.error("Failed to fetch stocks.", { position: "top-right", duration: 3000, dismissible: true });
  } finally {
    loading.value = false;
  }
}

async function loadCategories() {
  try {
    const data = await fetchCategory();
    categories.value = Array.isArray(data) ? data : [];
  } catch (e) {
    $toast.error("Failed to fetch categories.", { position: "top-right", duration: 3000, dismissible: true });
  }
}

async function deleteProducts(id) {
  const confirmed = confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;

  try {
    await deleteProduct(id);
    stocks.value = stocks.value.filter((s) => s.id !== id);

    // Adjust pagination if needed
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value || 1;
    currentPage.value = totalPages.value || 1;

    $toast.success("Product deleted successfully!", { position: "top-right", duration: 3000, dismissible: true });
  } catch (error) {
    console.error(error);
    $toast.error("Failed to delete product.", { position: "top-right", duration: 3000, dismissible: true });
  }
}


function openViewModal(id) {
  selectedStockId.value = id;
  selectedStock.value = stocks.value.find((s) => s.id === id);
  showViewModal.value = true;
}
function openEditModal(id) {
  selectedStockId.value = id;
  const stock = stocks.value.find((s) => s.id === id);
  editForm.value = { ...stock };
  showEditModal.value = true;
}
async function handleEdit() {
  loading.value = true;
  try {
    await updateProduct(selectedStockId.value, { ...editForm.value });
    showEditModal.value = false;
    await loadStocks();
    $toast.success("Stock updated successfully!",{ position: "top-right", duration: 5000 });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to update stock.", { position: "top-right", duration: 500 });
  } finally {
    loading.value = false;
  }
}

async function handleCreate() {
  loading.value = true;
  try {
    await createProduct({ ...createForm.value });
    showCreateModal.value = false;
    createForm.value = {
      name: "",
      category: "",
      cost_price: 0,
      margin: 0,
      stock: 0,
    };
    await loadStocks();
    $toast.success("Stock created successfully!", {
      position: "top-right",
      duration: 3000,
    });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to create stock.", { position: "top-right", duration: 3000 });
  } finally {
    loading.value = false;
  }
}

async function handleCreateCategory() {
  loading.value = true;
  try {
    await createCatyregory({ ...createCategoryForm.value });
    showCreateCategoryModal.value = false;
    createCategoryForm.value = { name: "", description: "" };
    await loadCategories();
    $toast.success("Category created successfully!", { position: "top-right", duration: 3000, dismissible: true });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to create category.", { position: "top-right", duration: 3000, dismissible: true });
  } finally {
    loading.value = false;
  }
}



// Close dropdown on outside click
const handleClickOutside = (event) => {
  if (!event.target.closest(".dropdown-container")) {
    dropdownOpen.value = null;
  }
};
onMounted(async () => {
  if (!auth.user) {
    await auth.self();
  }
  await Promise.all([loadStocks(), loadCategories()]);
});

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

</style>
