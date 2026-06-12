<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <UColorModeAvatar
        class="size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="global.picture?.alt!"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      {{ page.content }}
      <!-- <ContentRenderer
        :value="page"
      /> -->
      <!-- <MDC
        :value="page.content"
        unwrap="p"
      /> -->
      <div class="flex flex-row justify-center items-center py-10 -space-x-8">
        <!-- <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        /> -->
        <div class="flex flex-col gap-6 py-10">
          <!-- Skills -->
          <div class="flex flex-col gap-3">
            <h2 class="text-lg font-semibold text-highlighted">
              Skills
            </h2>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="skill in page.skills"
                :key="skill.name"
                variant="subtle"
                size="md"
                class="gap-1.5"
              >
                <UIcon
                  v-if="isIcon(skill.icon)"
                  :name="skill.icon"
                  class="size-4 shrink-0"
                />

                <NuxtImg
                  v-else
                  :src="skill.icon"
                  width="16"
                />

                {{ skill.name }}
              </UBadge>
            </div>
          </div>

          <!-- Tools -->
          <div class="flex flex-col gap-3">
            <h2 class="text-lg font-semibold text-highlighted">
              Tools
            </h2>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tool in page.tools"
                :key="tool.name"
                variant="subtle"
                size="md"
                class="gap-1.5"
              >
                <UIcon
                  v-if="isIcon(tool.icon)"
                  :name="tool.icon"
                  class="size-4 shrink-0"
                />

                <NuxtImg
                  v-else
                  :src="tool.icon"
                  width="16"
                />
                {{ tool.name }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
