import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp/")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({
    storage,
})

const uploadAvatar = upload.single('avatar');

export default {
    uploadAvatar,
    upload
}







