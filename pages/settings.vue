<template>
  <h2>تنظیمات: </h2>
  <form class="form" @submit.prevent="void(1)">
    <fieldset>
      <legend>فایل دیتا:</legend>
      <div class="form__option">
        <button v-if="isAdmin" id="file-upload-btn" class="file-input-btn" @click="uploadFileFn()">
          <IconUpload  class="icon icon--clickable icon--primary" />
          <span>بارگذاری فایل دیتا</span>
        </button>
        <button v-else id="file-upload-btn" class="file-input-btn">
          <IconUpload  class="icon icon--disabled" />
          <span>بارگذاری فایل دیتا</span>
        </button>
        <label for="data-file-input"></label>
        <input class="u-hidden" type="file" name="dataFile" id="data-file-input" @input="parseFileFn($event)">
      </div>
      <hr class="form__seperator">
      <div class="form__option">
        <button v-if="isAdmin" id="file-download-btn" @click="downloadFileFn()">
          <IconDownload  class="icon icon--clickable icon--primary" />
          <span>بارگیری فایل دیتا</span>
        </button>
        <button v-else id="file-download-btn">
          <IconDownload  class="icon icon--disabled" />
          <span>بارگیری فایل دیتا</span>
        </button>
      </div>
      <hr class="form__seperator">
      <div class="form__option">
        <button id="file-download-btn" @click="becomeAdminFn()">
          <IconPersonCircle  class="icon icon--clickable icon--primary" />
          <span>ادمین</span>
        </button>
      </div>
    </fieldset>
      
  </form>
</template>
<!----------------------------------------------------------------------------------->
<script>
  export default {
    props: [`uploadFileFn`, `downloadFileFn`, `parseFileFn`, `becomeAdminFn`, 'isAdmin'],
  }
</script>