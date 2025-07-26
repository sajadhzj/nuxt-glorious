<template>
  <div>
    <div class="flex flex-col gap-6 p-6">
      <GAccordion>
        <template #header>this is my header</template>
        <template #body>content of accordion</template>
      </GAccordion>

      <GAccordion>
        <template #header>this is my header</template>
        <template #body>content of accordion</template>
      </GAccordion>
    </div>
  </div>
</template>
