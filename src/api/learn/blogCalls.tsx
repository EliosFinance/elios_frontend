import { userStore } from '@/store/UserStore';
import { ArticleCategoryType, ArticleContentType, ArticleType } from '@/types/BlogType';
import { AxiosError } from 'axios';
import { instance_back } from '../const';

// CRUD ARTICLE CATEGORIES
export const getArticleCategories = async (): Promise<ArticleCategoryType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-category`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des catégories d'article:", err.message);
        throw err;
    }
};
export const getSingleArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-category/${articleCategoryId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};
export const postArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`article-category/${articleCategoryId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};
export const updateArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-category/${articleCategoryId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};
export const deleteArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.delete(`article-category/${articleCategoryId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression de la catégorie d'article n°$^{articleCategoryId}:`, err.message);
        throw err;
    }
};

// CRUD ARTICLES
export const getTrendingArticles = async (): Promise<ArticleType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`articles/trendings`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des articles:', err.message);
        throw err;
    }
};
export const getReadArticles = async (): Promise<ArticleType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`articles/userReads`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des articles:', err.message);
        throw err;
    }
};
export const getLikedArticles = async (): Promise<ArticleType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`articles/userLikes`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des articles:', err.message);
        throw err;
    }
};
export const getArticles = async (): Promise<ArticleType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`articles`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Erreur lors de la récupération des articles:', err.message);
        throw err;
    }
};
export const getSingleArticle = async (articleId: number): Promise<ArticleType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`articles/${articleId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const readArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`articles/${articleId}/read`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const viewArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`articles/${articleId}/views`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const likeArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`articles/${articleId}/likes`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const saveArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`articles/${articleId}/save`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la lecture de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const postArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`articles/${articleId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors du post de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const updateArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`articles/${articleId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const deleteArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.delete(`articles/${articleId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression de l'article n°${articleId}:`, err.message);
        throw err;
    }
};

// CRUD ARTICLE CONTENTS
export const getSavedArticleContents = async (): Promise<ArticleContentType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-content/userSaved`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des contenus d'article:", err.message);
        throw err;
    }
};
export const getArticleContents = async (): Promise<ArticleContentType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-content`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des contenus d'article:", err.message);
        throw err;
    }
};
export const getSingleArticleContent = async (articleContentId: number): Promise<ArticleContentType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-content/${articleContentId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const readArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/read`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const viewArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/views`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const likeArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/like`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const saveArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/save`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const postArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`article-content/${articleContentId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors du post du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const updateArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const deleteArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.delete(`article-content/${articleContentId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
