import { createReadStream } from "streamifier";
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary';
import fileUpload from "express-fileupload";

export class CloudStorage {

  public async uploadImage(buffer: string | Buffer | Uint8Array) {
      const streamUpload = function(): Promise<UploadApiResponse> {
          return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                  if (result) {
                    return resolve(result);
                  } else {
                    return reject(error);
                  }
                }
              );
  
            createReadStream(buffer).pipe(stream);
          });
      };
      const uploadedImage = await streamUpload();
      return uploadedImage.secure_url;
  }
}