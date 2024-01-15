<template>
  <Table 
    :items="members" 
    :headings="membersHeadings" 
    :itemChangeFn="memberChangeFn"
    :itemDeletionFn="memberDeletionFn"
    :itemAdditionFn="memberAdditionFn"
  />
</template>
<script>
  export default {
    props: [
      'members', 
      'membersHeadings', 
      'memberChangeFn', 
      'memberDeletionFn',  
      'memberAdditionFn'
    ],
  }
</script>