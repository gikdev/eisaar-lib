<template>
  <Table 
    :itemsArr="borrowingsArr" 
    :headings="borrowingsHeadings" 
    :itemChangeFn="borrowingChangeFn"
    :itemDeletionFn="borrowingDeletionFn"
    :itemAdditionFn="borrowingAdditionFn"
    :isAdmin="isAdmin"
  />
</template>
<script>
  export default {
    props: [ 
      "borrowingsArr", 
      "borrowingsHeadings", 
      'borrowingChangeFn', 
      'borrowingDeletionFn', 
      'borrowingAdditionFn',
      'isAdmin'
    ],
  }
</script>