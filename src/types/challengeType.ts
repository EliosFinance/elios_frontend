import { categoriesEnum, categoryType, subjectType } from "@/temp/BlogData"
import { TransactionType } from "@/types/transactionType"

export type enterpriseType = {
    id:number,
    name:string,
    logo:string,
    description:string,
    creation_date:Date,
    challenge: challengeType[],
}

export type userType = {
    id:number,
    username:string,
    password:string,
    powens_token:string,
    transactions: TransactionType[],
    friends: userType[],
    articles: subjectType[],
    likedArticles: subjectType[],
    challenges: challengeType[],
}

export type challengeType = {
    id:number,
    title:string,
    description:string,
    image:string,
    entreprise: enterpriseType,
    category: categoryType,
    users: userType[],
}

export const challengeData:challengeType = {
    id:1,
    title:"Challenge 1",
    description:"Description 1",
    image:"Image 1",
    entreprise: {
        id:1,
        name:"Enterprise 1",
        logo:"Logo 1",
        description:"Description 1",
        creation_date:new Date(),
        challenge: [],
    },
    category: {
        id:1,
        title:categoriesEnum.BUDGET,
        icon:'https://via.placeholder.com/150',
    },
    users: [],
}
