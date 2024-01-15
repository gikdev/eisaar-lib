<template>
  <h2>درباره: </h2>
  <section>
    <p>این برنامه برای مدیریت کتابخانه های ساده و کوچک طراحی شده و نیازمند فایل <code>data.json</code> است تا کار کند. </p>
    <p>نسخه برنامه: {{ appVersion }}</p>
    <p>سازنده: <a href="https://github.com/gikdev/">محمد مهدی بهرامی</a></p>
    <p>ساخته شده با:</p>
    <ul lang="en" class="tools">
      <li>
        <IconWrench style="font-size: 1.5rem;" class="icon" />
        <a href="https://vuejs.org/" class="tool">VueJS 3</a>
      </li>
      <li>
        <IconWrench style="font-size: 1.5rem;" class="icon" />
        <a href="https://vitejs.dev/" class="tool">Vite</a>
      </li>
      <li>
        <IconWrench style="font-size: 1.5rem;" class="icon" />
        <a href="https://sass-lang.com/" class="tool">SASS</a>
      </li>
      <li>
        <IconWrench style="font-size: 1.5rem;" class="icon" />
        <a href="https://phosphoricons.com/" class="tool">Phosphor Icons</a>
      </li>
      <li>
        <IconWrench style="font-size: 1.5rem;" class="icon" />
        <a href="https://yeun.github.io/open-color/" class="tool">OpenColor</a>
      </li>
      <li>
        <IconWrench style="font-size: 1.5rem;" class="icon" />
        <a href="https://nuxt.com/" class="tool">NuxtJS</a>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: [`appVersion`],
  }
</script>