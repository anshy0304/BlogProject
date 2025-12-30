import conf from "../conf/conf";
import { Client, ID, TablesDB ,Storage } from "appwrite";

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
            return await this.database.TablesDB.createRow({
                databaseId:conf.appwriteUrl,
                tableId:conf.collectionId,
                slug,
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

}

const service = new Service()