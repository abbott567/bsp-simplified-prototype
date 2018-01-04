const express = require('express')
const {logOnPost} = require('../../../../lib/utils')
const router = new express.Router()

// Log session to console on POST requests
router.use(logOnPost)

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start`)
})

// Eligibility
// -- Were you married
router.get('/were-you-married', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/eligibility/were-you-married`)
})
router.post('/were-you-married', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/after-april`)
})
// -- Was it after April 2017?
router.get('/after-april', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/eligibility/after-april`)
})
router.post('/after-april', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})

// Capture
// -- Partner details
router.get('/partner-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/partner-details`)
})
router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/your-details`)
})
// -- Your details
router.get('/your-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/your-details`)
})
router.post('/your-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/contact-details`)
})
// -- Contact details
router.get('/contact-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/contact-details`)
})
router.post('/contact-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/children-details`)
})
// -- Children details
router.get('/children-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/children-details`)
})
router.post('/children-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/contact-details`)
})

module.exports = router