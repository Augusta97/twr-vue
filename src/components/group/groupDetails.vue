<template>
  <div class="container paddTopBot">
    <div class="row">
      <div class="col-sm-12 text-left">
        <groupCreation />
      </div>
    </div>
  </div>
</template>
<script>
import groupCreation from '../group/groupCreation.vue'
import { mapState } from 'vuex'
export default {
  components: {
    groupCreation
  },
  props: {
    phaseType: String,
    phases: Array
  },
  data(){
    return{
      images: {
        logo: require('../../assets/images/logo.png')
      },
      columns: [
        { key: 'groupName', label: 'Group Name', sortable: true, sortDirection: 'desc' },
        { key: 'area', label: 'Area', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this.totalRows = this.groupInfo.length
  },
  methods: {
    addGroup() {
      this.addgroupActive = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  computed: {
    ...mapState(['groupInfo'])
  }
}
</script>
