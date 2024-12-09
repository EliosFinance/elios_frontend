import { ArticleCategoryType, ArticleContentType, ArticleType } from '@/types/BlogType';
import { AxiosError } from 'axios';
import { instance_back } from '../const';

// CRUD ARTICLE CATEGORIES
export const getArticleCategories = async (): Promise<ArticleCategoryType[]> => {
    try {
        const response = await instance_back.get(`article-category`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des catégories d'article:", err.message);
        throw err;
    }
};
export const getSingleArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType> => {
    try {
        const response = await instance_back.get(`article-category/${articleCategoryId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};
export const postArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const response = await instance_back.post(`article-category/${articleCategoryId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};
export const updateArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const response = await instance_back.put(`article-category/${articleCategoryId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};
export const deleteArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const response = await instance_back.delete(`article-category/${articleCategoryId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};

// CRUD ARTICLES
export const getArticles = async (): Promise<ArticleType[]> => {
    try {
        const response = await instance_back.get(`articles`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des articles:', err.message);
        throw err;
    }
};
export const getSingleArticle = async (articleId: number): Promise<ArticleType> => {
    try {
        const response = await instance_back.get(`articles/${articleId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const readArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.put(`articles/${articleId}/read`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const viewArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.put(`articles/${articleId}/views`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const likeArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.put(`articles/${articleId}/likes`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const saveArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.put(`articles/${articleId}/save`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const postArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.post(`articles/${articleId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors du post de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const updateArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.put(`articles/${articleId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const deleteArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const response = await instance_back.delete(`articles/${articleId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression de l'article n°${articleId}:`, err.message);
        throw err;
    }
};

// CRUD ARTICLE CONTENTS
export const getArticleContents = async (): Promise<ArticleContentType[]> => {
    try {
        const response = await instance_back.get(`article-contents`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des contenus d'article:", err.message);
        throw err;
    }
};
export const getSingleArticleContent = async (articleContentId: number): Promise<ArticleContentType> => {
    try {
        const response = await instance_back.get(`article-contents/${articleContentId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const readArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.put(`article-contents/${articleContentId}/reads`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const viewArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.put(`article-contents/${articleContentId}/views`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const likeArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.put(`article-contents/${articleContentId}/like`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const saveArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.put(`article-contents/${articleContentId}/save`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const postArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.post(`article-contents/${articleContentId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors du post du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const updateArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.put(`article-contents/${articleContentId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const deleteArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const response = await instance_back.delete(`article-contents/${articleContentId}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
