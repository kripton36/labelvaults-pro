import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  uploadFile,
  getFiles,
  getFile,
  deleteFile
} from '../controllers/fileController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'pdf,png,jpg,jpeg,ai,eps,svg').split(',');
    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);
    
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`File type .${fileExtension} is not allowed`));
    }
  },
});

// Protected routes
router.post('/upload', authenticate, upload.array('files', 10), uploadFile);
router.get('/', authenticate, getFiles);
router.get('/:id', authenticate, getFile);
router.delete('/:id', authenticate, deleteFile);

export default router;