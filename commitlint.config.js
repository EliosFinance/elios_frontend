import configConventional from '@commitlint/config-conventional';
 
const Configuration = {
    extends: ['@commitlint/config-conventional', '@commitlint/is-ignored'],
 
    ignores: [
        ...(configConventional.ignores || []),
        (commit) =>
            /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/.test(
                commit,
            ),
    ],
 
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'chore',
                'revert',
                'config',
            ],
        ],
        'scope-enum': [
            2,
            'always',
            [ 
                'components',
                'pages',
                'styles',
                'utils',
                'hooks',
                'services',
                'config',
                'assets',
                'tests',
                'storybook',
                'translations',
                'public',
                'scripts',
                'build',
 
                'docs',
 
                'config-other',
                'config-commitlint',
                'config-typescript',
                'config-eslint',
                'config-prettier',
                'config-jest',
                'config-jest-react',
 
                'ci-cd',
            ],
        ],
    },
 
    prompt: {
        messages: {
            skip: ':skip',
            max: 'pas plus de %d caractères',
            min: 'au moins %d caractères',
            emptyWarning: 'ne peut être vide',
            upperLimitWarning: 'au-dessus de la limite',
            lowerLimitWarning: 'sous la limite'
        },
        questions: {
            type: {
              description: "Choisissez le type de modification que concerne votre commit :",
              enum: {
                feat: {
                  description: 'Ajout/mise à jour de fonctionnalité',
                  title: 'Features',
                  emoji: '✨',
                },
                fix: {
                  description: 'Correction de bug',
                  title: 'Bug Fixes',
                  emoji: '🐛',
                },
                docs: {
                  description: 'Ajout/modif. de documentation',
                  title: 'Documentation',
                  emoji: '📚',
                },
                style: {
                  description: 'Modifs de style et de mise en forme du code (espacements, virgules, etc.)',
                  title: 'Styles',
                  emoji: '💎',
                },
                refactor: {
                  description: 'Modif. des sources n\'étant ni un correctif, ni un ajout de fonctionnalité',
                  title: 'Code Refactoring',
                  emoji: '📦',
                },
                perf: {
                  description: 'Amélioration de la performance',
                  title: 'Performance Improvements',
                  emoji: '🚀',
                },
                test: {
                  description: 'Ajout ou correction de tests',
                  title: 'Tests',
                  emoji: '🚨',
                },
                build: {
                  description: 'Modif. affectant le "build" ou les dépendances externes (exemples de contextes :  webpack, broccoli, npm)',
                  title: 'Builds',
                  emoji: '🛠',
                },
                ci: {
                  description: 'Modif. de la configuration ou des scripts liés à la CI (Travis, Circle, BrowserStack, SauceLabs, etc.)',
                  title: 'Continuous Integrations',
                  emoji: '⚙️',
                },
                chore: {
                  description: "Autres mises à jour ne modifiant ni les sources, ni les tests",
                  title: 'Chores',
                  emoji: '♻️',
                },
                revert: {
                  description: 'Annuler (revert) un commit précédent',
                  title: 'Revert',
                  emoji: '🗑',
                },
                config: {
                  description: 'Modifications de configuration',
                  title: 'Configuration',
                  emoji: '⚙️',
                },
              },
            },
            scope: {
              enum: {
                components: {
                  description: 'Composants React',
                },
                pages: {
                  description: 'Pages React',
                },
                styles: {
                  description: 'Fichiers de styles (SCSS, CSS, etc.)',
                },
                utils: {
                  description: 'Fichiers utilitaires',
                },
                hooks: {
                  description: 'Hooks React',
                },
                services: {
                  description: 'Services (API, etc.)',
                },
                config: {
                  description: 'Fichiers de configuration',
                },
                assets: {
                  description: 'Fichiers d\'assets (images, polices, etc.)',
                },
                tests: {
                  description: 'Fichiers de tests',
                },
                storybook: {
                  description: 'Fichiers Storybook',
                },
                translations: {
                  description: 'Fichiers de traduction',
                },
                public: {
                  description: 'Fichiers publics',
                },
                scripts: {
                  description: 'Scripts (npm, etc.)',
                },
                build: {
                  description: 'Fichiers de build',
                },
                docs: {
                  description: 'Fichiers de documentation',
                },
                'config-other': {
                  description: 'Autres fichiers de configuration',
                },
                'config-commitlint': {
                  description: 'Fichier de configuration Commitlint',
                },
                'config-typescript': {
                  description: 'Fichier de configuration TypeScript',
                },
                'config-eslint': {
                  description: 'Fichier de configuration ESLint',
                },
                'config-prettier': {
                  description: 'Fichier de configuration Prettier',
                },
                'config-jest': {
                  description: 'Fichier de configuration Jest',
                },
                'config-jest-react': {
                  description: 'Fichier de configuration Jest pour React',
                },
                'ci-cd': {
                  description: 'Fichiers de configuration CI/CD',
                },
              }
            },
        },
        scope: {
            description:
              'Quel est le contexte des modifications (composant, nom de fichier)',
        },
        subject: {
            description: 'Écrivez une description concise, à l\'impératif',
        },
        body: {
            description: 'Renseignez une description plus détaillée des modifications',
        },
        isBreaking: {
            description: 'Y a-il des changements majeurs ("breaking changes") ?',
        },
        breakingBody: {
            description:
                'Un commit cassant la compatibilité ascendante ("breaking changes") nécessite un corps de message. Veuillez renseigner une description plus longue et détaillée que la première ligne du commit.',
        },
        breaking: {
            description: 'Décrivez les "breaking changes"',
        },
        isIssueAffected: {
            description: 'Cela concerne-t-il un ticket existant ?',
        },
        issuesBody: {
            description:
                'Vous devez ajouter un corps au message si ce commit ferme des tickets. Essayez de renseigner une description plus longue et détaillée que la première ligne du commit.',
        },
        issues: {
            description: 'Ajoutez une référence de ticket ("fix #123", "ref #123")',
        },
    },
};
 
export default Configuration;
 