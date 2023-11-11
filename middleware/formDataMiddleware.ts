import multer from "multer"
import DataParser from 'datauri/parser.js'
import path from 'path'

// ❗️some hosts(Render) do not allow to store on disk
// const storage = multer.diskStorage({
//   destination: (req,file,cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req,file,cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName)
//   }
// })

const storage = multer.memoryStorage();

const upload = multer({storage})

const parser = new DataParser()

export const formatImage = (file: Express.Multer.File): string | undefined => {
  const fileExtension = path.extname(file.originalname);
  return parser.format(fileExtension, file.buffer).content;
}

export default upload