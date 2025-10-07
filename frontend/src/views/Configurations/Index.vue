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
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                  >
                    Unit Management
                  </h1>
                  <p class="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Manage measurement units and unit configurations for your
                    products
                  </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    @click="openCreateModal"
                    class="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                    <span class="text-sm sm:text-base">Add Unit</span>
                  </button>
                  <!-- <button
                    @click="openCreateUnitConfigModal"
                    class="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span class="text-sm sm:text-base">Add Unit Config</span>
                  </button> -->
                </div>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-0"
          >
            <!-- Tabs -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6 py-4" aria-label="Tabs">
                <button
                  @click="activeTab = 'units'"
                  :class="[
                    activeTab === 'units'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium',
                  ]"
                >
                  Units
                </button>
                <!-- <button
                  @click="activeTab = 'configurations'"
                  :class="[
                    activeTab === 'configurations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium',
                  ]"
                >
                  Unit Configurations
                </button> -->
              </nav>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center flex-1">
              <div class="flex items-center space-x-3">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                ></div>
                <span class="text-gray-600 font-medium text-lg"
                  >Loading
                  {{
                    activeTab === "units" ? "units" : "unit configurations"
                  }}...</span
                >
              </div>
            </div>

            <!-- Content when not loading -->
            <div v-else class="h-full flex flex-col">
              <!-- Units Tab Content -->
              <div v-if="activeTab === 'units'" class="h-full flex flex-col">
                <!-- Mobile Cards View -->
                <div
                  class="block md:hidden p-4 flex-1 overflow-y-auto space-y-4"
                >
                  <div
                    v-for="unit in units"
                    :key="unit.id"
                    class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 text-lg">
                          {{ unit.unit }}
                        </h3>
                        <p class="text-gray-500 text-sm mt-1">
                          ID: {{ unit.id }}
                        </p>
                      </div>
                      <div class="flex space-x-2 ml-4">
                        <button
                          @click="openEditModal(unit)"
                          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <!-- <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          > -->
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </button>
                        <button
                          @click="confirmDelete(unit)"
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-if="units.length === 0" class="text-center py-8">
                    <div class="flex flex-col items-center">
                      <svg
                        class="w-12 h-12 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p class="text-lg font-medium text-gray-500">
                        No units found
                      </p>
                      <p class="text-sm text-gray-400">
                        Add your first unit to get started
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Desktop Table View -->
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
                            Unit Name
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
                          v-for="(unit, idx) in units"
                          :key="unit.id"
                          class="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {{ idx + 1 }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                              {{ unit.unit }}
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          >
                            <div class="flex space-x-3">
                              <button
                                @click="openEditModal(unit)"
                                class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                                title="Edit Unit"
                              >
                                <!-- <svg
                                  class="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                > -->
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                ></path>
                              </button>
                              <button
                                @click="confirmDelete(unit)"
                                class="text-red-600 hover:text-red-900 transition-colors duration-150"
                                title="Delete Unit"
                              >
                                <svg
                                  class="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="units.length === 0">
                          <td
                            colspan="3"
                            class="px-6 py-12 text-center text-gray-500"
                          >
                            <div class="flex flex-col items-center">
                              <svg
                                class="w-12 h-12 text-gray-300 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                ></path>
                              </svg>
                              <p class="text-lg font-medium">No units found</p>
                              <p class="text-sm">
                                Create your first unit to get started
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Unit Configurations Tab Content -->
              <div
                v-if="activeTab === 'configurations'"
                class="h-full flex flex-col"
              >
                <!-- Mobile Cards View for Unit Configs -->
                <div
                  class="block md:hidden p-4 flex-1 overflow-y-auto space-y-4"
                >
                  <div
                    v-for="config in processedUnitConfigs"
                    :key="config.id"
                    class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 text-lg">
                          {{ config.product_name }} -
                          {{ config.base_unit_name }}
                        </h3>
                        <p class="text-gray-500 text-sm mt-1">
                          {{ config.conversion_per_unit }}
                          {{ config.base_unit_name }} =
                          {{ config.conversion_per_unit }}
                          {{
                            config.conversion_unit_name_display ||
                            config.conversion_unit_name
                          }}
                        </p>
                      </div>
                      <div class="flex space-x-2 ml-4">
                        <button
                          @click="openEditUnitConfigModal(config)"
                          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <!-- <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          > -->
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="processedUnitConfigs.length === 0"
                    class="text-center py-8"
                  >
                    <div class="flex flex-col items-center">
                      <svg
                        class="w-12 h-12 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <p class="text-lg font-medium text-gray-500">
                        No unit configurations found
                      </p>
                      <p class="text-sm text-gray-400">
                        Add your first unit configuration to get started
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Desktop Table View for Unit Configs -->
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
                            Product
                          </th>
                          <th
                            class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Base Unit
                          </th>
                          <th
                            class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Conversion
                          </th>
                          <th
                            class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            Conversion_unit_name
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
                          v-for="(config, idx) in processedUnitConfigs"
                          :key="config.id"
                          class="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {{ idx + 1 }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                              {{ config.product_name }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ config.base_unit_name }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ config.conversion_per_unit }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{
                                config.conversion_unit_name_display ||
                                config.conversion_unit_name
                              }}
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          >
                            <div class="flex space-x-3">
                              <button
                                @click="openEditUnitConfigModal(config)"
                                class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                                title="Edit Unit Configuration"
                              >
                                <svg
                                  class="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="processedUnitConfigs.length === 0">
                          <td
                            colspan="6"
                            class="px-6 py-12 text-center text-gray-500"
                          >
                            <div class="flex flex-col items-center">
                              <svg
                                class="w-12 h-12 text-gray-300 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                ></path>
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                              </svg>
                              <p class="text-lg font-medium">
                                No unit configurations found
                              </p>
                              <p class="text-sm">
                                Create your first unit configuration to get
                                started
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
        </div>
      </main>
    </div>

    <!-- Create Modal -->
    <CreateUnitModel
      v-if="showCreateModal"
      @close="closeCreateModal"
      @created="handleUnitCreated"
    />

    <!-- Edit Modal -->
    <EditUnitModel
      v-if="showEditModal"
      :unit="selectedUnit"
      @close="closeEditModal"
      @updated="handleUnitUpdated"
    />

    <!-- Create Unit Config Modal -->
    <CreateUnitConfig
      v-if="showCreateUnitConfigModal"
      @close="closeCreateUnitConfigModal"
      @created="handleUnitConfigCreated"
    />

    <!-- Edit Unit Config Modal -->
    <EditUnitConfigModal
      v-if="showEditUnitConfigModal"
      :unitConfig="selectedUnitConfig"
      @close="closeEditUnitConfigModal"
      @updated="handleUnitConfigUpdated"
    />

    <!-- Delete Confirmation Modal -->
    <transition name="modal-fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">Confirm Delete</h3>
              <button
                @click="closeDeleteModal"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="mb-6">
              <p class="text-gray-600">
                Are you sure you want to delete "<span class="font-semibold">{{
                  unitToDelete?.unit
                }}</span
                >"? This action cannot be undone.
              </p>
            </div>
            <div class="flex space-x-3">
              <button
                @click="closeDeleteModal"
                class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                @click="handleDelete"
                class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useUnitStore } from "@/stores/UnitAPI";
import { useUnitConfigStore } from "@/stores/unitConfigAPI";
import CreateUnitModel from "@/components/Unit/CreateUnitModel.vue";
import EditUnitModel from "@/components/Unit/EditUnitModel.vue";
import CreateUnitConfig from "@/components/UnitTypeConfigurations/CreateUnitConfigModal.vue";
import EditUnitConfigModal from "@/components/UnitTypeConfigurations/EditUnitConfigModal.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

interface Unit {
  id: number;
  unit: string;
}

// Changed: allow number|string for fields that can be normalized to strings
export interface UnitConfig {
  id: number;
  product: string | number;
  product_name?: string;
  base_unit?: string | number;
  base_unit_name?: string;
  base_unit_id: string | number; // Required, matching EditUnitConfigModal
  unit_type?: string | number; // Optional alternative
  unit_type_name?: string;
  conversion_per_unit?: string | number;
  conversion_unit_name?: string | number;
  conversion_unit_name_display?: string;
}

const unitStore = useUnitStore();
const unitConfigStore = useUnitConfigStore();

const units = computed(() => unitStore.units);
const unitConfigs = computed(() => unitConfigStore.unitConfigs);
const loading = computed(() => unitStore.loading || unitConfigStore.loading);
// const error = computed(() => unitStore.error || unitConfigStore.error);

const unitMap = ref<Record<number, string>>({});
const activeTab = ref<"units" | "configurations">("units");
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showCreateUnitConfigModal = ref(false);
const showEditUnitConfigModal = ref(false);
const selectedUnit = ref<Unit | null>(null);
const selectedUnitConfig = ref<UnitConfig>({
  id: 0,
  product: "",
  product_name: "",
  base_unit: "",
  base_unit_name: "",
  base_unit_id: "", // Add this line
  unit_type: "",
  unit_type_name: "",
  conversion_per_unit: "",
  conversion_unit_name: "",
  conversion_unit_name_display: "",
});
const unitToDelete = ref<Unit | null>(null);

const loadUnits = async () => {
  try {
    unitStore.fetchUnits();
  } catch (error) {
    console.error("Error loading units:", error);
  }
};

const openCreateModal = () => {
  showCreateModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const openEditModal = (unit: Unit) => {
  selectedUnit.value = unit;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  selectedUnit.value = null;
};

const confirmDelete = (unit: Unit) => {
  unitToDelete.value = unit;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  unitToDelete.value = null;
};

const handleDelete = async () => {
  if (!unitToDelete.value) return;

  try {
    await unitStore.deleteUnit(unitToDelete.value.id);
    await loadUnits();
    closeDeleteModal();
  } catch (error) {
    console.error("Error deleting unit:", error);
  }
};

const handleUnitCreated = () => {
  loadUnits();
  closeCreateModal();
};

const handleUnitUpdated = () => {
  loadUnits();
  closeEditModal();
};

// Unit Configuration functions
// const openCreateUnitConfigModal = () => {
//   showCreateUnitConfigModal.value = true;
// };

const closeCreateUnitConfigModal = () => {
  showCreateUnitConfigModal.value = false;
};

const openEditUnitConfigModal = (unitConfig: any) => {
  let normalizedProduct = unitConfig.product;
  if (typeof normalizedProduct === "object" && normalizedProduct !== null) {
    normalizedProduct =
      (normalizedProduct as any).id ||
      (normalizedProduct as any).pk ||
      String(normalizedProduct);
  }

  // Ensure base_unit_id is always populated
  const baseUnitId =
    unitConfig.base_unit_id ??
    unitConfig.unit_type ??
    unitConfig.base_unit ??
    "";

  const normalized: UnitConfig = {
    id: unitConfig.id,
    product: normalizedProduct,
    base_unit_id: baseUnitId, // Always set this required field
    unit_type: unitConfig.unit_type ?? unitConfig.base_unit ?? "",
    unit_type_name:
      unitConfig.unit_type_name ?? unitConfig.base_unit_name ?? "",
    conversion_per_unit: unitConfig.conversion_per_unit ?? "",
    conversion_unit_name:
      unitConfig.conversion_unit_name ??
      unitConfig.conversion_unit_name_display ??
      "",
  };

  selectedUnitConfig.value = normalized;
  showEditUnitConfigModal.value = true;
};

const closeEditUnitConfigModal = () => {
  showEditUnitConfigModal.value = false;
  // clear selected config to avoid stale/partial data being reused
  selectedUnitConfig.value = null;
};

const handleUnitConfigCreated = () => {
  loadUnitConfigs();
  closeCreateUnitConfigModal();
};

const handleUnitConfigUpdated = () => {
  loadUnitConfigs();
  closeEditUnitConfigModal();
};

const loadUnitConfigs = async () => {
  try {
    unitConfigStore.fetchUnitConfigs();
  } catch (error) {
    console.error("Error loading unit configurations:", error);
  }
};

// Keep unitMap in sync with fetched units
watch(
  units,
  (newUnits) => {
    const map: Record<number, string> = {};
    (newUnits || []).forEach((u: any) => {
      if (!u) return;
      const id = u.id ?? u.pk ?? u["id"];
      const name = u.unit ?? u.name ?? u.unit_name ?? "";
      if (id !== undefined) map[id] = name;
    });
    unitMap.value = map;
  },
  { immediate: true },
);

// Provide a processed list that resolves missing base_unit_name from product or unitMap
const processedUnitConfigs = computed(() =>
  (unitConfigs.value || []).map((cfg: any) => {
    // Some APIs embed product as object; try to extract possible base unit info
    const productObj =
      cfg.product && typeof cfg.product === "object"
        ? cfg.product
        : cfg.product_obj || cfg.product_detail || null;

    const productBaseUnitId =
      productObj?.base_unit ??
      productObj?.product_base_unit ??
      productObj?.unit ??
      null;

    const resolvedBaseUnitName =
      cfg.base_unit_name ||
      (productObj &&
        (productObj.base_unit_name ||
          productObj.product_base_unit_name ||
          productObj.unit_name)) ||
      unitMap.value[cfg.base_unit] ||
      unitMap.value[productBaseUnitId] ||
      "";

    const resolvedConversionName =
      cfg.conversion_unit_name_display ||
      unitMap.value[cfg.conversion_unit_name] ||
      cfg.conversion_unit_name ||
      "";

    return {
      ...cfg,
      base_unit_name: resolvedBaseUnitName,
      conversion_unit_name_display: resolvedConversionName,
    };
  }),
);

onMounted(() => {
  loadUnits();
  loadUnitConfigs();
});
</script>

<style scoped>
/* Modal transition styles */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  main {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .min-h-screen {
    padding-top: 70px;
  }
}

/* Unified scrollbar styling */
.overflow-auto::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track,
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb,
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-auto::-webkit-scrollbar-thumb:hover,
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}
</style>
