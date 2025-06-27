# Portfolio Professionnel

Un portfolio moderne et responsive avec système de gestion des projets dynamique via JSON.

## 🚀 Fonctionnalités

- **Design moderne et responsive** avec animations CSS/JS
- **Système de projets dynamique** via fichier JSON
- **Filtrage des projets** par technologie
- **Formulaire de contact** fonctionnel en PHP
- **Animations fluides** et interactions utilisateur
- **Optimisé pour tous les appareils**

## 📁 Structure du Projet

```
portfolio_final/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── projects.js
│   ├── data/
│   │   └── projects.json
│   └── images/
│       ├── project1.svg
│       ├── project2.svg
│       └── ...
├── index.html
├── projets.html
├── apropos.html
├── contact.html
├── process_contact.php
└── README.md
```

## 🛠️ Gestion des Projets via JSON

### Structure du fichier `projects.json`

Le fichier `assets/data/projects.json` contient tous les projets du portfolio. Voici la structure :

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Nom du Projet",
      "description": "Description du projet",
      "image": "assets/images/project1.svg",
      "alt": "Texte alternatif",
      "badge": "Badge du projet",
      "badgeType": "recent|trending|innovative|personal|educational|professional",
      "tags": ["PHP", "JavaScript", "CSS3"],
      "stats": {
        "views": "1.2k",
        "rating": "4.8/5"
      },
      "links": {
        "demo": "#",
        "github": "#"
      },
      "featured": true
    }
  ]
}
```

### Propriétés des projets

- **id** : Identifiant unique du projet
- **title** : Titre du projet
- **description** : Description courte du projet
- **image** : Chemin vers l'image du projet
- **alt** : Texte alternatif pour l'accessibilité
- **badge** : Texte du badge (ex: "Projet Récent")
- **badgeType** : Type de badge pour le style CSS
- **tags** : Tableau des technologies utilisées
- **stats** : Statistiques du projet (views, downloads, etc.)
- **links** : Liens vers la démo et le code source
- **featured** : Boolean pour afficher en vedette sur la page d'accueil

### Comment ajouter/supprimer un projet

1. **Ajouter un projet** :
   - Ouvrir `assets/data/projects.json`
   - Ajouter un nouvel objet dans le tableau `projects`
   - Donner un ID unique
   - Remplir toutes les propriétés requises
   - Sauvegarder le fichier

2. **Supprimer un projet** :
   - Ouvrir `assets/data/projects.json`
   - Supprimer l'objet du projet souhaité
   - Sauvegarder le fichier

3. **Modifier un projet** :
   - Ouvrir `assets/data/projects.json`
   - Modifier les propriétés du projet
   - Sauvegarder le fichier

### Types de badges disponibles

- `recent` : Projet récent (bleu)
- `trending` : Projet tendance (vert)
- `innovative` : Projet innovant (violet)
- `personal` : Projet personnel (orange)
- `educational` : Projet éducatif (jaune)
- `professional` : Projet professionnel (gris)

### Statistiques supportées

- `views` : Nombre de vues
- `downloads` : Nombre de téléchargements
- `visitors` : Nombre de visiteurs
- `articles` : Nombre d'articles
- `users` : Nombre d'utilisateurs
- `rating` : Note sur 5

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `assets/css/style.css` :

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  --text-color: #1e293b;
  --bg-color: #ffffff;
}
```

### Animations
Les animations sont gérées par :
- `assets/js/main.js` : Animations générales
- `assets/js/projects.js` : Gestion des projets

### Images
Remplacez les images SVG dans `assets/images/` par vos propres images.

## 📱 Pages

- **index.html** : Page d'accueil avec projets en vedette
- **projets.html** : Tous les projets avec filtrage
- **apropos.html** : À propos et compétences
- **contact.html** : Formulaire de contact

## 🔧 Installation

1. Cloner ou télécharger le projet
2. Placer dans votre serveur web (Apache, Nginx, etc.)
3. Configurer PHP si nécessaire pour le formulaire de contact
4. Modifier `assets/data/projects.json` avec vos projets

## 📧 Formulaire de Contact

Le formulaire utilise `process_contact.php` pour traiter les messages. Assurez-vous que :
- PHP est installé sur votre serveur
- Les permissions d'écriture sont correctes
- L'email de destination est configuré dans le fichier PHP

## 🌟 Fonctionnalités Avancées

- **Filtrage dynamique** : Filtre les projets par technologie
- **Animations au scroll** : Éléments qui apparaissent progressivement
- **Responsive design** : S'adapte à tous les écrans
- **Accessibilité** : Respect des standards WCAG
- **Performance** : Optimisé pour le chargement rapide

## 📝 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

---

**Développé avec ❤️ par AKL** 