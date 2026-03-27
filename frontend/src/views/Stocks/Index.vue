<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
    <Navbar />
    <div class="flex">
      <Sidebar />

      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] flex flex-col">
        <div class="p-2 sm:p-4 md:p-8 flex flex-col h-full">
          <!-- Header Section -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 mb-4 md:mb-6 flex-shrink-0"
          >
            <div class="p-4 sm:p-6 lg:p-8">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <h1
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text"
                  >
                    Stocks Management
                  </h1>
                  <p class="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Manage your products and categories efficiently
                  </p>
                </div>

                <!-- Action Buttons -->
                <div
                  class="flex flex-col sm:flex-row gap-2 sm:gap-3"
                  v-if="!isStaff"
                >
                  <button
                    class="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    :style="{
                      backgroundColor: buttonColor,
                      color: getButtonTextColor(),
                    }"
                    @click="handleCreateStockClick"
                  >
                    <span class="material-icons text-18 sm:text-20 mr-2"
                      >add_box</span
                    >
                    <span class="text-sm sm:text-base">Add Product</span>
                  </button>
                  <button
                    class="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    :style="{
                      backgroundColor: buttonColor,
                      color: getButtonTextColor(),
                    }"
                    @click="handleCreateCategoryClick"
                  >
                    <span class="material-icons text-18 sm:text-20 mr-2"
                      >category</span
                    >
                    <span class="text-sm sm:text-base">Add Category</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabs Section -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-0"
          >
            <div class="border-b border-gray-200 flex-shrink-0">
              <nav
                class="flex space-x-4 sm:space-x-8 px-4 sm:px-6 lg:px-8"
                aria-label="Tabs"
              >
                <button
                  class="relative py-3 sm:py-4 px-1 font-medium text-xs sm:text-sm transition-colors duration-200 border-b-2 focus:outline-none"
                  :class="
                    tab === 'products'
                      ? 'border-b-2 focus:outline-none'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  "
                  :style="
                    tab === 'products'
                      ? { color: buttonColor, borderBottomColor: buttonColor }
                      : {}
                  "
                  @click="tab = 'products'"
                >
                  <span class="flex items-center">
                    <span class="material-icons text-16 sm:text-18 mr-1 sm:mr-2"
                      >inventory_2</span
                    >
                    <span class="hidden sm:inline">Products</span>
                    <span class="sm:hidden">Items</span>
                    <span
                      class="ml-1 sm:ml-2 py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-full text-xs font-medium"
                      :style="{
                        backgroundColor: buttonColor + '20',
                        color: buttonColor,
                      }"
                    >
                      {{ products.length }}
                    </span>
                  </span>
                </button>
                <button
                  class="relative py-3 sm:py-4 px-1 font-medium text-xs sm:text-sm transition-colors duration-200 border-b-2 focus:outline-none"
                  :class="
                    tab === 'categories'
                      ? 'border-b-2 focus:outline-none'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  "
                  :style="
                    tab === 'categories'
                      ? { color: buttonColor, borderBottomColor: buttonColor }
                      : {}
                  "
                  @click="tab = 'categories'"
                >
                  <span class="flex items-center">
                    <span class="material-icons text-16 sm:text-18 mr-1 sm:mr-2"
                      >category</span
                    >
                    <span class="hidden sm:inline">Categories</span>
                    <span class="sm:hidden">Cats</span>
                    <span
                      class="ml-1 sm:ml-2 py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-full text-xs font-medium"
                      :style="{
                        backgroundColor: buttonColor + '20',
                        color: buttonColor,
                      }"
                    >
                      {{ categories.length }}
                    </span>
                  </span>
                </button>
              </nav>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-hidden">
              <!-- Products Tab -->
              <div v-if="tab === 'products'" class="h-full flex flex-col">
                <!-- Filter Section -->
                <div class="p-4 border-b border-gray-200 flex-shrink-0">
                  <div class="flex flex-col md:flex-row gap-3">
                    <!-- Search Bar -->
                    <div class="flex-1">
                      <div class="relative">
                        <span
                          class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          search
                        </span>
                        <input
                          v-model="searchQuery"
                          type="text"
                          placeholder="Search products..."
                          class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="w-full md:w-64">
                      <select
                        v-model="selectedCategoryFilter"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">All Categories</option>
                        <option
                          v-for="cat in categories"
                          :key="cat.id"
                          :value="cat.id"
                        >
                          {{ cat.name }}
                        </option>
                      </select>
                    </div>

                    <!-- Stock Level Filter -->
                    <div class="w-full md:w-48">
                      <select
                        v-model="selectedStockFilter"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">All Stock Levels</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low">Low Stock</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>

                    <!-- Clear Filters Button -->
                    <button
                      v-if="
                        searchQuery ||
                        selectedCategoryFilter ||
                        selectedStockFilter
                      "
                      @click="clearFilters"
                      class="px-4 py-2.5 text-gray-700 rounded-lg hover:opacity-80 transition-colors whitespace-nowrap"
                      :style="{
                        backgroundColor: buttonColor + '20',
                        color: buttonColor,
                      }"
                    >
                      <span class="flex items-center">
                        <span class="material-icons text-18 mr-1">clear</span>
                        Clear
                      </span>
                    </button>
                  </div>

                  <!-- Results Count -->
                  <div class="mt-3 text-sm text-gray-600">
                    Showing {{ filteredProducts.length }} of
                    {{ products.length }} products
                  </div>
                </div>

                <!-- Loading State -->
                <div
                  v-if="loading"
                  class="flex items-center justify-center flex-1"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                    ></div>
                    <span class="text-gray-600 font-medium text-lg"
                      >Loading products...</span
                    >
                  </div>
                </div>

                <!-- No Results Message -->
                <div
                  v-else-if="filteredProducts.length === 0"
                  class="flex items-center justify-center flex-1"
                >
                  <div class="text-center py-12">
                    <span
                      class="material-icons text-64 text-gray-300 mb-4 block"
                    >
                      search_off
                    </span>
                    <p class="text-gray-500 text-lg font-medium">
                      No products found
                    </p>
                    <p class="text-gray-400 text-sm mt-1">
                      Try adjusting your filters
                    </p>
                  </div>
                </div>

                <!-- Products Content when not loading and has results -->
                <div v-else class="h-full flex flex-col">
                  <!-- Mobile Cards View for Products -->
                  <div
                    class="block md:hidden p-4 flex-1 overflow-y-auto space-y-4"
                  >
                    <div
                      v-for="item in paginatedStocks"
                      :key="item.id"
                      class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                          <h3 class="font-semibold text-gray-900 text-lg">
                            {{ item.name }}
                          </h3>
                          <span
                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                          >
                            {{
                              categoryNameMap[item.category] ||
                              item.category_name
                            }}
                          </span>
                        </div>
                        <div class="relative dropdown-container">
                          <button
                            @click.stop="
                              dropdownOpen === item.id
                                ? (dropdownOpen = null)
                                : (dropdownOpen = item.id)
                            "
                            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                          >
                            <span class="material-icons text-20"
                              >more_vert</span
                            >
                          </button>
                          <div
                            v-if="dropdownOpen === item.id"
                            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                          >
                            <div class="py-1">
                              <button
                                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                @click="
                                  openViewModal(item.id);
                                  dropdownOpen = null;
                                "
                              >
                                <span class="material-icons text-18 mr-3"
                                  >visibility</span
                                >
                                View Details
                              </button>
                              <template v-if="!isStaff">
                                <button
                                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                  @click="
                                    openEditModal(item.id);
                                    dropdownOpen = null;
                                  "
                                >
                                  <span class="material-icons text-18 mr-3"
                                    >edit</span
                                  >
                                  Edit Product
                                </button>
                                <button
                                  class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150"
                                  @click="
                                    deleteProducts(item.id);
                                    dropdownOpen = null;
                                  "
                                >
                                  <span class="material-icons text-18 mr-3"
                                    >delete</span
                                  >
                                  Delete Product
                                </button>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span class="text-gray-500 block">Stock Level</span>
                          <div class="flex items-center mt-1">
                            <span class="font-semibold text-gray-900 mr-2">{{
                              item.stock
                            }}</span>
                            <span
                              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                              :class="
                                item.stock > 10
                                  ? 'bg-green-100 text-green-800'
                                  : item.stock > 5
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              "
                            >
                              {{
                                item.stock > 10
                                  ? "In Stock"
                                  : item.stock > 5
                                    ? "Low"
                                    : "Critical"
                              }}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span class="text-gray-500 block">Supplier</span>
                          <span class="font-semibold text-gray-900 mt-1 block">
                            {{ item.supliers_name || "N/A" }}
                          </span>
                        </div>
                        <div>
                          <span class="text-gray-500 block">Selling Price</span>
                          <span class="font-semibold text-blue-600 mt-1 block">
                            Rs.
                            {{ (item.cost_price || 0) + (item.margin || 0) }}
                          </span>
                        </div>
                        <div>
                          <span class="text-gray-500 block">Base Unit</span>
                          <span class="font-semibold text-gray-900 mt-1 block">
                            {{ getUnit(item) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Desktop Table View for Products -->
                  <div
                    class="hidden md:flex flex-1 flex-col bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <div class="flex-1 overflow-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead
                          class="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0"
                        >
                          <tr>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              S.N.
                            </th>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              Product Name
                            </th>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              Category
                            </th>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              Supplier
                            </th>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              Stock Level
                            </th>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              Base Unit
                            </th>
                            <th
                              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
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
                            <td
                              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {{ (currentPage - 1) * itemsPerPage + idx + 1 }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm font-medium text-gray-900">
                                {{ item.name }}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span
                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                              >
                                {{
                                  categoryNameMap[item.category] ||
                                  item.category_name
                                }}
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm font-medium text-gray-900">
                                {{ item.supliers_name || "N/A" }}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <span
                                  class="text-sm font-semibold text-gray-900 mr-2"
                                  >{{ item.stock }}</span
                                >
                                <span
                                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                  :class="
                                    item.stock > 5
                                      ? 'bg-green-100 text-green-800'
                                      : item.stock > 2
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  "
                                >
                                  {{
                                    item.stock > 5
                                      ? "In Stock"
                                      : item.stock > 2
                                        ? "Low Stock"
                                        : "Critical"
                                  }}
                                </span>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm font-medium text-gray-900">
                                {{ getUnit(item) }}
                              </div>
                            </td>
                            <td
                              class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                            >
                              <div class="relative dropdown-container">
                                <button
                                  @click.stop="
                                    dropdownOpen === item.id
                                      ? (dropdownOpen = null)
                                      : (dropdownOpen = item.id)
                                  "
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
                                      @click="
                                        openViewModal(item.id);
                                        dropdownOpen = null;
                                      "
                                    >
                                      <span class="material-icons text-18 mr-3"
                                        >visibility</span
                                      >
                                      View Details
                                    </button>
                                    <template v-if="!isStaff">
                                      <button
                                        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                        @click="
                                          openEditModal(item.id);
                                          dropdownOpen = null;
                                        "
                                      >
                                        <span
                                          class="material-icons text-18 mr-3"
                                          >edit</span
                                        >
                                        Edit Product
                                      </button>
                                      <button
                                        class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150"
                                        @click="
                                          deleteProducts(item.id);
                                          dropdownOpen = null;
                                        "
                                      >
                                        <span
                                          class="material-icons text-18 mr-3"
                                          >delete</span
                                        >
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
                    <div
                      class="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex-shrink-0"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-500">
                          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                          {{
                            Math.min(
                              currentPage * itemsPerPage,
                              filteredProducts.length,
                            )
                          }}
                          of {{ filteredProducts.length }} results
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
                                  ? 'text-white'
                                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
                              ]"
                              :style="
                                currentPage === page
                                  ? {
                                      backgroundColor: buttonColor,
                                      color: getButtonTextColor(),
                                    }
                                  : {}
                              "
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

                  <!-- Mobile Pagination for Products -->
                  <div
                    class="block md:hidden bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-t border-gray-200"
                  >
                    <div class="flex justify-between items-center">
                      <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span class="text-sm text-gray-700">
                        {{ currentPage }} / {{ totalPages }}
                      </span>
                      <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Categories Tab -->
              <div v-else class="h-full flex flex-col p-4 sm:p-6">
                <div class="mb-4 sm:mb-6 flex-shrink-0">
                  <h2
                    class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
                  >
                    Categories
                  </h2>
                  <p class="text-gray-600 text-sm sm:text-base">
                    Organize your products with custom categories
                  </p>
                </div>

                <!-- Mobile Cards View for Categories -->
                <div class="block md:hidden space-y-4 flex-1 overflow-y-auto">
                  <div
                    v-for="cat in categories"
                    :key="cat.id"
                    class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 text-lg">
                          {{ cat.name }}
                        </h3>
                        <p class="text-gray-600 text-sm mt-1">
                          {{ cat.description || "No description" }}
                        </p>
                        <div
                          class="flex items-center mt-2"
                          v-if="cat.is_expired_applicable"
                        >
                          <span
                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                          >
                            <span class="material-icons text-12 mr-1"
                              >schedule</span
                            >
                            Expiry Required
                          </span>
                        </div>
                      </div>
                      <div class="flex space-x-2 ml-4">
                        <button
                          v-if="!isStaff"
                          @click="openEditCategoryModal(cat)"
                          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <span class="material-icons text-18">edit</span>
                        </button>
                        <button
                          v-if="!isStaff"
                          @click="deleteCategoryHandler(cat.id)"
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <span class="material-icons text-18">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Desktop Table for Categories -->
                <div
                  class="hidden md:block bg-gray-50 rounded-xl border border-gray-200 flex-1 overflow-auto"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                      <tr>
                        <th
                          class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          S.N.
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          Category Name
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          Expiry Required
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
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
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ idx + 1 }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">
                            {{ cat.name }}
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="text-sm text-gray-600">
                            {{ cat.description || "No description" }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            v-if="cat.is_expired_applicable"
                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                          >
                            <span class="material-icons text-12 mr-1"
                              >schedule</span
                            >
                            Yes
                          </span>
                          <span
                            v-else
                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <span class="material-icons text-12 mr-1"
                              >block</span
                            >
                            No
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <div class="flex space-x-3">
                            <button
                              v-if="!isStaff"
                              @click="openEditCategoryModal(cat)"
                              class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                              title="Edit Category"
                            >
                              <span class="material-icons text-18">edit</span>
                            </button>
                            <button
                              v-if="!isStaff"
                              @click="deleteCategoryHandler(cat.id)"
                              class="text-red-600 hover:text-red-900 transition-colors duration-150"
                              title="Delete Category"
                            >
                              <span class="material-icons text-18">delete</span>
                            </button>
                            <span
                              v-if="isStaff"
                              class="text-gray-400 text-sm font-medium"
                            >
                              View Only
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="categories.length === 0">
                        <td
                          colspan="5"
                          class="px-6 py-12 text-center text-gray-500"
                        >
                          <div class="flex flex-col items-center">
                            <span
                              class="material-icons text-48 text-gray-300 mb-4"
                              >category</span
                            >
                            <p class="text-lg font-medium">
                              No categories found
                            </p>
                            <p class="text-sm">
                              Create your first category to get started
                            </p>
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

    <!-- View Modal -->
    <transition name="modal-fade">
      <div
        v-if="showViewModal"
        class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showViewModal = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
        >
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Product Name</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    {{ selectedStock?.name || "N/A" }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Category</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                  >
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                    >
                      {{ selectedStock?.category_name || "N/A" }}
                    </span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Supplier</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    {{ selectedStock?.supliers_name || "N/A" }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Batch Number</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    {{ selectedStock?.batch_number || "Auto-generated" }}
                  </div>
                </div>

                <div v-if="selectedStock?.serial_number">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Serial Number</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    {{ selectedStock?.serial_number }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Stock Quantity</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                  >
                    <div class="flex items-center">
                      <span class="text-gray-900 font-semibold mr-2">{{
                        selectedStock?.stock || 0
                      }}</span>
                      <span class="text-gray-600 mr-2">{{
                        getUnit(selectedStock)
                      }}</span>
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="
                          (selectedStock?.stock || 0) > 5
                            ? 'bg-green-100 text-green-800'
                            : (selectedStock?.stock || 0) > 2
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        "
                      >
                        {{
                          (selectedStock?.stock || 0) > 5
                            ? "In Stock"
                            : (selectedStock?.stock || 0) > 2
                              ? "Low Stock"
                              : "Critical"
                        }}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Cost Price</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    Rs. {{ selectedStock?.cost_price || 0 }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Margin</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    Rs. {{ selectedStock?.margin || 0 }}
                  </div>
                </div>

                <div v-if="selectedStock?.expires_at">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Expiry Date</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-semibold"
                  >
                    {{ formatDate(selectedStock?.expires_at) }}
                  </div>
                </div>

                <div v-if="selectedStock?.description" class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Description</label
                  >
                  <div
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900"
                  >
                    {{ selectedStock?.description }}
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 p-4 rounded-xl mt-4">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">Selling Price:</span>
                  <span class="text-xl font-bold text-blue-600"
                    >Rs. {{ viewSellingPrice }}</span
                  >
                </div>
              </div>

              <div class="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  @click="showViewModal = false"
                  class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Component Modals -->
    <StocksCreateModal
      :show="showCreateModal"
      :categories="categories"
      :suppliers="suppliers"
      :units="units"
      :can-edit-expiry="canEditExpiry"
      @close="showCreateModal = false"
      @submit="handleCreate"
    />

    <EditProductModal
      :show="showEditModal"
      :categories="categories"
      :suppliers="suppliers"
      :units="units"
      :can-edit-expiry="canEditExpiry"
      :edit-form="editForm"
      @close="showEditModal = false"
      @submit="handleEdit"
    />

    <CreateCategoryModal
      :show="showCreateCategoryModal"
      @close="showCreateCategoryModal = false"
      @submit="handleCreateCategory"
    />

    <EditCategoryModal
      :show="showEditCategoryModal"
      :edit-category-form="editCategoryForm"
      @close="showEditCategoryModal = false"
      @submit="handleEditCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import StocksCreateModal from "@/components/Stocks/StocksCreateModal.vue";
import EditProductModal from "@/components/Stocks/EditProductModal.vue";
import CreateCategoryModal from "@/components/Stocks/CreateCategoryModal.vue";
import EditCategoryModal from "@/components/Stocks/EditCategoryModal.vue";
import { useAuthStore } from "@/stores/auth";
import { useTheme } from "@/composables/useTheme";
import { useToast } from "vue-toast-notification";
import { useInventoryStore } from "@/stores/InventoryAPI";

// Type definitions
interface Stock {
  id: number;
  name: string;
  category: number;
  category_name: string;
  supliers: number;
  supliers_name: string;
  batch_number: string;
  serial_number?: string;
  cost_price: number;
  margin: number;
  stock: number;
  unit: string | number;
  unit_name?: string;
  expires_at?: string;
  description?: string;
  is_expired?: boolean;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  is_expired_applicable: boolean;
  supliers?: number;
  supliers_name?: string;
}

// interface Supplier {
//   id: number;
//   name: string;
// }

// interface Unit {
//   id: number;
//   unit: string;
//   label?: string;
// }

interface CreateProductForm {
  name: string;
  category: string | number;
  supliers: string | number;
  serial_number: string;
  cost_price: number | null;
  margin: number | null;
  stock: number | null;
  unit: string | number;
  expires_at: string;
  description: string;
}

interface EditProductForm {
  name: string;
  category: string | number;
  supliers: string | number;
  batch_number: string;
  serial_number: string;
  cost_price: number | null;
  margin: number | null;
  stock: number | null;
  unit: string | number;
  expires_at: string;
  description: string;
}

interface CreateCategoryForm {
  name: string;
  description: string;
  is_expired_applicable: boolean;
}

interface EditCategoryForm {
  id: number | null;
  name: string;
  description: string;
  is_expired_applicable: boolean;
}

const currentPage = ref(1);
const itemsPerPage = ref(8);
const searchQuery = ref("");
const selectedCategoryFilter = ref<number | string>("");
const selectedStockFilter = ref<string>("");

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value),
);

const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Search filter - searches in name, supplier name, batch number, and category name
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        (product.supliers_name &&
          product.supliers_name.toLowerCase().includes(query)) ||
        (product.batch_number &&
          product.batch_number.toLowerCase().includes(query)) ||
        (product.category_name &&
          product.category_name.toLowerCase().includes(query)),
    );
  }

  // Category filter
  if (selectedCategoryFilter.value) {
    filtered = filtered.filter(
      (product) => product.category === Number(selectedCategoryFilter.value),
    );
  }

  // Stock level filter
  if (selectedStockFilter.value) {
    filtered = filtered.filter((product) => {
      if (selectedStockFilter.value === "in-stock") {
        return product.stock > 10;
      } else if (selectedStockFilter.value === "low") {
        return product.stock > 5 && product.stock <= 10;
      } else if (selectedStockFilter.value === "critical") {
        return product.stock <= 5;
      }
      return true;
    });
  }

  return filtered;
});

const paginatedStocks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
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
const { buttonColor, getButtonTextColor } = useTheme();
const $toast = useToast();
const inventoryStore = useInventoryStore();

const products = computed(() => inventoryStore.products);
const categories = computed(() => inventoryStore.categories);
const suppliers = computed(() => inventoryStore.suppliers);
const units = computed(() => inventoryStore.units);
const loading = computed(() => inventoryStore.loading);
// const error = computed(() => inventoryStore.error);

const dropdownOpen = ref<number | null>(null);
const showViewModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);
const showCreateModal = ref<boolean>(false);
const showCreateCategoryModal = ref<boolean>(false);
const showEditCategoryModal = ref<boolean>(false);
const selectedStockId = ref<number | null>(null);
const selectedStock = ref<Stock | null>(null);

const editForm = ref<EditProductForm>({
  name: "",
  category: "",
  supliers: 0, // must be number, not string
  batch_number: "",
  serial_number: "",
  cost_price: null,
  margin: null,
  stock: null,
  unit: "", // must be string
  expires_at: "",
  description: "",
});

const editCategoryForm = ref<EditCategoryForm>({
  id: null,
  name: "",
  description: "",
  is_expired_applicable: false,
});
const viewSellingPrice = computed(() => {
  const cp = Number(selectedStock.value?.cost_price) || 0;
  const margin = Number(selectedStock.value?.margin) || 0;
  return cp + margin;
});
const isStaff = computed(() => auth.user?.role === "staff");
const canEditExpiry = computed(
  () => auth.user?.role === "admin" || auth.user?.role === "superuser",
);
const tab = ref("products");

const categoryNameMap = computed(() => {
  const map: Record<number, string> = {};
  categories.value.forEach((cat) => {
    map[cat.id] = cat.name;
  });
  return map;
});

async function loadStocks() {
  inventoryStore.fetchProducts();
}

async function loadCategories() {
  inventoryStore.fetchCategories();
}

async function loadSuppliers() {
  try {
    await inventoryStore.fetchSuppliers();
  } catch (e) {
    $toast.error("Failed to fetch suppliers.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
}

async function loadUnits() {
  try {
    await inventoryStore.fetchUnits();

    if (units.value.length === 0) {
      $toast.warning("No units found in database.", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    }
  } catch (e) {
    console.error("Failed to fetch units:", e);
    $toast.error("Failed to fetch units from database.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
}

async function deleteProducts(id: number) {
  const confirmed = confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;

  try {
    await inventoryStore.deleteProduct(id);
    // stocks.value = stocks.value.filter((s) => s.id !== id);

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

async function deleteCategoryHandler(id: number) {
  const confirmed = confirm("Are you sure you want to delete this category?");
  if (!confirmed) return;

  try {
    await inventoryStore.deleteCategory(id);
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
  }
}

function openViewModal(id: number) {
  selectedStockId.value = id;
  selectedStock.value = products.value.find((s) => s.id === id) || null;
  showViewModal.value = true;
}

function openEditModal(id: number) {
  selectedStockId.value = id;
  const stock = products.value.find((s) => s.id === id);
  if (stock) {
    // Find the unit string from the unit_name field for the dropdown
    const unitString = stock.unit_name || String(stock.unit);
    editForm.value = {
      name: stock.name,
      category: String(stock.category), // always string
      supliers: Number(stock.supliers), // always number
      batch_number: stock.batch_number,
      serial_number: stock.serial_number ?? "",
      cost_price: stock.cost_price,
      margin: stock.margin,
      stock: stock.stock,
      unit: unitString, // always string
      expires_at: stock.expires_at ?? "",
      description: stock.description ?? "",
    };
  }
  showEditModal.value = true;
}

function openEditCategoryModal(cat: Category) {
  editCategoryForm.value = {
    id: cat.id,
    name: cat.name,
    description: cat.description || "",
    is_expired_applicable: cat.is_expired_applicable || false,
  };
  showEditCategoryModal.value = true;
}

async function handleCreate(formData: CreateProductForm) {
  try {
    const data = { ...formData };

    // Only allow admin/superuser to set expiry dates
    if (data.expires_at && !canEditExpiry.value) {
      $toast.error("Only administrators can set expiry dates.", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    // Convert datetime-local to ISO format if expiry is set
    if (data.expires_at) {
      data.expires_at = new Date(data.expires_at).toISOString();
    }

    // Remove empty serial number to let backend handle it
    if (!data.serial_number || !data.serial_number.trim()) {
      const { serial_number, ...dataWithoutSerial } = data;
      Object.assign(data, dataWithoutSerial);
    }

    // Convert unit string to unit ID, but send as string
    const selectedUnit = units.value.find((u) => u.unit === String(data.unit));
    if (selectedUnit) {
      data.unit = selectedUnit.unit; // always string
    } else {
      data.unit = String(data.unit); // fallback to string
    }

    // Ensure category is string and supliers is number
    data.category = String(data.category);
    data.supliers = Number(data.supliers);

    await inventoryStore.createProduct({
      name: data.name,
      category: data.category,
      supliers: data.supliers,
      serial_number: data.serial_number,
      cost_price: data.cost_price,
      margin: data.margin,
      stock: data.stock,
      unit: String(data.unit),
      expires_at: data.expires_at,
      description: data.description,
    });
    showCreateModal.value = false;
    await loadStocks();
    $toast.success("Product created successfully!", {
      position: "top-right",
      duration: 3000,
    });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to create product.", {
      position: "top-right",
      duration: 3000,
    });
  }
}

async function handleEdit(formData: EditProductForm) {
  if (!selectedStockId.value) {
    $toast.error("No product selected for editing.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }

  try {
    const data = { ...formData };

    // Only allow admin/superuser to modify expiry dates
    if (data.expires_at && !canEditExpiry.value) {
      $toast.error("Only administrators can modify expiry dates.", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    // Convert datetime-local to ISO format if expiry is set
    if (data.expires_at) {
      data.expires_at = new Date(data.expires_at).toISOString();
    }

    // Convert unit string to unit ID, but send as string
    const selectedUnit = units.value.find((u) => u.unit === String(data.unit));
    if (selectedUnit) {
      data.unit = selectedUnit.unit; // always string
    } else {
      data.unit = String(data.unit); // fallback to string
    }

    // Ensure category is string and supliers is number
    data.category = String(data.category);
    data.supliers = Number(data.supliers);

    await inventoryStore.updateProduct(selectedStockId.value, {
      name: data.name,
      category: data.category,
      supliers: data.supliers,
      batch_number: data.batch_number,
      serial_number: data.serial_number,
      cost_price: data.cost_price,
      margin: data.margin,
      stock: data.stock,
      unit: String(data.unit),
      expires_at: data.expires_at,
      description: data.description,
    });
    showEditModal.value = false;
    await loadStocks();
    $toast.success("Product updated successfully!", {
      position: "top-right",
      duration: 5000,
    });
  } catch (e) {
    console.error(e);
    $toast.error("Failed to update product.", {
      position: "top-right",
      duration: 500,
    });
  }
}

async function handleCreateCategory(formData: CreateCategoryForm) {
  try {
    await inventoryStore.createCategory({ ...formData });
    showCreateCategoryModal.value = false;
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
  }
}

async function handleEditCategory(formData: EditCategoryForm) {
  try {
    if (!formData.id) {
      $toast.error("Category ID is required for editing.", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    await inventoryStore.updateCategory(formData.id, {
      name: formData.name,
      description: formData.description,
      is_expired_applicable: formData.is_expired_applicable,
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
  }
}

// Add a helper function to get unit display
const getUnit = (item: Stock | null): string => {
  if (!item) return "N/A";

  // Check unit_name first since it contains the actual unit string from the serializer
  if (
    item.unit_name &&
    typeof item.unit_name === "string" &&
    item.unit_name.trim()
  ) {
    return item.unit_name;
  }

  // Fallback to unit field, but check if it's a string first
  if (item.unit) {
    if (typeof item.unit === "string" && item.unit.trim()) {
      return item.unit;
    }
    // If unit is a number (ID), try to find the corresponding unit name
    if (typeof item.unit === "number") {
      const unitObj = units.value.find((u) => u.id === item.unit);
      if (unitObj) {
        return unitObj.unit;
      }
    }
  }

  return "N/A";
};

// Close dropdown on outside click
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(".dropdown-container")) {
    dropdownOpen.value = null;
  }
};

// Close modals on ESC key press
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
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

    dropdownOpen.value = null;
  }
};

// Helper function with proper type
function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
}

function handleCreateStockClick() {
  if (auth.user?.role === "staff") {
    $toast.error("You are not able to create products.", {
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
    $toast.error("You are not able to create categories.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }
  showCreateCategoryModal.value = true;
}

function clearFilters() {
  searchQuery.value = "";
  selectedCategoryFilter.value = "";
  selectedStockFilter.value = "";
  currentPage.value = 1;
}

onMounted(async () => {
  if (!auth.user) {
    await auth.self();
  }
  await Promise.all([
    loadStocks(),
    loadCategories(),
    loadSuppliers(),
    loadUnits(),
  ]);

  // Add event listeners for better UX
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});

// Watch for filter changes and reset to page 1
watch([searchQuery, selectedCategoryFilter, selectedStockFilter], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.text-16 {
  font-size: 16px;
}
.text-18 {
  font-size: 18px;
}
.text-20 {
  font-size: 20px;
}
.text-12 {
  font-size: 12px;
}
.text-64 {
  font-size: 64px;
}

/* Unit dropdown styling */
select option {
  color: #000000 !important;
  background-color: #ffffff !important;
}

select {
  color: #000000 !important;
}

select:focus {
  color: #000000 !important;
}

/* Ensure dropdown options are visible and readable */
select option:hover {
  background-color: #f3f4f6 !important;
  color: #000000 !important;
}

/* Unified scrollbar styling for all elements */
.overflow-auto::-webkit-scrollbar,
.overflow-x-auto::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-auto .overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-auto::-webkit-scrollbar-thumb:hover,
.overflow-x-auto::-webkit-scrollbar-thumb:hover,
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

/* Modal transition styles */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Improved responsive design for modals */
@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .md\\:col-span-2 {
    grid-column: span 1;
  }
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  main {
    margin-left: 0;
  }

  .material-icons.text-16 {
    font-size: 16px;
  }

  .material-icons.text-18 {
    font-size: 18px;
  }

  .material-icons.text-20 {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .min-h-screen {
    padding-top: 70px;
  }
}
</style>
