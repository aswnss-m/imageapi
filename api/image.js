const Image = require('./Modals/image.modal');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = require('express').Router();

router.route('/').get((req, res) => {
    Image.find()
      .select('_id') // Select only the _id field
      .then((images) => res.json(images))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  

router.route('/:id').get((req, res) => {
    Image.findById(req.params.id)
        .then((image) =>{ 
            res.set('Content-Type', image.image.contentType);
            res.send(image.image.data);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/upload').post(upload.single('image'), (req, res) => {
  const newImage = new Image({
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });
  newImage
    .save()
    .then(() => res.json('Image added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
