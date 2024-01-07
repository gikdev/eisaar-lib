<template>
  <div class="table__wrapper">
    <table class="table" >
      <tbody>
        <tr>
          <th v-for="heading in headings">{{ heading }}</th>
          <th>ویرایش ها</th>
        </tr>
        <tr v-for="(item, i) in itemsArr">
          <td v-for="val in item">
            <span v-if="(typeof val) === 'boolean'">
              <IconCheckCircle v-if="val"  class="icon icon--green" />
              <IconXCircle v-else  class="icon icon--red" />
            </span>
            <span v-else>{{ val }}</span>
          </td>
          <td class="table__cell table__cell--editing">
            <IconPencil v-if="isAdmin" @click="itemChangeFn(i)"  class="icon icon--clickable icon--yellow" />
            <IconPencil v-else  class="icon icon--disabled" />
            &nbsp;&nbsp;&nbsp;
            <IconTrash v-if="isAdmin" @click="itemDeletionFn(i)"  class="icon icon--clickable icon--red" />
            <IconTrash v-else  class="icon icon--disabled" />
          </td>
        </tr>
        <tr>
          <td>
            <IconPlusCircle v-if="isAdmin" @click="itemAdditionFn()"  class="icon icon--clickable icon--green" />
            <IconPlusCircle v-else  class="icon icon--disabled" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!----------------------------------------------------------------------------------->
<script>
  export default {
    props: [ 
      'headings', 
      'itemsArr', 
      'itemChangeFn', 
      'itemDeletionFn', 
      'itemAdditionFn', 
      'isAdmin'
    ],
  }
</script>