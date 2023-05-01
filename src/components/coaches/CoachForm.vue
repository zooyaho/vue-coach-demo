<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">FirstName</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">첫 번째 이름은 빈 값일 수 없습니다.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">LastName</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">두 번째 이름은 빈 값일 수 없습니다.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">설명은 빈 값일 수 없습니다.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">시간당 수강료는 0이상여야 합니다.</p>
    </div>
    <!-- s: 자신 있는 전문 분야 -->
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>자신 있는 전문 분야</h3>
      <div>
        <input
          type="checkbox"
          @blur="clearValidity('areas')"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          @blur="clearValidity('areas')"
          id="backend"
          value="backend"
          v-model="areas.val"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          @blur="clearValidity('areas')"
          id="career"
          value="career"
          v-model="areas.val"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">전문 분야가 하나는 있어야 합니다.</p>
    </div>
    <!-- e: 자신 있는 전문 분야 -->
    <p v-if="!formIsValid">양식을 다시 작성하고 제출해주세요.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true, // 입력값이 하나라도 실패하면 false
    };
  },
  methods: {
    clearValidity(input) {
      // 유효성 검사 실패 후 폼작성 시 원상태 되돌리는 함수
      // input이 포커스를 잃을 때마다 해당 함수를 실행시킨다.
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true; // 지난 유효성 검사 이후에도 여전히 유효한지 확인

      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        // null or 음수인지 확인
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        // 전문분야가 적어도 하나 있어야함
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm(); // 폼 유효성 검사 실행

      if (!this.formIsValid) return; // 유효성 검사 실패 시

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      console.log('formData: ', formData);
      // 검증
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

/* 양식 검증 스타일링 */
.invalid label,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
