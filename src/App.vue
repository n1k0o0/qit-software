<template>
  <div id="app">
    <div class="container">
      <img src="./assets/logo.png" alt="logo">
      <h1>Vue Invoice Calc</h1>
      <el-form :model="newData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :span="9">
            <el-form-item label="Name" prop="name">
              <el-input
                v-model="newData.name"
                placeholder="Product name"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Price" prop="price">
              <el-input
                v-model="newData.price"
                min="0"
                type="number"
                placeholder="Price"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Quantity" prop="quantity">
              <el-input
                v-model="newData.quantity"
                min="1"
                type="number"
                placeholder="quantity"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">
              <el-button
                type="primary"
                @click="add"
              >Add
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col>
          <el-table
            :data="data"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="Price"
            >
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantity"
            >
            </el-table-column>
            <el-table-column
              label="Sum"
            >
              <template #default="scope">
                {{ +scope.row.price * +scope.row.quantity }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="3">
          <el-button
            type="danger"
            @click="remove"
          >
            Delete
          </el-button>
        </el-col>
        <el-col :span="6">
          Total: ${{round(totalSum)}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'

declare interface IData {
  name: string,
  price: number,
  quantity: number
}

export default {
  name: 'app',
  components: {},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      newData: {
        name: '',
        price: '',
        quantity: ''
      },
      selectedData: new Array<IData>(),
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Name',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: 'Please input Price',
            trigger: 'blur'
          },
          {
            min: 1,
            message: 'Length should be greater than 1',
            trigger: 'blur'
          }
        ],
        quantity: [
          {
            required: true,
            message: 'Please input quantity',
            trigger: 'blur'
          },
          {
            min: 1,
            message: 'Length should be greater than 1',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      addData: 'ADD_DATA',
      removeData: 'REMOVE_DATA'
    }),
    add (): void {
      this.$refs.ruleForm.validate((valid: never) => {
        if (valid) {
          this.addData(this.newData)
          this.newData = {
            name: '',
            price: '',
            quantity: ''
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    remove (): void {
      this.removeData(this.selectedData)
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleSelectionChange (val: Array<IData>) {
      this.selectedData = val
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    round (value: number, digit = 3) {
      return Math.round((value + Number.EPSILON) * 10 ** digit) / 10 ** digit
    }
  },
  computed: {
    ...mapGetters({
      data: 'GET_DATA'
    }),
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    totalSum () {
      return this.data.reduce((partialSum: number, a: IData) => partialSum + a.price * a.quantity, 0)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin: 0 15px;
}

.el-row {
  margin-bottom: 15px;
}
</style>
