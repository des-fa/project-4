import formidable from 'formidable'
import _ from 'lodash'
import fs from 'fs'

const dirname = '/tmp'
if (!fs.existsSync(dirname)) fs.mkdirSync(dirname)

const parseData = (req, res, next) => {
  const form = formidable({ uploadDir: dirname, keepExtensions: true, multiples: true })

  if (req?.headers?.['content-type']?.includes('multipart/form-data')) {
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json(err)

      req.body = fields
      req.files = files

      Object.keys(files).forEach((key) => {
        if (files[key].size > 0) {
          _.set(req.body, key, files[key])
        } else {
          console.log('unlink in line 23')
          fs.unlinkSync(files[key].filepath)
          delete req.files[key]
        }
      })

      // cleans up tmp folder when the request is done
      req.on('close', () => {
        Object.keys(files).forEach((key) => {
          console.log('unlink in line 32')
          fs.unlinkSync(files[key].filepath)
        })
      })

      return next()
    })
  } else {
    next()
  }
}

export default parseData
