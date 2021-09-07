using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;
using System.Web;


namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;
        private string _bucketName;
        //private AwsOptions _options;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
            _bucketName = "mvpstudio";
           
        }

        //public async Task<string> SaveFile(IFormFile file, FileType type)
        //{

        //    var filePath = Path.Combine(_environment.ContentRootPath, _tempFolder, file.FileName);
        //    using (var stream = File.Create(filePath))
        //    {
        //        await file.CopyToAsync(stream);
        //    }
        //    return filePath;

        //}
        public async Task<string> SaveFile(IFormFile file, FileType type)
        {

            var uniqueFileName = "";
            string pathWeb = "";
            pathWeb = _environment.ContentRootPath;
            string BucketName = "mvpstudio";

            if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                uniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                string path = Path.Combine(pathWeb, _tempFolder, uniqueFileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    if (!await _awsService.PutFileToS3(uniqueFileName, fileStream, BucketName))

                    {

                        uniqueFileName = "";

                    }

                }

            }

            return uniqueFileName;

        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            string rootPath = _environment.ContentRootPath;
            string BucketName = "mvpstudio";

            if (id != null && type == FileType.ProfilePhoto && !string.IsNullOrWhiteSpace(rootPath))
            {
                
                string fullFileName = Path.Combine(rootPath, _tempFolder, id);
                if (File.Exists(fullFileName))
                {
                    File.Delete(fullFileName);
                    if (!await _awsService.RemoveFileFromS3(id, BucketName))
                    {

                        return true;

                    }
                    return false;
                }
            }
            return false;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            var url = await _awsService.GetPresignedUrlObject(id, _bucketName);
            return url;
        }

        



        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
