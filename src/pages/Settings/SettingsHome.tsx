import React from 'react';
import { SETTINGS_MAP } from './SettingsMap';

const SettingsHome = () => {
    return (
        <div>
            {/* Header */}
            <div>
                {/* go back + help */}
                <div>
                    <span>Retour</span>
                    <span>Aide</span>
                </div>
                {/* User Profile */}
                <div>
                    <img src='' alt='User profile picture' />
                    <div>
                        <span>Nom Prénom</span>
                        <span>Sécuriser mon compte</span>
                    </div>
                </div>
                {/* CTA parrainage */}
                <div>
                    <span>Inviter un ami, et obtenez du Premium gratuitement !</span>
                </div>
            </div>

            {/* Body */}
            <div>
                {SETTINGS_MAP.map((settingCategory) => (
                    <div>
                        <h2>{settingCategory.title}</h2>
                        <div>
                            {settingCategory.children?.map((setting) => (
                                <div>
                                    <div>
                                        <span>{setting.title}</span>
                                        <span>{setting.icon}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <button>Déconnexion</button>
        </div>
    );
};

export default SettingsHome;
