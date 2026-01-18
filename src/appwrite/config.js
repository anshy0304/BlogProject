import conf from "../conf/conf";
import { Client, ID, TablesDB ,Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    database;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);

        this.database = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createRow({
                databaseId:conf.databaseId,
                tableId:conf.tableId,
                rowId:slug,
                data:{
                title,
                content,
                featuredImage,
                status,
                userId,
                }
            })
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title , content , featuredImage , status , userId}){
        try {
            return await this.database.updateRow({
                
                databaseId:conf.databaseId,
                tableId:conf.tableId,
                rowId:slug,
                data:{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                  }
        })
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteRow(
               { 
                databaseId:conf.databaseId,
                tableId:conf.tableId,
                rowId:slug
            }
            )
            return true
        } catch (error) {
            throw error
        }
    }
    
    async getPost(slug) {
        try {
            return await this.database.getRow({
                databaseId:conf.databaseId,
                tableId:conf.tableId,
                rowId:slug
            })
        } catch (error) {
            throw error
        }
    }
    async getPosts(query = [Query.equal("status","active")]){
        return await this.database.listRows({
            databaseId: conf.databaseId,
            tableId: conf.tableId,
            queries: query
        });
    }


    //file upload

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.bucketId,
                fileId: ID.unique(),
                file: file
            });
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.bucketId,
                fileId: fileId
                });
            return true
        } catch (error) {
            throw error
        }
    }
    getFileView(fileId) {
        try {
            return this.bucket.getFileView({
                bucketId: conf.bucketId,
                fileId: fileId,
            });
        } catch (error) {
            throw error
        }
    }
}



const service = new Service()

export default service