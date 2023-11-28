import { Injectable, NotFoundException } from "@nestjs/common";



@Injectable()
export class AuthTestService {
    constructor(
    
    ){}

    private readonly db = [
        {title: "Article 1", text: "some text", id: "a1"},
        {title: "Article 2", text: "some text", id: "a2"},
        {title: "Article 3", text: "some text", id: "a3"},
    ]

    public async getAll(){
        return this.db
    }

    public async getById(articleId: string){
        const article = this.db.find(article => article.id === articleId);
        if(!article) throw new NotFoundException();
        return article
    }
}
