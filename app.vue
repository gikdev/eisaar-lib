<template>
  <NuxtLayout>
    <NuxtPage
      :borrowings="borrowings"
      :borrowingsHeadings="borrowingsHeadings"
      :borrowingChangeFn="changeBorrowing"
      :borrowingDeletionFn="deleteBorrowing"
      :borrowingAdditionFn="addBorrowing"
      
      :members="members"
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
        borrowings: [],
        borrowingsHeadings: [ 'آیدی', 'عضو', 'کتاب',  'تاریخ گرفتن',  'تاریخ بازگرداندن',  'بازگردانده', ],
        members: [],
        membersHeadings: ['آیدی', 'نام', 'نام خانوادگی'],
        appVersion: '2.1.0',
        isAdmin: true
      }
    },
    mounted() {
      // this.getDataFromAPI()
    },
    methods: {
      changeBorrowing(i) {
        const selectedBorrowing = this.borrowings[i]
        selectedBorrowing.member = prompt('نام کاربر:', selectedBorrowing.member)
        selectedBorrowing.book = prompt('نام کتاب:', selectedBorrowing.book)
        selectedBorrowing.from = prompt('تاریخ گرفتن کتاب:', selectedBorrowing.from)
        selectedBorrowing.to = prompt('تاریخ دادن کتاب:', selectedBorrowing.to)
        selectedBorrowing.isDone = confirm('آیا کتاب پس داده؟')

        // this.sendDataToAPI()
      },
      deleteBorrowing(i) {
        this.borrowings.splice(i, 1)

        // this.sendDataToAPI()
      },
      addBorrowing() {
        const id = (this.borrowings.length) ? this.borrowings.at(-1).id + 1 : 0
        const member = prompt('نام کاربر:', 'کاربر ناشناس')
        const book = prompt('نام کتاب:', 'کتاب ناشناس')
        const from = prompt('تاریخ گرفتن کتاب:', '0000-00-00')
        const to = prompt('تاریخ دادن کتاب:', '0000-00-00')
        const isDone = confirm('آیا کتاب پس داده؟')

        this.borrowings.push({ id, member, book, from, to, isDone })

        // this.sendDataToAPI()
      },
      changeMember(i) {
        const selectedMember = this.members[i]
        selectedMember.firstName = prompt('نام:', selectedMember.firstName)
        selectedMember.lastName = prompt('نام خانوادگی:', selectedMember.lastName)

        // this.sendDataToAPI()
      },
      deleteMember(i) {
        this.members.splice(i, 1)

        // this.sendDataToAPI()
      },
      addMember() {
        const id = (this.members.length != 0) ? this.members.at(-1).id + 1 : 0
        const firstName = prompt('نام:', 'ناشناس')
        const lastName = prompt('نام خانوادگی: ', 'ناشناس وند')

        this.members.push({ id, firstName, lastName })

        // this.sendDataToAPI()
      },
      uploadFile() {
        const label = document.querySelector(`label[for="data-file-input"]`)
        label.click()
      },
      downloadFile() {
        let data = ''
        data += `{`
          data += `"borrowings": ${JSON.stringify(this.borrowings)}`
          data += `,`
          data += `"members": ${JSON.stringify(this.members)}`
        data += `}`
        download(data)
      },
      parseFile(e) {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsText(file, "UTF-8")
        reader.onload = e => {
          const { borrowings, members  } = JSON.parse(e.target.result)
          this.borrowings = borrowings
          this.members = members
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
        const { borrowings, members, borrowingsHeadings, membersHeadings,  } = data
        this.borrowings = borrowings
        this.borrowingsHeadings = borrowingsHeadings
        this.members = members
        this.membersHeadings = membersHeadings
      },
      sendDataToAPI() {
        // fetch("https://localhost:6666/data", {
        fetch("https://eisaar-lib.liara.run/data", {
          method: "POST",
          mode: 'no-cors',
          headers: {'Content-Type': 'text/plain'}, 
          body: JSON.stringify({
            borrowings: this.borrowings,
            borrowingsHeadings: this.borrowingsHeadings,
            members: this.members,
            membersHeadings: this.membersHeadings,
          })
        })
      }
    }
  }
</script>