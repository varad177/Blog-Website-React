


import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

//isme mongo url , option 

const storage = new GridFsStorage({
    url: "mongodb+srv://varad:varad6862@cluster0.0suvvd6.mongodb.net/blog_website",
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"]
        //if arrays me exist hoga to 1 return hoga 
        if (match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }


})

export default multer({storage})