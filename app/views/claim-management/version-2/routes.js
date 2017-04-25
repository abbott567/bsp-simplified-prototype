const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

router.use('/process-a-claim', require('./process-a-claim/routes'))
router.use('/capture-a-claim', require('./capture-a-claim/routes'))

module.exports = router