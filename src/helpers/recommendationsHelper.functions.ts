/**
 * Formate le score d'activité pour l'affichage
 */
export const formatActivityScore = (score: number): string => {
    if (score >= 80) return '🔥 Très actif';
    if (score >= 60) return '📈 Actif';
    if (score >= 40) return '📊 Modéré';
    if (score >= 20) return '📉 Faible';
    return '😴 Inactif';
};

/**
 * Formate le niveau de difficulté pour l'affichage
 */
export const formatDifficultyLevel = (level: 'easy' | 'medium' | 'hard'): string => {
    const levels = {
        easy: '🟢 Facile',
        medium: '🟡 Moyen',
        hard: '🔴 Difficile',
    };
    return levels[level];
};

/**
 * Formate le niveau de risque de churn
 */
export const formatChurnRisk = (level: 'low' | 'medium' | 'high'): string => {
    const risks = {
        low: '✅ Faible risque',
        medium: '⚠️ Risque modéré',
        high: '🚨 Risque élevé',
    };
    return risks[level];
};

/**
 * Calcule la couleur basée sur un score
 */
export const getScoreColor = (score: number): string => {
    if (score >= 80) return '#22c55e'; // vert
    if (score >= 60) return '#84cc16'; // vert clair
    if (score >= 40) return '#eab308'; // jaune
    if (score >= 20) return '#f97316'; // orange
    return '#ef4444'; // rouge
};
