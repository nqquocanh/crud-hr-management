<template>
  <div>
    <div class="header">
      <h2>Human Resources App</h2>
      <AddData @refreshTable="init()"/>
    </div>
    <div class="line"></div>
    <SearchBar @search="searchResult" @searchEmail="searchEmail"/>
    <div class="line"></div>
    <el-table
      :data="personnel"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        label="ID">
        <template v-slot="{row:{id}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ id }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Name">
        <template v-slot="{row:{name}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ name }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Age">
        <template v-slot = "{row:{age}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ age }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Date of Birth">
        <template v-slot = "{row:{dob}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ dob }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Gender">
        <template v-slot = "{row:{gender}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ gender }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Address">
        <template v-slot = "{row:{address}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ address }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Email">
        <template v-slot = "{row:{email}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ email }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Department">
        <template v-slot = "{row:{dept}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ dept }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Position">
        <template v-slot = "{row:{position}}">
          <div slot="reference" class="name-wrapper">
            <p>{{ position }}</p>
          </div>
        </template>
      </el-table-column>


      <el-table-column
        label="Operations"
        class="operations">
        <template v-slot = "scope"  >
          <el-button
            size="mini"
            @click="onEdit(scope.row.id)">Edit</el-button>
          <edit-data :information="currentEdit" ref="test" :id="scope.row.id" v-if="editingId == scope.row.id" @refreshTable="init()" @cancel="editingId = null"/>
<!--          <el-button-->
<!--            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="onPreDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Notification"
      :visible.sync="dialogVisible"
      width="30%">
      <span>Are you sure want to delete this personnel?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleDelete(currentScope)" @refreshTable="init()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditData from "./DataAction/EditData";
import AddData from "./DataAction/AddData";
import SearchBar from "./SearchBar/SearchBar";
import axios from 'axios'
export default {
  components: {EditData, AddData, SearchBar},
  data() {
    return {
      personnel: [],
      loading: false,
      dialogVisible:false,
      currentScope: null,
      currentEdit:{},
      editingId:"",
      dialogAdd:false,
      currentAdd: {}
    }
  },
  created() {
   this.init()
  },
  methods: {
    searchResult(value) {
      axios.get(`https://638813f9a4bb27a7f77d615a.mockapi.io/personnel/`)
        .then(response => {
          if (value) {
            this.personnel = response.data.filter(personnel =>
            personnel.name.toLowerCase().includes(value.toLowerCase()))
          } else {
            this.personnel = response.data;
          }
        })
      .catch(e => {
        this.DataError()
      })
    },
    searchEmail(value) {axios.get(`https://638813f9a4bb27a7f77d615a.mockapi.io/personnel/`)
      .then(response => {
        if (value) {
          this.personnel = response.data.filter(personnel =>
            personnel.email.toLowerCase().includes(value.toLowerCase()))
        } else {
        }
      })
      .catch(e => {
        this.DataError()
      })
    },
    init(){
      this.loading = true
      axios.get(`https://638813f9a4bb27a7f77d615a.mockapi.io/personnel/`)
        .then (response => {
          this.personnel = response.data
          console.log(response.data)
        })
        .catch(e => {
          this.DataError()
        })
        .finally(
          ()=>{this.loading = false}
        )
    },

    onPreDelete(scope) {
      this.currentScope=scope
      this.dialogVisible=true
    },

    onEdit(id) {
      this.editingId = id
      this.currentEdit = this.personnel.find((item) => item.id === id)
    },

    handleDelete({row:{id}}) {
      this.loading = true
      axios.delete(`https://638813f9a4bb27a7f77d615a.mockapi.io/personnel/${id}`)
        .then (response =>{
          this.deleteSuccess()
          this.init()
          console.log(response)
          setTimeout(function() {
             location.reload(1);
          }, 1000);
        })
        .catch(e =>{
          console.log(e)
          this.deleteError()
        })
        .finally(() => this.loading = false)
      this.dialogVisible = false
    },
    DataError() {
      this.$message.error('Oops, fetch data error.');
    },
    deleteSuccess() {
      this.$message({
        message: 'Delete task successfully',
        type: 'success'
      });
    },
    deleteError() {
      this.$message.error('Oops, delete task error.');
    },
  },
}
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
hr {
  background-color: red
}
.line {
  width: 100%;
  height: 0;
  border: 1px solid lightgray;
  margin: 30px 0px 30px 0px;
  display:inline-block;
}
</style>
