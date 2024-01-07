<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item nav__item--logo">
        <button @click="goTo('/')" class="nav__btn">
          <IconHouse class="icon icon--primary"  />
        </button>
      </li>
      <li class="nav__item">
        <button @click="goTo('/borrowings')" class="nav__btn">
          <IconBookBookmark class="icon"  />
        </button>
      </li>
      <li class="nav__item">
        <button @click="goTo('/members')" class="nav__btn">
          <IconPersonCircle class="icon"  />
        </button>
      </li>
      <li class="nav__item">
        <button @click="goTo('/settings')" class="nav__btn">
          <IconGear class="icon"  />
        </button>
      </li>
      <li class="nav__item">
        <button @click="goTo('/about')" class="nav__btn">
          <IconInfo class="icon"  />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    methods: {
      goTo(where) {
        this.$router.push(where)
      },
    },
  }
</script>