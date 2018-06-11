const express = require('express')
const path = require('path')
const router = new express.Router()
const {logOnPost} = require('../../../../lib/utils')
const {addToLog, getTestDate} = require('./functions')

// Log session to console on POST requests
router.use(logOnPost)

// Set path for PDF's
router.use('/load-pdf/', express.static(path.join(__dirname, './_pdf')))

router.use((req, res, next) => {
  res.locals.todayDate = getTestDate()
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim`)
})

// -----------------------------------------------------------------------------
// Find a claim ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/find-a-claim/', (req, res) => {
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {search})
})

// -----------------------------------------------------------------------------
// Start a new claim -----------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim/', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claim-details`, {start: true})
})

// -----------------------------------------------------------------------------
// Task list -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/task-list/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/task-list/task-list`, {scenario, d})
})

// -----------------------------------------------------------------------------
// Confirm details -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/confirm-details/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/confirm-details/confirm-details`, {scenario, d})
})
router.post('/confirm-details/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/allowed`)
})

// -----------------------------------------------------------------------------
// Completed claims ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:scenario/:decision', (req, res) => {
  const decision = req.params.decision
  const scenario = req.session.data.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/completed-claim/${decision}`, {scenario, decision, d})
})

// -----------------------------------------------------------------------------
// Schedule --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  const schedule = require(`./_dummy-data/_schedule.json`)
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {scenario, d, schedule})
})

// -----------------------------------------------------------------------------
// Payment details -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/capture/payment-details`, {scenario, d})
})
router.post('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario
  addToLog(req, 'capture')
  res.redirect(`/${req.feature}/${req.sprint}/claim/${scenario}/allowed`)
})

module.exports = router
