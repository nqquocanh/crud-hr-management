<template>
  <div>
    <div class="search-bar">
      <div class="search-item">
        <p class="filter-title">Name</p>
        <el-input v-model="searchQuery" placeholder="Name">
        </el-input>
      </div>

      <div class="search-item">
        <p class="filter-title">Email</p>
        <el-input v-model="searchEmail" placeholder="Email">
        </el-input>
      </div>

      <div class="search-item">
        <p class="filter-title">From</p>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            class="date-search-item"
            width="500"
            v-model="value1"
            type="daterange"
            range-separator="To"
            start-placeholder="From date"
            end-placeholder="To date">
          </el-date-picker>
        </div>
      </div>

      <div class="search-item">
        <div class="filter-button">
          <el-button type="primary" icon="el-icon-search" @click="submitSearch()"> Search </el-button>

          <el-button type="success" icon="el-icon-s-promotion" disabled>Submit</el-button>

          <el-button @click="showFilter=!showFilter">Filter</el-button>
        </div>
      </div>

    </div>
    <div class="show-filter">
      <div v-if="showFilter">
        <div class="collapse-items">
          <div class="collapse-item">
            <div class="filter-title">HQ tiếp nhận</div>
            <el-input placeholder="HQ tiếp nhận" v-model="input"/>
          </div>
          <div class="collapse-item">
            <div class="filter-title">Mã doanh nghiệp XNK</div>
            <el-input placeholder="Mã doanh nghiệp XNK" v-model="input"/>
          </div>
          <div class="collapse-item">
            <div class="filter-title">Số vận đơn gốc</div>
            <el-input placeholder="Số vận đơn gốc" v-model="input"/>
          </div>
          <div class="collapse-item">
            <div class="filter-title">Trạng thái</div>
            <el-input placeholder="Trạng thái" v-model="input"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: [`personnel`],
  data() {
    return {
      searchEmail: null,
      searchQuery: null,
      showFilter: false,
      input: '',
      options: [{
        value: 'id',
        label: 'ID'
      }, {
        value: 'name',
        label: 'Name'
      }, {
        value: 'dob',
        label: 'Date of Birth'
      }, {
        value: 'gender',
        label: 'Gender'
      },{
        value: 'address',
        label: 'Address'
      },{
        value: 'email',
        label: 'Email'
      },{
        value: 'dept',
        label: 'Department'
      },{
        value: 'position',
        label: 'Position'
      },],
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods: {
    submitSearch() {
      this.$emit('search', this.searchQuery)
      this.$emit('searchEmail', this.searchEmail)
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  /*justify-content: space-between;*/
}
.search-item {
  margin-left: 10px;

}
.date-search-item {
  margin-left: 10px;
  width: 400px;
}
.collapse-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 97% !important;
  background-color: whitesmoke;
  padding: 25px;
}
.collapse-item {
  margin-left: 5px;
  width: 450px;
}
.filter-button {
  margin-top: 54px
}
.show-filter {
  margin-top: 50px;
  margin-bottom: 50px;
}
.filter-title {
  font-weight: bold;
  font-size: 17px;
}
</style>
