<template>
  <Table 
    :items="borrowings" 
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
      "borrowings", 
      "borrowingsHeadings", 
      'borrowingChangeFn', 
      'borrowingDeletionFn', 
      'borrowingAdditionFn',
      'isAdmin'
    ],
  }
</script>