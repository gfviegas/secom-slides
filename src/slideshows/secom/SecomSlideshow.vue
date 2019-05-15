<template lang='pug'>
#secom-slides.eg-theme-agrume
  .eg-slideshow
    //- Avisos Gerais
    slide(enter='fadeIn' leave='fadeOut')
      h2.slide-title Avisos
      ul.warnings
        li Lembrem-se de levar o crachá e o copo para os coffee-breaks!
        li É feito credenciamento ao fim de cada coffe-break.
        li Aproveitem a balbúrdia.

    //- Patrocinadores - Platinum
    slide(enter='bounceInRight', :steps="platinumSupporters.length || 0")
      h2.slide-title Apoio
      center.center
        eg-transition(enter='bounceInLeft' v-for="(s, index) in platinumSupporters")
          .supporter(v-if="step == index + 1")
            img(:src="s.logo")
            h5 {{s.title}} - Patrocínio Platinum!

    //- Próximos Eventos
    slide(enter='bounceInRight', leave='fadeOut')
      h2.slide-title Em seguida...
      ul
        li(v-for="e in nextEvents").schedule-item
          strong {{e.what}}
          p.tabbed
            em {{e.where}}
            span &nbsp;- {{e.when.format('dddd, [às] HH:mm[h]')}}

    //- Patrocinadores - Gold
    slide(enter='bounceInRight', :steps="goldSupporters.length || 0")
      h2.slide-title Apoio
      center.center
        eg-transition(enter='bounceInLeft' v-for="(s, index) in goldSupporters")
          .supporter(v-if="step == index + 1")
            img(:src="s.logo")
            h6 {{s.title}} - Patrocínio Gold!

    //- MyMobiConf
    slide(enter='fadeIn' leave='fadeOut')
      h2.slide-title MyMobiConf
      .ratings(v-if="stats")
        .rating
          h4.rating-title Avaliação Geral
          star-rating(:read-only="true", :rating="parseFloat(stats.mediaGeral) || 0", :increment="0.01", :border-width="3", border-color="#000000", active-color="#ffff00")
        .rating
          h4.rating-title Avaliação Som
          star-rating(:read-only="true", :rating="calculateStar(parseFloat(stats.mediaSom)) || 0", :increment="0.01", :border-width="3", border-color="#000000", active-color="#ffff00")
        .rating
          h4.rating-title Conforto Térmico
          star-rating(:read-only="true", :rating="calculateStar(parseFloat(stats.mediaTermico)) || 0", :increment="0.01", :border-width="3", border-color="#000000", active-color="#ffff00")
      .stats-data(v-if="stats")
        .data-cell
          p
            strong.number {{parseInt(stats.qtdParticipantes)}}
            span &nbsp; participantes
        .data-cell
          p
            strong.number {{parseInt(stats.qtdOpinioes)}}
            span &nbsp; opiniões emitidas
      p(v-if="!stats") Dados não disponíveis no momento!

    //- MyMobiConf
    slide(enter='fadeIn' leave='fadeOut')
      h2.slide-title MyMobiConf
      .best-activities(v-if="stats")
        h4 Melhores Atividades
        .ranking
          .ranking-item(v-for="(a, index) in stats.atividades")
            em.number {{index + 1}})
            strong {{a.nome}}
            star-rating(:fixed-points="2", :read-only="true", :rating="parseFloat(a.media) || 0", :increment="0.01", :border-width="3", border-color="#000000", active-color="#ffff00")
      p(v-if="!stats") Dados não disponíveis no momento!

    //- Patrocinadores - Silver
    slide(enter='bounceInRight', :steps="silverSupporters.length || 0")
      h2.slide-title Apoio
      center.center
        eg-transition(enter='bounceInLeft' v-for="(s, index) in silverSupporters")
          .supporter(v-if="step == index + 1")
            img(:src="s.logo")
            h6 {{s.title}} - Patrocínio Silver!
</template>
<script>
import axios from 'axios'
import eagle from 'eagle.js'
import supporters from '@/data/supporters'
import schedule from '@/data/schedule'
import StarRating from 'vue-star-rating'

const ENDPOINT = 'https://secom.gfviegas.com/scapeteste/mymobiconfweb/App/fetchSECOMSlides.php?evento=245'
const SECONDS = 4

export default {
  components: { StarRating },
  mixins: [ eagle.slideshow ],
  infos: {
    title: 'SECOM Slideshow',
    description: 'Slides pra o evento da SECOM',
    path: ''
  },
  props: {
    repeat: true,
    keyboardNavigation: true,
    mouseNavigation: false
  },
  data () {
    return {
      intervalHandler: null,
      stats: null,
      schedule: null
    }
  },
  methods: {
    calculateStar (x) {
      return 5 - Math.abs((x - 3) * Math.ceil(5 / 3))
    },
    async handleNextStep () {
      const slidesStepQuantum = [0, 3, 3, 2, 1, 3, 0.85]

      await this.nextStep()
      const nextTimeout = SECONDS * slidesStepQuantum[this.currentSlideIndex] * 1000
      if (this.currentSlideIndex === 5) {
        this.fetchEventData()
        this.mapSchedule()
      }

      this.intervalHandler = setTimeout(this.handleNextStep, nextTimeout)
    },
    async fetchEventData () {
      try {
        const { data } = await axios.get(ENDPOINT)
        this.stats = data
      } catch (e) {
      }
    },
    async mapSchedule () {
      this.schedule = schedule
        .map(s => {
          return {
            what: s.what,
            when: this.$moment(s.when, 'DD/MM/YYYY HH:mm'),
            where: s.where
          }
        })
        .filter(s => s.when.isAfter())
        .sort((a, b) => a.when.valueOf() - b.when.valueOf())
    }
  },
  computed: {
    // Pega os proximos 3 eventos
    nextEvents () {
      return this.schedule.slice(0, 3)
    },
    // Somente os patrocinadores platinum
    platinumSupporters () {
      return supporters.filter(s => s.type === 'platinum')
    },
    // Somente os patrocinadores gold
    goldSupporters () {
      return supporters.filter(s => s.type === 'gold')
    },
    // Somente os patrocinadores silver
    silverSupporters () {
      return supporters.filter(s => s.type === 'silver')
    }
  },
  async created () {
    this.fetchEventData()
    this.mapSchedule()
    this.intervalHandler = setTimeout(this.handleNextStep, 3 * SECONDS * 1000)

    // Preload de imagens
    await this.$imagePreload(supporters.map(s => s.logo))
  },
  beforeDestroy () {
    clearTimeout(this.intervalHandler)
  }
}
</script>

<style lang='sass'>
@import "~@/assets/variables.sass"
@import "node_modules/eagle.js/dist/themes/agrume/agrume"

#secom-slides
  .eg-slideshow
    font-family: 'EDO'
    background-image: none !important
    background-color: $gray-dark
    color: $lemon
    height: 80vh!important
    .eg-slide
      height: 80vh!important
      .eg-slide-content
        width: 80%
        margin: 0 auto
        display: flex
        height: 100%
        flex-direction: column
        justify-content: space-around

        .ratings
          display: flex
          justify-content: space-between
          .rating
            width: 25%
            display: flex
            justify-content: center
            flex-direction: column
            align-items: center
            .rating-title
              font-family: 'EDO'
              font-size: 2rem
        .stats-data
          display: flex
          justify-content: space-around
          .data-cell
            width: auto
            padding-top: 2rem
            p
              display: flex
              align-items: center
              .number
                font-family: 'Calibri'
                font-weight: bolder
                font-size: 4rem

        .best-activities
          h4
            margin: 0
            padding-bottom: 1rem
            text-align: center
            font-family: 'EDO'
            border-bottom: 0.4rem dashed darken(white, 30%)
          .ranking
            .ranking-item
              padding: 1rem 0
              display: flex
              align-content: center
              justify-content: space-between
              align-self: center
              .number
                font-family: 'Calibri'
                align-self: center
                padding-right: 1rem
              strong
                display: flex
                align-self: center
                width: 80%

        ul.warnings
          height: 100%
          display: flex
          justify-content: space-between
          flex-direction: column
          li
            font-size: 3rem
            @media (min-width: 1600px)
              font-size: 5rem
            font-weight: bold
            padding-bottom: 3rem

        h2.slide-title
          @media (max-width: 1600px)
            font-size: 4rem
          // font-size: 6rem
          font-family: 'EDO'
          text-align: left
          margin: 1rem

        .supporter
          img
            max-height: 20rem
            @media (min-width: 1600px)
              max-height: 30rem
        .schedule-item
          font-size: 2rem
          @media (min-width: 1600px)
            font-size: 3rem
          p
            margin-top: 0
          &:not(:last-child)
            padding-bottom: 1rem
          .tabbed
            padding-left: 2rem
</style>
