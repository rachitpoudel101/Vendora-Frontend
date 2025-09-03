<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
    <Navbar />
    <div class="flex">
      <Sidebar />
      
      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] flex flex-col">
        <div class="p-4 md:p-8 flex flex-col h-full">
          <!-- Header Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 flex-shrink-0">
            <div class="p-6 lg:p-8">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Stocks Management
                  </h1>
                  <p class="text-gray-600 text-lg">
                    Manage your products and categories efficiently
                  </p>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3" v-if="!isStaff">
                  <button
                    class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    @click="handleCreateStockClick"
                  >
                    <span class="material-icons text-20 mr-2">add_box</span>
                    Add Product
                  </button>
                  <button
                    class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-xl shadow-sm hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    @click="handleCreateCategoryClick"
                  >
                    <span class="material-icons text-20 mr-2">category</span>
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabs Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-0">
            <div class="border-b border-gray-200 flex-shrink-0">
              <nav class="flex space-x-8 px-6 lg:px-8" aria-label="Tabs">
                <button
                  class="relative py-4 px-1 font-medium text-sm transition-colors duration-200 border-b-2 focus:outline-none"
                  :class="tab === 'products' 
                    ? 'text-blue-600 border-blue-600' 
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'"
                  @click="tab = 'products'"
                >
                  <span class="flex items-center">
                    <span class="material-icons text-18 mr-2">inventory_2</span>
                    Products
                    <span class="ml-2 bg-blue-100 text-blue-600 py-1 px-2 rounded-full text-xs font-medium">
                      {{ stocks.length }}
                    </span>
                  </span>
                </button>
                <button
                  class="relative py-4 px-1 font-medium text-sm transition-colors duration-200 border-b-2 focus:outline-none"
                  :class="tab === 'categories' 
                    ? 'text-emerald-600 border-emerald-600' 
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'"
                  @click="tab = 'categories'"
                >
                  <span class="flex items-center">
                    <span class="material-icons text-18 mr-2">category</span>
                    Categories
                    <span class="ml-2 bg-emerald-100 text-emerald-600 py-1 px-2 rounded-full text-xs font-medium">
                      {{ categories.length }}
                    </span>
                  </span>
                </button>
              </nav>
            </div>

            <!-- Content Area -->
            <div class=" flex-1 overflow-hidden">
              <!-- Products Tab -->
              <div v-if="tab === 'products'" class="h-full flex flex-col">
                <!-- Loading State -->
                <div v-if="loading" class="flex items-center justify-center flex-1">
                  <div class="flex items-center space-x-3">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="text-gray-600 font-medium text-lg">Loading products...</span>
                  </div>
                </div>

                <!-- Products Table -->
                <div v-else class="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 flex-1 flex flex-col overflow-hidden">
                  <div class="flex-1 overflow-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0">
                        <tr>
                          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            #
                          </th>
                          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Product Name
                          </th>
                          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Category
                          </th>
                          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Stock Level
                          </th>
                          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-100">
                        <tr 
                          v-for="(item, idx) in paginatedStocks"
                          :key="item.id"
                          class="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ (currentPage - 1) * itemsPerPage + idx + 1 }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {{ categoryNameMap[item.category] || item.category_name }}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <span class="text-sm font-semibold text-gray-900 mr-2">{{ item.stock }}</span>
                              <span 
                                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                :class="item.stock > 10 
                                  ? 'bg-green-100 text-green-800' 
                                  : item.stock > 5 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'"
                              >
                                {{ item.stock > 10 ? 'In Stock' : item.stock > 5 ? 'Low Stock' : 'Critical' }}
                              </span>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="relative dropdown-container">
                              <button
                                @click.stop="dropdownOpen === item.id ? (dropdownOpen = null) : (dropdownOpen = item.id)"
                                class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-150"
                              >
                                <span class="material-icons">more_vert</span>
                              </button>
                              <div
                                v-if="dropdownOpen === item.id"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                              >
                                <div class="py-1">
                                  <button
                                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                    @click="openViewModal(item.id); dropdownOpen = null;"
                                  >
                                    <span class="material-icons text-18 mr-3">visibility</span>
                                    View Details
                                  </button>
                                  <template v-if="!isStaff">
                                    <button
                                      class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                      @click="openEditModal(item.id); dropdownOpen = null;"
                                    >
                                      <span class="material-icons text-18 mr-3">edit</span>
                                      Edit Product
                                    </button>
                                    <button
                                      class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150"
                                      @click="deleteProducts(item.id); dropdownOpen = null;"
                                    >
                                      <span class="material-icons text-18 mr-3">delete</span>
                                      Delete Product
                                    </button>
                                  </template>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Fixed Pagination -->
                  <div class="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex-shrink-0">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center text-sm text-gray-500">
                        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
                        {{ Math.min(currentPage * itemsPerPage, stocks.length) }} of 
                        {{ stocks.length }} results
                      </div>
                      <div class="flex items-center space-x-2">
                        <button
                          @click="prevPage"
                          :disabled="currentPage === 1"
                          class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                          Previous
                        </button>
                        <div class="flex space-x-1">
                          <button
                            v-for="page in Math.min(totalPages, 5)"
                            :key="page"
                            @click="goToPage(page)"
                            :class="[
                              'px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            ]"
                          >
                            {{ page }}
                          </button>
                        </div>
                        <button
                          @click="nextPage"
                          :disabled="currentPage === totalPages"
                          class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Categories Tab -->
              <div v-else class="h-full flex flex-col">
                <div class="mb-6 flex-shrink-0">
                  <h2 class="text-2xl font-semibold text-gray-900 mb-2">Categories</h2>
                  <p class="text-gray-600">Organize your products with custom categories</p>
                </div>

                <div class="bg-gray-50 rounded-xl border border-gray-200 flex-1 overflow-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          #
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Category Name
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr 
                        v-for="(cat, idx) in categories"
                        :key="cat.id"
                        class="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ idx + 1 }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">{{ cat.name }}</div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="text-sm text-gray-600">{{ cat.description || 'No description' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div class="flex space-x-3">
                            <button
                              @click="openEditCategoryModal(cat)"
                              class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                              title="Edit Category"
                            >
                              <span class="material-icons text-18">edit</span>
                            </button>
                            <button
                              @click="deleteCategory(cat.id)"
                              class="text-red-600 hover:text-red-900 transition-colors duration-150"
                              title="Delete Category"
                            >
                              <span class="material-icons text-18">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="categories.length === 0">
                        <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                          <div class="flex flex-col items-center">
                            <span class="material-icons text-48 text-gray-300 mb-4">category</span>
                            <p class="text-lg font-medium">No categories found</p>
                            <p class="text-sm">Create your first category to get started</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <!-- View Modal -->
    <transition name="modal-fade">
      <div
        v-if="showViewModal"
        class="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showViewModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-90vh overflow-y-auto border border-gray-200">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Product Details</h3>
              <button
                @click="showViewModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <span class="material-icons">close</span>
              </button>
            </div>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="font-medium text-gray-600">Product Name</span>
                <span class="text-gray-900 font-semibold">{{ selectedStock?.name }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="font-medium text-gray-600">Category</span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {{ selectedStock?.category_name }}
                </span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="font-medium text-gray-600">Stock Quantity</span>
                <span class="text-gray-900 font-semibold">{{ selectedStock?.stock }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="font-medium text-gray-600">Cost Price</span>
                <span class="text-gray-900 font-semibold">Rs. {{ selectedStock?.cost_price }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-gray-100">
                <span class="font-medium text-gray-600">Margin</span>
                <span class="text-gray-900 font-semibold">Rs. {{ selectedStock?.margin }}</span>
              </div>
              <div class="flex justify-between items-center py-3">
                <span class="font-medium text-gray-600">Selling Price</span>
                <span class="text-blue-600 font-bold text-lg">Rs. {{ viewSellingPrice }}</span>
              </div>
            </div>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <button
                @click="showViewModal = false"
                class="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Edit Modal -->
    <transition name="modal-fade">
      <div
        v-if="showEditModal"
        class="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showEditModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-90vh overflow-y-auto border border-gray-200">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Edit Product</h3>
              <button
                @click="showEditModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <span class="material-icons">close</span>
              </button>
            </div>
            <form @submit.prevent="handleEdit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  v-model="editForm.category"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                >
                  <option value="" disabled>Select Category</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
                <input
                  v-model="editForm.cost_price"
                  type="number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Margin</label>
                <input
                  v-model="editForm.margin"
                  type="number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input
                  v-model="editForm.stock"
                  type="number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0"
                />
              </div>
              <div class="flex space-x-3 pt-6">
                <button
                  type="button"
                  @click="showEditModal = false"
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-150"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Create Product Modal -->
    <transition name="modal-fade">
      <div
        v-if="showCreateModal"
        class="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showCreateModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-90vh overflow-y-auto border border-gray-200">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Add New Product</h3>
              <button
                @click="showCreateModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <span class="material-icons">close</span>
              </button>
            </div>
            <form @submit.prevent="handleCreate" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  v-model="createForm.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  v-model="createForm.category"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                >
                  <option value="" disabled>Select Category</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
                <input
                  v-model.number="createForm.cost_price"
                  type="number"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Margin</label>
                <input
                  v-model.number="createForm.margin"
                  type="number"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input
                  v-model.number="createForm.stock"
                  type="number"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0"
                />
              </div>
              <div class="bg-blue-50 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">Selling Price:</span>
                  <span class="text-xl font-bold text-blue-600">Rs. {{ sellingPrice }}</span>
                </div>
              </div>
              <div class="flex space-x-3 pt-6">
                <button
                  type="button"
                  @click="showCreateModal = false"
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-150"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Create Category Modal -->
    <transition name="modal-fade">
      <div
        v-if="showCreateCategoryModal"
        class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showCreateCategoryModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Add New Category</h3>
              <button
                @click="showCreateCategoryModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <span class="material-icons">close</span>
              </button>
            </div>
            <form @submit.prevent="handleCreateCategory" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  v-model="createCategoryForm.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="createCategoryForm.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter category description"
                ></textarea>
              </div>
              <div class="flex space-x-3 pt-6">
                <button
                  type="button"
                  @click="showCreateCategoryModal = false"
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-150"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Edit Category Modal -->
    <transition name="modal-fade">
      <div
        v-if="showEditCategoryModal"
        class="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showEditCategoryModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Edit Category</h3>
              <button
                @click="showEditCategoryModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <span class="material-icons">close</span>
              </button>
            </div>
            <form @submit.prevent="handleEditCategory" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  v-model="editCategoryForm.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="editCategoryForm.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter category description"
                ></textarea>
              </div>
              <div class="flex space-x-3 pt-6">
                <button
                  type="button"
                  @click="showEditCategoryModal = false"
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-150"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
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
  updateCategory,
  deleteProduct,
} from "@/stores/InventoryAPI";
const currentPage = ref(1);
const itemsPerPage = ref(8);
const totalPages = computed(() =>
  Math.ceil(stocks.value.length / itemsPerPage.value),
);

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
const showEditCategoryModal = ref(false);
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
const editCategoryForm = ref({
  id: null,
  name: "",
  description: "",
});
const sellingPrice = computed(() => {
  const cp = Number(createForm.value.cost_price) || 0;
  const margin = Number(createForm.value.margin) || 0;
  return cp + margin;
});
const viewSellingPrice = computed(() => {
  const cp = Number(selectedStock.value?.cost_price) || 0;
  const margin = Number(selectedStock.value?.margin) || 0;
  return cp + margin;
});
const isStaff = computed(() => auth.user?.role === "staff");
const tab = ref("products");

const categoryNameMap = computed(() => {
  const map: Record<string, string> = {};
  categories.value.forEach((cat) => {
    map[cat.id] = cat.name;
  });
  return map;
});

async function loadStocks() {
  loading.value = true;
  try {
    const data = await fetchProduct();
    stocks.value = Array.isArray(data) ? data : [];
  } catch (e) {
    $toast.error("Failed to fetch stocks.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } finally {
    loading.value = false;
  }
}

async function loadCategories() {
  try {
    const data = await fetchCategory();
    categories.value = Array.isArray(data) ? data : [];
  } catch (e) {
    $toast.error("Failed to fetch categories.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
}

async function deleteProducts(id) {
  const confirmed = confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;

  try {
    await deleteProduct(id);
    stocks.value = stocks.value.filter((s) => s.id !== id);

    // Adjust pagination if needed
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }

    $toast.success("Product deleted successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (error) {
    console.error(error);
    $toast.error("Failed to delete product.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
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

// Open edit modal for category
function openEditCategoryModal(cat) {
  editCategoryForm.value = {
    id: cat.id,
    name: cat.name,
    description: cat.description,
  };
  showEditCategoryModal.value = true;
}

// Edit category handler
async function handleEditCategory() {
  loading.value = true;
  try {
    await updateCategory(editCategoryForm.value.id, {
      name: editCategoryForm.value.name,
      description: editCategoryForm.value.description,
    });
    showEditCategoryModal.value = false;
    await loadCategories();
    $toast.success("Category updated successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (e) {
    $toast.error("Failed to update category.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } finally {
    loading.value = false;
  }
}

// Delete category handler
async function deleteCategory(id) {
  const confirmed = confirm("Are you sure you want to delete this category?");
  if (!confirmed) return;
  loading.value = true;
  try {
    await deleteCategory(id);
    await loadCategories();
    $toast.success("Category deleted successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (e) {
    $toast.error("Failed to delete category.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } finally {
    loading.value = false;
  }
}

async function handleEdit() {
  loading.value = true;
  try {
    await updateProduct(selectedStockId.value, { ...editForm.value });
    showEditModal.value = false;
    await loadStocks();
    $toast.success("Stock updated successfully!", {
      position: "top-right",
      duration: 5000,
    });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to update stock.", {
      position: "top-right",
      duration: 500,
    });
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
    $toast.error("Failed to create stock.", {
      position: "top-right",
      duration: 3000,
    });
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
    $toast.success("Category created successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to create category.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } finally {
    loading.value = false;
  }
}

function handleCreateStockClick() {
  if (auth.user?.role === "staff") {
    $toast.error("You are not able to create users.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }
  showCreateModal.value = true;
}

function handleCreateCategoryClick() {
  if (auth.user?.role === "staff") {
    $toast.error("You are not able to create users.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }
  showCreateCategoryModal.value = true;
}

// Close dropdown on outside click
const handleClickOutside = (event) => {
  if (!event.target.closest(".dropdown-container")) {
    dropdownOpen.value = null;
  }
};

// Close modals on ESC key press
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    // Close any open modal
    if (showViewModal.value) {
      showViewModal.value = false;
    } else if (showEditModal.value) {
      showEditModal.value = false;
    } else if (showCreateModal.value) {
      showCreateModal.value = false;
    } else if (showCreateCategoryModal.value) {
      showCreateCategoryModal.value = false;
    } else if (showEditCategoryModal.value) {
      showEditCategoryModal.value = false;
    }
    
    // Also close dropdown if open
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
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.text-18 { font-size: 18px; }
.text-20 { font-size: 20px; }

/* Unified scrollbar styling for all elements */
.overflow-auto::-webkit-scrollbar,
.overflow-x-auto::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track,
.overflow-x-auto::-webkit-scrollbar-track,
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb,
.overflow-x-auto::-webkit-scrollbar-thumb,
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-auto::-webkit-scrollbar-thumb:hover,
.overflow-x-auto::-webkit-scrollbar-thumb:hover,
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  main {
    margin-left: 0;
  }
}
</style>