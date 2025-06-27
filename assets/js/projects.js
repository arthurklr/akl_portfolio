// Gestionnaire de projets avec chargement JSON
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.currentFilter = 'all';
        this.allTags = new Set();
        this.init();
    }

    async init() {
        try {
            await this.loadProjects();
            this.extractAllTags();
            this.renderFilterButtons();
            this.currentFilter = 'all';
            this.renderProjects();
            this.initEventListeners();
            console.log('Projets chargés avec succès:', this.projects.length);
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des projets:', error);
            this.showErrorMessage();
        }
    }

    async loadProjects() {
        try {
            const response = await fetch('assets/data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.projects = data.projects || [];
            console.log('JSON chargé avec succès');
        } catch (error) {
            console.error('Erreur lors du chargement du JSON:', error);
            this.projects = [];
        }
    }

    // Extraire tous les tags uniques des projets
    extractAllTags() {
        this.allTags.clear();
        this.projects.forEach(project => {
            if (project.tags && Array.isArray(project.tags)) {
                project.tags.forEach(tag => {
                    this.allTags.add(tag.toLowerCase());
                });
            }
        });
        console.log('Tags extraits:', Array.from(this.allTags));
    }

    // Générer dynamiquement les boutons de filtre
    renderFilterButtons() {
        const filterContainer = document.querySelector('.filter-buttons');
        if (!filterContainer) {
            console.warn('Conteneur de filtres non trouvé');
            return;
        }

        // Bouton "Tous" toujours présent
        let filterHTML = '<button class="filter-btn active" data-filter="all">Tous</button>';
        
        // Générer un bouton pour chaque tag unique
        const sortedTags = Array.from(this.allTags).sort();
        sortedTags.forEach(tag => {
            const displayName = this.getTagDisplayName(tag);
            filterHTML += `<button class="filter-btn" data-filter="${tag}">${displayName}</button>`;
        });

        filterContainer.innerHTML = filterHTML;
    }

    // Obtenir le nom d'affichage d'un tag
    getTagDisplayName(tag) {
        const tagNames = {
            'html5': 'HTML5',
            'css3': 'CSS3',
            'javascript': 'JavaScript',
            'php': 'PHP',
            'mysql': 'MySQL',
            'wordpress': 'WordPress',
            'react native': 'React Native',
            'firebase': 'Firebase',
            'expo': 'Expo',
            'bootstrap': 'Bootstrap',
            'chart.js': 'Chart.js',
            'python': 'Python',
            'node.js': 'Node.js',
            'vue.js': 'Vue.js',
            'angular': 'Angular',
            'laravel': 'Laravel',
            'symfony': 'Symfony',
            'mongodb': 'MongoDB',
            'postgresql': 'PostgreSQL',
            'docker': 'Docker',
            'git': 'Git',
            'api': 'API',
            'rest': 'REST',
            'graphql': 'GraphQL',
            'aws': 'AWS',
            'azure': 'Azure',
            'heroku': 'Heroku',
            'netlify': 'Netlify',
            'vercel': 'Vercel'
        };

        return tagNames[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
    }

    showErrorMessage() {
        const containers = document.querySelectorAll('.projects-grid');
        containers.forEach(container => {
            if (container) {
                container.innerHTML = `
                    <div class="error-message" style="text-align: center; padding: 2rem; color: #666;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f59e0b; margin-bottom: 1rem;"></i>
                        <h3>Erreur de chargement</h3>
                        <p>Impossible de charger les projets depuis le fichier JSON.</p>
                        <p>Veuillez vérifier que le fichier assets/data/projects.json existe.</p>
                    </div>
                `;
            }
        });
    }

    renderProjects(container = '.projects-grid', filter = 'featured') {
        const containerElement = document.querySelector(container);
        if (!containerElement) {
            console.warn(`Conteneur ${container} non trouvé`);
            return;
        }

        if (this.projects.length === 0) {
            this.showErrorMessage();
            return;
        }

        let projectsToRender = this.projects;
        
        // Détecter si on est sur la page projets.html (présence de filtres)
        const isProjectsPage = document.querySelector('.filter-buttons') !== null;
        
        // Filtrer selon le type de conteneur
        if (filter === 'featured' && !isProjectsPage) {
            // Sur la page d'accueil, afficher seulement les projets mis en avant
            projectsToRender = this.projects.filter(project => project.featured);
        } else {
            // Sur la page projets.html ou si demandé explicitement, afficher tous les projets
            projectsToRender = this.projects;
        }

        // Filtrer selon la catégorie sélectionnée (seulement si pas "all")
        if (this.currentFilter !== 'all') {
            projectsToRender = projectsToRender.filter(project => 
                project.tags && project.tags.some(tag => 
                    tag.toLowerCase() === this.currentFilter.toLowerCase()
                )
            );
        }

        if (projectsToRender.length === 0) {
            containerElement.innerHTML = `
                <div class="no-projects" style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #6366f1; margin-bottom: 1rem;"></i>
                    <h3>Aucun projet trouvé</h3>
                    <p>Aucun projet ne correspond au filtre "${this.getTagDisplayName(this.currentFilter)}".</p>
                    <button class="btn btn-primary" onclick="projectsManager.setFilter('all')">Voir tous les projets</button>
                </div>
            `;
            return;
        }

        containerElement.innerHTML = projectsToRender.map(project => this.createProjectCard(project)).join('');

        // Réinitialiser les animations
        this.initProjectAnimations();
    }

    createProjectCard(project) {
        try {
            const statsHTML = this.createStatsHTML(project.stats || {});
            const tags = project.tags || [];
            const badgeType = project.badgeType || 'default';
            
            return `
                <div class="project-card ${project.featured ? 'featured' : ''}" data-category="${tags.join(' ').toLowerCase()}" data-id="${project.id}">
                    <div class="project-image">
                        <img src="${project.image || 'assets/images/project1.svg'}" alt="${project.alt || project.title}" onerror="this.src='assets/images/project1.svg'">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="${project.links?.demo || '#'}" class="project-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="${project.links?.github || '#'}" class="project-link" target="_blank">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3>${project.title || 'Projet sans titre'}</h3>
                            <span class="project-badge project-badge-${badgeType}">${project.badge || 'Projet'}</span>
                        </div>
                        <p>${project.description || 'Aucune description disponible'}</p>
                        <div class="project-tags">
                            ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-footer">
                            <div class="project-stats">
                                ${statsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Erreur lors de la création de la carte de projet:', error);
            return `
                <div class="project-card error" style="border: 1px solid #ef4444;">
                    <div class="project-content">
                        <h3>Erreur de chargement</h3>
                        <p>Impossible de charger ce projet.</p>
                    </div>
                </div>
            `;
        }
    }

    createStatsHTML(stats) {
        if (!stats || typeof stats !== 'object') {
            return '';
        }

        let statsHTML = '';
        
        if (stats.views) {
            statsHTML += `<span><i class="fas fa-eye"></i> ${stats.views} vues</span>`;
        }
        if (stats.downloads) {
            statsHTML += `<span><i class="fas fa-download"></i> ${stats.downloads} téléchargements</span>`;
        }
        if (stats.visitors) {
            statsHTML += `<span><i class="fas fa-users"></i> ${stats.visitors} visiteurs/mois</span>`;
        }
        if (stats.articles) {
            statsHTML += `<span><i class="fas fa-file-alt"></i> ${stats.articles} articles</span>`;
        }
        if (stats.users) {
            statsHTML += `<span><i class="fas fa-users"></i> ${stats.users} utilisateurs</span>`;
        }
        if (stats.rating) {
            statsHTML += `<span><i class="fas fa-star"></i> ${stats.rating}</span>`;
        }
        
        return statsHTML;
    }

    initEventListeners() {
        try {
            // Filtrage des projets avec délégation d'événements
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    const filter = e.target.getAttribute('data-filter');
                    this.setFilter(filter);
                }
            });

            // Animations au hover
            this.initHoverAnimations();
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des événements:', error);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Mettre à jour les boutons actifs
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });

        // Re-rendre les projets
        this.renderProjects('.projects-grid', 'all');
    }

    initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, Math.random() * 500);
        });
    }

    // Méthodes utilitaires
    getProjectById(id) {
        return this.projects.find(project => project.id === parseInt(id));
    }

    getProjectsByCategory(category) {
        return this.projects.filter(project => 
            project.tags && project.tags.some(tag => 
                tag.toLowerCase() === category.toLowerCase()
            )
        );
    }

    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    }

    getAllProjects() {
        return this.projects;
    }

    // Méthode pour ajouter un projet dynamiquement
    addProject(project) {
        project.id = this.projects.length + 1;
        this.projects.push(project);
        this.extractAllTags();
        this.renderFilterButtons();
        this.renderProjects();
    }

    // Méthode pour supprimer un projet
    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
        this.extractAllTags();
        this.renderFilterButtons();
        this.renderProjects();
    }

    // Méthode pour recharger les projets depuis le JSON
    async reloadProjects() {
        await this.loadProjects();
        this.extractAllTags();
        this.renderFilterButtons();
        this.renderProjects();
    }
}

// Initialisation
let projectsManager;

document.addEventListener('DOMContentLoaded', () => {
    try {
        projectsManager = new ProjectsManager();
        console.log('Gestionnaire de projets initialisé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du gestionnaire de projets:', error);
    }
});

// Fonctions globales pour l'utilisation dans d'autres fichiers
window.getProjectsManager = () => projectsManager; 