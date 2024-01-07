<template>
  <NuxtLayout>
    <NuxtPage
      :borrowingsArr="borrowingsArr"
      :borrowingsHeadings="borrowingsHeadings"
      :borrowingChangeFn="changeBorrowing"
      :borrowingDeletionFn="deleteBorrowing"
      :borrowingAdditionFn="addBorrowing"
      
      :membersArr="membersArr"
      :membersHeadings="membersHeadings"
      :memberChangeFn="changeMember"
      :memberDeletionFn="deleteMember"
      :memberAdditionFn="addMember"

      :uploadFileFn="uploadFile"
      :downloadFileFn="downloadFile"
      :parseFileFn="parseFile"

      :appVersion="appVersion"
      :becomeAdminFn="becomeAdmin"
      :isAdmin="isAdmin"
    />
  </NuxtLayout>
</template>

<script>
  /**
   * 
   * @param {string} data 
   * @param {string?} filename 
   * @param {string?} type
   */
   function download(data, filename = 'data.json', type = 'text/json') {
    const file = new Blob([data], { type })
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, filename)
    } else { 
      const anchor = document.createElement("a")
      const url = URL.createObjectURL(file)
      anchor.href = url
      anchor.download = filename
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      window.URL.revokeObjectURL(url)
    }
  }

  export default {
    data() {
      return {
        borrowingsArr: [],
        borrowingsHeadings: [ 'آیدی', 'عضو', 'کتاب',  'تاریخ گرفتن',  'تاریخ بازگرداندن',  'بازگردانده', ],
        membersArr: [],
        membersHeadings: ['آیدی', 'نام', 'نام خانوادگی'],
        appVersion: '1.0.0',
        isAdmin: false
      }
    },
    mounted() {
      this.getDataFromAPI()
    },
    methods: {
      changeBorrowing(i) {
        const selectedBorrowing = this.borrowingsArr[i]
        selectedBorrowing.member = prompt('نام کاربر:', selectedBorrowing.member)
        selectedBorrowing.book = prompt('نام کتاب:', selectedBorrowing.book)
        selectedBorrowing.from = prompt('تاریخ گرفتن کتاب:', selectedBorrowing.from)
        selectedBorrowing.to = prompt('تاریخ دادن کتاب:', selectedBorrowing.to)
        selectedBorrowing.isDone = confirm('آیا کتاب پس داده؟')

        this.sendDataToAPI()
      },
      deleteBorrowing(i) {
        this.borrowingsArr.splice(i, 1)

        this.sendDataToAPI()
      },
      addBorrowing() {
        const id = (this.borrowingsArr.length) ? this.borrowingsArr.at(-1).id + 1 : 0
        const member = prompt('نام کاربر:', 'کاربر ناشناس')
        const book = prompt('نام کتاب:', 'کتاب ناشناس')
        const from = prompt('تاریخ گرفتن کتاب:', '0000-00-00')
        const to = prompt('تاریخ دادن کتاب:', '0000-00-00')
        const isDone = confirm('آیا کتاب پس داده؟')

        this.borrowingsArr.push({ id, member, book, from, to, isDone })

        this.sendDataToAPI()
      },
      changeMember(i) {
        const selectedMember = this.membersArr[i]
        selectedMember.firstName = prompt('نام:', selectedMember.firstName)
        selectedMember.lastName = prompt('نام خانوادگی:', selectedMember.lastName)

        this.sendDataToAPI()
      },
      deleteMember(i) {
        this.membersArr.splice(i, 1)

        this.sendDataToAPI()
      },
      addMember() {
        const id = (this.membersArr.length != 0) ? this.membersArr.at(-1).id + 1 : 0
        const firstName = prompt('نام:', 'ناشناس')
        const lastName = prompt('نام خانوادگی: ', 'ناشناس وند')

        this.membersArr.push({ id, firstName, lastName })

        this.sendDataToAPI()
      },
      uploadFile() {
        const label = document.querySelector(`label[for="data-file-input"]`)
        label.click()
      },
      downloadFile() {
        let data = ''
        data += `{`
          data += `"borrowingsArr": ${JSON.stringify(this.borrowingsArr)},`
          data += `"borrowingsHeadings": ${JSON.stringify(this.borrowingsHeadings)},`
          data += `"membersArr": ${JSON.stringify(this.membersArr)},`
          data += `"membersHeadings": ${JSON.stringify(this.membersHeadings)}`
        data += `}`
        download(data)
      },
      parseFile(e) {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsText(file, "UTF-8")
        reader.onload = e => {
          const { borrowingsArr, membersArr, borrowingsHeadings, membersHeadings,  } = JSON.parse(e.target.result)
          this.borrowingsArr = borrowingsArr
          this.borrowingsHeadings = borrowingsHeadings
          this.membersArr = membersArr
          this.membersHeadings = membersHeadings
        }
        reader.onerror = e => {
          alert('خطا در خواندن فایل! دوباره تلاش کنید...')
        }
      },
      becomeAdmin() {
        const myPassword = `mmsfllfbns`
        const enteredPassword = prompt('رمز ادمین را وارد کنید:')
        if (enteredPassword === myPassword) {
          alert('خوش آمدید!')
          this.isAdmin = true
        } else {
          alert('دسترسی رد شد!')
          this.isAdmin = false
        }
      },
      async getDataFromAPI() {
        const res = await fetch('https://eisaar-lib.liara.run/data')
        const data = await res.json()
        const { borrowingsArr, membersArr, borrowingsHeadings, membersHeadings,  } = data
        this.borrowingsArr = borrowingsArr
        this.borrowingsHeadings = borrowingsHeadings
        this.membersArr = membersArr
        this.membersHeadings = membersHeadings
      },
      sendDataToAPI() {
        fetch("https://eisaar-lib.liara.run/data", {
          method: "POST",
          mode: 'no-cors',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({
            borrowingsArr: this.borrowingsArr,
            borrowingsHeadings: this.borrowingsHeadings,
            membersArr: this.membersArr,
            membersHeadings: this.membersHeadings,
          })
        })
      }
    }
  }
</script>