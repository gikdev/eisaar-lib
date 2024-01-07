<template>
  <Table 
    :itemsArr="membersArr" 
    :headings="membersHeadings" 
    :itemChangeFn="memberChangeFn"
    :itemDeletionFn="memberDeletionFn"
    :itemAdditionFn="memberAdditionFn"
  />
</template>
<script>
  export default {
    props: [
      'membersArr', 
      'membersHeadings', 
      'memberChangeFn', 
      'memberDeletionFn',  
      'memberAdditionFn'
    ],
  }
</script>