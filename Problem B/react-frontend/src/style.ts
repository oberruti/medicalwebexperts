/*
 * Common style constants used throughout react components.
 */

const twelfthColumnMargin = 20

const fullWidth = 1280
const navWidth = 60

export const backgroundColor = 'rgb(209 232 247)'

export const Dimensions = {
    fonts: {
        spacing1: '.75px',
        weight1: 600,
        menuSize: 16,
        menuGroupSize: 14,
    },
    width: {
        content: fullWidth - navWidth,
        nav: navWidth,
        navEntry: 36,
        full: fullWidth,
        box: 996,
        boxPadding: 28,
        modalContent: 665,
        halfWidthCard: 489,
        tableFilter: 280,
        narrowScreenThreshold: 1250,
    },
    height: {
        menu: 56,
        spacing: 46,
        chart: 370,
        smallChart: 240,
        navEntry: 36,
        navTitle: 57,
        customersTable: {
            row: 64,
            header: 46,
        },
        topBanner: 53,
        shortScreenThreshold: 700,
    },
    margins: {
        contentTop: twelfthColumnMargin,
        contentBottom: twelfthColumnMargin,
        largeContentBottom: 90,
        contentLeft: twelfthColumnMargin,
        contentRight: twelfthColumnMargin,
        cardsHorizontalSpacing: twelfthColumnMargin,
        cardsVerticalSpacing: twelfthColumnMargin,
    },
} as const
