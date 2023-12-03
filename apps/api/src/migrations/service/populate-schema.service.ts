import {QueryRunner} from "typeorm";

export class PopulateSchemaService{

    public static async populateUser(schemaName:string,queryRunner:QueryRunner,id:string,name:string,email:string,password:string):Promise<void>{
        await queryRunner.query(`INSERT INTO ${schemaName}.user_domain (id,name,email,password,role) VALUES ('${id}','${name}','${email}','${password}','ADMIN')`);
    }
    public static async populatePortfolioEntry(schemaName:string,queryRunner:QueryRunner,id:string,title:string,description:string,customerLink:string,status:string,userId:string):Promise<void>{
        await queryRunner.query(`INSERT INTO ${schemaName}.portfolio_entry_domain (id,title,description,"customerLink",status,"userId") VALUES ('${id}','${title}','${description}','${customerLink}','${status}','${userId}')`);
    }
    public static async populateFileLink(schemaName:string ,queryRunner:QueryRunner,objectKey:string,filename:string,parentId:string,portfolioId:string):Promise<void> {
        if (parentId===null) {
            await queryRunner.query(`INSERT INTO ${schemaName}.file_link_domain ("objectKey",filename,"portfolioId") VALUES ('${objectKey}','${filename}','${portfolioId}')`);
        }
        else
            await queryRunner.query(`INSERT INTO ${schemaName}.file_link_domain ("objectKey",filename,"parentId") VALUES ('${objectKey}','${filename}','${parentId}')`);

    }
}