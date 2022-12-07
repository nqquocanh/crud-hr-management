<template>
  <div>
    <el-dialog
      title="Edit Personnel Information"
      :visible.sync="dialogEdit"
      width="30%"
      @close="$emit('cancel')"
      :before-close="handleClose">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="Age" prop="age" >
              <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Date Of Birth" required>
              <el-col :span="11">
                <el-form-item prop="dob">
                  <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.dob" :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="Gender" prop="gender">
              <el-select v-model="ruleForm.gender" placeholder="Gender">
                <el-option label="Male" value="male"></el-option>
                <el-option label="Female" value="female"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Address" prop="address">
              <el-input type="textarea" v-model="ruleForm.address"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item label="Department" prop="dept">
              <el-input v-model="ruleForm.dept"></el-input>
            </el-form-item>

            <el-form-item label="Position" prop="position">
              <el-input v-model="ruleForm.position"></el-input>
            </el-form-item>
          </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel')">Cancel</el-button>
        <el-button type="primary" @click="editPersonnel('ruleForm')">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ['information', 'id'
  ],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogEdit: true,
      ruleForm: {
        id:``,
        name: '',
        age: '',
        dob: '',
        gender: '',
        address: '',
        email:'',
        dept:'',
        position:''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Name', trigger: 'blur' },
          { min: 3, max: 20, message: 'Length should be 3 to 10', trigger: 'blur' }
        ],
        age: [
          { required: true, message: 'Please input Age', trigger: 'blur'},
          // { type: 'number', message: 'Age must be a number', trigger: 'blur'},
          { min: 1, max: 2, message: 'Age should be smaller than 99', trigger: 'blur' },
        ],
        dob: [
          { type: 'date', required: true, message: 'Please select Date of Birth', trigger: 'change' }
        ],
        gender: [
          {required: true, message: 'Please select at least one gender', trigger: 'change' }
        ],
        address: [
          { required: true, message: 'Please input address', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          {required: true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Please input valid email', trigger: 'blur' }
        ],
        dept: [
          { required: true, message: 'Please input department', trigger: 'blur' }
        ],
        position: [
          { required: true, message: 'Please input position', trigger: 'blur' }
        ]
      }

    };
  },

  watch: {
    dialogEdit() {
      if(this.dialogEdit) {
        this.ruleForm = {...this.information}
        if (this.ruleForm.dob && typeof this.ruleForm.dob === 'string') this.ruleForm.dob = new Date(this.ruleForm.dob)
      }
    }
  },

  methods: {
  async  editPersonnel(formName) {
      const {id,name,age,dob,gender,address,email,dept,position} = this.ruleForm
      if (this.ruleForm.dob && typeof this.ruleForm.dob === 'string') this.ruleForm.dob = new Date(this.ruleForm.dob)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
       await axios.put (`https://638813f9a4bb27a7f77d615a.mockapi.io/personnel/${this.ruleForm.id}`, this.ruleForm)
            .then (response =>{
              this.addSuccess()
              this.dialogEdit=false
              this.$emit('refreshTable')
              console.log(response)
            })
            .catch(e =>{
              console.log(e)
              this.addError()
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose() {
      this.dialogEdit=false
    },
    addSuccess() {
      this.$message({
        message: 'Edit personnel successfully.',
        type: 'success'
      });
    },
    addError() {
      this.$message.error('Sorry, edit personnel error.');
    },
  },

  created() {
    this.ruleForm = {...this.information}
  }
}

</script>
