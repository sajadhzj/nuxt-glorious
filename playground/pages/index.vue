<script setup lang="ts">
const callApiNews = ({ page }: any = { page: 1 }) => {
  useGloriousFetch('https://api.my-zarand.ir/api/news', {
    headers: {
      authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjM2MjE2ZGNiYTQxZTdkYTQ1NzlkM2EyNWI0ODQxY2QwOTk2ZmU4NzI5NmM1NjNjNGFjMTY5ZWE5M2RhM2U3MDg3ODdlZjQ5ZTViZGYxNDQiLCJpYXQiOjE3Mjc5NjUyMDYuMjg1MTEsIm5iZiI6MTcyNzk2NTIwNi4yODUxMjEsImV4cCI6MTc1OTUwMTIwNi4yNzg4NjYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.odcL6CCKRRc6vvJloPKWfxFv736CGjw04iAnq8n4mKu-LqBlOWapFKCYUE2VWb0fW814phzLRbQB7Wrj-a7ebFeaxk3iaP8qHyLOoyk2hn5OFBlh3G4So5Y7dFIllsLjaX5DVEuY8Qk5uBkgeQn6lJIO68G7VGmtvAdmKFPt8B9qwCXWXJPJDJIWk4bvwo2yRyyHhKMmJbKr0TFtCjve37TsvS-NzZ-gC-wjWr-HLjKbL1JPfbg6PznpxdKcBcNnvIFdZkRRg3ikROo_m0Raoyn_xu5ubNpwXIbOXFUfxzvmq5LDGg2kK57cTuLTPE3mlGkpqEphYYDSFCx0c-FoyCGK-a8s_VuLSU258d405tgxF6l85B-HWffSgjsy34JZ5vV4juYJhXJPXITkYCrilao28yg0YVPJhccRZlcdHY5tqgoQNngJor6LwoclNrAtY9J7bMjrmElR2c6UpMH1QEJ_5k7xLfLHI--urFZZd6NPOxk68X30tV2wgMoD0BbUpO9mTQy2SLQZLwYR6hhVqxuCchPvUduXNMYKlo7rBN2EYXIE_X-f078T1JZne7cwv4r7O92RRfTTmGTRiC5BJyjQuPDKDPK1B2yYFUUScSfFLDlmDT3KtRMtwYrMMv9n52t02ulN-c0lEmK9lTNKlfZ242-uxzvIUfppZnfksMg',
    },
    query: {
      page: page,
    },
  })
}

const gs: any = GloriousStore()

getNews({ page: 1 })
</script>

<template>
  <div class="flex flex-col gap-5">
    <GButton @click="page++">change page</GButton>
    <GButton to="/ds">ds page</GButton>

    <div
      class="flex justify-center"
      v-if="gs.loading.news"
    >
      <GLoading color="green" />
    </div>
    <div v-else>
      <GPaginate
        :current-page="gs.response.news.meta.current_page"
        :last-page="gs.response.news.meta.last_page"
        @change="getNews"
      />
      {{ gs.response?.news?.data }}
    </div>
  </div>
</template>
