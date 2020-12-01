<template>
  <div
    class="container-fluid"
    style="background-image: -webkit-linear-gradient(left, #9d9ede, rgb(62, 5, 50));
     position:relative;height: 100vh;background-size: cover;overflow: scroll;overflow-x: hidden;color:white;"
  >
    <div
      class="row"
      style="background-color: rgb(33, 16, 47);"
    >
      <div class="container">
        <app-header />
      </div>
    </div>
    <div class="container paddTopBot">
      <div class="text-center">
        <!-- <img v-bind:src="images.logo" class="img-logo" /> -->
        <b-breadcrumb
          :items="items"
          class="text-center"
        />
        <div
          v-if="addgroupActive==false"
          class="col-sm-12"
        >
          <b-row>
            <b-col
              lg="6"
              class="my-1"
            >
              <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                  />
                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      @click="filter = ''"
                    >
                      Clear
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Main table element -->
          <b-table
            small
            stacked="md"
            :items="phases"
            :fields="columns"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          />
          <div class="row">
            <b-col
              sm="5"
              md="6"
              class="my-1"
            >
              <b-form-group
                label="Per page"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                label-for="perPageSelect"
                class="mb-0"
              >
                <b-form-select
                  id="perPageSelect"
                  v-model="perPage"
                  size="sm"
                  :options="pageOptions"
                />
              </b-form-group>
            </b-col>
            <b-col
              sm="7"
              md="6"
              class="my-1"
            >
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              />
            </b-col>
          </div>
          <div class="form-group text-right">
            <button
              type="button"
              class="btn btn-danger"
              @click="addGroup"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
